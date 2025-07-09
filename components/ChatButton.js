"use client";
export default function ChatButton({ isOpen, toggle }) {
    return (
        <button
            onClick={toggle}
            className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
            {isOpen ? "Close Chat" : "Chat"}
        </button>
    );
}