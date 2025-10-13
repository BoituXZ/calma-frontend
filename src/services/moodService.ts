
const API_BASE_URL =
    import.meta.env?.VITE_API_URL || process.env?.REACT_APP_API_URL || "/api"; // Use proxy in development

export type SaveMood = {
    value: number;
};

export async function saveMood(mood: SaveMood) {
    try {
        const response = await fetch(`${API_BASE_URL}/mood`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mood),
        });

        return response.json()
    } catch (error) {
        throw new Error("Failed to saveMood, Try Again");

    }
}
