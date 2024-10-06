import { Route, createRoutesFromElements } from 'react-router-dom'

import App from './components/App.tsx'
import { TodoTasks } from './components/TodoTasks.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<TodoTasks />} />
  </Route>
)
