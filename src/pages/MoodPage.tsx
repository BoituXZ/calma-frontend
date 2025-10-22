import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { getMoodHistory } from "../services/moodService";
import { useAuth } from "../hooks/useAuth";
import type { Mood } from "../interfaces/mood.interface";

interface ChartDataPoint {
    day: string;
    mood: number;
    date: Date;
}

const MoodPage = () => {
    const { user } = useAuth();
    const [moodData, setMoodData] = useState<ChartDataPoint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMoodData();
    }, [user]);

    async function fetchMoodData() {
        if (!user?.id) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const moods = await getMoodHistory(user.id);

            // Transform mood data for the chart
            const chartData: ChartDataPoint[] = moods
                .map((mood: Mood) => ({
                    day: new Date(mood.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    }),
                    mood: mood.mood,
                    date: new Date(mood.createdAt),
                }))
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(-30); // Get last 30 entries

            setMoodData(chartData);
        } catch (err) {
            console.error("Failed to fetch mood history:", err);
            setError(err instanceof Error ? err.message : "Failed to load mood history");
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-center">Loading mood history...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-4">
                <p className="text-red-600 text-center">{error}</p>
                <button
                    onClick={fetchMoodData}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (moodData.length === 0) {
        return (
            <div className="mood-page-container flex flex-col gap-6 p-4 bg-background min-h-screen">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Your Mood Journey</h1>
                    <p className="text-muted-foreground">
                        Track your emotional well-being over time
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center p-12 bg-card rounded-lg shadow-sm">
                    <p className="text-muted-foreground text-center mb-4">
                        No mood entries yet. Start tracking your mood from the dashboard!
                    </p>
                    <a
                        href="/app"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                        Go to Dashboard
                    </a>
                </div>
            </div>
        );
    }

    const moods = moodData.map((data) => data.mood);
    const averageMood = (moods.reduce((a, b) => a + b, 0) / moods.length).toFixed(1);
    const highestMood = Math.max(...moods);
    const lowestMood = Math.min(...moods);

    return (
        <div className="mood-page-container flex flex-col gap-6 p-4 bg-background min-h-screen">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Your Mood Journey</h1>
                <p className="text-muted-foreground">
                    {moodData.length} {moodData.length === 1 ? 'entry' : 'entries'} recorded
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-card p-6 rounded-lg shadow-sm text-center">
                    <h3 className="text-lg font-semibold text-muted-foreground">
                        Average Mood
                    </h3>
                    <p className="text-4xl font-bold text-primary">
                        {averageMood}
                    </p>
                    <p className="text-xs text-muted-foreground">out of 5</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm text-center">
                    <h3 className="text-lg font-semibold text-muted-foreground">
                        Highest Mood
                    </h3>
                    <p className="text-4xl font-bold text-secondary">
                        {highestMood}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Feeling great!
                    </p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm text-center">
                    <h3 className="text-lg font-semibold text-muted-foreground">
                        Lowest Mood
                    </h3>
                    <p className="text-4xl font-bold text-destructive">
                        {lowestMood}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Room for improvement
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="chart-container w-full h-96 bg-card p-4 rounded-lg shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={moodData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--color-border)"
                        />
                        <XAxis
                            dataKey="day"
                            stroke="var(--color-muted-foreground)"
                        />
                        <YAxis
                            stroke="var(--color-muted-foreground)"
                            domain={[1, 5]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--color-card)",
                                border: "1px solid var(--color-border)",
                                color: "var(--color-card-foreground)",
                            }}
                        />
                        <Legend
                            wrapperStyle={{ color: "var(--color-foreground)" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="mood"
                            stroke="var(--color-primary)"
                            activeDot={{ r: 8 }}
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Insights/Tips */}
            <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">
                    Mood Insights & Tips
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">▶</span>
                        <span>
                            Notice any patterns? Look for mood changes on
                            weekends vs. weekdays.
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">▶</span>
                        <span>
                            Celebrate your high points! What were you doing on
                            your best days?
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">▶</span>
                        <span>
                            On lower days, be kind to yourself. Consider a short
                            walk or talking to a friend.
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MoodPage;
