import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, Video, Plus, X, Check, Ban } from "lucide-react";
import {
    getUserAppointments,
    createAppointment,
    cancelAppointment,
} from "../services/appointmentService";
import { getTherapists } from "../services/therapistChatService";
import type { Appointment, AppointmentStatus, CreateAppointmentRequest } from "../interfaces/appointment.interface";
import type { Therapist } from "../interfaces/therapistChat.interface";

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [therapists, setTherapists] = useState<Therapist[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [bookingForm, setBookingForm] = useState<CreateAppointmentRequest>({
        therapistId: "",
        scheduledAt: "",
        duration: 60,
        reason: "",
        notes: "",
        meetingLink: "",
        location: "",
    });

    const [filterStatus, setFilterStatus] = useState<AppointmentStatus | "ALL">("ALL");

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            setIsLoading(true);
            setError(null);

            const [appointmentsData, therapistsData] = await Promise.all([
                getUserAppointments(),
                getTherapists(),
            ]);

            setAppointments(appointmentsData);
            setTherapists(therapistsData);
        } catch (err) {
            console.error("Failed to fetch appointments:", err);
            setError(err instanceof Error ? err.message : "Failed to load appointments");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCreateAppointment(e: React.FormEvent) {
        e.preventDefault();

        if (!bookingForm.therapistId || !bookingForm.scheduledAt) {
            setError("Please fill in all required fields");
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            await createAppointment(bookingForm);
            await fetchData();

            // Reset form
            setBookingForm({
                therapistId: "",
                scheduledAt: "",
                duration: 60,
                reason: "",
                notes: "",
                meetingLink: "",
                location: "",
            });
            setShowBookingForm(false);
        } catch (err) {
            console.error("Failed to create appointment:", err);
            setError(err instanceof Error ? err.message : "Failed to create appointment");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleCancelAppointment(appointmentId: string) {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this appointment?"
        );

        if (!confirmed) return;

        try {
            await cancelAppointment(appointmentId);
            await fetchData();
        } catch (err) {
            console.error("Failed to cancel appointment:", err);
            setError(err instanceof Error ? err.message : "Failed to cancel appointment");
        }
    }

    function getStatusBadge(status: AppointmentStatus) {
        const styles: Record<AppointmentStatus, string> = {
            SCHEDULED: "bg-blue-100 text-blue-800 border-blue-200",
            CONFIRMED: "bg-green-100 text-green-800 border-green-200",
            CANCELLED: "bg-red-100 text-red-800 border-red-200",
            COMPLETED: "bg-gray-100 text-gray-800 border-gray-200",
            NO_SHOW: "bg-orange-100 text-orange-800 border-orange-200",
        };

        const icons: Record<AppointmentStatus, React.ReactNode> = {
            SCHEDULED: <Clock className="w-3 h-3" />,
            CONFIRMED: <Check className="w-3 h-3" />,
            CANCELLED: <Ban className="w-3 h-3" />,
            COMPLETED: <Check className="w-3 h-3" />,
            NO_SHOW: <X className="w-3 h-3" />,
        };

        return (
            <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
            >
                {icons[status]}
                {status.replace("_", " ")}
            </span>
        );
    }

    const filteredAppointments = appointments.filter(
        (apt) => filterStatus === "ALL" || apt.status === filterStatus
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-center">Loading appointments...</p>
            </div>
        );
    }

    return (
        <div className="appointments-container bg-background text-foreground p-6 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Appointments</h1>
                        <p className="text-muted-foreground">
                            Manage your therapy sessions
                        </p>
                    </div>
                    <button
                        onClick={() => setShowBookingForm(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                        <Plus className="w-4 h-4" />
                        Book Appointment
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                        {error}
                    </div>
                )}

                {/* Booking Form Modal */}
                {showBookingForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-card rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Book New Appointment</h2>
                                <button
                                    onClick={() => setShowBookingForm(false)}
                                    className="p-2 hover:bg-accent rounded-full"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateAppointment} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Select Therapist *
                                    </label>
                                    <select
                                        value={bookingForm.therapistId}
                                        onChange={(e) =>
                                            setBookingForm({ ...bookingForm, therapistId: e.target.value })
                                        }
                                        required
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="">Choose a therapist</option>
                                        {therapists.map((therapist) => (
                                            <option key={therapist.id} value={therapist.id}>
                                                {therapist.name}
                                                {therapist.specialization && ` - ${therapist.specialization}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Date & Time *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={bookingForm.scheduledAt}
                                        onChange={(e) =>
                                            setBookingForm({ ...bookingForm, scheduledAt: e.target.value })
                                        }
                                        required
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Duration (minutes) *
                                    </label>
                                    <select
                                        value={bookingForm.duration}
                                        onChange={(e) =>
                                            setBookingForm({ ...bookingForm, duration: parseInt(e.target.value) })
                                        }
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value={30}>30 minutes</option>
                                        <option value={45}>45 minutes</option>
                                        <option value={60}>60 minutes</option>
                                        <option value={90}>90 minutes</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Reason for Visit
                                    </label>
                                    <input
                                        type="text"
                                        value={bookingForm.reason}
                                        onChange={(e) =>
                                            setBookingForm({ ...bookingForm, reason: e.target.value })
                                        }
                                        placeholder="e.g., Follow-up, Initial consultation"
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Additional Notes
                                    </label>
                                    <textarea
                                        value={bookingForm.notes}
                                        onChange={(e) =>
                                            setBookingForm({ ...bookingForm, notes: e.target.value })
                                        }
                                        rows={3}
                                        placeholder="Any additional information..."
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Meeting Link (for online sessions)
                                    </label>
                                    <input
                                        type="url"
                                        value={bookingForm.meetingLink}
                                        onChange={(e) =>
                                            setBookingForm({ ...bookingForm, meetingLink: e.target.value })
                                        }
                                        placeholder="https://..."
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Location (for in-person sessions)
                                    </label>
                                    <input
                                        type="text"
                                        value={bookingForm.location}
                                        onChange={(e) =>
                                            setBookingForm({ ...bookingForm, location: e.target.value })
                                        }
                                        placeholder="Office address..."
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Booking..." : "Book Appointment"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowBookingForm(false)}
                                        disabled={isSubmitting}
                                        className="px-4 py-2 border border-input rounded-md hover:bg-accent disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={() => setFilterStatus("ALL")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filterStatus === "ALL"
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border hover:border-primary"
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilterStatus("SCHEDULED")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filterStatus === "SCHEDULED"
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border hover:border-primary"
                        }`}
                    >
                        Scheduled
                    </button>
                    <button
                        onClick={() => setFilterStatus("CONFIRMED")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filterStatus === "CONFIRMED"
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border hover:border-primary"
                        }`}
                    >
                        Confirmed
                    </button>
                    <button
                        onClick={() => setFilterStatus("COMPLETED")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filterStatus === "COMPLETED"
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border hover:border-primary"
                        }`}
                    >
                        Completed
                    </button>
                </div>

                {/* Appointments List */}
                {filteredAppointments.length === 0 ? (
                    <div className="text-center py-12 bg-card rounded-lg border border-border">
                        <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">
                            {filterStatus === "ALL"
                                ? "No appointments yet. Book your first session!"
                                : `No ${filterStatus.toLowerCase()} appointments.`}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredAppointments.map((appointment) => {
                            const appointmentDate = new Date(appointment.scheduledAt);
                            const therapist = therapists.find((t) => t.id === appointment.therapistId);

                            return (
                                <div
                                    key={appointment.id}
                                    className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-semibold">
                                                    {therapist?.name || appointment.therapist?.name || "Therapist"}
                                                </h3>
                                                {getStatusBadge(appointment.status)}
                                            </div>

                                            <div className="space-y-2 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <CalendarIcon className="w-4 h-4" />
                                                    <span>
                                                        {appointmentDate.toLocaleDateString("en-US", {
                                                            weekday: "long",
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    <span>
                                                        {appointmentDate.toLocaleTimeString("en-US", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}{" "}
                                                        ({appointment.duration} minutes)
                                                    </span>
                                                </div>
                                                {appointment.meetingLink && (
                                                    <div className="flex items-center gap-2">
                                                        <Video className="w-4 h-4" />
                                                        <a
                                                            href={appointment.meetingLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-primary hover:underline"
                                                        >
                                                            Join Online Session
                                                        </a>
                                                    </div>
                                                )}
                                                {appointment.location && (
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{appointment.location}</span>
                                                    </div>
                                                )}
                                                {appointment.reason && (
                                                    <p className="mt-2">
                                                        <strong>Reason:</strong> {appointment.reason}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {(appointment.status === "SCHEDULED" ||
                                            appointment.status === "CONFIRMED") && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleCancelAppointment(appointment.id)}
                                                    className="px-4 py-2 border border-destructive text-destructive rounded-md hover:bg-destructive/10 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentsPage;
