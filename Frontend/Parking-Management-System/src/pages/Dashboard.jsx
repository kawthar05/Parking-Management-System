import { useEffect, useState } from 'react'
import { parkingService } from '../services/parkingService'
import { vehicleService } from '../services/vehicleService'
import { paymentService } from '../services/paymentService'
import { Car, ParkingSquare, DollarSign, Users } from 'lucide-react'

const Dashboard = () => {
  const [stats, setStats] = useState({ spaces: {}, vehicles: 0, payments: {} })

  useEffect(() => {
    const load = async () => {
      const [spaceStats, vehicles, paymentStats] = await Promise.all([
        parkingService.getStats(),
        vehicleService.getActive(),
        paymentService.getStats()
      ])
      setStats({ spaces: spaceStats, vehicles: vehicles.length, payments: paymentStats })
    }
    load()
  }, [])

  const cards = [
    { label: 'Total Spaces', value: stats.spaces.total || 0, icon: ParkingSquare, color: 'bg-blue-500' },
    { label: 'Available', value: stats.spaces.available || 0, icon: Car, color: 'bg-green-500' },
    { label: 'Occupied', value: stats.spaces.occupied || 0, icon: Users, color: 'bg-red-500' },
    { label: "Today's Revenue", value: `₦${(stats.payments.todayRevenue || 0).toLocaleString()}`, icon: DollarSign, color: 'bg-emerald-500' },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map(c => (
          <div key={c.label} className="card flex items-center gap-4">
            <div className={`${c.color} p-3 rounded-xl text-white`}>
              <c.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{c.label}</p>
              <p className="text-2xl font-bold">{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600">{stats.vehicles}</p>
            <p className="text-sm text-gray-500">Active Vehicles</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-600">₦{(stats.payments.totalRevenue || 0).toLocaleString()}</p>
            <p className="text-sm text-gray-500">Total Revenue</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-600">{stats.payments.totalTransactions || 0}</p>
            <p className="text-sm text-gray-500">Transactions</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-600">{stats.spaces.reserved || 0}</p>
            <p className="text-sm text-gray-500">Reserved</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard