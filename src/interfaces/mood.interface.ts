export interface Mood {
    id: string;
    userId: string;
    mood: number; // 1-5 scale
    note?: string;
    createdAt: string;
}

export interface MoodEntry {
    id: string;
    mood: number;
    note?: string;
    createdAt: string;
}

export interface SaveMoodRequest {
    id: string; // userId
    mood: number;
    note?: string;
}

export interface MoodHistoryResponse {
    moods: Mood[];
}
