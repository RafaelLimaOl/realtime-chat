"use client"

import { client } from "@/app/lib/client"
import { useRealtime } from "@/app/lib/realtime-client"
import { useUsername } from "@/hooks/use-username"
import { useMutation, useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

function formatTimeRemaining(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return `${mins}:${secs.toString().padStart(2, "0")}`
}

const Page = () => {
  const params = useParams()
  const roomId = params.roomId as string
  const { username } = useUsername()
  const router = useRouter()

  const [copyStatus, setCopyStatus] = useState("Copy")
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [inputMessage, setInputMessage] = useState("")

  const inputRef = useRef<HTMLInputElement>(null)

  const { data: ttlData } = useQuery({
    queryKey: ["ttl", roomId],
    queryFn: async () => {
      const response = await client.room.ttl.get({ query: { roomId } })
      return response.data
    },
  })

  useEffect(() => {
    if (!ttlData?.ttl) return

    const end = Date.now() + ttlData.ttl * 1000

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((end - Date.now()) / 1000))
      setTimeRemaining(remaining)

      if (remaining === 0) {
        clearInterval(interval)
        router.push("/?destroyed=true")
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [ttlData])

  const { data: messages, refetch } = useQuery({
    queryKey: ["messages", roomId],
    queryFn: async () => {
      const response = await client.messages.get({ query: { roomId } })
      return response.data
    },
  })

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async ({ text }: { text: string }) => {
      await client.messages.post(
        { sender: username, text },
        { query: { roomId } }
      )
      setInputMessage("")
    },
  })

  const { mutate: destroyRoom } = useMutation({
    mutationFn: async () => {
      await client.room.delete(null, { query: { roomId } })
    },
  })

  useRealtime({
    channels: [roomId],
    events: ["chat.message", "chat.destroy"],
    onData: ({ event }) => {
      if (event === "chat.message") refetch()
      if (event === "chat.destroy") router.push("/?destroyed=true")
    },
  })

  const copyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setCopyStatus("Copied!")

    setTimeout(() => setCopyStatus("Copy"), 2000)
  }

  return (
    <main className="flex flex-col h-screen max-h-screen overflow-hidden">
      <header className="border-b border-zinc-800 p-4 flex items-center justify-between bg-zinc-900/30">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 uppercase">Room Id:</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-green-500"> {roomId}</span>
              <button
                className="text-[10px] bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 rounded text-zinc-400 cursor-pointer hover:text-zinc-200 transition-colors"
                onClick={copyLink}
              >
                {copyStatus}
              </button>
            </div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />

          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 uppercase">
              Self-Destruct
            </span>
            <span
              className={`text-sm font-bold flex items-center gap-2 ${
                timeRemaining !== null && timeRemaining < 60
                  ? "text-red-500"
                  : "text-amber-500"
              }`}
            >
              {timeRemaining !== null
                ? formatTimeRemaining(timeRemaining)
                : "--:--"}
            </span>
          </div>
        </div>
        <button
          onClick={() => destroyRoom()}
          className="text-xs bg-zinc-800 hover:bg-red-600 px-3 py-1.5 rounded text-zinc-400 cursor-pointer hover:text-white transition-all group flex items-center gap-2 disabled:opacity-50"
        >
          <span className="group-hover:animate-pulse">💣</span>Destroy now
        </button>
      </header>

      <div className="flex-1 overflow-auto p-4 space-y-4 scroll-thin">
        {messages?.messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-zinc-600 text-sm font-mono">
              No messages yet, start the conversation.
            </p>
          </div>
        )}
        {messages?.messages.map((item) => (
          <div key={item.id} className="flex flex-col items-start">
            <div className="max-w-[80%] group">
              <div className="flex items-baseline gap-3 mb-1">
                <span
                  className={`text-xs font-bold ${
                    item.sender === username
                      ? "text-green-500"
                      : "text-blue-500"
                  }`}
                >
                  {item.sender === username ? "YOU" : item.sender}
                </span>

                <span className="text-[10px] text-zinc-600">
                  {format(item.timestamp, "HH:mm")}
                </span>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed break-all">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
        <div className="flex gap-4">
          <div className="flex-1 relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 animate-pulse">
              {">"}
            </span>

            <input
              placeholder="Type message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputMessage.trim()) {
                  sendMessage({ text: inputMessage })
                  inputRef.current?.focus()
                }
              }}
              autoFocus
              className="w-full bg-black border border-zinc-800 foucs:border-zinc-700 transition-colors text-zinc-100 placeholder:text-zinc-700 py-3 pl-8 pr-4 text-sm"
            />
          </div>
          <button
            onClick={() => {
              sendMessage({ text: inputMessage })
              inputRef.current?.focus()
            }}
            disabled={!inputMessage.trim() || isPending}
            className="bg-zinc-800 text-zinc-400 px-6 text-sm font-bold hover:text-zinc-200 transition-all disabled:opacity-50 disable:cursor-not-allow cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  )
}

export default Page
