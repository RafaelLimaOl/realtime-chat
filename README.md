# 📱 Realtime chat

![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)

Website desenvolvido para estudo na área do front end e aprendizado de Redis utilizando **NextJS**, **Tailwind CSS**, **React Query** e **Redis**.

> ⚠️ **Aviso**  
> Este projeto é apenas para fins educacionais. Todos os direitos pertence ao canal **Josh Tried Coding**

---

## 🖼️ Preview

<img width="1864" height="951" alt="Captura de tela 2025-12-27 175906" src="https://github.com/user-attachments/assets/8af55558-a926-4c8e-ab45-ed189b8911f2" />

<img width="1863" height="954" alt="Captura de tela 2025-12-28 192848" src="https://github.com/user-attachments/assets/23d17367-ea36-4a4d-ba14-59b3dfbde6df" />

<img width="1862" height="949" alt="Captura de tela 2025-12-28 192931" src="https://github.com/user-attachments/assets/f33df289-3503-4cab-a1f2-542c07f0bcab" />

<img width="1918" height="943" alt="Captura de tela 2025-12-29 161850" src="https://github.com/user-attachments/assets/29290286-d93f-4459-bee7-6a28f8fa0c9c" />

<img width="1865" height="953" alt="Captura de tela 2025-12-28 201554" src="https://github.com/user-attachments/assets/7474497b-5685-4cb6-a13f-5782ca1acd11" />

---

## 🚀 Tecnologias Utilizadas

- ⚡ **NEXTJS** – Framework React para aplicações web rápidas, escaláveis e com renderização híbrida
- 🎨 **Tailwind CSS** – Estilização utilitária e responsiva
- 🧠 **Typescript (ES6+)** -  Superset do JavaScript que adiciona tipagem estática e mais segurança ao código
- 🗄️ **Redis** - Banco de dados em memória de alta performance para cache, filas e armazenamento rápido de dados

---

## ✨ Funcionalidades

- Funcionalidades em tempo real, envio de mensagens, criação e destruição de salas
- Cacheamento de informações tais como: Nome de usuário anônimo, mensagens e tokens
- Código organizado e reutilizável

---

## 📂 Estrutura de Pastas

```bash
├── public
├── src
│   ├── app
│   └── api
│     └── [[...slugs]]
│     └── realtime
│   └── lib
│   └── room
│     └── [roomId]
│   ├── components
│   ├── hooks
│   ├── proxy.ts
├── postcss.config.js
├── next.config.js
├── package.json

```

## 🛠️ Instalação e Uso
Pré-requisitos

Node.js (versão 18 ou superior)

```bash
cd <pasta-do-projeto>

npm i
# or
yarn i
# or
pnpm i
# or
bun i

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

```

Crie um arquivo .env no root do projeto e adicione as informações necessárias para a conexão com Redis:

```bash
UPSTASH_REDIS_REST_URL="your-upstash-url"
UPSTASH_REDIS_REST_TOKEN="your-upstash-token"
````

## Créditos

Desenvolvido para fins educacionais

Tutorial presente no canal: [Josh Tried Coding](https://www.youtube.com/watch?v=D8CLV-MRH0k&t=5157s)
