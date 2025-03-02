"use client"
import { Result } from 'antd'
import React from 'react'

function NotFoundScreen() {
    return (
        <div>
            <Result
                status={'404'}
                title="Blog Not found!"
            />
        </div>
    )
}

export default NotFoundScreen
