import express from 'express'
import {
  getAllVehicles,
  getActiveVehicles,
  vehicleEntry,
  vehicleExit,
  markAsPaid
} from '../controllers/vehicleController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)

router.get('/', getAllVehicles)
router.get('/active', getActiveVehicles)
router.post('/entry', vehicleEntry)
router.put('/:id/exit', vehicleExit)
router.put('/:id/pay', markAsPaid)

export default router