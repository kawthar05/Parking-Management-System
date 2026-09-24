const statusColors = {
  available: 'bg-green-100 text-green-800 border-green-200',
  occupied: 'bg-red-100 text-red-800 border-red-200',
  reserved: 'bg-yellow-100 text-yellow-800 border-yellow-200'
}

const ParkingCard = ({ space }) => {
  return (
    <div className={`card border-2 ${statusColors[space.status]} text-center`}>
      <div className="text-2xl font-bold">{space.id}</div>
      <div className="text-xs uppercase tracking-wide mt-1 font-medium">
        {space.status}
      </div>
      {space.vehicleId && (
        <div className="text-xs mt-2 opacity-75">Vehicle: {space.vehicleId.slice(-4)}</div>
      )}
    </div>
  )
}

export default ParkingCard