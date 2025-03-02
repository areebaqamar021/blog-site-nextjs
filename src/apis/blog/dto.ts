import { Prisma } from '@prisma/client'

export type CreateBlogInput = Prisma.BlogCreateInput

export type GetBlogsInput = {
    published?: boolean;
    user?: boolean;
    query?: string
}

export type GetBlogDetailInput = {
    slug: string
}