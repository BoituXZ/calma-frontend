export type AppointmentStatus = 'SCHEDULED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

export interface Appointment {
    id: string;
    userId: string;
    therapistId: string;
    scheduledAt: string;
    duration: number; // in minutes
    status: AppointmentStatus;
    reason?: string;
    notes?: string;
    meetingLink?: string;
    location?: string;
    createdAt: string;
    updatedAt?: string;
    therapist?: {
        id: string;
        name: string;
        email: string;
    };
}

export interface CreateAppointmentRequest {
    therapistId: string;
    scheduledAt: string;
    duration: number;
    reason?: string;
    notes?: string;
    meetingLink?: string;
    location?: string;
}

export interface UpdateAppointmentRequest {
    scheduledAt?: string;
    duration?: number;
    status?: AppointmentStatus;
    reason?: string;
    notes?: string;
    meetingLink?: string;
    location?: string;
}
