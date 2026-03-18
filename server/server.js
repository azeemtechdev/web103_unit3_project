import 'dotenv/config' // <-- ADD THIS LINE AT THE TOP
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import logger from 'morgan'
import cors from 'cors'

// Import routers
import locationsRouter from './routes/locations.js'
import eventsRouter from './routes/events.js'

// Set up __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(logger('dev'))
app.use(cors())

// Use routers
app.use('/api/locations', locationsRouter)
app.use('/api/events', eventsRouter)

// --- SIMPLIFIED STATIC PATHS ---

// Serve static files from the client's 'dist' directory
app.use(express.static(path.join(__dirname, '../client/dist')))

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
})