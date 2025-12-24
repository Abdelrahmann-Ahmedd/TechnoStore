import CartView from '@/features/CartView'
import ProtectedRoute from '@/features/ProtectedRoute'

export default function cartPage() {

  return (
    <ProtectedRoute>
      <CartView />
    </ProtectedRoute>
  )
}
