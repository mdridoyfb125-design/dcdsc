import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are IdealBot, a funny and sarcastic bot for Ideal College." },
        { role: "user", content: message }
      ]
    });

    const reply = completion.choices?.[0]?.message?.content || "No response from model.";

    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
