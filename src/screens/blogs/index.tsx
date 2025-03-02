"use client"
import React, { useState } from 'react'
import { Button, Card, Col, Input, Row, Select } from 'antd';
import Link from 'next/link';
import { useGetBlogs } from '@src/apis';
import { SearchOutlined } from '@ant-design/icons';
import { useDebounce } from '@src/hooks';

function BlogsScreen() {
    const [published, setPublished] = useState<string>("")
    const [search, setSearch] = useState("")

    const query = useDebounce(search, 500)

    const { data: blogs } = useGetBlogs({
        user: true,
        published: published === "" ? undefined : published === "published",
        query: query === "" ? undefined : query

    })

    return (
        <div>
            <div className='p-5 flex justify-between'>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search for blogs"
                    onChange={e => setSearch(e.target.value)}
                    style={{ width: 300 }}
                    value={search}
                    allowClear
                />
                <Select
                    className='w-40'
                    value={published}
                    onChange={setPublished}
                    options={[
                        { label: "All", value: "" },
                        { label: "Published", value: "published" },
                        { label: "Not Published", value: "not-published" },
                    ]}
                />
                <Link href='/dashboard/blogs/createblog'>
                    <Button>Create Blog</Button>
                </Link>
            </div>
            <Row gutter={16}>
                {blogs?.map(blog => (
                    <Col key={blog.id}>
                        <Link href={`/${blog.slug}`}>
                            <Card>
                                <Card.Meta
                                    title={blog.title}
                                    description={blog.description}
                                />
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default BlogsScreen;
