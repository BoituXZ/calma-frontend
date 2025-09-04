import {
    ArrowLeft,
    Contact,
    Contact2,
    Contact2Icon,
    ContactRound,
    Heart,
    MoveLeft,
    Send,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
    const navigate = useNavigate();
    const dashboardNavigation = (): void => {
        navigate("/app");
    };
    return (
        <div className="min-h-screen bg-background">
            <div className="chatPageHeader  flex flex-row gap-4 p-2 px-4 bg-primary-foreground border-b border-b-border">
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
            <div className="chatPageBody p-3 ">
                <div className="chatContainer max-w-full bg-card rounded-lg shadow-xs border border-border py-2">
                    <div className="chatHeader flex flex-row items-center p-2 px-4">
                        <div className="chatbotProfileContainer  rounded-full bg-popover p-2">
                            <Heart className="text-primary" />
                        </div>
                        <div className="chatbotName">
                            <h3 className="font-semibold text-xl">Calma</h3>
                        </div>
                    </div>
                    <div className="chatBody flex flex-col p-2 gap-10">
                      <div className="messages flex flex-col">
                      <div className="chatbotMessage p-2 flex gap-2 max-w-70 justify-self-start">
                        <div className="messageProfile bg-muted flex-auto max-w-9 h-9 flex items-center justify-center rounded-full">
                          <h3 className="font-semibold">C</h3>
                        </div>
                        <div className="message flex-1/2 bg-muted p-2 rounded-lg">
                          <p className="text-sm font-normal">
                            Hello! I'm here to support you. How are you
                            feeling today?
                          </p>
                          <p className="text-xs">01:10</p>
                        </div>
                      </div>
                      <div className="userMessage p-2 flex flex-row-reverse gap-2 max-w-70 ml-auto">
                        <div className="messageProfile bg-muted flex-auto min-w-9 max-w-9 h-9 flex items-center justify-center rounded-full">
                          <h3 className="font-semibold">U</h3>
                        </div>
                        <div className="message flex-1/2 bg-primary text-primary-foreground p-2 rounded-lg">
                          <p className="text-sm font-normal">
                            Hey
                          </p>
                          <p className="text-xs">01:10</p>
                        </div>
                      </div>
                      </div>
                    

                      <div className="messageInputContainer flex flex-row  w-full gap-2 p-2">
                        <input placeholder="Share what's on your mind..." className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1"/>
                        <button className="h-10 w-10 bg-primary flex justify-center items-center rounded-lg">
                          <Send className="text-white font-normal text-sm w-4"/>
                        </button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
