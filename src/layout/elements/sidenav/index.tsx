import React from 'react'
import Link from 'next/link';
import { Layout, Menu } from 'antd';

const items = [
  // {
  //   label: <Link href='/'>Home</Link>,
  //   key: 'home',
  // },
  {
    label: <Link href='/dashboard'>Dashboard</Link>,
    key: 'dashboard',
  },
  {
    label: <Link href='/dashboard/blogs'>Blogs</Link>,
    key: 'blogs',
  },
  {
    label: <Link href=''>Issues</Link>,
    key: 'issues',
  },
  {
    label: <Link href=''>Announcements</Link>,
    key: 'announcements',
  },
  {
    label: <Link href='/about'>About</Link>,
    key: 'about',
  },
  {
    label: <Link href='/contact'>Contact</Link>,
    key: 'contacts',
  },
];

function SideNav() {
  return (
      <Layout.Sider theme='light' className='h-full bg-customBeige'>
        <Link href='/dashboard'>
        <h1 className='text-black font-bold text-3xl m-6'>Medium</h1></Link>
        <Menu mode="inline" items={items} className='bg-customBeige'/>
      </Layout.Sider>
  )
}

export default SideNav
