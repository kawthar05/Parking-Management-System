import { format } from 'date-fns'

const PaymentTable = ({ payments }) => {
  if (!payments.length) {
    return <p className="text-gray-500 text-center py-8">No payments yet</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Plate</th>
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Method</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {payments.map(p => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{format(new Date(p.date), 'MMM d, yyyy HH:mm')}</td>
              <td className="px-4 py-3 font-medium">{p.plate}</td>
              <td className="px-4 py-3 font-semibold text-green-700">₦{p.amount.toLocaleString()}</td>
              <td className="px-4 py-3 capitalize">{p.method}</td>
              <td className="px-4 py-3">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PaymentTable