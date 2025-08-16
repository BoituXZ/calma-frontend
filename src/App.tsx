import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthRedirect } from "./components/AuthRedirect";

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
                    index
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
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