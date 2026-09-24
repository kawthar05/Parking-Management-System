import express from 'express'
import {
  getAllPayments,
  createPayment,
  getPaymentStats
} from '../controllers/paymentController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)

router.get('/', getAllPayments)
router.post('/', createPayment)
router.get('/stats', getPaymentStats)

export default router