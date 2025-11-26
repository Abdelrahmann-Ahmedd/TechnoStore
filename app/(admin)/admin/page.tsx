import ProtectedAdminRoute from '@/features/ProtectedAdminRoute'
import React from 'react'

export default function  page() {
  return (
    <ProtectedAdminRoute>
      <div>home admin page</div>
    </ProtectedAdminRoute>
  )
}
