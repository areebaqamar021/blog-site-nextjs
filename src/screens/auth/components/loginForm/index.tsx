import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Link from 'next/link';
import { LoginInput, useAuth } from '@src/apis';

function Login() {

    const { mutateAsync: auth, isPending } = useAuth()

    const onFinish = (values: LoginInput) => {
        auth({ type: "login", input: values })
    };

    return (
        <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
                label={<span className="text-[#2d3748] font-medium">Email</span>}
                name="email"
                rules={[{ required: true, message: "Please enter your email!" }]}
            >
                <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
                label={<span className="text-[#2d3748] font-medium">Password</span>}
                name="password"
                rules={[{ required: true, message: "Please enter your password!" }]}
            >
                <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item className="flex justify-between items-center">
                <Checkbox className="text-[#2d3748]">Remember me</Checkbox>
                <Link href="/forgot-password" className="text-[#2b6cb0] hover:underline">
                    Forgot password?
                </Link>
            </Form.Item>
            <Form.Item>
                <Button
                    loading={isPending}
                    type="primary"
                    htmlType="submit"
                    className="w-full bg-[#2b6cb0] border-none text-white font-semibold py-2 hover:bg-[#2c5282]"
                >
                    Login
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Login
