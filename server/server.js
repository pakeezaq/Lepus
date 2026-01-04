import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { createOrder, processPayment } from './routes/orders.js'
import { createPaymentIntent } from './routes/payments.js'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Robust .env loading
const envPaths = [
  path.join(__dirname, '.env'), // server/.env
  path.join(__dirname, '../.env') // root .env
]

let envLoaded = false
for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    console.log(`Loading .env from: ${envPath}`)
    dotenv.config({ path: envPath })
    envLoaded = true
    break
  }
}

if (!envLoaded) {
  console.warn('WARNING: No .env file found in server/ or root! process.env might be empty.')
} else {
  // Debug critical vars (partial)
  console.log('Environment Check:')
  console.log('- POSTEX_TOKEN:', process.env.POSTEX_TOKEN ? 'Loaded' : 'MISSING')
  console.log('- EMAIL_USER:', process.env.EMAIL_USER ? 'Loaded' : 'MISSING')
  console.log('- EMAIL_HOST:', process.env.EMAIL_HOST ? 'Loaded' : 'MISSING')
}

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Serve Static Frontend Files
// serve from the dist folder which is one level up from server/
app.use(express.static(path.join(__dirname, '../dist')))

// API Routes
app.post('/api/orders', (req, res) => createOrder(req, res))
app.post('/api/payments/create-intent', (req, res) => createPaymentIntent(req, res))
app.post('/api/payments/confirm', (req, res) => processPayment(req, res))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Lepus backend server is running' })
})

// Catch-all route for Client-side Routing (must be last)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
