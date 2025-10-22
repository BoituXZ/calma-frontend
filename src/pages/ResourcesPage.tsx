import { Search, BookOpen, Film, Mic, Headphones, BookMarked, Bookmark, BookmarkCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { getResources, saveResource, getSavedResources, unsaveResource } from "../services/resourceService";
import type { Resource, ResourceType, SavedResource } from "../interfaces/resource.interface";

const ResourcesPage = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [savedResources, setSavedResources] = useState<SavedResource[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<ResourceType | "ALL">("ALL");
    const [showSavedOnly, setShowSavedOnly] = useState(false);

    useEffect(() => {
        fetchResources();
        fetchSavedResources();
    }, []);

    async function fetchResources() {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getResources();
            setResources(data);
        } catch (err) {
            console.error("Failed to fetch resources:", err);
            setError(err instanceof Error ? err.message : "Failed to load resources");
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchSavedResources() {
        try {
            const data = await getSavedResources();
            setSavedResources(data);
        } catch (err) {
            console.error("Failed to fetch saved resources:", err);
        }
    }

    async function handleSaveResource(resourceId: string) {
        try {
            await saveResource({ resourceId });
            await fetchSavedResources(); // Refresh saved resources
        } catch (err) {
            console.error("Failed to save resource:", err);
            alert("Failed to save resource. Please try again.");
        }
    }

    async function handleUnsaveResource(resourceId: string) {
        try {
            // Find the saved resource entry by resourceId
            const savedResource = savedResources.find(sr => sr.resourceId === resourceId);
            if (savedResource) {
                await unsaveResource(savedResource.id);
                await fetchSavedResources(); // Refresh saved resources
            }
        } catch (err) {
            console.error("Failed to unsave resource:", err);
            alert("Failed to unsave resource. Please try again.");
        }
    }

    function isResourceSaved(resourceId: string): boolean {
        return savedResources.some(sr => sr.resourceId === resourceId);
    }

    function getIconForType(type: ResourceType) {
        switch (type) {
            case "ARTICLE":
                return <BookOpen className="text-primary" />;
            case "VIDEO":
                return <Film className="text-destructive" />;
            case "PODCAST":
                return <Mic className="text-secondary" />;
            case "TOOL":
                return <Headphones className="text-green-600" />;
            case "CULTURAL_STORY":
                return <BookMarked className="text-purple-600" />;
            default:
                return <BookOpen className="text-primary" />;
        }
    }

    // Filter resources
    const filteredResources = resources.filter(resource => {
        const matchesSearch = searchQuery === "" ||
            resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType = selectedType === "ALL" || resource.type === selectedType;

        const matchesSaved = !showSavedOnly || isResourceSaved(resource.id);

        return matchesSearch && matchesType && matchesSaved;
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-center">Loading resources...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-4">
                <p className="text-red-600 text-center">{error}</p>
                <button
                    onClick={fetchResources}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="resources-container bg-background text-foreground p-6 min-h-screen">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Self-Help Resources</h1>
                <p className="text-muted-foreground">
                    Explore articles, videos, and audio to support your well-being.
                </p>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-8 max-w-4xl mx-auto space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search for resources..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 justify-center">
                    <button
                        onClick={() => setSelectedType("ALL")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedType === "ALL"
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border hover:border-primary"
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setSelectedType("ARTICLE")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedType === "ARTICLE"
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border hover:border-primary"
                        }`}
                    >
                        Articles
                    </button>
                    <button
                        onClick={() => setSelectedType("VIDEO")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedType === "VIDEO"
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border hover:border-primary"
                        }`}
                    >
                        Videos
                    </button>
                    <button
                        onClick={() => setSelectedType("PODCAST")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedType === "PODCAST"
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border hover:border-primary"
                        }`}
                    >
                        Podcasts
                    </button>
                    <button
                        onClick={() => setSelectedType("TOOL")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedType === "TOOL"
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border hover:border-primary"
                        }`}
                    >
                        Tools
                    </button>
                    <button
                        onClick={() => setSelectedType("CULTURAL_STORY")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedType === "CULTURAL_STORY"
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border hover:border-primary"
                        }`}
                    >
                        Cultural Stories
                    </button>
                </div>

                {/* Saved Filter Toggle */}
                <div className="flex justify-center">
                    <button
                        onClick={() => setShowSavedOnly(!showSavedOnly)}
                        className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                            showSavedOnly
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border hover:border-primary"
                        }`}
                    >
                        <Bookmark className="w-4 h-4" />
                        {showSavedOnly ? "Show All" : "Saved Only"}
                    </button>
                </div>
            </div>

            {/* Results Count */}
            <div className="text-center mb-4">
                <p className="text-muted-foreground">
                    {filteredResources.length} {filteredResources.length === 1 ? "resource" : "resources"} found
                </p>
            </div>

            {/* Resource Grid */}
            {filteredResources.length === 0 ? (
                <div className="text-center p-12">
                    <p className="text-muted-foreground">
                        {showSavedOnly
                            ? "No saved resources yet. Start saving resources to see them here!"
                            : "No resources found matching your criteria."}
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                        <div
                            key={resource.id}
                            className="resource-card bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative"
                        >
                            {/* Bookmark Button */}
                            <button
                                onClick={() =>
                                    isResourceSaved(resource.id)
                                        ? handleUnsaveResource(resource.id)
                                        : handleSaveResource(resource.id)
                                }
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-primary/10 transition-colors"
                                title={isResourceSaved(resource.id) ? "Unsave" : "Save"}
                            >
                                {isResourceSaved(resource.id) ? (
                                    <BookmarkCheck className="w-5 h-5 text-primary fill-primary" />
                                ) : (
                                    <Bookmark className="w-5 h-5 text-muted-foreground" />
                                )}
                            </button>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    {getIconForType(resource.type)}
                                </div>
                                <div>
                                    <span className="text-xs font-semibold bg-secondary/20 text-secondary-foreground py-1 px-2 rounded-full">
                                        {resource.type.replace("_", " ")}
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                            <p className="text-muted-foreground mb-4">{resource.description}</p>

                            {/* Tags */}
                            {resource.tags && resource.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {resource.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="text-xs bg-primary/10 text-primary py-1 px-2 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Link Button */}
                            <a
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                            >
                                View Resource
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResourcesPage;
