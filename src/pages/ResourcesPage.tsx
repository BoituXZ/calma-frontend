
import { Search, BookOpen, Film, Mic } from "lucide-react";

const placeholderResources = [
    {
        title: "Understanding Anxiety",
        description: "A comprehensive guide to understanding and coping with anxiety.",
        category: "Article",
        icon: <BookOpen className="text-primary" />,
    },
    {
        title: "Mindfulness Meditation",
        description: "A 10-minute guided meditation to help you find calm.",
        category: "Audio",
        icon: <Mic className="text-secondary" />,
    },
    {
        title: "The Power of Positive Thinking",
        description: "Learn how to change your mindset for a happier life.",
        category: "Video",
        icon: <Film className="text-destructive" />,
    },
    {
        title: "Breathing Exercises for Stress",
        description: "Simple breathing techniques to calm your nervous system.",
        category: "Article",
        icon: <BookOpen className="text-primary" />,
    },
    {
        title: "Sleep Hygiene",
        description: "Tips for improving your sleep quality and habits.",
        category: "Article",
        icon: <BookOpen className="text-primary" />,
    },
    {
        title: "Building Resilience",
        description: "A video series on developing mental and emotional strength.",
        category: "Video",
        icon: <Film className="text-destructive" />,
    },
];

const ResourcesPage = () => {
    return (
        <div className="resources-container bg-background text-foreground p-6 min-h-screen">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Self-Help Resources</h1>
                <p className="text-muted-foreground">
                    Explore articles, videos, and audio to support your well-being.
                </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8 max-w-lg mx-auto">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search for resources..."
                        className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Resource Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {placeholderResources.map((resource, index) => (
                    <div
                        key={index}
                        className="resource-card bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                {resource.icon}
                            </div>
                            <div>
                                <span className="text-xs font-semibold bg-secondary/20 text-secondary-foreground py-1 px-2 rounded-full">
                                    {resource.category}
                                </span>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            {resource.title}
                        </h3>
                        <p className="text-muted-foreground">
                            {resource.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcesPage;