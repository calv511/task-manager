import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.tsx'
import { TaskProvider } from './context/TaskContext.tsx'

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const auth0Audience = import.meta.env.VITE_AUTH0_AUDIENCE
const auth0Configured = Boolean(auth0Domain && auth0ClientId)

const app = (
  <StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </StrictMode>
)

createRoot(document.getElementById('root')!).render(
  auth0Configured ? (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        ...(auth0Audience ? { audience: auth0Audience } : {}),
      }}
      cacheLocation="localstorage"
    >
      {app}
    </Auth0Provider>
  ) : (
    app
  ),
)
