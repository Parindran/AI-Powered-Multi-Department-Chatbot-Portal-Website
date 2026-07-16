import { departments } from "../../lib/departments"
import { notFound } from "next/navigation"
import ChatWindow from "../../components/ChatWindow"

export default async function ChatPage({ params }) {
  const { id } = await params
  const dept = departments.find((d) => d.id === id)

  if (!dept) return notFound()

  return <ChatWindow dept={dept} />
}