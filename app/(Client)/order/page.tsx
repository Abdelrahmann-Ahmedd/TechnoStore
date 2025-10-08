import OrderView from '@/features/OrderView'
import ProtectedRoute from '@/features/ProtectedRoute'
import React from 'react'

export default function page() {
  return (
    <ProtectedRoute>
      <OrderView/>
    </ProtectedRoute>
  )
}
