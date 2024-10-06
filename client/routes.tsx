import { Route, createRoutesFromElements } from 'react-router-dom'
import NotFound from './components/NotFound.tsx'
import App from './components/App.tsx'
import RandomQuoteGenerator  from './components/RandomQuoteGenerator.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
   <Route path="/quotes" element={<RandomQuoteGenerator />} />
   <Route path="*" element={<NotFound />} />
  </Route>
)
