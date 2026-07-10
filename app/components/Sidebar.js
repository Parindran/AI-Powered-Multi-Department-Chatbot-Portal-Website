"use client"

export default function Sidebar({ dept, chats, activeChatId, onSelectChat, onNewChat }) {
  return (
    <div className="w-64 h-screen flex flex-col border-r border-gray-200 bg-white">

      {/* Department Header */}
      <div className="p-4 border-b border-gray-200" style={{ backgroundColor: dept.lightColor }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{dept.icon}</span>
          <div>
            <h2 className="font-semibold text-sm text-gray-800">{dept.name}</h2>
            <p className="text-xs text-gray-500">AI Assistant</p>
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full py-2 px-4 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: dept.color }}
        >
          + New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <p className="text-xs text-gray-400 font-medium mb-2 px-1">RECENT CHATS</p>
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="p-3 rounded-lg cursor-pointer mb-1 text-sm truncate transition-colors"
            style={{
              backgroundColor: activeChatId === chat.id ? dept.lightColor : "transparent",
              color: activeChatId === chat.id ? dept.color : "#6B7280",
              fontWeight: activeChatId === chat.id ? "600" : "400"
            }}
          >
            💬 {chat.title}
          </div>
        ))}
      </div>

      {/* Back to Home */}
      <div className="p-3 border-t border-gray-200">
        <a href="/" className="block text-center text-sm text-gray-500 hover:text-gray-800 transition-colors">
          Back to Portal
        </a>
      </div>

    </div>
  )
}