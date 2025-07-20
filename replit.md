# Replit.md

## Overview

This is a full-stack web application built with React (frontend) and Express.js (backend) that includes file upload functionality for images. The application uses TypeScript throughout, implements shadcn/ui components for the UI, and includes Drizzle ORM for database operations with PostgreSQL. The project is configured for deployment on Replit with Vite for development and build tooling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui (Radix UI primitives with Tailwind CSS)
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript (ES modules)
- **API**: RESTful API design
- **File Handling**: Multer for multipart/form-data uploads
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)

### Development Setup
- **Development Server**: Vite dev server with HMR
- **Production Build**: esbuild for server bundling, Vite for client
- **Type Checking**: TypeScript with strict mode enabled
- **Linting/Formatting**: Built-in TypeScript checking

## Key Components

### Database Schema (`shared/schema.ts`)
- **Users Table**: Basic user management with username/password
- **Uploads Table**: File metadata storage (filename, original name, mimetype, size, timestamp)
- **Validation**: Zod schemas for runtime validation and type inference

### Storage Layer (`server/storage.ts`)
- **Interface**: Abstract storage interface for flexibility
- **Implementation**: In-memory storage (MemStorage) for development
- **Methods**: CRUD operations for users and uploads

### File Upload System
- **Backend**: Multer configuration with disk storage
- **Frontend**: Custom FileUpload component with drag-and-drop
- **Storage**: Local filesystem in `uploads/` directory
- **Validation**: Image files only, 5MB size limit
- **Security**: File type validation and unique filename generation

### UI Components
- **Design System**: Complete shadcn/ui component library
- **Theming**: CSS variables with light/dark mode support
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Accessibility**: Radix UI primitives ensure ARIA compliance

## Data Flow

### File Upload Flow
1. User selects/drops image file in FileUpload component
2. Frontend validates file type and size
3. FormData sent to `/api/upload` endpoint via fetch
4. Backend validates file, generates unique filename
5. Multer saves file to disk storage
6. Upload metadata stored in database
7. Response includes file URL for immediate display

### API Request Flow
1. Frontend makes requests using TanStack Query
2. Custom `apiRequest` utility handles HTTP methods
3. Error handling with toast notifications
4. Server responds with JSON data or error messages

### Development vs Production
- **Development**: Vite dev server with hot reload
- **Production**: Static files served by Express after build
- **Database**: Environment-based configuration

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Headless UI primitives for accessibility
- **multer**: File upload middleware for Express
- **wouter**: Lightweight router for React

### Development Tools
- **vite**: Fast build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **tailwindcss**: Utility-first CSS framework
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay

### UI/UX Libraries
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management
- **tailwind-merge**: Tailwind class merging utility
- **date-fns**: Date manipulation library

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds React app to `dist/public/`
2. **Server Build**: esbuild bundles server code to `dist/`
3. **Database**: Drizzle migrations applied on deployment

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment detection (development/production)
- **File Storage**: Local filesystem (uploads/ directory)

### Replit Integration
- **Development**: Hot reload with Vite and tsx
- **Production**: Node.js server serving built assets
- **Database**: Automatic Neon Database provisioning
- **File Persistence**: Uploads stored in replit filesystem

### Scaling Considerations
- **Database**: Ready for PostgreSQL scaling with Drizzle
- **File Storage**: Currently local filesystem (could migrate to cloud storage)
- **Session Management**: Basic structure in place for user sessions
- **Caching**: TanStack Query provides client-side caching

The application follows a monorepo structure with shared types and schemas, making it easy to maintain consistency between frontend and backend while supporting rapid development and deployment on Replit.