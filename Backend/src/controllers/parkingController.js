import asyncHandler from 'express-async-handler'
import ParkingSpace from '../models/parkingSpace.js'

//     Get all parking spaces
//   GET /api/parking
export const getAllSpaces = asyncHandler(async (req, res) => {
  const spaces = await ParkingSpace.find().populate('vehicle', 'plate owner')
  res.json(spaces)
})

//     Get available spaces
//    GET /api/parking/available
export const getAvailableSpaces = asyncHandler(async (req, res) => {
  const spaces = await ParkingSpace.find({ status: 'available' })
  res.json(spaces)
})

//     Get parking stats
//    GET /api/parking/stats
export const getStats = asyncHandler(async (req, res) => {
  const total = await ParkingSpace.countDocuments()
  const available = await ParkingSpace.countDocuments({ status: 'available' })
  const occupied = await ParkingSpace.countDocuments({ status: 'occupied' })
  const reserved = await ParkingSpace.countDocuments({ status: 'reserved' })

  res.json({ total, available, occupied, reserved })
})

//    Occupy a space
//    PUT /api/parking/:id/occupy
export const occupySpace = asyncHandler(async (req, res) => {
  const { vehicleId } = req.body
  const space = await ParkingSpace.findOne({ id: req.params.id })

  if (!space) {
    res.status(404)
    throw new Error('Parking space not found')
  }

  if (space.status !== 'available') {
    res.status(400)
    throw new Error('Space is not available')
  }

  space.status = 'occupied'
  space.vehicle = vehicleId
  space.occupiedAt = new Date()
  await space.save()

  res.json(space)
})

//     Free a space
//    PUT /api/parking/:id/free
export const freeSpace = asyncHandler(async (req, res) => {
  const space = await ParkingSpace.findOne({ id: req.params.id })

  if (!space) {
    res.status(404)
    throw new Error('Parking space not found')
  }

  space.status = 'available'
  space.vehicle = null
  space.occupiedAt = null
  await space.save()

  res.json(space)
})
