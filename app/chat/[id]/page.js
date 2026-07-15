import { departments } from "../../lib/departments"
import { notFound } from "next/navigation"
import ChatWindow from "../../components/ChatWindow"

export default async function ChatPage({ params }) {
  const { id } = await params
  const dept = departments.find((d) => d.id === id)

  if (!dept) return notFound()

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Department themed header */}
      <div
        style={{
          backgroundColor: dept.color,
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexShrink: 0
        }}
      >
        <span style={{ fontSize: "1.875rem" }}>{dept.icon}</span>
        <div>
          <h1 style={{ color: "white", fontWeight: "bold", fontSize: "1.125rem", margin: 0 }}>{dept.name}</h1>
          <p style={{ color: "white", fontSize: "0.75rem", opacity: 0.75, margin: 0 }}>{dept.description}</p>
        </div>
      </div>

      {/* Chat window below header */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <ChatWindow dept={dept} />
      </div>
    </div>
  )
}