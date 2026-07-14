import './App.css'
import AuthSetupPage from './pages/AuthSetupPage'
import HomePage from './pages/HomePage'
import TaskDetailsPage from './pages/TaskDetailsPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

function App() {
  const auth0Configured = Boolean(import.meta.env.VITE_AUTH0_DOMAIN && import.meta.env.VITE_AUTH0_CLIENT_ID)

  return (
    auth0Configured ? (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks/:taskId" element={<TaskDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    ) : (
      <AuthSetupPage />
    )
  )
}

export default App
