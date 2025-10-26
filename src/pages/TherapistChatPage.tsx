import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, UserCircle } from "lucide-react";
import { sendTherapistMessage, getConversationMessages, getTherapists } from "../services/therapistChatService";
import type { TherapistChatMessage, Therapist } from "../interfaces/therapistChat.interface";

const TherapistChatPage = () => {
    const { therapistId } = useParams<{ therapistId: string }>();
    const navigate = useNavigate();
    const [messages, setMessages] = useState<TherapistChatMessage[]>([]);
    const [therapist, setTherapist] = useState<Therapist | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (therapistId) {
            fetchConversationData();
        }
    }, [therapistId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    async function fetchConversationData() {
        if (!therapistId) return;

        try {
            setIsLoading(true);
            setError(null);

            const [messagesData, therapistsData] = await Promise.all([
                getConversationMessages(therapistId),
                getTherapists(),
            ]);

            setMessages(messagesData);
            const foundTherapist = therapistsData.find((t) => t.id === therapistId);
            setTherapist(foundTherapist || null);
        } catch (err) {
            console.error("Failed to fetch conversation data:", err);
            setError(err instanceof Error ? err.message : "Failed to load conversation");
        } finally {
            setIsLoading(false);
        }
    }

    function scrollToBottom() {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    async function handleSendMessage() {
        if (!inputValue.trim() || !therapistId || isSending) return;

        const messageText = inputValue.trim();
        setInputValue("");
        setIsSending(true);

        try {
            const newMessage = await sendTherapistMessage({
                therapistId,
                message: messageText,
            });

            setMessages((prev) => [...prev, newMessage]);
        } catch (err) {
            console.error("Failed to send message:", err);
            setError(err instanceof Error ? err.message : "Failed to send message");
            // Restore input on error
            setInputValue(messageText);
        } finally {
            setIsSending(false);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-center">Loading conversation...</p>
            </div>
        );
    }

    return (
        <div className="h-screen bg-background flex flex-col pb-16">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 bg-card border-b border-border">
                <button
                    onClick={() => navigate("/app/therapists")}
                    className="p-2 hover:bg-accent rounded-full"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <UserCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">
                            {therapist?.name || "Therapist"}
                        </h3>
                        {therapist?.specialization && (
                            <p className="text-sm text-muted-foreground">
                                {therapist.specialization}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    <>
                        {messages.map((message) => {
                            const isCurrentUser = message.senderId !== therapistId;
                            const timestamp = new Date(message.timestamp).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                            });

                            return (
                                <div
                                    key={message.id}
                                    className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-lg p-3 ${
                                            isCurrentUser
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                        }`}
                                    >
                                        <p className="text-sm">{message.message}</p>
                                        <p
                                            className={`text-xs mt-1 ${
                                                isCurrentUser ? "opacity-80" : "text-muted-foreground"
                                            }`}
                                        >
                                            {timestamp}
                                            {!message.read && isCurrentUser && " • Sent"}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input */}
            <div className="p-4 bg-card border-t border-border">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        disabled={isSending}
                        className="flex-1 px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isSending || !inputValue.trim()}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TherapistChatPage;
