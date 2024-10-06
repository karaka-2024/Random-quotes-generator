import { Link } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <h2>Welcome to the Random Quote App</h2>
      <p>Click the button below to view random quotes:</p>
      <Link to="/quotes">
        <button>Go to Random Quote Generator</button>
      </Link>
    </div>
  )
}