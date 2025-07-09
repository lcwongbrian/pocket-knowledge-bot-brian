"use client";
import { useState, useEffect } from "react";
import { loadFacts, saveFacts } from "../lib/factsStore";

export default function FactsEditor({ onUpdate }) {
    const [facts, setFacts] = useState([]);
    const [error, setError] = useState("");
    const [isEdit, setIsEdit] = useState(false);

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
        setIsEdit(true);
        setFacts([...facts, ""]);
        setError("");
    };

    const handleDeleteFact = (index) => {
        const updated = facts.filter((_, i) => i !== index);
        setFacts(updated);
        setError("");
    };

    const handleEditFact = () => {
        setIsEdit(true);
        setError("");
    };

    const handleSave = () => {
        setIsEdit(false);
        saveFacts(facts);
        onUpdate(facts);
    };

    return (
        <div className="bg-gray-50 border rounded p-4 mb-4">
            <h2 className="font-bold mb-2">
                Facts Editor (Support up to 10 Facts)
            </h2>
            {facts.map((fact, idx) => (
                <div key={idx} className="flex mb-2">
                    <input
                        className="border rounded flex-1 px-2 py-1 mr-2 text-sm disabled:text-gray-500"
                        value={fact}
                        onChange={(e) => handleFactChange(idx, e.target.value)}
                        placeholder={`Fact ${idx + 1}`}
                        disabled={!isEdit}
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
                className={`rounded text-sm px-3 py-1 mr-2 ${
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
                className={`rounded text-sm px-3 py-1 mr-2 ${
                    isEdit
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-red-500 text-white"
                }`}
                onClick={handleEditFact}
                disabled={isEdit}
            >
                Edit
            </button>
            <button
                className={`rounded text-sm px-3 py-1 mr-2 ${
                    isEdit
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 cursor-not-allowed"
                }`}
                onClick={handleSave}
                disabled={!isEdit}
            >
                Save
            </button>
            {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
    );
}
