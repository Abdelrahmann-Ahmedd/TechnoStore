import React from 'react'
import MainLoader from '../Ui/MainLoader'

export default function LoadingPage() {
  return (
    <div className=' vh-100 d-flex justify-content-center align-items-center'>
        <MainLoader color='#007bff'/>
    </div>
  )
}
