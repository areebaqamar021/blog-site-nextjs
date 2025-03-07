"use client";
import React, { useState } from 'react';
import { Button, Card, Col, Input, Modal, Row, Select } from 'antd';
import Link from 'next/link';
import { useDeleteBlog, useGetBlogs } from '@src/apis';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { useDebounce } from '@src/hooks';

function BlogsScreen() {
    const [published, setPublished] = useState<string>("");
    const [search, setSearch] = useState("");
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

    const query = useDebounce(search, 500);
    const { mutate: deleteBlog } = useDeleteBlog();

    const handleDelete = (id: string) => {
        setSelectedBlogId(id);
        setDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        if (selectedBlogId) {
            deleteBlog({ id: selectedBlogId });
            setDeleteModalVisible(false);
            setSelectedBlogId(null);
        }
    };

    const { data: blogs } = useGetBlogs({
        user: true,
        published: published === "" ? undefined : published === "published",
        query: query === "" ? undefined : query,
    });

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
            <Row gutter={16} className="px-5">
                {blogs?.map(blog => (
                    <Col key={blog.id} xs={24} sm={12} md={8} lg={6} className="mb-6">
                        <Link href={`/${blog.slug}`} className="block">
                            <Card
                                title={
                                    <div className="flex justify-between items-center">
                                        <div className="font-semibold text-lg">{blog.title}</div>
                                        <div className="flex space-x-3">
                                            <EditOutlined
                                                className="text-black cursor-pointer text-lg"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    // Add your edit logic here
                                                }}
                                            />
                                            <DeleteOutlined
                                                className="text-black cursor-pointer text-lg"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleDelete(blog.id);
                                                }}
                                            />
                                        </div>
                                    </div>
                                }
                                variant="borderless"
                                className="shadow-md"
                            >
                                <div className="text-gray-600 text-sm">{blog.description}</div>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            <Modal
                title="Confirm Delete"
                visible={deleteModalVisible}
                onOk={confirmDelete}
                onCancel={() => setDeleteModalVisible(false)}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this blog?</p>
            </Modal>
        </div>
    );
}

export default BlogsScreen;
