import express from 'express'
import * as Path from 'node:path'

import RandomQuoteRoutes from './routes/fruits.ts'

const server = express()

// Middleware to parse JSON bodies
server.use(express.json())

// Set up the routes for quotes
server.use('/api/v1/quotes', RandomQuoteRoutes)

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
 
  // Catch all route to serve index.html for client-side routing
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
