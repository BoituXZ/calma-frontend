const LoadingDots = () => {
    return (
        <div className="chatbotMessage p-2 flex gap-2 max-w-70 justify-self-start">
            <div className="messageProfile bg-muted flex-auto max-w-9 h-9 flex items-center justify-center rounded-full">
                <h3 className="font-semibold">C</h3>
            </div>
            <div className="message flex-1/2 bg-muted p-2 rounded-lg">
                <div className="flex gap-1 items-center py-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingDots;
