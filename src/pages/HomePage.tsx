import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AddTaskForm from "../components/AddTaskForm";
import Dashboard from "./Dashboard";
import type { Auth0User } from "../types/auth0";

type AuthMode = "login" | "register";

function HomePage() {
    const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0<Auth0User>();
    const [mode, setMode] = useState<AuthMode>("login");

    const handlePrimaryAuth = () => {
        void loginWithRedirect(
            mode === "register"
                ? { authorizationParams: { screen_hint: "signup" } }
                : undefined,
        );
    };

    const handleGoogleLogin = () => {
        void loginWithRedirect({
            authorizationParams: {
                connection: "google-oauth2",
                ...(mode === "register" ? { screen_hint: "signup" } : {}),
            },
        });
    };

    if (isLoading) {
        return (
            <main className="home-shell d-flex align-items-center justify-content-center min-vh-100">
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status" aria-label="Loading authentication state" />
                    <p className="text-body-secondary mb-0">Loading authentication state...</p>
                </div>
            </main>
        );
    }

    if (isAuthenticated) {
        const displayName = user?.name || user?.nickname || user?.email || "Welcome";

        return (
            <main className="home-shell">
                <div className="container py-4 py-md-5">
                    <section className="home-hero card border-0 shadow-sm mb-4">
                        <div className="card-body p-4 p-md-5">
                            <div className="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center">
                                <div>
                                    <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                                        <span className="brand-mark">TM</span>
                                        <span className="section-label mb-0">Authenticated workspace</span>
                                    </div>
                                    <h1 className="display-6 fw-semibold mb-2">{displayName}</h1>
                                    <p className="lead text-body-secondary mb-0">
                                        You are signed in through Auth0. Your task board is now available below.
                                    </p>
                                </div>

                                <div className="d-flex flex-column align-items-md-end gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => void logout({ logoutParams: { returnTo: window.location.origin } })}
                                    >
                                        Log out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="row g-4 align-items-start">
                        <div className="col-12 col-lg-4">
                            <AddTaskForm />
                        </div>
                        <div className="col-12 col-lg-8">
                            <Dashboard />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="home-shell">
            <div className="container py-4 py-md-5">
                <section className="home-hero card border-0 shadow-sm mb-4">
                    <div className="card-body p-4 p-md-5">
                        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                            <span className="brand-mark">TM</span>
                            <span className="section-label mb-0">Task Manager</span>
                        </div>

                        <div className="row g-4 align-items-center">
                            <div className="col-12 col-lg-6">
                                <h1 className="display-5 fw-semibold mb-3">A clean starting point for secure sign-in and team access.</h1>
                                <p className="lead text-body-secondary mb-4">
                                    Sign in with Auth0, register a new account, or continue with Google.
                                    The task manager unlocks after authentication.
                                </p>

                                <div className="d-flex flex-wrap gap-2 mb-4">
                                    <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis">Login</span>
                                    <span className="badge rounded-pill bg-success-subtle text-success-emphasis">Registration</span>
                                    <span className="badge rounded-pill bg-dark-subtle text-dark-emphasis">Google sign-in</span>
                                </div>

                                <div className="d-flex flex-wrap gap-3">
                                    <button className="btn btn-primary" type="button" onClick={handlePrimaryAuth}>
                                        {mode === "register" ? "Register with Auth0" : "Log in with Auth0"}
                                    </button>
                                    <a className="btn btn-outline-secondary" href="#features">See Features</a>
                                </div>
                            </div>

                            <div className="col-12 col-lg-6">
                                <div id="auth-panel" className="auth-card card border-0 shadow-sm">
                                    <div className="card-body p-4 p-md-4">
                                        <div className="btn-group w-100 mb-4" role="tablist" aria-label="Authentication options">
                                            <button
                                                type="button"
                                                className={`btn ${mode === "login" ? "btn-dark" : "btn-outline-secondary"}`}
                                                onClick={() => setMode("login")}
                                            >
                                                Log in
                                            </button>
                                            <button
                                                type="button"
                                                className={`btn ${mode === "register" ? "btn-dark" : "btn-outline-secondary"}`}
                                                onClick={() => setMode("register")}
                                            >
                                                Register
                                            </button>
                                        </div>

                                        {mode === "login" ? (
                                            <form className="d-grid gap-3" onSubmit={(event) => event.preventDefault()}>
                                                <div>
                                                    <label className="form-label" htmlFor="login-email">Email</label>
                                                    <input id="login-email" type="email" className="form-control" placeholder="name@example.com" />
                                                </div>
                                                <div>
                                                    <label className="form-label" htmlFor="login-password">Password</label>
                                                    <input id="login-password" type="password" className="form-control" placeholder="Enter your password" />
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="remember-me" />
                                                        <label className="form-check-label" htmlFor="remember-me">Remember me</label>
                                                    </div>
                                                    <a className="link-secondary small" href="#auth-panel">Forgot password?</a>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-lg">Sign in</button>
                                                <button type="button" className="btn btn-outline-dark btn-lg" onClick={handleGoogleLogin}>
                                                    Continue with Google
                                                </button>
                                            </form>
                                        ) : (
                                            <div className="d-grid gap-3">
                                                <button type="button" className="btn btn-primary btn-lg" onClick={handlePrimaryAuth}>
                                                    Create account with Auth0
                                                </button>
                                                <button type="button" className="btn btn-outline-dark" onClick={handleGoogleLogin}>
                                                    Continue with Google
                                                </button>
                                                <p className="text-body-secondary small mb-0">
                                                    Registration will open the Auth0 hosted signup experience, so you do not need to build a custom password form yet.
                                                </p>
                                            </div>
                                        )}

                                        <p className="text-body-secondary small mt-3 mb-0">
                                            Auth0 powers login, registration, and Google sign-in. Access to the task board is shown only after authentication.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="mb-4">
                    <div className="row g-4">
                        <div className="col-12 col-md-4">
                            <div className="feature-card card h-100 border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <p className="section-label mb-2">Secure access</p>
                                    <h2 className="h5 fw-semibold mb-2">Login flow ready</h2>
                                        <p className="text-body-secondary mb-0">The layout connects to Auth0 so secure sign-in is available without a rebuild.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="feature-card card h-100 border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <p className="section-label mb-2">User onboarding</p>
                                    <h2 className="h5 fw-semibold mb-2">Registration path</h2>
                                        <p className="text-body-secondary mb-0">The hosted signup flow handles new accounts, and Google login is available too.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="feature-card card h-100 border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <p className="section-label mb-2">Access</p>
                                    <h2 className="h5 fw-semibold mb-2">Ready for protected features</h2>
                                        <p className="text-body-secondary mb-0">Authenticated access is ready for future protected routes and app-specific access controls.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default HomePage;