import { useEffect, useState } from 'react'
import { parkingService } from '../services/parkingService'
import ParkingCard from '../components/ParkingCard'

const ParkingSpaces = () => {
  const [spaces, setSpaces] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    parkingService.getAll().then(setSpaces)
  }, [])

  const filtered = filter === 'all' ? spaces : spaces.filter(s => s.status === filter)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Parking Spaces</h1>
        <div className="flex gap-2">
          {['all', 'available', 'occupied', 'reserved'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {filtered.map(space => (
          <ParkingCard key={space.id} space={space} />
        ))}
      </div>
    </div>
  )
}

export default ParkingSpaces