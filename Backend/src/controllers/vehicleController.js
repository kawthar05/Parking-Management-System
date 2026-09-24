import asyncHandler from 'express-async-handler'
import Vehicle from '../models/Vehicle.js'
import ParkingSpace from '../models/parkingSpace.js'

// Rates (in Naira)
const RATES = {
  car: 100,
  suv: 150,
  motorcycle: 50,
  truck: 200
}

// @desc    Get all vehicles
// @route   GET /api/vehicles
export const getAllVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find().sort({ entryTime: -1 })
  res.json(vehicles)
})

// @desc    Get active (still parked) vehicles
// @route   GET /api/vehicles/active
export const getActiveVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find({ exitTime: null }).sort({ entryTime: -1 })
  res.json(vehicles)
})

// @desc    Vehicle entry
// @route   POST /api/vehicles/entry
export const vehicleEntry = asyncHandler(async (req, res) => {
  const { plate, owner, vehicleType, spaceId } = req.body

  // Check if vehicle is already parked
  const alreadyParked = await Vehicle.findOne({ plate: plate.toUpperCase(), exitTime: null })
  if (alreadyParked) {
    res.status(400)
    throw new Error('Vehicle is already parked')
  }

  const space = await ParkingSpace.findOne({ id: spaceId })
  if (!space || space.status !== 'available') {
    res.status(400)
    throw new Error('Selected space is not available')
  }

  const vehicle = await Vehicle.create({
    plate: plate.toUpperCase(),
    owner,
    vehicleType,
    space: space._id,
    spaceId
  })

  // Occupy the space
  space.status = 'occupied'
  space.vehicle = vehicle._id
  space.occupiedAt = new Date()
  await space.save()

  res.status(201).json(vehicle)
})

// @desc    Vehicle exit
// @route   PUT /api/vehicles/:id/exit
export const vehicleExit = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id)

  if (!vehicle) {
    res.status(404)
    throw new Error('Vehicle not found')
  }

  if (vehicle.exitTime) {
    res.status(400)
    throw new Error('Vehicle has already exited')
  }

  const exitTime = new Date()
  const entryTime = new Date(vehicle.entryTime)
  const hours = Math.max(1, Math.ceil((exitTime - entryTime) / (1000 * 60 * 60)))
  const rate = RATES[vehicle.vehicleType] || 100

  vehicle.exitTime = exitTime
  vehicle.hours = hours
  vehicle.amount = hours * rate
  await vehicle.save()

  // Free the parking space
  await ParkingSpace.findOneAndUpdate(
    { id: vehicle.spaceId },
    { status: 'available', vehicle: null, occupiedAt: null }
  )

  res.json(vehicle)
})

// @desc    Mark vehicle as paid
// @route   PUT /api/vehicles/:id/pay
export const markAsPaid = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id)

  if (!vehicle) {
    res.status(404)
    throw new Error('Vehicle not found')
  }

  vehicle.paid = true
  await vehicle.save()

  res.json(vehicle)
})