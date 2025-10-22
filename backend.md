📱 Complete Frontend Implementation Guide for Calma
🔧 Essential Configuration
1. API Base URL
const API_BASE_URL = 'http://localhost:3000/api';
2. Fetch Configuration (CRITICAL!)
// MUST include credentials in ALL API calls
const fetchWithAuth = (url, options = {}) => {
  return fetch(url, {
    ...options,
    credentials: 'include', // ⚠️ REQUIRED for JWT cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};
📋 Pages & Features to Build
1. Authentication Pages
Signup Page (/signup)
Form fields: name, email, password
API: POST /api/auth/signup
On success: Redirect to onboarding/dashboard
Cookie is set automatically
// Example
const signup = async (name, email, password) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  return data; // { message, user: { id, name, email } }
};
Login Page (/login)
Form fields: email, password
API: POST /api/auth/login
On success: Redirect to dashboard
Logout Button
API: POST /api/auth/logout
Clear local state, redirect to login
Protected Route Wrapper
Check auth status: GET /api/auth/me
If unauthorized: Redirect to login
Store user data in context/state
2. Onboarding Flow (for new users)
Cultural Profile Setup (/onboarding)
Multi-step form to collect: Step 1 - Demographics:
Age Group: YOUTH (13-24), ADULT (25-54), ELDER (55+)
Location: URBAN, RURAL, PERI_URBAN
Education: PRIMARY, SECONDARY, TERTIARY, POSTGRADUATE
Step 2 - Cultural Background:
Ethnic Background: Text input (e.g., "Shona", "Ndebele")
Religious Background: Text input
Language Preference: English, Shona, Ndebele
Step 3 - Family & Social:
Family Structure: NUCLEAR, EXTENDED, SINGLE_PARENT, GUARDIAN
Household Size: Number
Has Elders in Home: Yes/No checkbox
Communication Style: direct, indirect, formal
Respect Level: HIGH, MODERATE, RELAXED
Step 4 - Economic:
Economic Status: LOW, MIDDLE, HIGH
Employment Status: Text input
API: POST /api/cultural-profile/{userId}
const createProfile = async (userId, profileData) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/cultural-profile/${userId}`, {
    method: 'POST',
    body: JSON.stringify(profileData),
  });
  return response.json();
};
3. Dashboard / Home Page (/dashboard)
Components to display:
Welcome Section
User name from /api/auth/me
Quick stats (mood streak, chat sessions, upcoming appointments)
Quick Actions
Start AI Chat button → Navigate to /chat
Log Mood button → Open mood modal
Book Appointment → Navigate to /appointments
Browse Resources → Navigate to /resources
Recent Activity Widget
Last 3 chat sessions from GET /api/chat/sessions
Recent mood entries from GET /api/mood/moods?userId={id}
Upcoming Appointments Widget
Get from GET /api/appointments/user
Filter by status: SCHEDULED, CONFIRMED
Sort by scheduledAt date
4. AI Chat Interface (/chat)
Features:
Chat message list (scrollable, auto-scroll to bottom)
Message input box with send button
Session selector dropdown (optional)
Typing indicator while waiting for AI
API Endpoints:
Send message: POST /api/chat/message
Get history: GET /api/chat/history?limit=50
Get sessions: GET /api/chat/sessions
Check AI health: GET /api/chat/health (show status indicator)
Message Display:
// Each message should show:
{
  message: "text content",
  sender: "USER" | "BOT",
  timestamp: "2024-01-01T00:00:00.000Z",
  emotionalTone: "anxious", // for BOT messages
  detectedTopics: ["stress", "work"], // for BOT messages
}
AI Response Features to Show:
Mood detected (color-coded: negative=red, neutral=yellow, positive=green)
Confidence level (0-1 scale)
Suggested resources (clickable links to /resources)
const sendMessage = async (message, sessionId = null) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/chat/message`, {
    method: 'POST',
    body: JSON.stringify({ message, sessionId }),
  });
  return response.json();
  // Returns: { userMessage, botMessage, session }
};
Chat History Page (/chat/history)
List all sessions from GET /api/chat/sessions
Click session → Show full conversation
Display session metadata (title, emotional state, topics)
5. Mood Tracking (/mood)
Daily Mood Logger:
Mood selector: 1-5 scale with labels
1: Very Low 😢
2: Low 😕
3: Neutral 😐
4: Good 🙂
5: Very Good 😄
Optional note field
API: POST /api/mood/moods
const logMood = async (userId, moodValue) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/mood/moods`, {
    method: 'POST',
    body: JSON.stringify({ id: userId, mood: moodValue }),
  });
  return response.json();
};
Mood History / Dashboard:
Get data: GET /api/mood/moods?userId={userId}
Display as calendar heatmap or line chart
Show mood trends over time
6. Resources Library (/resources)
Features:
List all resources with filters
Filter by type (VIDEO, ARTICLE, TOOL, PODCAST, CULTURAL_STORY)
Filter by tags (dropdown/chips)
Search functionality
Save/unsave buttons
View saved resources separately
API Endpoints:
// Get all resources
GET /api/resources

// Filter examples:
GET /api/resources?type=ARTICLE
GET /api/resources?tags=stress,anxiety
GET /api/resources?culturalTags=zimbabwean,shona

// Get single resource
GET /api/resources/{id}

// Save resource
POST /api/saved-resource
Body: { resourceId, recommendationReason, culturalRelevance }

// Get saved resources
GET /api/saved-resource

// Remove saved resource
DELETE /api/saved-resource/{id}
Resource Card Component:
{
  id: "uuid",
  title: "Managing Stress",
  description: "A guide...",
  type: "ARTICLE", // Show icon based on type
  link: "https://...",
  tags: ["stress", "anxiety"], // Display as chips
  culturalTags: ["zimbabwean"],
  targetAudience: ["youth"]
}
7. Therapist Directory & Messaging (/therapists)
Therapist Directory Page:
List all users with role="THERAPIST"
Show therapist profiles (name, specialization if added)
"Message" button → Opens chat
Therapist Chat Interface:
Similar to AI chat but for human therapists
Show conversation history
Real-time or polling for new messages
API Endpoints:
// Send message to therapist
POST /api/therapist-chat/message
Body: { therapistId, message }

// Get conversation with specific therapist
GET /api/therapist-chat/conversation/{therapistId}

// Get all conversations
GET /api/therapist-chat/conversations

// Response format:
{
  conversations: [
    {
      therapist: { id, name, email },
      lastMessage: { message, timestamp },
      messageCount: 15
    }
  ]
}
Conversations List Page:
Show all active conversations
Display last message and timestamp
Click to open full conversation
8. Appointment Scheduling (/appointments)
Appointment Booking Form:
Therapist selector (dropdown)
Date & time picker
Duration selector (30, 60, 90 minutes)
Reason for appointment (textarea)
Optional notes
Meeting type: In-person (location) or Online (link)
API: Create Appointment
POST /api/appointments
Body: {
  therapistId: "uuid",
  scheduledAt: "2024-01-15T10:00:00.000Z",
  duration: 60,
  reason: "Anxiety counseling",
  notes: "First session",
  meetingLink: "https://zoom.us/j/123",
  location: "Office Room 3"
}
Appointments List Page:
// Get user appointments
GET /api/appointments/user

// Display with status badges:
{
  id: "uuid",
  scheduledAt: "2024-01-15T10:00:00.000Z",
  duration: 60,
  status: "SCHEDULED", // Badge color: SCHEDULED=blue, CONFIRMED=green, CANCELLED=red, COMPLETED=gray
  reason: "Anxiety counseling",
  therapistId: "uuid"
}
Appointment Actions:
Update: PUT /api/appointments/{id} (reschedule, change status)
Cancel: DELETE /api/appointments/{id} (sets status to CANCELLED)
Appointment Calendar View:
Display appointments on calendar
Color-code by status
Click to view/edit details
9. User Profile Settings (/profile)
Profile Information:
Display current user data from GET /api/user/profile
Edit form with name, email fields
Update API: PUT /api/user/profile
Cultural Profile:
Display current cultural profile
Edit button → Form with all cultural fields
Update API: PUT /api/cultural-profile/{userId}
Account Actions:
Delete account button (with confirmation)
API: DELETE /api/user/profile
// Get profile
const getProfile = async () => {
  const response = await fetchWithAuth(`${API_BASE_URL}/user/profile`);
  return response.json();
};

// Update profile
const updateProfile = async (updates) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/user/profile`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  return response.json();
};
10. Therapist Portal (if implementing therapist features)
For users with role="THERAPIST": Dashboard:
Today's appointments
Pending messages from clients
Recent conversations
Client Messages Page:
GET /api/therapist-chat/therapist/conversations
Appointment Management:
GET /api/appointments/therapist
Send Message to Client:
POST /api/therapist-chat/therapist/message
Body: { userId, message }
🎨 UI/UX Components to Build
1. Reusable Components:
AuthProvider (Context for user state)
ProtectedRoute (Checks auth before rendering)
LoadingSpinner (for API calls)
ErrorBoundary (for error handling)
Toast/Notification (for success/error messages)
Modal (for quick actions like mood logging)
2. Navigation:
Sidebar/Nav Menu:
Dashboard
AI Chat
Therapists
Appointments
Resources
Mood Tracker
Profile
3. Status Indicators:
AI Service Status: Green (healthy) / Red (unavailable)
Appointment Status Badges: Color-coded by status
Mood Indicator: Emoji or color based on recent mood
📊 Data Models for Frontend State
// User
interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'THERAPIST' | 'ADMIN';
  createdAt: string;
}

// Chat Message
interface ChatMessage {
  id: string;
  message: string;
  sender: 'USER' | 'BOT' | 'THERAPIST';
  timestamp: string;
  emotionalTone?: string;
  detectedTopics?: string[];
}

// Chat Session
interface ChatSession {
  id: string;
  title?: string;
  startTime: string;
  endTime?: string;
  primaryTopic?: string;
  emotionalState?: string;
  followUpNeeded: boolean;
  _count: { chats: number };
}

// Resource
interface Resource {
  id: string;
  title: string;
  description?: string;
  type: 'VIDEO' | 'ARTICLE' | 'TOOL' | 'PODCAST' | 'CULTURAL_STORY';
  link: string;
  tags: string[];
  culturalTags: string[];
  targetAudience: string[];
  createdAt: string;
}

// Appointment
interface Appointment {
  id: string;
  userId: string;
  therapistId: string;
  scheduledAt: string;
  duration: number;
  status: 'SCHEDULED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';
  reason?: string;
  notes?: string;
  meetingLink?: string;
  location?: string;
}

// Cultural Profile
interface CulturalProfile {
  id: string;
  userId: string;
  ageGroup: 'YOUTH' | 'ADULT' | 'ELDER';
  location: 'URBAN' | 'RURAL' | 'PERI_URBAN';
  educationLevel: 'PRIMARY' | 'SECONDARY' | 'TERTIARY' | 'POSTGRADUATE';
  ethnicBackground?: string;
  religiousBackground?: string;
  languagePreference?: string;
  familyStructure: 'NUCLEAR' | 'EXTENDED' | 'SINGLE_PARENT' | 'GUARDIAN';
  householdSize?: number;
  hasElders: boolean;
  communicationStyle?: string;
  respectLevel: 'HIGH' | 'MODERATE' | 'RELAXED';
  economicStatus: 'LOW' | 'MIDDLE' | 'HIGH';
  employmentStatus?: string;
}
🔒 Security Considerations
Never store JWT tokens in localStorage (already handled by cookies)
Always use credentials: 'include' in fetch calls
Validate user role before showing therapist/admin features
Handle 401 errors globally (redirect to login)
Handle 403 errors (show "Access Denied" message)
🧪 Testing Checklist
Authentication Flow:
 Can signup new user
 Can login existing user
 Can logout
 Protected routes redirect to login when not authenticated
 Cookie persists across page refreshes
AI Chat:
 Can send messages and receive responses
 Chat history loads correctly
 Sessions display properly
 AI mood analysis shows correctly
Therapist Chat:
 Can send messages to therapists
 Conversation history loads
 New messages appear in conversations list
Appointments:
 Can create appointments
 Can view appointments list
 Can update appointments
 Can cancel appointments
 Conflict detection works (try booking same time twice)
Resources:
 Resources list displays
 Filters work (type, tags, cultural tags)
 Can save resources
 Saved resources list shows correctly
 Can remove saved resources
Mood Tracking:
 Can log mood
 Mood history displays
 Mood chart/visualization works
Profile:
 Can view profile
 Can update profile
 Cultural profile displays correctly
 Can update cultural profile
🚀 Development Priority Order
Phase 1 (Core Features):
Authentication (signup, login, logout)
Dashboard layout & navigation
AI Chat interface
User profile management
Phase 2 (Secondary Features): 5. Mood tracking 6. Resources library 7. Chat history & sessions Phase 3 (Advanced Features): 8. Therapist messaging 9. Appointment scheduling 10. Cultural profile management Phase 4 (Polish): 11. Therapist portal (if needed) 12. Admin panel (if needed) 13. Notifications & real-time updates 14. Mobile responsiveness
📝 Quick Start Code Snippets
API Service File (api.js)
const API_BASE_URL = 'http://localhost:3000/api';

const fetchWithAuth = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (response.status === 401) {
    // Redirect to login
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  return response;
};

export const auth = {
  signup: (name, email, password) =>
    fetchWithAuth(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }).then(r => r.json()),

  login: (email, password) =>
    fetchWithAuth(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }).then(r => r.json()),

  logout: () =>
    fetchWithAuth(`${API_BASE_URL}/auth/logout`, { method: 'POST' })
      .then(r => r.json()),

  me: () =>
    fetchWithAuth(`${API_BASE_URL}/auth/me`).then(r => r.json()),
};

export const chat = {
  sendMessage: (message, sessionId = null) =>
    fetchWithAuth(`${API_BASE_URL}/chat/message`, {
      method: 'POST',
      body: JSON.stringify({ message, sessionId }),
    }).then(r => r.json()),

  getHistory: (limit = 50, sessionId = null) => {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit);
    if (sessionId) params.append('sessionId', sessionId);
    return fetchWithAuth(`${API_BASE_URL}/chat/history?${params}`)
      .then(r => r.json());
  },

  getSessions: () =>
    fetchWithAuth(`${API_BASE_URL}/chat/sessions`).then(r => r.json()),

  checkHealth: () =>
    fetchWithAuth(`${API_BASE_URL}/chat/health`).then(r => r.json()),
};

export const mood = {
  log: (userId, moodValue) =>
    fetchWithAuth(`${API_BASE_URL}/mood/moods`, {
      method: 'POST',
      body: JSON.stringify({ id: userId, mood: moodValue }),
    }).then(r => r.json()),

  getHistory: (userId) =>
    fetchWithAuth(`${API_BASE_URL}/mood/moods?userId=${userId}`)
      .then(r => r.json()),
};

export const resources = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return fetchWithAuth(`${API_BASE_URL}/resources?${params}`)
      .then(r => r.json());
  },

  getById: (id) =>
    fetchWithAuth(`${API_BASE_URL}/resources/${id}`).then(r => r.json()),

  save: (resourceId, reason, culturalRelevance) =>
    fetchWithAuth(`${API_BASE_URL}/saved-resource`, {
      method: 'POST',
      body: JSON.stringify({ resourceId, recommendationReason: reason, culturalRelevance }),
    }).then(r => r.json()),

  getSaved: () =>
    fetchWithAuth(`${API_BASE_URL}/saved-resource`).then(r => r.json()),

  unsave: (id) =>
    fetchWithAuth(`${API_BASE_URL}/saved-resource/${id}`, {
      method: 'DELETE',
    }).then(r => r.json()),
};

export const appointments = {
  create: (appointmentData) =>
    fetchWithAuth(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    }).then(r => r.json()),

  getUserAppointments: () =>
    fetchWithAuth(`${API_BASE_URL}/appointments/user`).then(r => r.json()),

  getById: (id) =>
    fetchWithAuth(`${API_BASE_URL}/appointments/${id}`).then(r => r.json()),

  update: (id, updates) =>
    fetchWithAuth(`${API_BASE_URL}/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }).then(r => r.json()),

  cancel: (id) =>
    fetchWithAuth(`${API_BASE_URL}/appointments/${id}`, {
      method: 'DELETE',
    }).then(r => r.json()),
};
📚 Reference Documentation
Full API documentation available at: /API_DOCUMENTATION.md in the backend repository This includes:
Complete endpoint reference
Request/response examples
Error handling
Authentication details
CORS configuration
Ready to build! 🚀 If you need clarification on any endpoint or feature, refer to the API documentation or ask for help.