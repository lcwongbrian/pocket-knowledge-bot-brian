"use client";
export default function ChatMessageArea({ messages, loading }) {
    return (
        <div>
            {messages.map((m, idx) => (
                <div
                    key={idx}
                    className={`mb-2 text-sm ${
                        m.role === "user" ? "text-right" : "text-left"
                    }`}
                >
                    <span
                        className={`inline-block px-2 py-1 rounded ${
                            m.role === "user" ? "bg-blue-100" : "bg-gray-100"
                        }`}
                    >
                        {m.text}
                    </span>
                </div>
            ))}
            {loading && (
                <div className="text-center text-gray-400 text-xs">
                    Bot is typing...
                </div>
            )}
        </div>
    );
}