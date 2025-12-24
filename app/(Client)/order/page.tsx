import OrderView from '@/components/Sections/OrderView'
import ProtectedRoute from '@/features/ProtectedRoute'

export default function page() {
  return (
    <ProtectedRoute>
      <OrderView/>
    </ProtectedRoute>
  )
}
