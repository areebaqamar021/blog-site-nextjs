import { Button, Input, Layout } from 'antd';
import React from 'react';
import Link from 'next/link';
import { useSignout, useUser } from '@src/apis';
import { SearchOutlined } from '@ant-design/icons';
// import Image from 'next/image';
import { usePathname } from 'next/navigation';
const { Header } = Layout

function AppHeader() {
  const { data: user } = useUser()
  const { mutateAsync: signOut } = useSignout();
  const pathname = usePathname();
  return (
    <Header className='bg-customBeige flex justify-between items-center h-20'>
      {user ? (<Input className='w-52' placeholder='Search' prefix={<SearchOutlined />} />) : (
        <Link href="/">
          {/* <Image src={"/images/logo.png"} alt='' width={100} height={100} /> */}
          <h1 className='w-20 text-black font-bold text-3xl text-center'>Medium</h1>
        </Link>
      )}
      {user ? (
        <Button
          type="text"
          onClick={() => signOut()}
          className="text-xl font-semibold"
        >
          Logout
        </Button>
      ) : (
        pathname !== "/auth" && <Link href="/auth">
          <Button
            type="text"
            className="text-xl font-semibold"
          >
            Login
          </Button>
        </Link>
      )}
    </Header>
  )
}

export default AppHeader