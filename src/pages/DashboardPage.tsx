import { Link, useNavigate } from "react-router-dom";
import {
    Book,
    Calendar,
    Contact,
    HeartPulse,
    MessageCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import { saveMood } from "../services/moodService";

const DashboardPage = () => {
    const timeOfDay = "Afternoon";
    const [isLoading, setIsLoading] = useState(true);
    const [isSavingMood, setIsSavingMood] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [moodError, setMoodError] = useState<string | null>(null);
    const [moodSuccess, setMoodSuccess] = useState(false);
    const navigate = useNavigate();
    const moods = [{id: 1, value: 1}, {id: 2, value: 2}, {id: 3, value: 3}, {id: 4, value: 4}, {id: 5, value: 5}];

    useEffect(() => {
        fetchDashboardData();
    }, []);

    async function fetchDashboardData() {
        try {
            const response = await getCurrentUser();
            console.log(response);
            setUser(response.user);
        } catch (error) {
            console.log("Failed to get user", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function sendMood(moodValue: number) {
        if (!user?.id) {
            setMoodError("User not authenticated");
            return;
        }

        try {
            setIsSavingMood(true);
            setMoodError(null);
            setMoodSuccess(false);

            await saveMood(user.id, moodValue);

            setMoodSuccess(true);
            // Clear success message after 3 seconds
            setTimeout(() => setMoodSuccess(false), 3000);
        } catch (error) {
            console.error("Failed to save mood:", error);
            setMoodError(error instanceof Error ? error.message : "Failed to save mood");
        } finally {
            setIsSavingMood(false);
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-center">Page Loading...</p>
            </div>
        );
    }

    return (
        <div className="dashboardContainer min-h-screen min-w-screen flex flex-col gap-2 bg-background p-4 space-y-6">
            <div className="greeting p-2">
                <h1 className="text-center text-2xl font-semibold">
                    Good {timeOfDay},<br /> {user?.name}
                </h1>

                <p className="text-center text-muted-foreground text-lg">
                    How are you taking care of yourself today?
                </p>
            </div>
            <div className="dashboardContent flex flex-col gap-2 justify-between h-full">
                <div className="sectionOne flex flex-col md:flex-row w-full gap-4">
                    <div className="conversationCard p-6 flex-2 flex flex-col justify-center items-center gap-2 border border-primary/20 bg-card rounded-lg text-card-foreground shadow-sm h-full cursor-pointer hover:border-primary/40 transition-colors">
                        <div className="bg-primary/10 rounded-full p-4">
                            <MessageCircle className="text-primary h-8 w-8" />
                        </div>
                        <p className="font-semibold text-lg">
                            Start Conversation
                        </p>
                        <p className="text-muted-foreground text-sm">
                            Connect with our AI support companion
                        </p>
                        <button
                            onClick={() => navigate('chat')}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full"
                        >
                            Begin Chat
                        </button>
                    </div>
                    <div className="progressCard rounded-lg flex-1 bg-card text-card-foreground shadow-sm h-full">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2 text-center">
                                <HeartPulse />
                                Daily Progress
                            </h3>
                        </div>
                        <div className="p-6 pt-0 flex flex-col items-center space-y-4">
                            <div className="relative inline-flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-primary">
                                            75%
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            Today
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center space-y-1">
                                <p className="text-sm font-medium">
                                    5 day streak!
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    You're doing great
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sectionTwo w-full">
                    <div className="moodCard space-y-4 p-6 border border-primary/20 bg-card rounded-lg font-medium text-card-foreground shadow-sm h-full hover:border-primary/40 transition-colors">
                        <div className="flex">
                            <h3 className="text-xl font-semibold leading-none tracking-tight flex items-center gap-2 text-center">
                                <Calendar />
                                How are you feeling today?
                            </h3>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs text-center">
                                1 = Very Low • 5 = Very Good
                            </p>
                        </div>
                        <div>
                            <div className="moodGroup w-full flex flex-row justify-between items-center p-1">
                                {moods.map((mood) => (
                                    <button
                                        key={mood.id}
                                        className="bg-primary rounded-full text-primary-foreground text-sm font-medium w-8 h-8 shadow-lg border border-primary/70 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                                        onClick={() => sendMood(mood.value)}
                                        disabled={isSavingMood}
                                    >
                                        {mood.value}
                                    </button>
                                ))}
                            </div>
                            {moodSuccess && (
                                <p className="text-green-600 text-sm mt-2 text-center">
                                    Mood logged successfully!
                                </p>
                            )}
                            {moodError && (
                                <p className="text-red-600 text-sm mt-2 text-center">
                                    {moodError}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="sectionThree w-full">
                    <Link to="/app/mood">
                        <div className="moodTrend space-y-4 p-6 border border-primary/20 bg-card rounded-lg font-medium text-card-foreground shadow-sm h-full cursor-pointer hover:border-primary/40 transition-colors">
                            View Mood Chart
                        </div>
                    </Link>
                </div>
                <div className="sectionFour w-full flex flex-row">
                    <div className="quicklinks flex flex-col md:flex-row w-full gap-4">
                        <Link to="/app/therapists" className="flex-1">
                            <div className="bg-card h-20 md:h-full flex p-2 w-full flex-col justify-between items-center rounded-lg text-card-foreground shadow-sm cursor-pointer border border-primary/20 hover:border-primary/40 transition-colors">
                                <Contact className="text-secondary" />
                                <h3 className="font-semibold">Find Therapist</h3>
                                <p className="text-muted-foreground text-xs">
                                    Connect with professionals
                                </p>
                            </div>
                        </Link>
                        <Link to="/app/resources" className="flex-1">
                            <div className="bg-card h-20 md:h-full flex p-2 w-full flex-col justify-between items-center rounded-lg text-card-foreground shadow-sm cursor-pointer border border-primary/20 hover:border-primary/40 transition-colors">
                                <Book className="text-secondary" />
                                <h3 className="font-semibold">Resources</h3>
                                <p className="text-muted-foreground text-xs">
                                    Self-help guides & exercises
                                </p>
                            </div>
                        </Link>
                        <Link to="/app/mood" className="flex-1">
                            <div className="bg-card h-20 md:h-full flex p-2 w-full flex-col justify-between items-center rounded-lg text-card-foreground shadow-sm cursor-pointer border border-primary/20 hover:border-primary/40 transition-colors">
                                <Calendar className="text-secondary" />
                                <h3 className="font-semibold">Mood History</h3>
                                <p className="text-muted-foreground text-xs">
                                    View Detailed Patterns
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
