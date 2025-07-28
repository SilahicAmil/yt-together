# yt-together 🎥🤝

A web application that lets you **watch YouTube videos in sync with friends**. Built with a **Go (Gin) backend** and **React frontend** using **WebSockets** for real-time communication.

## ✨ Features

- 🔗 Create and share unique room links
- 👥 Multiple users can join the same room
- 📺 Watch YouTube videos together in sync
- ⏯️ Real-time play/pause synchronization
- ⚡ Powered by WebSockets for low-latency updates

## 🧱 Tech Stack

- **Backend:** Go, Gin, Gorilla WebSocket
- **Frontend:** React, React Router, Vite
- **Communication:** WebSockets for real-time sync

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SilahicAmil/yt-together.git
cd yt-together
```

### 2. Start the Go backend

```bash
cd backend
go run main.go
```

The backend should start on `http://localhost:8080`.

### 3. Start the React frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend should start on `http://localhost:5173` or similar.

> Make sure both frontend and backend are running for full functionality.

## 📷 Screenshots

> Coming Soon

## 🛠️ TODOs / Improvements

- 🔒 Add authentication or username support
- 🗃️ Add video history or queue per room
- 🎥 Add support for video seeking and volume syncing
- 💬 Add a chat feature for better interaction
- 👉 Add youtube video searching

Built with ❤️ by [Amil Silahic](https://github.com/SilahicAmil)
