"use client"

import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const animals = [
  "Lion",
  "Tiger",
  "Bear",
  "Wolf",
  "Fox",
  "Eagle",
  "Hawk",
  "Falcon",
  "Panther",
  "Leopard",
  "Jaguar",
  "Cheetah",
  "Shark",
  "Dolphin",
  "Whale",
  "Octopus",
  "Penguin",
  "Owl",
  "Raven",
  "Crow",
  "Horse",
  "Deer",
  "Moose",
  "Rabbit",
  "Hare",
  "Squirrel",
  "Otter",
  "Beaver",
  "Badger",
  "Hedgehog",
  "Raccoon",
  "Skunk",
  "Koala",
  "Panda",
  "Kangaroo",
  "Elephant",
  "Rhino",
  "Hippo",
  "Giraffe",
  "Zebra",
  "Camel",
  "Llama",
  "Goat",
  "Sheep",
  "Cow",
  "Bull",
  "Pig",
  "Boar",
  "Chicken",
  "Rooster",
  "Duck",
  "Goose",
  "Turkey",
  "Frog",
  "Toad",
  "Snake",
  "Lizard",
  "Turtle",
  "Tortoise",
  "Crab",
  "Lobster",
  "Shrimp",
  "Ant",
  "Bee",
  "Wasp",
  "Butterfly",
  "Moth",
  "Spider"
];

const generateUsername = () => {
  const lastName = animals[Math.floor(Math.random() * animals.length)]
  return `anonymous-${lastName}-${nanoid(5)}`
}

const storage_key = "chat_username"

export const useUsername = () => {
  const [username, setUsername] = useState("")

  useEffect(() => {
    const main = () => {
      const storedUser = localStorage.getItem(storage_key)

      if (storedUser) {
        setUsername(storedUser)
        return
      }

      const generated = generateUsername()
      localStorage.setItem(storage_key, generated)
      setUsername(generated)
    }

    main()
  }, [])

  return { username }
}