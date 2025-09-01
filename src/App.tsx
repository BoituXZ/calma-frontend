import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthRedirect } from "./components/AuthRedirect";
import ChatPage from "./pages/ChatPage";
import MoodPage from "./pages/MoodPage";
import SettingsPage from "./pages/SettingsPage";
import AppLayout from "./layout/AppLayout";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />

                {/* Auth routes - redirect to dashboard if already logged in */}
                <Route
                    path="/onboarding"
                    element={
                        <AuthRedirect>
                            <OnboardingPage />
                        </AuthRedirect>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <AuthRedirect>
                            <LoginPage />
                        </AuthRedirect>
                    }
                />

                {/* Protected routes - require authentication */}
                <Route
                    path="/app"
                    element={
                        <AppLayout/>
                    }
                >
                    <Route
                        
                        index
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/app/chat"
                        index
                        element={
                            <ProtectedRoute>
                                <ChatPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/app/mood"
                        index
                        element={
                            <ProtectedRoute>
                                <MoodPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/app/resources"
                        index
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/app/settings"
                        index
                        element={
                            <ProtectedRoute>
                                <SettingsPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                {/* Catch all route - redirect to landing page */}
                <Route path="*" element={<LandingPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
