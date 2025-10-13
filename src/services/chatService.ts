const API_BASE_URL =
    import.meta.env?.VITE_API_URL || process.env?.REACT_APP_API_URL || "/api";

export interface ChatMessage {
    id: string;
    message: string;
    sender: "USER" | "BOT";
    timestamp: string;
}

export interface AnalysisResults {
    mood_detected: string;
    confidence: number;
    emotional_intensity: number;
    suggested_resources: string[];
    cultural_elements_detected: string[];
    quality_metrics: {
        empathy_score: number;
        cultural_awareness_score: number;
    };
}

export interface BotMessage extends ChatMessage {
    emotionalTone: string;
    detectedTopics: string[];
    analysisResults: AnalysisResults;
}

export interface ChatSession {
    id: string;
    title: string;
}

export interface SendMessageRequest {
    message: string;
    userId: string;
    sessionId?: string;
}

export interface SendMessageResponse {
    userMessage: ChatMessage;
    botMessage: BotMessage;
    session: ChatSession;
}

export interface HealthCheckResponse {
    status: string;
    ai_service: string;
    timestamp: string;
}

export async function sendMessage(
    request: SendMessageRequest
): Promise<SendMessageResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/message`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to send message");
        }

        return response.json();
    } catch (error) {
        throw new Error("Failed to send message, Try Again");
    }
}

export async function checkChatHealth(): Promise<HealthCheckResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/health`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Health check failed");
        }

        return response.json();
    } catch (error) {
        throw new Error("Failed to check chat service health");
    }
}
