import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

import authRoutes from './routes/authRoutes.js'
import parkingRoutes from './routes/parkingRoutes.js'
import vehicleRoutes from './routes/vehicleRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

import ParkingSpace from './models/parkingSpace.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Seed parking spaces on first run
const seedSpaces = async () => {
  const count = await ParkingSpace.countDocuments()
  if (count === 0) {
    const spaces = []
    for (let i = 1; i <= 20; i++) {
      spaces.push({ id: `A${i}`, zone: 'A' })
      spaces.push({ id: `B${i}`, zone: 'B' })
    }
    await ParkingSpace.insertMany(spaces)
    console.log(' 40 parking spaces seeded')
  }
}
seedSpaces()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/parking', parkingRoutes)
app.use('/api/vehicles', vehicleRoutes)
app.use('/api/payments', paymentRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'ParkSmart API is running' })
})

app.use(notFound)
app.use(errorHandler)

//const PORT = process.env.PORT || 5000
//app.listen(PORT, () => {
//  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
//}) 

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB()

    await seedSpaces()

    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      )
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

startServer()