# Calma - Mental Health & Wellness Platform

A secure, full-featured mental health application built with React 19, TypeScript, and modern security best practices. This project demonstrates expertise in both software engineering and application security design.

## Technical Overview

### Core Technologies
- **Frontend Framework**: React 19 with TypeScript (strict mode)
- **Build Tool**: Vite 7 with hot module replacement
- **Routing**: React Router DOM v7 with protected route architecture
- **Styling**: Tailwind CSS v4 with mobile-first design
- **Animations**: Framer Motion for smooth UI transitions
- **Data Visualization**: Recharts for mood tracking analytics

### Architecture Highlights

#### Secure Authentication System
- **Cookie-based session management** with HttpOnly cookies (credentials: "include")
- **Custom `useAuth` hook** for centralized authentication state management
- **Protected route pattern** with authentication checks and loading states
- **Automatic session validation** on application mount via `/auth/me` endpoint
- **Secure logout** with proper session cleanup and navigation

#### Security Considerations
- **Client-side route protection**: `ProtectedRoute` component prevents unauthorized access
- **Authentication state persistence**: Validates user session on page refresh
- **Redirect protection**: `AuthRedirect` component prevents authenticated users from accessing auth pages
- **Error handling**: Graceful degradation with user-friendly error messages
- **Type safety**: Comprehensive TypeScript interfaces for request/response validation
- **Environment variable configuration**: Secure API URL management via `.env`

#### API Communication Layer
- **Service pattern**: Centralized API calls in `/services` directory
- **Consistent error handling**: Try-catch blocks with meaningful error messages
- **Content-Type validation**: Explicit JSON headers on all requests
- **Credential management**: Automatic cookie inclusion for session handling
- **Response validation**: HTTP status checking before data parsing

### Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── ProtectedRoute.tsx   # Route authentication guard
│   └── AuthRedirect.tsx     # Auth page redirect handler
├── hooks/
│   └── useAuth.tsx      # Authentication state management
├── interfaces/
│   └── auth.interface.ts    # TypeScript type definitions
├── layout/
│   └── AppLayout.tsx    # Main app wrapper with navigation
├── pages/               # Page components
│   ├── DashboardPage.tsx
│   ├── ChatPage.tsx
│   ├── MoodPage.tsx
│   ├── ResourcesPage.tsx
│   └── SettingsPage.tsx
├── services/            # API communication layer
│   ├── authService.ts
│   ├── moodService.ts
│   └── chatService.ts
└── App.tsx             # Route configuration
```

## Key Features

### Authentication & Authorization
- User registration with email/password
- Secure login with session management
- Protected routes with automatic redirection
- Persistent authentication state
- Secure logout functionality

### Application Features
- **Dashboard**: Overview of user activities and quick actions
- **Chat Interface**: Real-time messaging with AI assistant
- **Mood Tracking**: Visual analytics and mood history
- **Resources**: Curated mental health resources
- **Therapist Connections**: Directory and booking system
- **Settings**: User profile and preferences management

## Security Features Implemented

### Authentication Security
- Cookie-based session management (no tokens in localStorage)
- Automatic session validation on app load
- Protected routes with authentication checks
- Secure logout with session cleanup
- 401 error handling for expired sessions

### Input Validation & Type Safety
- TypeScript strict mode for compile-time type checking
- Interface definitions for all API request/response objects
- Runtime validation of API responses
- ESLint configuration for code quality enforcement

### Secure Communication
- HTTPS-ready API communication
- Proper Content-Type headers
- Environment-based API URL configuration
- Consistent error handling across services

## Development

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Environment Setup
Create a `.env` file in the root directory:
```bash
VITE_API_URL=http://localhost:3000/api
```

### Installation
```bash
npm install
```

### Available Scripts

```bash
# Start development server with HMR
npm run dev

# Type-check and build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Development Server
The application runs on `http://localhost:5173` by default with hot module replacement enabled.

## Routing Architecture

### Public Routes
- `/` - Landing page with application overview

### Authentication Routes
- `/login` - User login (redirects to `/app` if authenticated)
- `/onboarding` - New user registration

### Protected Routes (requires authentication)
All routes under `/app` are protected and require authentication:
- `/app` - Dashboard (default view)
- `/app/chat` - Chat interface
- `/app/mood` - Mood tracking
- `/app/resources` - Mental health resources
- `/app/therapists` - Therapist directory
- `/app/settings` - User settings

## Code Quality & Standards

### TypeScript Configuration
- Strict mode enabled for maximum type safety
- Project references for optimized compilation
- Target: ES2020 with modern JavaScript features
- Separate configurations for app and Node.js code

### ESLint Configuration
- React Hooks linting rules
- React Refresh fast-refresh validation
- TypeScript ESLint integration
- Custom rules for code consistency

### Component Patterns
- Functional components with hooks
- Custom hooks for business logic separation
- Props interface definitions
- Consistent error boundary patterns

## Skills Demonstrated

### Software Engineering
- Modern React development with hooks and context
- TypeScript for type safety and developer experience
- Clean architecture with separation of concerns
- Service layer pattern for API abstraction
- Custom hooks for reusable logic
- Component composition and reusability
- State management without external libraries
- Responsive design with mobile-first approach

### Application Security
- Secure authentication flows
- Session management best practices
- Protected route implementation
- Input validation and sanitization awareness
- Error handling without information disclosure
- Environment-based configuration
- HTTPS-ready communication patterns
- Defense against common web vulnerabilities (XSS prevention via React, CSRF protection via SameSite cookies)

## Future Enhancements

### Security Roadmap
- [ ] Implement Content Security Policy (CSP) headers
- [ ] Add rate limiting on authentication endpoints
- [ ] Implement password strength validation
- [ ] Add multi-factor authentication (MFA)
- [ ] Security headers audit (HSTS, X-Frame-Options, etc.)
- [ ] Implement request signing for API calls
- [ ] Add session timeout and refresh mechanism

### Feature Roadmap
- [ ] WebSocket support for real-time chat
- [ ] Push notifications for appointment reminders
- [ ] Progressive Web App (PWA) capabilities
- [ ] Offline support with service workers
- [ ] Accessibility (a11y) improvements
- [ ] Internationalization (i18n)

## License

This project is private and not licensed for public use.

## Contact

For questions about this project or my work, please reach out through my GitHub profile.

---

**Note**: This is a portfolio project demonstrating full-stack web development and application security principles. It is designed to showcase skills relevant to Application Security Engineering roles.
