/*import { paymentService } from '../services/paymentService'


const handlePay = async (vehicle) => {
  try {
    await paymentService.create({
      vehicleId: vehicle._id,   //important to use vehicle._id instead of vehicle.id
      plate: vehicle.plate,
      amount: vehicle.amount,
      method: 'cash'
    })
    // No need to call markPaid since the paymentService.create should handle that
    setMessage(`Payment of ₦${vehicle.amount} collected for ${vehicle.plate}`)
    setSelected(null)
    load()
  } catch (err) {
    alert(err.response?.data?.message || err.message)
  }
}

export default handlePay*/

import { useEffect, useState } from 'react'
import { vehicleService } from '../services/vehicleService'
import { paymentService } from '../services/paymentService'
import VehicleTable from '../components/VehicleTable'

const VehicleExit = () => {
  const [vehicles, setVehicles] = useState([])
  const [selected, setSelected] = useState(null)
  const [message, setMessage] = useState('')

  const load = async () => {
    try {
      const data = await vehicleService.getActive()
      setVehicles(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleExit = async (vehicle) => {
    try {
      const exited = await vehicleService.exit(vehicle._id)
      setSelected(exited)
      setMessage(`Exit processed. Amount due: ₦${exited.amount}`)
      load()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  const handlePay = async (vehicle) => {
    try {
      await paymentService.create({
        vehicleId: vehicle._id,
        plate: vehicle.plate,
        amount: vehicle.amount,
        method: 'cash'
      })

      setMessage(`Payment of ₦${vehicle.amount} collected for ${vehicle.plate}`)
      setSelected(null)
      load()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Vehicle Exit</h1>

      {message && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-4 flex justify-between items-center">
          <span>{message}</span>
          {selected && !selected.paid && (
            <button
              onClick={() => handlePay(selected)}
              className="btn-primary text-sm"
            >
              Collect ₦{selected.amount}
            </button>
          )}
        </div>
      )}

      <div className="card">
        <VehicleTable
          vehicles={vehicles}
          showActions
          onExit={handleExit}
          onPay={handlePay}
        />
      </div>
    </div>
  )
}

export default VehicleExit