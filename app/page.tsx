import Link from "next/link"
import { departments } from "./lib/departments"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xl">
            🤖
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">AI Chatbot Portal</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Select a Department</h2>
          <p className="text-gray-500">Choose a department below to start chatting with your AI assistant</p>
        </div>

        {/* Department Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <Link href={`/chat/${dept.id}`} key={dept.id}>
              <div className="rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-md bg-white border border-gray-100">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4"
                  style={{ backgroundColor: dept.lightColor }}
                >
                  {dept.icon}
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {dept.name}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {dept.description}
                </p>
                <div
                  className="inline-block text-xs font-medium px-3 py-1 rounded-full"
                  style={{ backgroundColor: dept.lightColor, color: dept.color }}
                >
                  Open Chat →
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* Footer */}
      <div className="text-center py-6 text-xs text-gray-400">
        AI Chatbot Portal · Built with Next.js & Groq
      </div>

    </main>
  )
}