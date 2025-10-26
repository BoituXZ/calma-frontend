import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthRedirect } from "./components/AuthRedirect";
import ChatPage from "./pages/ChatPage";
import ChatSelectorPage from "./pages/ChatSelectorPage";
import MoodPage from "./pages/MoodPage";
import SettingsPage from "./pages/SettingsPage";
import AppLayout from "./layout/AppLayout";
import ResourcesPage from "./pages/ResourcesPage";
import CulturalProfilePage from "./pages/CulturalProfilePage";
import TherapistsPage from "./pages/TherapistsPage";
import TherapistChatPage from "./pages/TherapistChatPage";
import AppointmentsPage from "./pages/AppointmentsPage";

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
                        element={
                            <ProtectedRoute>
                                <ChatSelectorPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/app/chat/ai"
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
                                <ResourcesPage />
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
                    <Route
                        path="/app/therapists"
                        index
                        element={
                            <ProtectedRoute>
                                <TherapistsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/app/appointments"
                        index
                        element={
                            <ProtectedRoute>
                                <AppointmentsPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                {/* Cultural Profile - Outside AppLayout for full screen */}
                <Route
                    path="/app/cultural-profile"
                    element={
                        <ProtectedRoute>
                            <CulturalProfilePage />
                        </ProtectedRoute>
                    }
                />

                {/* Therapist Chat - Outside AppLayout for full screen */}
                <Route
                    path="/app/therapist-chat/:therapistId"
                    element={
                        <ProtectedRoute>
                            <TherapistChatPage />
                        </ProtectedRoute>
                    }
                />

                {/* Catch all route - redirect to landing page */}
                <Route path="*" element={<LandingPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
