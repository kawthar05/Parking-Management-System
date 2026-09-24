import { useState, useEffect } from 'react'
import { vehicleService } from '../services/vehicleService'
import { parkingService } from '../services/parkingService'

const VehicleEntry = () => {
  const [form, setForm] = useState({ plate: '', owner: '', vehicleType: 'car', spaceId: '' })
  const [available, setAvailable] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    parkingService.getAvailable().then(setAvailable)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    try {
      const vehicle = await vehicleService.entry(form)
      await parkingService.occupy(form.spaceId, vehicle.id)
      setMessage(`Vehicle ${vehicle.plate} parked in ${form.spaceId}`)
      setForm({ plate: '', owner: '', vehicleType: 'car', spaceId: '' })
      parkingService.getAvailable().then(setAvailable)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Vehicle Entry</h1>
      <div className="card">
        {message && <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm">{message}</div>}
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">License Plate</label>
            <input className="input uppercase" value={form.plate} onChange={e => setForm({ ...form, plate: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Owner Name</label>
            <input className="input" value={form.owner} onChange={e => setForm({ ...form, owner: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vehicle Type</label>
            <select className="input" value={form.vehicleType} onChange={e => setForm({ ...form, vehicleType: e.target.value })}>
              <option value="car">Car</option>
              <option value="suv">SUV</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="truck">Truck</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Parking Space</label>
            <select className="input" value={form.spaceId} onChange={e => setForm({ ...form, spaceId: e.target.value })} required>
              <option value="">Select available space</option>
              {available.map(s => (
                <option key={s.id} value={s.id}>{s.id} (Zone {s.zone})</option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={loading || !available.length} className="btn-primary w-full">
            {loading ? 'Processing...' : 'Record Entry'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default VehicleEntry