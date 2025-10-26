import type {
    Appointment,
    CreateAppointmentRequest,
    UpdateAppointmentRequest,
} from '../interfaces/appointment.interface';

const API_BASE_URL =
    import.meta.env?.VITE_API_URL || process.env?.REACT_APP_API_URL || "/api";

export async function createAppointment(
    request: CreateAppointmentRequest
): Promise<Appointment> {
    try {
        const response = await fetch(`${API_BASE_URL}/appointments`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create appointment");
        }

        return response.json();
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to create appointment"
        );
    }
}

export async function getUserAppointments(): Promise<Appointment[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/appointments/user`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch appointments");
        }

        const data = await response.json();
        return data.appointments || [];
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to fetch appointments"
        );
    }
}

export async function getAppointmentById(id: string): Promise<Appointment> {
    try {
        const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch appointment");
        }

        return response.json();
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to fetch appointment"
        );
    }
}

export async function updateAppointment(
    id: string,
    request: UpdateAppointmentRequest
): Promise<Appointment> {
    try {
        const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update appointment");
        }

        return response.json();
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to update appointment"
        );
    }
}

export async function cancelAppointment(id: string): Promise<Appointment> {
    try {
        const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to cancel appointment");
        }

        return response.json();
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to cancel appointment"
        );
    }
}
