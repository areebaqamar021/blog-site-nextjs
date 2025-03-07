"use client"
import React from 'react'
import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Login, SignUp } from './components';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Login',
        children: <Login />,
    },
    {
        key: '2',
        label: 'SignUp',
        children: <SignUp />,
    },
];

function AuthScreen() {
    return (
        <div className='h-full flex justify-center items-center bg-customBeige'>
            <Card className='w-96'>
                <Tabs type='card' className='[&_.ant-tabs-nav-list]:w-full [&_.ant-tabs-tab]:flex-1' defaultActiveKey="1" items={items} onChange={onChange} />
            </Card>
        </div>
    )
}

export default AuthScreen
