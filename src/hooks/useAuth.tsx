import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser, logoutUser, getCurrentUser } from '../services/authService';
import type { RegisterUser, LoginUser } from '../interfaces/auth.interface';

interface User {
    id: string;
    name: string;
    email: string;
    [key: string]: any; // Allow for additional user properties
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

interface UseAuthReturn extends AuthState {
    register: (userData: RegisterUser) => Promise<void>;
    login: (userData: LoginUser) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
    refreshUser: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
    const navigate = useNavigate();
    
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        error: null,
    });

    // Clear error function
    const clearError = useCallback(() => {
        setState(prev => ({ ...prev, error: null }));
    }, []);

    // Update loading state
    const setLoading = useCallback((loading: boolean) => {
        setState(prev => ({ ...prev, isLoading: loading }));
    }, []);

    // Set error state
    const setError = useCallback((error: string) => {
        setState(prev => ({ ...prev, error, isLoading: false }));
    }, []);

    // Set authenticated user
    const setUser = useCallback((user: User | null) => {
        setState(prev => ({
            ...prev,
            user,
            isAuthenticated: !!user,
            isLoading: false,
            error: null,
        }));
    }, []);

    // Check if user is authenticated on mount
    const checkAuthStatus = useCallback(async () => {
        try {
            setLoading(true);
            const userData = await getCurrentUser();
            setUser(userData);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [setLoading, setUser]);

    // Refresh user data
    const refreshUser = useCallback(async () => {
        await checkAuthStatus();
    }, [checkAuthStatus]);

    // Register function
    const register = useCallback(async (userData: RegisterUser) => {
        try {
            setLoading(true);
            clearError();
            
            const response = await registerUser(userData);
            
            // Assuming the API returns user data on successful registration
            if (response.user) {
                setUser(response.user);
                navigate('/app'); // Redirect after successful registration
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Registration failed');
        }
    }, [setLoading, clearError, setUser, setError, navigate]);

    // Login function
    const login = useCallback(async (userData: LoginUser) => {
        try {
            setLoading(true);
            clearError();
            
            const response = await loginUser(userData);
            
            // Assuming the API returns user data on successful login
            if (response.user) {
                setUser(response.user);
                navigate('/app'); // Redirect after successful login
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Login failed');
        }
    }, [setLoading, clearError, setUser, setError, navigate]);

    // Logout function
    const logout = useCallback(async () => {
        try {
            setLoading(true);
            await logoutUser();
            setUser(null);
            navigate('/login'); // Redirect to login page after logout
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Logout failed');
        } finally {
            setLoading(false);
        }
    }, [setLoading, setUser, setError, navigate]);

    // Check authentication status on component mount
    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    return {
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        error: state.error,
        register,
        login,
        logout,
        clearError,
        refreshUser,
    };
};