import type { RegisterUser, LoginUser } from "../interfaces/auth.interface";

const API_BASE_URL =
    import.meta.env?.VITE_API_URL ||
    process.env?.REACT_APP_API_URL ||
    "/api"; // Use proxy in development

export async function registerUser(user: RegisterUser) {
    const { name, emailAddress, password } = user;

    try {
        const email = emailAddress
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Registration failed");
        }

        return response.json();
    } catch (error) {
        throw new Error("Failed to Register User, Try Again");
    }
}

export async function loginUser(user: LoginUser) {
    const { email, password } = user;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
        }

        return response.json();
    } catch (error) {
        throw new Error("Failed to Login User, Try Again");
    }
}

export async function logoutUser() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Logout failed");
        }

        return response.json();
    } catch (error) {
        throw new Error("Failed to Logout User, Try Again");
    }
}

export async function getCurrentUser() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                return null; // User not authenticated
            }
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to get current user");
        }

        return response.json();
    } catch (error) {
        return null; // Assume not authenticated on error
    }
}