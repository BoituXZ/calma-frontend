import type { ChatMessage } from "../../services/chatService";


interface ChatMessageProps {
    message: ChatMessage;
    userName?: string;
}

const ChatMessage = ({ message, userName = "U" }: ChatMessageProps) => {
    const isBot = message.sender === "BOT";
    const timestamp = new Date(message.timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    if (isBot) {
        return (
            <div className="flex gap-3 max-w-[80%]">
                <div className="flex-shrink-0 w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">C</span>
                </div>
                <div className="flex-1">
                    <div className="bg-muted rounded-lg px-4 py-3">
                        <p className="text-sm leading-relaxed">{message.message}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-2">{timestamp}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
            <div className="flex-shrink-0 w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">{userName?.[0]?.toUpperCase() || "U"}</span>
            </div>
            <div className="flex-1">
                <div className="bg-primary rounded-lg px-4 py-3">
                    <p className="text-primary-foreground text-sm leading-relaxed">{message.message}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 mr-2 text-right">{timestamp}</p>
            </div>
        </div>
    );
};

export default ChatMessage;
