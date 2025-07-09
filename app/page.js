"use client";
import { useState, useEffect } from "react";
import ChatButton from "../components/ChatButton";
import ChatContainer from "../components/ChatContainer";
import FactsEditor from "../components/FactsEditor";
import { askLLM } from "../lib/askModule";
import { loadFacts } from "../lib/factsStore";

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [facts, setFacts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFacts(loadFacts());
    }, []);

    const handleSend = async (input) => {
        let text = "";
        setMessages((prev) => [...prev, { role: "user", text: input }]);
        setLoading(true);
        try {
            const data = await askLLM(input, facts);
            text = data.answer;
        } catch (err) {
            text = "Error: failed to get response";
        }
        setMessages((prev) => [...prev, { role: "bot", text }]);
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-xl font-bold mb-4">Pocket Knowledge Bot</h1>
            <FactsEditor onUpdate={setFacts} />
            <ChatButton isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <ChatContainer
                    facts={facts}
                    onSend={handleSend}
                    messages={messages}
                    loading={loading}
                />
            )}
        </main>
    );
}
