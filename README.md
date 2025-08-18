# Classroom Management - Client

This is the frontend (client) part of the Classroom Management system, built with Next.js and TypeScript.

## Directory structure

- **app/**: Contains the main pages of the application (according to the App Router structure of Next.js)
- `dashboard/`, `manage-lessons/`, `messages/`, `sign-in/`, ...: Separate functional pages
- `layout.tsx`: Overall layout for the entire app
- `globals.css`: Global CSS file
- **components/**: Shared components such as `header`, `sidebar`, `authGuard`, ...
- **constants/**: Shared constants (API endpoint, error message, ...)
- **services/**: Contains API calls (authService, instructorService, studentService)
- **public/**: Contains static files (images, icons, ...)
- **.next/**: Next.js's automatic build directory (not needed)
- **package.json**: Project information and dependent packages
- **tsconfig.json**: TypeScript configuration
- **next.config.ts**: Next.js configuration
- **postcss.config.mjs**: PostCSS configuration
- **eslint.config.mjs**: ESLint configuration

## Installation

1. **Requirements:**

- Node.js >= 18
- npm >= 9 (or yarn/pnpm)

2. **Install package:**

```bash
cd client
npm install
```

## Run the application

- **Run in development mode:**

```bash
npm run dev
```
The application will run at [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## Note

- Make sure the backend is running before using features that require the API.
- The API endpoint configuration can be edited in `constants/api.ts`.

---

For any questions or contributions, please contact:
- Email: leanhduy131103@gmail.com
