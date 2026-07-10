"use client"

import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import ChatMessages from "./ChatMessages"
import ChatInput from "./ChatInput"

export default function ChatWindow({ dept }) {
  const storageKey = `chats-${dept.id}`

  const [chats, setChats] = useState([{ id: 1, title: "New Chat", messages: [] }])
  const [activeChatId, setActiveChatId] = useState(1)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  // Load from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      const parsed = JSON.parse(saved)
      setChats(parsed.chats)
      setActiveChatId(parsed.activeChatId)
    }
    setReady(true)
  }, [])

  // Save to localStorage whenever chats change
  useEffect(() => {
    if (!ready) return
    localStorage.setItem(storageKey, JSON.stringify({ chats, activeChatId }))
  }, [chats, activeChatId, ready])

  const activeChat = chats.find((c) => c.id === activeChatId)

  function startNewChat() {
    const newChat = { id: Date.now(), title: "New Chat", messages: [] }
    setChats((prev) => [newChat, ...prev])
    setActiveChatId(newChat.id)
  }

  async function sendMessage(text) {
    const userMessage = { role: "user", content: text, timestamp: Date.now() }
    const updatedMessages = [...activeChat.messages, userMessage]

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId ? { ...c, messages: updatedMessages, title: text.slice(0, 30) } : c
      )
    )

    setLoading(true)

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages, systemPrompt: dept.prompt }),
    })

    const data = await res.json()
    const assistantMessage = { role: "assistant", content: data.reply, timestamp: Date.now() }

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId ? { ...c, messages: [...updatedMessages, assistantMessage] } : c
      )
    )

    setLoading(false)
  }

  if (!ready) return null

  return (
    <div className="flex h-screen" style={{ borderTop: `4px solid ${dept.color}` }}>
      <Sidebar
        dept={dept}
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={startNewChat}
      />
      <div className="flex flex-col flex-1">
        <ChatMessages messages={activeChat.messages} dept={dept} loading={loading} />
        <ChatInput onSend={sendMessage} loading={loading} dept={dept} />
      </div>
    </div>
  )
}