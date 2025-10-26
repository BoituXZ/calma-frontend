export interface TherapistChatMessage {
    id: string;
    senderId: string;
    receiverId: string;
    message: string;
    timestamp: string;
    read: boolean;
}

export interface Therapist {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'THERAPIST' | 'ADMIN';
    createdAt?: string;
    specialization?: string;
    bio?: string;
}

export interface Conversation {
    therapist: {
        id: string;
        name: string;
        email: string;
    };
    lastMessage: {
        message: string;
        timestamp: string;
    };
    messageCount: number;
}

export interface SendTherapistMessageRequest {
    therapistId: string;
    message: string;
}

export interface ConversationMessagesResponse {
    messages: TherapistChatMessage[];
}

export interface ConversationsResponse {
    conversations: Conversation[];
}
