import type {
    TherapistChatMessage,
    Therapist,
    Conversation,
    SendTherapistMessageRequest,
    ConversationMessagesResponse,
    ConversationsResponse,
} from '../interfaces/therapistChat.interface';

const API_BASE_URL =
    import.meta.env?.VITE_API_URL || process.env?.REACT_APP_API_URL || "/api";

export async function sendTherapistMessage(
    request: SendTherapistMessageRequest
): Promise<TherapistChatMessage> {
    try {
        const response = await fetch(`${API_BASE_URL}/therapist-chat`, {
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
        throw new Error(
            error instanceof Error ? error.message : "Failed to send message"
        );
    }
}

export async function getConversationMessages(
    therapistId: string
): Promise<TherapistChatMessage[]> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/therapist-chat/${therapistId}`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch messages");
        }

        const data: ConversationMessagesResponse = await response.json();
        return data.messages || [];
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to fetch messages"
        );
    }
}

export async function getConversations(): Promise<Conversation[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/therapist-chat`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch conversations");
        }

        const data: ConversationsResponse = await response.json();
        return data.conversations || [];
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to fetch conversations"
        );
    }
}

export async function getTherapists(): Promise<Therapist[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/user/therapists`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch therapists");
        }

        const data = await response.json();
        return data.therapists || [];
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to fetch therapists"
        );
    }
}
