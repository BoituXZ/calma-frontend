import {
    Calendar,
    CalendarCheck,
    Home,
    LibraryBig,
    MessageCircle,
    Settings,
    UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div
            id="navContainer"
            className="flex justify-evenly gap-2 items-center h-15 fixed bottom-0 w-screen bg-white rounded-xl overflow-x-auto"
        >
            <div
                className="Home flex flex-col  justify-evenly items-center"
                onClick={() => navigate("/app")}
            >
                <Home className="h-5 text-black/80" />
                <p className="text-xs text-black/80 font-medium  hover:bg-accent active:text-primary">
                    Home
                </p>
            </div>
            <div
                className="Chat flex flex-col  justify-evenly items-center gap-1"
                onClick={() => navigate("chat")}
            >
                <MessageCircle className="h-5 text-black/80" />
                <p className="text-xs text-black/80 font-medium  hover:bg-accent">
                    Chats
                </p>
            </div>
            <div
                className="Mood flex flex-col  justify-evenly items-center gap-1"
                onClick={() => navigate("mood")}
            >
                <Calendar className="h-5 text-black/80" />
                <p className="text-xs text-black/80 font-medium  hover:bg-accent">
                    Mood
                </p>
            </div>
            <div
                className="Therapists flex flex-col  justify-evenly items-center gap-1"
                onClick={() => navigate("therapists")}
            >
                <UserRound className="h-5 text-black/80" />
                <p className="text-xs text-black/80 font-medium  hover:bg-accent">
                    Therapists
                </p>
            </div>
            <div
                className="Appointments flex flex-col  justify-evenly items-center gap-1"
                onClick={() => navigate("appointments")}
            >
                <CalendarCheck className="h-5 text-black/80" />
                <p className="text-xs text-black/80 font-medium  hover:bg-accent">
                    Appts
                </p>
            </div>
            <div
                className="Resources flex flex-col  justify-evenly items-center gap-1"
                onClick={() => navigate("resources")}
            >
                <LibraryBig className="h-5 text-black/80" />
                <p className="text-xs text-black/80 font-medium  hover:bg-accent">
                    Resources
                </p>
            </div>
            <div
                className="Profile flex flex-col  justify-evenly items-center gap-1 "
                onClick={() => navigate("settings")}
            >
                <Settings className="h-5 text-black/80" />
                <p className="text-xs text-black/80 font-medium  hover:bg-accent">
                    Settings
                </p>
            </div>
        </div>
    );
};

export default Navbar;
