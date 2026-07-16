"use client"

import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import ChatMessages from "./ChatMessages"
import ChatInput from "./ChatInput"

export default function ChatWindow({ dept }) {
  const storageKey = `chats-${dept.id}`

  const welcomeMessage = {
    role: "assistant",
    content: `Hello! I'm the ${dept.name} Assistant. How can I help you today?`,
    timestamp: Date.now()
  }

  const [chats, setChats] = useState([{ id: 1, title: "New Chat", messages: [welcomeMessage] }])
  const [activeChatId, setActiveChatId] = useState(1)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      const parsed = JSON.parse(saved)
      setChats(parsed.chats)
      setActiveChatId(parsed.activeChatId)
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    localStorage.setItem(storageKey, JSON.stringify({ chats, activeChatId }))
  }, [chats, activeChatId, ready])

  const activeChat = chats.find((c) => c.id === activeChatId)

  function startNewChat() {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [welcomeMessage]
    }
    setChats((prev) => [newChat, ...prev])
    setActiveChatId(newChat.id)
  }

  async function sendMessage(text) {
    const userMessage = { role: "user", content: text, timestamp: Date.now() }
    let updatedMessages = []

    setChats((prev) => {
      const current = prev.find((c) => c.id === activeChatId)
      updatedMessages = [...current.messages, userMessage]
      return prev.map((c) =>
        c.id === activeChatId
          ? { ...c, messages: updatedMessages, title: text.slice(0, 30) }
          : c
      )
    })

    setLoading(true)

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...updatedMessages], systemPrompt: dept.prompt }),
    })

    const data = await res.json()
    const assistantMessage = { role: "assistant", content: data.reply, timestamp: Date.now() }

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, messages: [...updatedMessages, assistantMessage] }
          : c
      )
    )

    setLoading(false)
  }

  if (!ready) return null

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ backgroundColor: dept.color, padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
        <span style={{ fontSize: "1.875rem" }}>{dept.icon}</span>
        <div>
          <h1 style={{ color: "white", fontWeight: "bold", fontSize: "1.125rem", margin: 0 }}>{dept.name}</h1>
          <p style={{ color: "white", fontSize: "0.75rem", opacity: 0.75, margin: 0 }}>{dept.description}</p>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar dept={dept} chats={chats} activeChatId={activeChatId} onSelectChat={setActiveChatId} onNewChat={startNewChat} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
          <ChatMessages messages={activeChat.messages} dept={dept} loading={loading} />
          <ChatInput onSend={sendMessage} loading={loading} dept={dept} />
        </div>
      </div>
    </div>
  )
}