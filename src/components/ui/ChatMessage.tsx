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
            <div className="chatbotMessage p-2 flex gap-2 max-w-70 justify-self-start">
                <div className="messageProfile bg-muted flex-auto max-w-9 h-9 flex items-center justify-center rounded-full">
                    <h3 className="font-semibold">C</h3>
                </div>
                <div className="message flex-1/2 bg-muted p-2 rounded-lg">
                    <p className="text-sm font-normal">{message.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {timestamp}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="userMessage p-2 flex flex-row-reverse gap-2 max-w-70 ml-auto">
            <div className="messageProfile bg-muted flex-auto min-w-9 max-w-9 h-9 flex items-center justify-center rounded-full">
                <h3 className="font-semibold">{userName[0].toUpperCase()}</h3>
            </div>
            <div className="message flex-1/2 bg-primary text-primary-foreground p-2 rounded-lg">
                <p className="text-sm font-normal">{message.message}</p>
                <p className="text-xs opacity-80 mt-1">{timestamp}</p>
            </div>
        </div>
    );
};

export default ChatMessage;
