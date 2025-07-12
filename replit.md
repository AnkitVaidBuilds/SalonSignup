# Salon Booking System

## Overview

This is a modern salon booking application built as a full-stack web application. The system allows customers to book salon services online through an elegant, responsive interface. The application features a React frontend with a Node.js/Express backend, using PostgreSQL for data persistence and email notifications for booking confirmations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React SPA with TypeScript, using Vite for development and building
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Email Service**: Nodemailer for booking notifications

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for monorepo setup
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui components based on Radix UI primitives
- **Styling**: Tailwind CSS with custom salon-themed color palette
- **Forms**: React Hook Form with Zod schema validation
- **API Layer**: Custom fetch wrapper with TanStack Query for caching and state management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Shared Zod schemas between frontend and backend
- **Email Service**: Nodemailer configured for Gmail SMTP
- **Storage**: Abstracted storage interface with in-memory implementation for development

### Database Schema
The application uses a simple schema with two main entities:
- **Users**: For potential future authentication (id, username, password)
- **Bookings**: Core booking data (id, name, email, phone, service)

Services are predefined as enum values: 'haircut', 'trim', 'hair-color'

## Data Flow

1. **Booking Creation**:
   - User fills out the booking form on the homepage
   - Form data is validated client-side using Zod schemas
   - Data is sent to `/api/bookings` endpoint via POST request
   - Server validates data using shared schema
   - Booking is stored in database
   - Email notification is sent to salon owner
   - Success confirmation is displayed to user

2. **Form Validation**:
   - Shared Zod schemas ensure consistent validation between client and server
   - Real-time validation feedback using React Hook Form
   - User-friendly error messages for validation failures

3. **Error Handling**:
   - Global error boundary for unexpected client errors
   - Server errors are caught and returned as JSON responses
   - Toast notifications for user feedback

## External Dependencies

### Core Libraries
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database operations
- **@neondatabase/serverless**: PostgreSQL client for serverless environments
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation integration
- **zod**: Schema validation
- **nodemailer**: Email service integration

### UI Libraries
- **@radix-ui/***: Accessible UI primitives (accordion, dialog, form controls, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility

### Development Tools
- **vite**: Fast build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundler for production builds

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds the React app to `dist/public`
- **Backend**: esbuild bundles the Express server to `dist/index.js`
- **Database**: Drizzle Kit handles schema migrations

### Environment Configuration
- **Development**: Uses NODE_ENV=development with hot reloading
- **Production**: NODE_ENV=production with optimized builds
- **Database**: Requires DATABASE_URL environment variable
- **Email**: Requires EMAIL_USER and EMAIL_PASS for Gmail SMTP

### Hosting Considerations
- Designed for deployment on platforms like Replit, Vercel, or similar
- Uses serverless-compatible database client (@neondatabase/serverless)
- Single-port deployment with Express serving both API and static files
- Environment-specific optimizations (Replit cartographer plugin in development)

### Security Features
- Input validation on both client and server
- CORS configuration for secure API access
- Environment variable protection for sensitive credentials
- SQL injection protection through ORM usage

The application is designed to be easily deployable while maintaining good development experience with hot reloading, type safety, and comprehensive error handling.