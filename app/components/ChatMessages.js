"use client"
import { motion } from "framer-motion"

export default function ChatMessages({ messages, dept, loading }) {

  function formatTime(timestamp) {
    if (!timestamp) return ""
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", backgroundColor: "#f9fafb" }}>

      {messages.length === 0 && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center" }}>
          <span style={{ fontSize: "3.75rem", marginBottom: "1rem" }}>{dept.icon}</span>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#374151", marginBottom: "0.5rem" }}>{dept.name} Assistant</h3>
          <p style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>Ask me anything about {dept.name.toLowerCase()}</p>
        </div>
      )}

      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: "1rem" }}
        >
          {msg.role === "assistant" && (
            <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", marginRight: "0.75rem", flexShrink: 0, backgroundColor: dept.lightColor }}>
              {dept.icon}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <div style={{
              backgroundColor: msg.role === "user" ? dept.color : "#e5e7eb",
              color: msg.role === "user" ? "#ffffff" : "#111827",
              maxWidth: "36rem",
              padding: "0.75rem 1rem",
              borderRadius: "1rem",
              fontSize: "0.875rem",
              lineHeight: "1.625",
              wordBreak: "break-word"
            }}>
              {msg.content}
            </div>
            <p style={{ fontSize: "0.75rem", color: "#9CA3AF", textAlign: msg.role === "user" ? "right" : "left", margin: 0 }}>
              {formatTime(msg.timestamp)}
            </p>
          </div>
        </motion.div>
      ))}

      {loading && (
        <div style={{ display: "flex", marginBottom: "1rem" }}>
          <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", marginRight: "0.75rem", backgroundColor: dept.lightColor }}>
            {dept.icon}
          </div>
          <div style={{ padding: "0.75rem 1rem", borderRadius: "1rem", backgroundColor: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <span style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", backgroundColor: "#9CA3AF", display: "inline-block" }}></span>
            <span style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", backgroundColor: "#9CA3AF", display: "inline-block" }}></span>
            <span style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", backgroundColor: "#9CA3AF", display: "inline-block" }}></span>
          </div>
        </div>
      )}

    </div>
  )
}