import "./globals.css"

export const metadata = {
  title: "AI Chatbot Portal",
  description: "Multi-department AI assistant portal",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}