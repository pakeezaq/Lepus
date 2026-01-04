import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import path from 'path'
import { fileURLToPath } from 'url'
import { createOrder, processPayment } from './routes/orders.js'
import { createPaymentIntent } from './routes/payments.js'

dotenv.config() // load .env safely

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors()) // Allow all origins for simplicity in this transition, or strictly same-origin by default
app.use(express.json())

// --- Nodemailer setup ---
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})

// Verify email server
transporter.verify((error, success) => {
  if (error) {
    console.log('Email configuration error:', error.message)
  } else {
    console.log('Email server is ready to send messages')
  }
})

// Attach transporter to req so routes can use it
app.use((req, res, next) => {
  req.transporter = transporter
  next()
})

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
