function AuthSetupPage() {
    return (
        <main className="home-shell">
            <div className="container py-4 py-md-5">
                <section className="home-hero card border-0 shadow-sm">
                    <div className="card-body p-4 p-md-5">
                        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                            <span className="brand-mark">TM</span>
                            <span className="section-label mb-0">Task Manager</span>
                        </div>

                        <div className="row g-4 align-items-center">
                            <div className="col-12 col-lg-7">
                                <h1 className="display-5 fw-semibold mb-3">Authentication is ready to wire up.</h1>
                                <p className="lead text-body-secondary mb-4">
                                    Add your Auth0 domain and client ID to enable login, registration, and Google sign-in.
                                    Until then, this page acts as the project home screen.
                                </p>

                                <div className="d-flex flex-wrap gap-2 mb-4">
                                    <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis">Auth0</span>
                                    <span className="badge rounded-pill bg-success-subtle text-success-emphasis">Google login</span>
                                    <span className="badge rounded-pill bg-dark-subtle text-dark-emphasis">Authorization</span>
                                </div>

                                <div className="config-callout card border-0 bg-body-tertiary">
                                    <div className="card-body p-3 p-md-4">
                                        <h2 className="h6 fw-semibold mb-2">Required environment variables</h2>
                                        <ul className="list-unstyled mb-0 text-body-secondary small">
                                            <li>VITE_AUTH0_DOMAIN</li>
                                            <li>VITE_AUTH0_CLIENT_ID</li>
                                            <li>VITE_AUTH0_AUDIENCE, if your API needs it</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-5">
                                <div className="auth-card card border-0 shadow-sm">
                                    <div className="card-body p-4 p-md-4">
                                        <p className="section-label mb-2">Project shell</p>
                                        <h2 className="h4 fw-semibold mb-3">Home page placeholder</h2>
                                        <p className="text-body-secondary mb-4">
                                            Once the Auth0 configuration is added, this screen will switch to the live login and registration flow.
                                        </p>
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-primary" type="button" disabled>
                                                Log in with Auth0
                                            </button>
                                            <button className="btn btn-outline-secondary" type="button" disabled>
                                                Register with Auth0
                                            </button>
                                            <button className="btn btn-outline-dark" type="button" disabled>
                                                Continue with Google
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default AuthSetupPage;