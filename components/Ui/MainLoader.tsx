import React from 'react'
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'

export default function MainLoader({color}:{color:string}) {
    return (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            <Waveform
            size="45"
            stroke="3.5"
            speed="1"
            color={color} 
            />
        </div>
    )
}
