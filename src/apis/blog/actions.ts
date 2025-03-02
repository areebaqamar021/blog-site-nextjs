"use server"

import { db } from "@src/lib"
import { CreateBlogInput, GetBlogDetailInput, GetBlogsInput } from "./dto"
import { getUser } from "../auth"

export const createBlogAction = async (data: CreateBlogInput) => {
    const user_id = (await getUser())?.id
    return await db.blog.create({
        data: {
            ...data,
            user: {
                connect: { id: user_id },
            }

        }
    })
}


export const getBlogs = async (props: GetBlogsInput) => {
    const { published, user, query } = props
    const user_id = (await getUser())?.id
    return db.blog.findMany({
        where: {
            published,
            user_id: user ? user_id : undefined,
            title: { contains: query, mode: "insensitive" },
        }
    })
}

export const getBlogDetail = async (props: GetBlogDetailInput) => {
    return db.blog.findUnique({
        where: {
            slug: props.slug
        }
    })
}