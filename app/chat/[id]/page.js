import { departments } from "../../lib/departments"
import { notFound } from "next/navigation"
import ChatWindow from "../../components/ChatWindow"

export default async function ChatPage({ params }) {
  const { id } = await params
  const dept = departments.find((d) => d.id === id)

  if (!dept) return notFound()

  return (
    <div className="h-screen flex flex-col">
      {/* Department themed header */}
      <div
        className="px-6 py-4 flex items-center gap-4"
        style={{ backgroundColor: dept.color }}
      >
        <span className="text-3xl">{dept.icon}</span>
        <div>
          <h1 className="text-white font-bold text-lg">{dept.name}</h1>
          <p className="text-white text-xs opacity-75">{dept.description}</p>
        </div>
      </div>

      {/* Chat window below header */}
      <div className="flex-1 overflow-hidden">
        <ChatWindow dept={dept} />
      </div>
    </div>
  )
}