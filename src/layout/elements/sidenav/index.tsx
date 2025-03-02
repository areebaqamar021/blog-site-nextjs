import React from 'react'
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import Image from 'next/image';

const items = [
  {
    label: <Link href='/'>Home</Link>,
    key: 'home',
  },
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
      <Layout.Sider theme='light' className='h-full'>
        <Link href='/dashboard'>
        <Image src={"/images/logo.png"} alt='' width={100} height={100} /></Link>
        <Menu mode="inline" items={items} />
      </Layout.Sider>
  )
}

export default SideNav
