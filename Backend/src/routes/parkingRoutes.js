import express from 'express'
import {
  getAllSpaces,
  getAvailableSpaces,
  getStats,
  occupySpace,
  freeSpace
} from '../controllers/parkingController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)

router.get('/', getAllSpaces)
router.get('/available', getAvailableSpaces)
router.get('/stats', getStats)
router.put('/:id/occupy', occupySpace)
router.put('/:id/free', freeSpace)

export default router