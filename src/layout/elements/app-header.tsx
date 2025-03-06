import { Button, Input, Layout } from 'antd';
import React from 'react';
import Link from 'next/link';
import { useSignout, useUser } from '@src/apis';
import { SearchOutlined } from '@ant-design/icons';
// import Image from 'next/image';
import { usePathname } from 'next/navigation';

const { Header } = Layout;

function AppHeader() {
  const { data: user } = useUser();
  const { mutateAsync: signOut } = useSignout();
  const pathname = usePathname();

  return (
    <Header className='bg-customBeige flex justify-between items-center h-20 px-6 border-b border-black'>
      {user ? (
        <Input className='w-52' placeholder='Search' prefix={<SearchOutlined />} />
      ) : (
        <Link href="/">
          {/* <Image src={"/images/logo.png"} alt='' width={100} height={100} /> */}
          <h1 className='text-black font-bold text-3xl'>Medium</h1>
        </Link>
      )}

      <div className="flex items-center space-x-6">
        {user ? (
          <Button
            type="text"
            onClick={() => signOut()}
            className="text-xl font-semibold"
          >
            Logout
          </Button>
        ) : (
          pathname !== "/auth" && (
            <>
              <nav className="hidden md:flex space-x-6 text-sm font-semibold">
                <Link href="/our-story" className='text-black'>Our Story</Link>
                <Link href="/membership" className='text-black'>Membership</Link>
                <Link href="/write" className='text-black'>Write</Link>
              </nav>
              <Link href="/auth">
                <Button type="text" className="text-sm font-semibold text-black">
                  Sign in
                </Button>
              </Link>
              <Link href="/get-started">
                <Button className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Get started
                </Button>
              </Link>
            </>
          )
        )}
      </div>
    </Header>
  );
}

export default AppHeader;
