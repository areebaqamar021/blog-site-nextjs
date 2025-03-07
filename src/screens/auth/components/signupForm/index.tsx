import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Link from 'next/link';
import { SignUpInput, useAuth } from '@src/apis';

function SignUp() {

  const { mutateAsync: auth, isPending } = useAuth()

  const onFinish = (values: SignUpInput) => {
    auth({ type: "signup", input: values })
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label={<span className="text-black font-medium">Email</span>}
        name="email"
        rules={[{ required: true, message: "Please enter your email!" }]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>
      <Form.Item
        label={<span className="text-black font-medium">Name</span>}
        name="name"
        rules={[{ required: true, message: "Please enter your name!" }]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>
      <Form.Item
        label={<span className="text-black font-medium">Password</span>}
        name="password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>
      <Form.Item className="flex justify-between items-center">
        <Checkbox className="text-black">
          <span>Accept  </span>
          <Link href="" className="text-black hover:underline">
            Terms
          </Link>
          <span>&</span>
          <Link href="" className="text-black hover:underline">
            Conditions
          </Link>
        </Checkbox>

      </Form.Item>
      <Form.Item>
        <Button
          loading={isPending}
          type="primary"
          htmlType="submit"
          className="w-full bg-black border-none text-white font-semibold py-2"
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SignUp
