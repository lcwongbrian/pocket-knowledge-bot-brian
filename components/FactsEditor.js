"use client";
import { useState, useEffect } from "react";
import { loadFacts, saveFacts } from "../lib/factsStore";

export default function FactsEditor({ onUpdate }) {
    const [facts, setFacts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setFacts(loadFacts());
    }, []);

    const handleFactChange = (index, value) => {
        const updated = [...facts];
        updated[index] = value;
        setFacts(updated);
    };

    const handleAddFact = () => {
        if (facts.length >= 10) {
            setError("You can only have up to 10 facts.");
            return;
        }
        setFacts([...facts, ""]);
        setError("");
    };

    const handleDeleteFact = (index) => {
        const updated = facts.filter((_, i) => i !== index);
        setFacts(updated);
        setError("");
    };

    const handleSave = () => {
        saveFacts(facts);
        onUpdate(facts);
    };

    return (
        <div className="border p-4 rounded mb-4 bg-gray-50">
            <h2 className="font-bold mb-2">Facts Editor (Support up to 10 Facts)</h2>
            {facts.map((fact, idx) => (
                <div key={idx} className="flex mb-2">
                    <input
                        className="flex-1 border rounded px-2 py-1 mr-2 text-sm"
                        value={fact}
                        onChange={(e) => handleFactChange(idx, e.target.value)}
                        placeholder={`Fact ${idx + 1}`}
                    />
                    <button
                        className="bg-red-500 text-white px-2 rounded"
                        onClick={() => handleDeleteFact(idx)}
                    >
                        Delete
                    </button>
                </div>
            ))}
            <button
                className={`px-3 py-1 rounded text-sm mr-2 ${
                    facts.length >= 10
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-500 text-white"
                }`}
                onClick={handleAddFact}
                disabled={facts.length >= 10}
            >
                Add Fact ({facts.length}/10)
            </button>
            <button
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                onClick={handleSave}
            >
                Save
            </button>
            {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
    );
}
