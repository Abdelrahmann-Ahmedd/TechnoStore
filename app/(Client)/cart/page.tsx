import CartView from '@/components/Sections/CartView'
import ProtectedRoute from '@/features/ProtectedRoute'

export default function cartPage() {

  return (
    <ProtectedRoute>
      <CartView />
    </ProtectedRoute>
  )
}
