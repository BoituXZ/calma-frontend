import type { UserProfile, UpdateUserProfileRequest } from '../interfaces/user.interface';

const API_BASE_URL =
    import.meta.env?.VITE_API_URL || process.env?.REACT_APP_API_URL || "/api";

export async function getUserProfile(): Promise<UserProfile> {
    try {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch user profile");
        }

        return response.json();
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to fetch user profile"
        );
    }
}

export async function updateUserProfile(
    request: UpdateUserProfileRequest
): Promise<UserProfile> {
    try {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update user profile");
        }

        return response.json();
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to update user profile"
        );
    }
}

export async function deleteUserAccount(): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/user`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete account");
        }

        return response.json();
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to delete account"
        );
    }
}
