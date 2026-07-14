import './App.css'
import AuthSetupPage from './pages/AuthSetupPage'
import HomePage from './pages/HomePage'

function App() {
  const auth0Configured = Boolean(import.meta.env.VITE_AUTH0_DOMAIN && import.meta.env.VITE_AUTH0_CLIENT_ID)

  return (
    auth0Configured ? <HomePage /> : <AuthSetupPage />
  )
}

export default App
