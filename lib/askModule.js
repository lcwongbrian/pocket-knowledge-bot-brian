export async function askLLM(input, facts) {
    try {
        const res = await fetch("/api/question", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: input, facts }),
        });
        return await res.json();
    } catch (err) {
        throw err;
    }
}
