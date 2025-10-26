import type {
    CulturalProfile,
    CreateCulturalProfileRequest,
    UpdateCulturalProfileRequest
} from '../interfaces/culturalProfile.interface';

const API_BASE_URL =
    import.meta.env?.VITE_API_URL || process.env?.REACT_APP_API_URL || "/api";

export async function createCulturalProfile(
    request: CreateCulturalProfileRequest
): Promise<CulturalProfile> {
    try {
        const response = await fetch(`${API_BASE_URL}/cultural-profile`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create cultural profile");
        }

        return response.json();
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to create cultural profile"
        );
    }
}

export async function getCulturalProfile(): Promise<CulturalProfile> {
    try {
        const response = await fetch(`${API_BASE_URL}/cultural-profile`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch cultural profile");
        }

        return response.json();
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to fetch cultural profile"
        );
    }
}

export async function updateCulturalProfile(
    request: UpdateCulturalProfileRequest
): Promise<CulturalProfile> {
    try {
        const response = await fetch(`${API_BASE_URL}/cultural-profile`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update cultural profile");
        }

        return response.json();
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to update cultural profile"
        );
    }
}
