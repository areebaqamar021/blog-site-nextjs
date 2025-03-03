"use client"
import { CreateBlogInput, useCreateBlog } from '@src/apis'
import { convertToSlug, validateSlug } from '@src/helpers'
import { Button, Form, Input, Switch } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function CreateBlogScreen() {
  const { replace } = useRouter()
  const [form] = Form.useForm<CreateBlogInput>()
  const title = Form.useWatch("title", form)

  const { mutateAsync: createBlog, isPending } = useCreateBlog()

  const onFinish = async (props: CreateBlogInput) => {
    await createBlog(props, {
      onSuccess: (data) => {
        replace(`/${data.slug}`)
      }
    })
  }

  useEffect(() => {
    if (title !== undefined) {
      form.setFieldValue("slug", convertToSlug(title))
    }
  }, [title, form])

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        layout='vertical'
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please fill out this field!" }]}
        >
          <Input placeholder='Title' />
        </Form.Item>
        <Form.Item
          label="Slug"
          name="slug"
          rules={[
            { required: true, message: "Please fill out this field!" },
            () => ({
              validator: (_, value) => {
                const isSuccess = validateSlug(value)
                return isSuccess ? Promise.resolve() : Promise.reject("Slug must only contain lowercase letters, numbers, and hyphens without consecutive hyphens.")
              }
            })
          ]}
        >
          <Input placeholder='Slug' />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please fill out this field!" }]}
        >
          <Input.TextArea rows={5} placeholder='Description' />
        </Form.Item>
        <Form.Item
          label="Published"
          name="published"
          valuePropName='checked'
        >
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' loading={isPending} type='primary' block>
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateBlogScreen
