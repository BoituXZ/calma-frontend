import { Bot, UserRound, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatSelectorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background p-6 pb-24">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center p-4">
                    <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <MessageCircle className="text-primary h-8 w-8" />
                    </div>
                    <h1 className="text-2xl font-semibold mb-2">
                        Start a Conversation
                    </h1>
                    <p className="text-muted-foreground">
                        Choose who you'd like to talk to
                    </p>
                </div>

                {/* Chat Options */}
                <div className="space-y-4">
                    {/* AI Chat Option */}
                    <div
                        onClick={() => navigate("/app/chat/ai")}
                        className="bg-card border border-primary/20 rounded-lg p-6 shadow-sm cursor-pointer hover:border-primary/40 transition-colors"
                    >
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                <Bot className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold mb-2">
                                    AI Chat Assistant
                                </h2>
                                <p className="text-muted-foreground text-sm mb-3">
                                    Get instant support from our AI-powered mental health assistant.
                                    Available 24/7 for emotional support, mood tracking insights, and coping strategies.
                                </p>
                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 shadow-sm">
                                    Start AI Chat
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Therapist Chat Option */}
                    <div
                        onClick={() => navigate("/app/therapists")}
                        className="bg-card border border-secondary/20 rounded-lg p-6 shadow-sm cursor-pointer hover:border-secondary/40 transition-colors"
                    >
                        <div className="flex items-start gap-4">
                            <div className="bg-secondary/10 p-3 rounded-full flex-shrink-0">
                                <UserRound className="w-6 h-6 text-secondary" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold mb-2">
                                    Talk to a Therapist
                                </h2>
                                <p className="text-muted-foreground text-sm mb-3">
                                    Connect with licensed mental health professionals for personalized care.
                                    Get expert guidance tailored to your cultural background and personal needs.
                                </p>
                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 h-9 px-4 py-2 shadow-sm">
                                    Browse Therapists
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-card border border-primary/20 rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-card-foreground">Not sure which to choose?</span> Start with our AI assistant
                        for immediate support, and connect with a therapist when you're ready for professional care.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatSelectorPage;
