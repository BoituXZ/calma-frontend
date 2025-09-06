
import { useAuth } from "../hooks/useAuth";
import { User, Bell, Palette, LogOut } from "lucide-react";

const SettingsPage = () => {
    const { logout } = useAuth();
    const user = {
        name: "Boitumelo",
        email: "boitumelo@example.com",
    };

    return (
        <div className="settings-container bg-background text-foreground p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            <div className="space-y-10">
                {/* Account Section */}
                <div className="account-section">
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                        <User className="text-primary" />
                        Account Information
                    </h2>
                    <div className="bg-card p-6 rounded-lg shadow-sm space-y-4">
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">
                                Full Name
                            </label>
                            <p className="text-lg">{user.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">
                                Email Address
                            </label>
                            <p className="text-lg">{user.email}</p>
                        </div>
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 px-4 py-2">
                            Edit Profile
                        </button>
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

                {/* Theme Section */}
                <div className="theme-section">
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                        <Palette className="text-primary" />
                        Theme
                    </h2>
                    <div className="bg-card p-6 rounded-lg shadow-sm">
                        <p className="text-lg">
                            Toggle between light and dark mode.
                        </p>
                        {/* Theme toggle would go here */}
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
            </div>
        </div>
    );
};

export default SettingsPage;