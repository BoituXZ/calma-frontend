# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Calma is a mental health and wellness application built with React, TypeScript, and Vite. The app provides mood tracking, chat functionality, resources, and therapist connections for users seeking mental health support.

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server (Vite)
npm run build        # Build for production (runs TypeScript check first)
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Architecture

### Authentication Flow
- **Cookie-based authentication**: All API calls use `credentials: "include"` for session management
- **useAuth hook** (`src/hooks/useAuth.tsx`): Central authentication state management
  - Provides: `user`, `isAuthenticated`, `isLoading`, `error`, `register()`, `login()`, `logout()`, `refreshUser()`
  - Automatically checks auth status on mount via `getCurrentUser()`
  - Handles navigation after auth actions (redirects to `/app` on login/register, `/login` on logout)
- **ProtectedRoute component** (`src/components/ProtectedRoute.tsx`): Wraps authenticated routes
  - Shows loading spinner while checking auth status
  - Redirects to `/login` if not authenticated
- **AuthRedirect component** (`src/components/AuthRedirect.tsx`): Wraps auth pages (login/onboarding)
  - Redirects authenticated users to `/app` dashboard

### Routing Structure
- **Public routes**: `/` (landing page)
- **Auth routes**: `/login`, `/onboarding` (redirect to `/app` if logged in)
- **Protected app routes** (under `/app` layout with `AppLayout`):
  - `/app` - Dashboard (index route)
  - `/app/chat` - Chat interface
  - `/app/mood` - Mood tracking
  - `/app/resources` - Mental health resources
  - `/app/settings` - User settings
- All protected routes wrapped in both `AppLayout` (provides navbar) and `ProtectedRoute` (auth check)

### API Communication
- **Base URL configuration** (`src/services/authService.tsx`, `src/services/moodService.tsx`):
  - Uses `VITE_API_URL` environment variable (defined in `.env`)
  - Falls back to `/api` for development proxy
  - All requests use `credentials: "include"` for cookie handling
- **Auth endpoints**: `/auth/signup`, `/auth/login`, `/auth/logout`, `/auth/me`
- **Mood endpoint**: `/mood` (POST)

### Component Organization
- **Pages**: All page components in `src/pages/` (e.g., `DashboardPage.tsx`, `ChatPage.tsx`)
- **Layouts**: `src/layout/AppLayout.tsx` - Main app wrapper with bottom navbar
- **UI Components**: `src/components/ui/` (e.g., `Navbar.tsx`, `Card.tsx`)
- **Utility Components**: `src/components/` (e.g., `ProtectedRoute.tsx`, `AuthRedirect.tsx`)
- **Services**: API calls centralized in `src/services/` directory
- **Interfaces**: TypeScript types in `src/interfaces/` (e.g., `auth.interface.ts`)

### State Management Pattern
- No global state library - uses React hooks (`useState`, `useEffect`, `useCallback`)
- Custom hooks for domain logic (e.g., `useAuth` for authentication)
- Services return promises; components handle state locally

### Styling
- **Tailwind CSS v4** with Vite plugin (`@tailwindcss/vite`)
- Utility-first approach with custom classes
- Mobile-first design (app uses bottom navigation bar)

## Environment Variables

Create a `.env` file with:
```
VITE_API_URL=http://localhost:3000/api
```

## TypeScript Configuration

- Uses project references pattern (`tsconfig.json` references `tsconfig.app.json` and `tsconfig.node.json`)
- Strict mode enabled for app code
- Target: ES2020

## Key Dependencies

- **React 19**: UI library
- **React Router DOM v7**: Client-side routing
- **Framer Motion**: Animations
- **Lucide React**: Icon library (used extensively in Navbar)
- **Recharts**: Data visualization (for mood tracking charts)
- **Tailwind CSS v4**: Styling

## Important Patterns

### Adding New Protected Routes
1. Create page component in `src/pages/`
2. Add route under `/app` parent in `App.tsx`
3. Wrap in `<ProtectedRoute>` component
4. Navigation links use relative paths from `/app` (e.g., `navigate("mood")` not `navigate("/app/mood")`)

### Adding New API Services
1. Create service file in `src/services/` (e.g., `moodService.tsx`)
2. Use `API_BASE_URL` constant from environment
3. Always include `credentials: "include"` in fetch options
4. Always set `Content-Type: application/json` header
5. Handle errors with try/catch and throw meaningful error messages

### Working with Authentication
- Use `useAuth()` hook in components that need auth state
- Auth state persists across page refreshes via `getCurrentUser()` call on mount
- Logout clears user state and redirects to `/login`
- Registration/login automatically redirects to `/app` on success
