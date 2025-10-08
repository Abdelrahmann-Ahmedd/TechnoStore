import LoginForm from '@/features/LoginForm'
import React from 'react'

export default function page() {
  return (
    <div className='container w-75 m-auto mt-5'>
      <h1 className='mb-5'>Login</h1>
      <LoginForm />
    </div>
  )
}
