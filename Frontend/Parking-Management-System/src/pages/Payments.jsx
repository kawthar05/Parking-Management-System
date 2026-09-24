import { useEffect, useState } from 'react'
import { paymentService } from '../services/paymentService'
import PaymentTable from '../components/PaymentTable'

const Payments = () => {
  const [payments, setPayments] = useState([])
  const [stats, setStats] = useState({})

  useEffect(() => {
    Promise.all([paymentService.getAll(), paymentService.getStats()]).then(([p, s]) => {
      setPayments(p)
      setStats(s)
    })
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payments</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="card">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">₦{(stats.totalRevenue || 0).toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Today's Revenue</p>
          <p className="text-2xl font-bold text-blue-600">₦{(stats.todayRevenue || 0).toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Total Transactions</p>
          <p className="text-2xl font-bold">{stats.totalTransactions || 0}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Payment History</h2>
        <PaymentTable payments={payments} />
      </div>
    </div>
  )
}

export default Payments