"use client"

import { useState } from "react"

export default function ChatInput({ onSend, loading, dept }) {
  const [text, setText] = useState("")

  function handleSend() {
    if (!text.trim() || loading) return
    onSend(text.trim())
    setText("")
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="px-6 py-4 bg-white border-t border-gray-200">
      <div className="flex items-end gap-3 max-w-4xl mx-auto">
        <textarea
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${dept.name} Assistant...`}
          disabled={loading}
          className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 transition-all"
          style={{ focusRingColor: dept.color }}
        />
        <button
          onClick={handleSend}
          disabled={loading || !text.trim()}
          className="px-5 py-3 rounded-xl text-sm font-medium text-white transition-opacity disabled:opacity-40"
          style={{ backgroundColor: dept.color }}
        >
          Send
        </button>
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  )
}