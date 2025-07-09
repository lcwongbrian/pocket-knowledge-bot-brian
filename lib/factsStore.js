export function loadFacts() {
    if (typeof window) {
        try {
            return JSON.parse(localStorage.getItem("facts") || "[]");
        } catch {
            return [];
        }
    }
    return [];
}

export function saveFacts(facts) {
    localStorage.setItem("facts", JSON.stringify(facts));
}
