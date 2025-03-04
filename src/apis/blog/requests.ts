import { useMutation, useQuery } from "@tanstack/react-query";
import { createBlogAction, deleteBlogAction, getBlogDetail, getBlogs } from "./actions";
import { CreateBlogInput, GetBlogDetailInput, GetBlogsInput } from "./dto";
import { Blog } from "@prisma/client";

export const useCreateBlog = () => useMutation<Blog, string, CreateBlogInput>({
    mutationKey: ["create-blog"],
    mutationFn: createBlogAction
})

export const useDeleteBlog = () => useMutation<Blog, string, { id: string }>({
    mutationKey: ["delete-blog"],
    mutationFn: deleteBlogAction
})

export const useGetBlogs = (props: GetBlogsInput) => useQuery({
    queryKey: ["blogs", props],
    queryFn: async () => await getBlogs(props)
})

export const useGetBlogDetail = (props: GetBlogDetailInput) => useQuery({
    queryKey: ["blogs", props],
    queryFn: async () => await getBlogDetail(props)
})
