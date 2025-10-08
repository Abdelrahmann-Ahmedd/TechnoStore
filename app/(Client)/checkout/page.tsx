import CheckoutView from '@/features/CheckoutView'
import ProtectedRoute from '@/features/ProtectedRoute'
import React from 'react'

export default function page() {
  return (
    <ProtectedRoute>
      <CheckoutView/>
    </ProtectedRoute>
  )
}
