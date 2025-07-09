import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function POST(req, res) {
    try {
        const { question, facts } = req.body;

        if (!question || !facts) {
            res.status(400).json({ error: "Invalid input" });
        }

        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful assistant. Answer ONLY using the provided user facts. Always cite the relevant fact(s). Always keep your answers concise. Limit to 1-2 sentences.`,
                },
                {
                    role: "user",
                    content: `Facts:\n${facts.join("\n")}\n\nQuestion: ${question}`,
                },
            ],
            max_tokens: 300
        });

        res.status(200).json({
            answer: completion.choices[0].message.content,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal error" });
    }
}
