"use client"
import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import AppHeader from './elements/app-header';
import SideNav from '@src/layout/elements/sidenav';
import { useUser } from '@src/apis';
// import AppFooter from './elements/app-footer';

const { Content } = Layout;

function AppLayout({ children }: { children: ReactNode }) {
  const { data: user } = useUser()
  return (
    <Layout className='h-full'>
      {user && <SideNav />}
      <Layout>
        <AppHeader />
        <Content className='overflow-y-auto'>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout