import { useAuth } from "../hooks/useAuth";
import { User, Bell, Palette, LogOut, Save, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile, deleteUserAccount } from "../services/userProfileService";
import { getCulturalProfile } from "../services/culturalProfileService";
import type { UserProfile } from "../interfaces/user.interface";
import type { CulturalProfile } from "../interfaces/culturalProfile.interface";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
    const { logout, refreshUser } = useAuth();
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [culturalProfile, setCulturalProfile] = useState<CulturalProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    async function fetchUserData() {
        try {
            setIsLoading(true);
            setError(null);

            const [profile, cultural] = await Promise.all([
                getUserProfile(),
                getCulturalProfile().catch(() => null), // Cultural profile is optional
            ]);

            setUserProfile(profile);
            setCulturalProfile(cultural);
            setEditForm({
                name: profile.name,
                email: profile.email,
            });
        } catch (err) {
            console.error("Failed to fetch user data:", err);
            setError(err instanceof Error ? err.message : "Failed to load user data");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSaveProfile() {
        if (!userProfile) return;

        try {
            setIsSaving(true);
            setError(null);
            setSuccessMessage(null);

            const updated = await updateUserProfile({
                name: editForm.name,
                email: editForm.email,
            });

            setUserProfile(updated);
            setIsEditing(false);
            setSuccessMessage("Profile updated successfully!");

            // Refresh auth user state
            await refreshUser();

            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            console.error("Failed to update profile:", err);
            setError(err instanceof Error ? err.message : "Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDeleteAccount() {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );

        if (!confirmed) return;

        try {
            await deleteUserAccount();
            await logout();
        } catch (err) {
            console.error("Failed to delete account:", err);
            setError(err instanceof Error ? err.message : "Failed to delete account");
        }
    }

    function handleCancelEdit() {
        if (userProfile) {
            setEditForm({
                name: userProfile.name,
                email: userProfile.email,
            });
        }
        setIsEditing(false);
        setError(null);
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-center">Loading settings...</p>
            </div>
        );
    }

    return (
        <div className="settings-container bg-background text-foreground p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
                    {successMessage}
                </div>
            )}

            <div className="space-y-10">
                {/* Account Section */}
                <div className="account-section">
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                        <User className="text-primary" />
                        Account Information
                    </h2>
                    <div className="bg-card p-6 rounded-lg shadow-sm space-y-4">
                        {!isEditing ? (
                            <>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Full Name
                                    </label>
                                    <p className="text-lg">{userProfile?.name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Email Address
                                    </label>
                                    <p className="text-lg">{userProfile?.email}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Account Type
                                    </label>
                                    <p className="text-lg capitalize">{userProfile?.role.toLowerCase()}</p>
                                </div>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 px-4 py-2"
                                >
                                    Edit Profile
                                </button>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground block mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground block mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSaveProfile}
                                        disabled={isSaving}
                                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        {isSaving ? "Saving..." : "Save Changes"}
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        disabled={isSaving}
                                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 px-4 py-2 disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Cultural Profile Section */}
                <div className="cultural-profile-section">
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                        <Palette className="text-primary" />
                        Cultural Profile
                    </h2>
                    <div className="bg-card p-6 rounded-lg shadow-sm">
                        {culturalProfile ? (
                            <div className="space-y-3">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Age Group</label>
                                        <p className="text-lg capitalize">{culturalProfile.ageGroup.toLowerCase()}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Location</label>
                                        <p className="text-lg capitalize">{culturalProfile.location.replace("_", " ").toLowerCase()}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Education</label>
                                        <p className="text-lg capitalize">{culturalProfile.educationLevel.toLowerCase()}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Family Structure</label>
                                        <p className="text-lg capitalize">{culturalProfile.familyStructure.replace("_", " ").toLowerCase()}</p>
                                    </div>
                                    {culturalProfile.ethnicBackground && (
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Ethnic Background</label>
                                            <p className="text-lg">{culturalProfile.ethnicBackground}</p>
                                        </div>
                                    )}
                                    {culturalProfile.languagePreference && (
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Language</label>
                                            <p className="text-lg">{culturalProfile.languagePreference}</p>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => navigate('/app/cultural-profile')}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 px-4 py-2 mt-4"
                                >
                                    Update Cultural Profile
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground mb-4">
                                    No cultural profile set up yet. Complete your cultural profile to get personalized support.
                                </p>
                                <button
                                    onClick={() => navigate('/app/cultural-profile')}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                >
                                    Create Cultural Profile
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="notifications-section">
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                        <Bell className="text-primary" />
                        Notifications
                    </h2>
                    <div className="bg-card p-6 rounded-lg shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="push-notifications"
                                className="text-lg"
                            >
                                Push Notifications
                            </label>
                            <button
                                id="push-notifications"
                                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                role="switch"
                                aria-checked="false"
                            >
                                <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="email-updates" className="text-lg">
                                Email Updates
                            </label>
                            <button
                                id="email-updates"
                                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                role="switch"
                                aria-checked="false"
                            >
                                <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-5"></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Logout Section */}
                <div className="logout-section">
                    <button
                        onClick={logout}
                        className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
                    >
                        <LogOut />
                        Logout
                    </button>
                </div>

                {/* Danger Zone */}
                <div className="danger-zone border-t border-destructive/20 pt-10">
                    <h2 className="text-xl font-semibold text-destructive mb-4">
                        Danger Zone
                    </h2>
                    <div className="bg-card p-6 rounded-lg shadow-sm border border-destructive/20">
                        <p className="text-muted-foreground mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button
                            onClick={handleDeleteAccount}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
