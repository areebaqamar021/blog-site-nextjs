import { Button } from 'antd';
import React from 'react';

function Banner() {
  return (
    <div className="w-full h-screen bg-customBeige flex flex-col justify-center items-center text-center border-b border-black">
      <h1 className="text-6xl font-bold text-black leading-tight">Human</h1>
      <h1 className="text-6xl font-bold text-black leading-tight">stories & ideas</h1>
      <p className="text-lg text-black mt-4">A place to read, write, and deepen your understanding</p>
      <Button className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold mt-6">Start reading</Button>
    </div>
  );
}

export default Banner;
