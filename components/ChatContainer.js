"use client";
import { useState } from "react";
import ChatMessageArea from "./ChatMessageArea";

export default function ChatContainer({ facts, onSend, messages, loading }) {
    const [input, setInput] = useState("");

    return (
        <div className="fixed bottom-16 right-4 w-80 bg-white rounded-lg shadow-lg border">
            <div className="flex flex-col h-96">
                <div className="flex-1 overflow-y-auto p-2">
                    <ChatMessageArea messages={messages} loading={loading} />
                </div>
                <div className="p-2 border-t flex">
                    <input
                        className="flex-1 border rounded px-2 py-1 text-sm"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask something..."
                    />
                    <button
                        className="ml-2 bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        onClick={() => {
                            if (input.trim() !== "") onSend(input);
                            setInput("");
                        }}
                        disabled={loading}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
