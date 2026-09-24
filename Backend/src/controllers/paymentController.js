import asyncHandler from 'express-async-handler'
import Payment from '../models/Payment.js'
import Vehicle from '../models/Vehicle.js'

// @desc    Get all payments
// @route   GET /api/payments
export const getAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find().sort({ date: -1 })
  res.json(payments)
})

// @desc    Create payment
// @route   POST /api/payments
export const createPayment = asyncHandler(async (req, res) => {
  const { vehicleId, plate, amount, method } = req.body

  const payment = await Payment.create({
    vehicle: vehicleId,
    plate,
    amount,
    method: method || 'cash'
  })

  // Mark vehicle as paid
  await Vehicle.findByIdAndUpdate(vehicleId, { paid: true })

  res.status(201).json(payment)
})

// @desc    Get payment stats
// @route   GET /api/payments/stats
export const getPaymentStats = asyncHandler(async (req, res) => {
  const payments = await Payment.find()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayPayments = payments.filter(p => new Date(p.date) >= today)

  res.json({
    totalRevenue: payments.reduce((sum, p) => sum + p.amount, 0),
    todayRevenue: todayPayments.reduce((sum, p) => sum + p.amount, 0),
    totalTransactions: payments.length,
    todayTransactions: todayPayments.length
  })
})