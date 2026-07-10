"use client"
import { motion } from "framer-motion"

import { useEffect, useRef } from "react"

export default function ChatMessages({ messages, dept, loading }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  function formatTime(timestamp) {
    if (!timestamp) return ""
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50">

      {/* Empty state */}
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <span className="text-6xl mb-4">{dept.icon}</span>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {dept.name} Assistant
          </h3>
          <p className="text-gray-400 text-sm">
            Ask me anything about {dept.name.toLowerCase()}
          </p>
        </div>
      )}

      {/* Messages */}
      {messages.map((msg, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`flex mb-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
  >
          {msg.role === "assistant" && (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0"
              style={{ backgroundColor: dept.lightColor }}
            >
              {dept.icon}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <div
  className={`max-w-xl px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "text-white" : "text-gray-800 bg-white"}`}
  style={{
  backgroundColor: msg.role === "user" ? dept.color : "#f3f4f6",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
}}
>
  {msg.content}
</div>
            <p className={`text-xs text-gray-400 ${msg.role === "user" ? "text-right" : "text-left"}`}>
              {formatTime(msg.timestamp)}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Loading indicator */}
      {loading && (
        <div className="flex mb-4 justify-start">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3"
            style={{ backgroundColor: dept.lightColor }}
          >
            {dept.icon}
          </div>
          <div className="px-4 py-3 rounded-2xl bg-white shadow-sm flex items-center gap-1">
            <span className="w-2 h-2 rounded-full animate-bounce bg-gray-400" style={{ animationDelay: "0ms" }}></span>
            <span className="w-2 h-2 rounded-full animate-bounce bg-gray-400" style={{ animationDelay: "150ms" }}></span>
            <span className="w-2 h-2 rounded-full animate-bounce bg-gray-400" style={{ animationDelay: "300ms" }}></span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}