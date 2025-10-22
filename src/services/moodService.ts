import type { Mood, SaveMoodRequest } from '../interfaces/mood.interface';

const API_BASE_URL =
    import.meta.env?.VITE_API_URL || process.env?.REACT_APP_API_URL || "/api";

export async function saveMood(userId: string, moodValue: number, note?: string): Promise<Mood> {
    try {
        const requestBody: SaveMoodRequest = {
            id: userId,
            mood: moodValue,
            note
        };

        const response = await fetch(`${API_BASE_URL}/mood/moods`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to save mood");
        }

        return response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to save mood, Try Again");
    }
}

export async function getMoodHistory(userId: string): Promise<Mood[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/mood/moods?userId=${userId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to get mood history");
        }

        const data = await response.json();
        return data.moods || [];
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to get mood history");
    }
}
