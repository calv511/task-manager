import './App.css'
import Dashboard from './pages/Dashboard'
import AddTaskForm from './components/AddTaskForm'

function App() {

  return (
    <div className="app-shell">
      <main className="container py-4 py-md-5">
        <section className="hero-panel card border-0 shadow-sm mb-4">
          <div className="card-body p-4 p-md-5">
            <p className="section-label mb-2">Task Manager</p>
            <h1 className="display-5 fw-semibold mb-3">Keep work visible and easy to organize.</h1>
            <p className="lead text-body-secondary mb-0">
             Task manager project - work in progress
            </p>
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
      </main>
    </div>
  )
}

export default App
