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

## Screenshots of application

**Auth Page:**
![Screenshot 1](https://github.com/user-attachments/assets/a24b8e10-f3e8-4c62-912c-70dcdc8ea73e)
![Screenshot 2](https://github.com/user-attachments/assets/1065c682-cd48-46db-a8ef-a6e14121a356)
![Screenshot 3](https://github.com/user-attachments/assets/eb00796d-bfb3-4748-b487-1e1ae973ca7c)
![Screenshot 4](https://github.com/user-attachments/assets/160b4f78-ac91-42e5-a7e4-acc9d5fab9fb)

**Student Management:**
Manage students: add, edit, delete, and view the student list.

![Student Management](https://github.com/user-attachments/assets/d819fe20-eeec-418f-898b-d5cb25c480af)
![Add New Student](https://github.com/user-attachments/assets/a1835780-649e-449c-971a-ed3dc2c91206)

**Lesson Management:**
Manage lessons: add, edit, delete, view lesson list, and assign lessons to students.

![Lesson Management](https://github.com/user-attachments/assets/b08dd284-3fef-421f-85c4-b69121caa49b)
![Add New Lesson](https://github.com/user-attachments/assets/32eb6f7a-3d72-41f6-b83f-eddae242b938)
