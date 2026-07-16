import "./globals.css"

export const metadata = {
  title: "AI Chatbot Portal",
  description: "Multi-department AI assistant portal",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ height: "100%", margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}