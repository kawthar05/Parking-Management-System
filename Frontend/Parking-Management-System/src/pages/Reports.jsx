import { useEffect, useState } from 'react'
import { vehicleService } from '../services/vehicleService'
import { paymentService } from '../services/paymentService'
import { parkingService } from '../services/parkingService'
import { format } from 'date-fns'

const Reports = () => {
  const [data, setData] = useState({ vehicles: [], payments: [], spaces: {} })

  useEffect(() => {
    Promise.all([
      vehicleService.getAll(),
      paymentService.getAll(),
      parkingService.getStats()
    ]).then(([vehicles, payments, spaces]) => {
      setData({ vehicles, payments, spaces })
    })
  }, [])

  const completed = data.vehicles.filter(v => v.exitTime)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="font-semibold mb-3">Occupancy Summary</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Total Spaces</span><strong>{data.spaces.total}</strong></li>
            <li className="flex justify-between"><span>Currently Occupied</span><strong>{data.spaces.occupied}</strong></li>
            <li className="flex justify-between"><span>Available</span><strong>{data.spaces.available}</strong></li>
            <li className="flex justify-between"><span>Utilization</span>
              <strong>{data.spaces.total ? Math.round((data.spaces.occupied / data.spaces.total) * 100) : 0}%</strong>
            </li>
          </ul>
        </div>

        <div className="card">
          <h2 className="font-semibold mb-3">Financial Summary</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Total Vehicles Processed</span><strong>{completed.length}</strong></li>
            <li className="flex justify-between"><span>Total Revenue</span>
              <strong className="text-green-600">₦{data.payments.reduce((s, p) => s + p.amount, 0).toLocaleString()}</strong>
            </li>
            <li className="flex justify-between"><span>Average Ticket</span>
              <strong>₦{completed.length ? Math.round(data.payments.reduce((s, p) => s + p.amount, 0) / completed.length) : 0}</strong>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h2 className="font-semibold mb-4">Recent Completed Sessions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-2">Plate</th>
                <th className="px-4 py-2">Entry</th>
                <th className="px-4 py-2">Exit</th>
                <th className="px-4 py-2">Hours</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {completed.slice(-10).reverse().map(v => (
                <tr key={v.id}>
                  <td className="px-4 py-2 font-medium">{v.plate}</td>
                  <td className="px-4 py-2">{format(new Date(v.entryTime), 'MMM d HH:mm')}</td>
                  <td className="px-4 py-2">{format(new Date(v.exitTime), 'MMM d HH:mm')}</td>
                  <td className="px-4 py-2">{v.hours || '-'}</td>
                  <td className="px-4 py-2">₦{v.amount?.toLocaleString() || 0}</td>
                  <td className="px-4 py-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${v.paid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {v.paid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Reports