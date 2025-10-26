import type {
    Resource,
    SavedResource,
    SaveResourceRequest,
    ResourceFilters
} from '../interfaces/resource.interface';

const API_BASE_URL =
    import.meta.env?.VITE_API_URL || process.env?.REACT_APP_API_URL || "/api";

export async function getResources(filters?: ResourceFilters): Promise<Resource[]> {
    try {
        const params = new URLSearchParams();

        if (filters?.type) {
            params.append('type', filters.type);
        }
        if (filters?.tags) {
            params.append('tags', filters.tags);
        }
        if (filters?.culturalTags) {
            params.append('culturalTags', filters.culturalTags);
        }

        const queryString = params.toString();
        const url = queryString
            ? `${API_BASE_URL}/resources?${queryString}`
            : `${API_BASE_URL}/resources`;

        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch resources");
        }

        const data = await response.json();
        return data.resources || [];
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to fetch resources");
    }
}

export async function getResourceById(id: string): Promise<Resource> {
    try {
        const response = await fetch(`${API_BASE_URL}/resources/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch resource");
        }

        return response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to fetch resource");
    }
}

export async function saveResource(request: SaveResourceRequest): Promise<SavedResource> {
    try {
        const response = await fetch(`${API_BASE_URL}/saved-resource`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to save resource");
        }

        return response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to save resource");
    }
}

export async function getSavedResources(): Promise<SavedResource[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/saved-resource`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch saved resources");
        }

        const data = await response.json();
        return data.savedResources || [];
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to fetch saved resources");
    }
}

export async function unsaveResource(id: string): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/saved-resource/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to unsave resource");
        }

        return response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to unsave resource");
    }
}
