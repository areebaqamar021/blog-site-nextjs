import { Spin } from 'antd'
import React from 'react'

function LoadingPage() {
    return (
        <div className='flex h-full justify-center items-center'>
            <Spin />
        </div>
    )
}

export default LoadingPage
