import { ArrowLeft, Heart, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { sendMessage } from "../services/chatService";
import type { ChatMessage as ChatMessageType } from "../services/chatService";
import ChatMessage from "../components/ui/ChatMessage";
import LoadingDots from "../components/ui/LoadingDots";

const ChatPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | undefined>(undefined);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const dashboardNavigation = (): void => {
        navigate("/app");
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
        <div className="h-screen bg-background flex flex-col pb-16">
            <div className="chatPageHeader flex flex-row gap-4 p-2 px-4 bg-primary-foreground border-b border-b-border">
                <button onClick={dashboardNavigation}>
                    <ArrowLeft className="w-5" />
                </button>
                <div className="header">
                    <h3 className="text-foreground font-semibold text-md">
                        Support Chat
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        A safe space to share your thoughts
                    </p>
                </div>
            </div>
            <div className="chatPageBody p-3 flex-1 flex flex-col overflow-hidden">
                <div className="chatContainer max-w-full bg-card rounded-lg shadow-xs border border-border py-2 flex flex-col h-full">
                    <div className="chatHeader flex flex-row items-center p-2 px-4 flex-shrink-0">
                        <div className="chatbotProfileContainer rounded-full bg-popover p-2">
                            <Heart className="text-primary" />
                        </div>
                        <div className="chatbotName">
                            <h3 className="font-semibold text-xl">Calma</h3>
                        </div>
                    </div>
                    <div className="chatBody flex flex-col p-2 gap-4 flex-1 overflow-y-auto min-h-0">
                        <div className="messages flex flex-col gap-2">
                            {messages.length === 0 && (
                                <div className="chatbotMessage p-2 flex gap-2 max-w-70 justify-self-start">
                                    <div className="messageProfile bg-muted flex-auto max-w-9 h-9 flex items-center justify-center rounded-full">
                                        <h3 className="font-semibold">C</h3>
                                    </div>
                                    <div className="message flex-1/2 bg-muted p-2 rounded-lg">
                                        <p className="text-sm font-normal">
                                            Hello! I'm here to support you. How
                                            are you feeling today?
                                        </p>
                                    </div>
                                </div>
                            )}
                            {messages.map((message) => (
                                <ChatMessage
                                    key={message.id}
                                    message={message}
                                    userName={user?.name}
                                />
                            ))}
                            {isLoading && <LoadingDots />}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <div className="messageInputContainer flex flex-row w-full gap-2 p-2 mt-auto">
                        <input
                            placeholder="Share what's on your mind..."
                            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                        />
                        <button
                            className="h-10 w-10 bg-primary flex justify-center items-center rounded-lg disabled:opacity-50"
                            onClick={handleSendMessage}
                            disabled={isLoading || !inputValue.trim()}
                        >
                            <Send className="text-white font-normal text-sm w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
