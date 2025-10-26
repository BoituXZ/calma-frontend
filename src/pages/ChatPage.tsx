import { ArrowLeft, Heart, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { sendMessage, type ChatMessage as ChatMessageType } from "../services/chatService";
import LoadingDots from "../components/ui/LoadingDots";
import * as ChatMessageModule from "../components/ui/ChatMessage";

const ChatPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | undefined>(undefined);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const dashboardNavigation = (): void => {
        navigate("/app/chat");
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || !user) return;

        const userMessageText = inputValue.trim();
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await sendMessage({
                message: userMessageText,
                userId: user.id,
                sessionId: sessionId,
            });

            // Update messages with both user and bot messages
            setMessages((prev) => [
                ...prev,
                response.userMessage,
                response.botMessage,
            ]);

            // Update session ID if this is the first message
            if (!sessionId) {
                setSessionId(response.session.id);
            }
        } catch (error) {
            console.error("Failed to send message:", error);
            // Optionally show error to user
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="h-screen bg-background flex flex-col">
            {/* Header */}
            <div className="bg-card border-b border-border shadow-sm">
                <div className="flex items-center gap-4 p-4">
                    <button
                        onClick={dashboardNavigation}
                        className="p-2 hover:bg-accent rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-full">
                            <Heart className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">
                                Calma AI Assistant
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                Always here to listen
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Container */}
            <div className="flex-1 overflow-hidden pb-20">
                <div className="h-full p-4">
                    <div className="h-full bg-card rounded-lg border border-border shadow-sm flex flex-col overflow-hidden">
                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                    <div className="bg-primary/10 p-6 rounded-full">
                                        <Heart className="w-12 h-12 text-primary mx-auto" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            Welcome to Calma
                                        </h3>
                                        <p className="text-muted-foreground max-w-md">
                                            I'm here to support you. Share what's on your mind, and let's talk through it together.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {messages.map((message) => {
                                const ChatMsgComp = ChatMessageModule.default;
                                return (
                                    <ChatMsgComp
                                        key={message.id}
                                        message={message}
                                        userName={user?.name}
                                    />
                                );
                            })}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-muted rounded-2xl px-4 py-3">
                                        <LoadingDots />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="border-t border-border bg-muted/30 p-4">
                            <div className="flex gap-3">
                                <input
                                    placeholder="Share what's on your mind..."
                                    className="flex-1 h-12 rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    disabled={isLoading}
                                />
                                <button
                                    className="h-12 w-12 bg-primary hover:bg-primary/90 flex justify-center items-center rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    onClick={handleSendMessage}
                                    disabled={isLoading || !inputValue.trim()}
                                >
                                    <Send className="text-primary-foreground w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
