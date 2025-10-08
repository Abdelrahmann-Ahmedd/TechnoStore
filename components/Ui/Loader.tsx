import React from 'react'
import { DotPulse } from 'ldrs/react'
import 'ldrs/react/DotPulse.css'

export default function Loader() {
    return (
        <DotPulse
        size="35"
        speed="1.3"
        color="white" />
    )
}
