# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

  # Task Manager

  A React + TypeScript task manager built with Vite, Bootstrap, Auth0, and React Router. The app includes a dark UI, authentication via Auth0, Google sign-in, task creation and editing, task status controls, inline validation, and local persistence.

  ## Features

  - Auth0 login and registration flow
  - Google sign-in through Auth0
  - Authenticated task dashboard
  - Create, edit, delete, and update task status
  - Task details modal with focused viewing and editing
  - Form validation with inline error messages
  - LocalStorage persistence for tasks
  - TypeScript-backed task and auth models
  - Dark theme with Bootstrap-based styling

  ## Project Setup

  ### Prerequisites

  - Node.js 18+ recommended
  - npm
  - An Auth0 application configured for a Single Page Application

  ### Auth0 Configuration

  Create a local `.env` file in the project root and add:

  ```env
  VITE_AUTH0_DOMAIN=your-auth0-domain
  VITE_AUTH0_CLIENT_ID=your-auth0-client-id
  VITE_AUTH0_AUDIENCE=optional-api-audience
  ```

  In your Auth0 application settings, set the following for local development:

  - Allowed Callback URLs: `http://localhost:5173`, `http://127.0.0.1:5173`
  - Allowed Logout URLs: `http://localhost:5173`, `http://127.0.0.1:5173`
  - Allowed Web Origins: `http://localhost:5173`, `http://127.0.0.1:5173`

  If you want Google login, make sure the Google social connection is enabled in Auth0.

  ## Installation

  1. Install dependencies:

  ```bash
  npm install
  ```

  2. Create your `.env` file and add the Auth0 values listed above.

  3. Start the development server:

  ```bash
  npm run dev
  ```

  4. Open the app in your browser at the local Vite URL shown in the terminal.

  ## Usage

  ### Authentication

  - Open the app.
  - If Auth0 is configured, the home page displays login and registration options.
  - Use the Auth0 login button or continue with Google.
  - After authentication, the task dashboard becomes available.

  ### Task Management

  - Use the task form to create a new task.
  - Click a task card to open the focused task details modal.
  - Edit the task from the card or modal.
  - Change task status directly from the dashboard or the task details modal.
  - Delete tasks from the dashboard or the modal.

  ### Validation

  - Title is required.
  - Title length is limited.
  - Description length is constrained.
  - Priority and status values are validated against the supported TypeScript unions.

  ## Available Scripts

  - `npm run dev` - start the Vite development server
  - `npm run build` - build the app for production
  - `npm run preview` - preview the production build locally
  - `npm run lint` - run ESLint across the project

  ## Architecture

  ### Main App Flow

  - `src/App.tsx` decides whether to show the Auth0 setup screen or the authenticated app shell.
  - `src/main.tsx` wraps the app with `Auth0Provider` and the task context provider when Auth0 is configured.
  - `src/pages/HomePage.tsx` handles the authenticated landing experience and login/register UI.
  - `src/pages/AuthSetupPage.tsx` shows a fallback screen when Auth0 environment variables are missing.

  ### Task State

  - `src/context/TaskContext.tsx` owns the global task state.
  - Tasks are stored in React context and synchronized to `localStorage`.
  - Task actions include add, update, delete, and status changes.

  ### Task UI

  - `src/components/AddTaskForm.tsx` handles task creation.
  - `src/pages/Dashboard.tsx` renders the task list, task filters, inline editing, and the focused task modal.
  - `src/pages/TaskDetailsPage.tsx` remains in the project if you want to restore route-based task details later.

  ### Shared Types and Validation

  - `src/types/task.ts` defines the task shape and type unions for priority and status.
  - `src/types/auth0.ts` aliases the Auth0 user type used by the authenticated UI.
  - `src/utils/taskValidation.ts` contains reusable validation rules for create and edit forms.

  ## Implementation Details

  - The app uses Bootstrap for layout, spacing, and base components.
  - A custom dark theme is applied through `src/App.css` and `src/index.css`.
  - Auth0 login supports both normal sign-in/register flows and Google sign-in.
  - Task cards open a focused modal instead of navigating away.
  - Clicking outside the modal, pressing Escape, or using the X button closes the focused view.
  - Form errors are shown inline with Bootstrap validation styles.
  - The dashboard and modal are fully typed with TypeScript unions and interfaces.

  ## Notes

  - If `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` are not set, the app shows the Auth0 setup screen instead of the full task manager.
  - Task data is currently stored only in `localStorage` and is not synced to a backend.
