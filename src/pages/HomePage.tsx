import { useState } from "react";

type AuthMode = "login" | "register";

function HomePage() {
    const [mode, setMode] = useState<AuthMode>("login");

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
                                    This home page is the future entry point for login, registration, and authorization.
                                    Auth0 can be connected later without redesigning the layout.
                                </p>

                                <div className="d-flex flex-wrap gap-2 mb-4">
                                    <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis">Login</span>
                                    <span className="badge rounded-pill bg-success-subtle text-success-emphasis">Registration</span>
                                    <span className="badge rounded-pill bg-dark-subtle text-dark-emphasis">Authorization</span>
                                </div>

                                <div className="d-flex flex-wrap gap-3">
                                    <a className="btn btn-primary" href="#auth-panel">Get Started</a>
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
                                            </form>
                                        ) : (
                                            <form className="d-grid gap-3" onSubmit={(event) => event.preventDefault()}>
                                                <div>
                                                    <label className="form-label" htmlFor="register-name">Full name</label>
                                                    <input id="register-name" type="text" className="form-control" placeholder="Your name" />
                                                </div>
                                                <div>
                                                    <label className="form-label" htmlFor="register-email">Email</label>
                                                    <input id="register-email" type="email" className="form-control" placeholder="name@example.com" />
                                                </div>
                                                <div>
                                                    <label className="form-label" htmlFor="register-password">Password</label>
                                                    <input id="register-password" type="password" className="form-control" placeholder="Create a password" />
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="terms" />
                                                    <label className="form-check-label" htmlFor="terms">I agree to the terms and privacy policy</label>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-lg">Create account</button>
                                            </form>
                                        )}

                                        <p className="text-body-secondary small mt-3 mb-0">
                                            Auth0 can be connected here later. For now this is a polished placeholder for the authentication flow.
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
                                    <p className="text-body-secondary mb-0">The layout is ready for a real identity provider without needing a redesign.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="feature-card card h-100 border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <p className="section-label mb-2">User onboarding</p>
                                    <h2 className="h5 fw-semibold mb-2">Registration path</h2>
                                    <p className="text-body-secondary mb-0">A second tab is already structured for account creation and future validation.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="feature-card card h-100 border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <p className="section-label mb-2">Authorization</p>
                                    <h2 className="h5 fw-semibold mb-2">Ready for roles</h2>
                                    <p className="text-body-secondary mb-0">Protected routes and permissions can be layered on top of this page later.</p>
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