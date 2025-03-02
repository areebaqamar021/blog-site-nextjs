import { getBlogDetail } from '@src/apis'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

type BlogDetailPageProps = {
    params: Promise<{
        blog_slug: string
    }>
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
    const slug = (await params).blog_slug
    const data = await getBlogDetail({ slug })
    return {
        title: data?.title,
        description: data?.description,
        openGraph: {
            images: "https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg",
            title: data?.title,
            description: data?.description,
            url: `/${data?.slug}`
        }
    }
}

async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const slug = (await params).blog_slug
    const data = await getBlogDetail({ slug })

    if (!data) {
        return notFound()
    }
    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
        </div>
    )
}

export default BlogDetailPage
