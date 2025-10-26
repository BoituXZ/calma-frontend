import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Mail, UserCircle, Briefcase } from "lucide-react";
import { getTherapists } from "../services/therapistChatService";
import type { Therapist } from "../interfaces/therapistChat.interface";

const TherapistsPage = () => {
    const navigate = useNavigate();
    const [therapists, setTherapists] = useState<Therapist[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchTherapists();
    }, []);

    async function fetchTherapists() {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getTherapists();
            setTherapists(data);
        } catch (err) {
            console.error("Failed to fetch therapists:", err);
            setError(err instanceof Error ? err.message : "Failed to load therapists");
        } finally {
            setIsLoading(false);
        }
    }

    function handleMessageTherapist(therapistId: string) {
        navigate(`/app/therapist-chat/${therapistId}`);
    }

    const filteredTherapists = therapists.filter((therapist) =>
        searchQuery === "" ||
        therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        therapist.specialization?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-center">Loading therapists...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-4">
                <p className="text-red-600 text-center">{error}</p>
                <button
                    onClick={fetchTherapists}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="therapists-container bg-background text-foreground p-6 min-h-screen">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Find a Therapist</h1>
                <p className="text-muted-foreground">
                    Connect with qualified mental health professionals
                </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8 max-w-lg mx-auto">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by name or specialization..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Results Count */}
            <div className="text-center mb-4">
                <p className="text-muted-foreground">
                    {filteredTherapists.length} {filteredTherapists.length === 1 ? "therapist" : "therapists"} available
                </p>
            </div>

            {/* Therapists Grid */}
            {filteredTherapists.length === 0 ? (
                <div className="text-center p-12">
                    <p className="text-muted-foreground">
                        No therapists found matching your search.
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {filteredTherapists.map((therapist) => (
                        <div
                            key={therapist.id}
                            className="therapist-card bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border"
                        >
                            {/* Profile Picture Placeholder */}
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                                    <UserCircle className="w-12 h-12 text-primary" />
                                </div>
                            </div>

                            {/* Therapist Info */}
                            <div className="text-center mb-4">
                                <h3 className="text-xl font-semibold mb-1">
                                    {therapist.name}
                                </h3>
                                {therapist.specialization && (
                                    <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                                        <Briefcase className="w-4 h-4" />
                                        <p className="text-sm">{therapist.specialization}</p>
                                    </div>
                                )}
                                <p className="text-sm text-muted-foreground">
                                    {therapist.email}
                                </p>
                            </div>

                            {/* Bio */}
                            {therapist.bio && (
                                <p className="text-sm text-muted-foreground mb-4 text-center line-clamp-3">
                                    {therapist.bio}
                                </p>
                            )}

                            {/* Message Button */}
                            <button
                                onClick={() => handleMessageTherapist(therapist.id)}
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                Send Message
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TherapistsPage;
