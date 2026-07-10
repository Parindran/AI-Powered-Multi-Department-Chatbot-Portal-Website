import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request) {
  try {
    const { messages, systemPrompt } = await request.json()

    const cleanedMessages = messages.map(({ role, content }) => ({ role, content }))

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        ...cleanedMessages,
      ],
      max_tokens: 1024,
    })

    const reply = response.choices[0].message.content
    return Response.json({ reply })
  } catch (error) {
    console.error("API Error:", error.message)
    return Response.json({ error: error.message }, { status: 500 })
  }
}