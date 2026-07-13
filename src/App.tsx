import './App.css'
import Dashboard from './pages/Dashboard'
import { TaskProvider } from './context/TaskContext'
import AddTaskForm from './components/AddTaskForm'

function App() {

  return (
    <>
      <h1>Work in progress...</h1>
      <TaskProvider>
        <AddTaskForm />
        <Dashboard />
      </TaskProvider>
    </>
  )
}

export default App
