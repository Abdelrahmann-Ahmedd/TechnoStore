"use client"
import React, { ReactNode } from 'react'

export default function Alert({children,error}:{children:ReactNode,error:boolean}) {
  return (
    <div className= {`alert alert-${error?"danger":"success"}`} role="alert">
        {children}
    </div>
  )
}
