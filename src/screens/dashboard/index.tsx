"use client"
import React from 'react';
import { Card, Col, Row } from 'antd';
import { useGetBlogs } from '@src/apis';
import Link from 'next/link';

const DashBoardScreen = () => {
  // Fetch only published posts
  const { data: blogs } = useGetBlogs({
    user: true,
    published: true, // Show only published blogs
  });

  return (
    <div className='p-5'>
      <Row gutter={16}>
        {blogs?.map(blog => (
          <Col key={blog.id} xs={24} sm={12} md={8} lg={6}>
            <Link href={`/${blog.slug}`} className='block'>
              <Card title={blog.title} variant='borderless' hoverable>
                <div className='text-gray-600 text-sm'>{blog.description}</div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashBoardScreen;
