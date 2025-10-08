import CartView from '@/features/CartView'
import ProtectedRoute from '@/features/ProtectedRoute'
import React from 'react'

export default function cartPage() {

  return (
    <ProtectedRoute>
      <CartView />
    </ProtectedRoute>
  )
}
