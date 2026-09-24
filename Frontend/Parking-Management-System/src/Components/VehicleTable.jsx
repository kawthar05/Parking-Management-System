import { format } from 'date-fns'

const VehicleTable = ({ vehicles, showActions = false, onExit, onPay }) => {
  if (!vehicles.length) {
    return <p className="text-gray-500 text-center py-8">No vehicles found</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="px-4 py-3 font-medium">Plate</th>
            <th className="px-4 py-3 font-medium">Owner</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Space</th>
            <th className="px-4 py-3 font-medium">Entry</th>
            {showActions && <th className="px-4 py-3 font-medium">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y">
          {vehicles.map(v => (
            <tr key={v.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{v.plate}</td>
              <td className="px-4 py-3">{v.owner}</td>
              <td className="px-4 py-3 capitalize">{v.vehicleType}</td>
              <td className="px-4 py-3">{v.spaceId}</td>
              <td className="px-4 py-3">{format(new Date(v.entryTime), 'MMM d, HH:mm')}</td>
              {showActions && (
                <td className="px-4 py-3 space-x-2">
                  {!v.exitTime && (
                    <button onClick={() => onExit(v)} className="text-blue-600 hover:underline text-xs font-medium">
                      Process Exit
                    </button>
                  )}
                  {v.exitTime && !v.paid && (
                    <button onClick={() => onPay(v)} className="text-green-600 hover:underline text-xs font-medium">
                      Collect Payment
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default VehicleTable