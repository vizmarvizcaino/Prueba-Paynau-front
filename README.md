# Paynau Frontend

A React-based frontend application for the Paynau order management system, built with TypeScript, Vite, and Tailwind CSS.

## Features

- **Product Management**: List, create, update, and delete products with validation for unique names.
- **Order Management**: List orders and create new orders with stock validation and debounced submission to prevent compulsive clicking.
- **Authentication**: Secure login with JWT token management and automatic logout on token expiration.
- **Real-time Synchronization**: UI reflects stock changes immediately after order creation.
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS.
- **Error Handling**: Comprehensive error states and user feedback with toast notifications.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Hook Form** with Zod validation
- **Axios** for API calls with interceptors
- **React Router** for navigation
- **React Hot Toast** for notifications
- **Lodash** for debouncing

## Prerequisites

- Node.js (v18+)
- Backend API running (see backend README)

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The application will be available at `http://localhost:3000`.

## Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm run preview`: Previews the production build

## Architecture Decisions

### State Management
- Used React hooks (useState, useEffect) for local state management
- Separate hooks for products and orders to encapsulate related logic
- Context API for authentication state

### Form Validation
- React Hook Form with Zod schemas for type-safe validation
- Proactive validation prevents invalid submissions
- Stock validation before order creation

### API Integration
- Axios with request/response interceptors for authentication
- Automatic token attachment and refresh handling
- Centralized error handling

### Concurrency Prevention
- Debounced order submission (500ms) to prevent compulsive clicking
- Client-side stock validation before API call
- Backend handles database-level concurrency with transactions

### Synchronization
- Products list refreshes after successful order creation to reflect stock changes
- Real-time UI updates without full page reload

## Trade-offs and Limitations

### State Management
- **Decision**: Used local hooks instead of global state management (Redux/Zustand)
- **Rationale**: Simplicity for MVP, sufficient for current scope
- **Production**: Would implement Zustand or Redux for complex state interactions

### Error Boundaries
- **Decision**: Basic error handling without global error boundaries
- **Rationale**: Time constraints, focused on core functionality
- **Production**: Add React Error Boundaries for better UX

### Testing
- **Decision**: No frontend tests implemented
- **Rationale**: Time constraints, backend has comprehensive tests
- **Production**: Add unit tests with Jest/React Testing Library, integration tests

### Performance
- **Decision**: No memoization or optimization for re-renders
- **Rationale**: Small application, acceptable performance
- **Production**: Add React.memo, useMemo for expensive operations

### Offline Support
- **Decision**: No offline functionality
- **Rationale**: Not required for MVP
- **Production**: Implement service workers for offline order queuing

## Security Considerations

- JWT tokens stored in localStorage (acceptable for demo)
- Automatic logout on 401 responses
- Input validation on both client and server
- No sensitive data exposed in frontend

## Deployment

The application is containerized with Docker. See root `docker-compose.yml` for full stack deployment.

## Contributing

1. Follow the existing code style
2. Add proper TypeScript types
3. Test API integrations
4. Update this README for any architectural changes