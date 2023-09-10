import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm updates parent', () => {
    const createBlog = jest.fn()

    const component = render(
        <BlogForm createBlog={createBlog} />
    )

    const titleInput = component.container.querySelector('input[name="title"]')
    const authorInput = component.container.querySelector('input[name="author"]')
    const urlInput = component.container.querySelector('input[name="url"]')
    const form = component.container.querySelector('form')

    userEvent.type(titleInput, 'Testing')
    userEvent.type(authorInput, 'Tester')
    userEvent.type(urlInput, 'http://test.com')
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Testing')
    expect(createBlog.mock.calls[0][0].author).toBe('Tester')
    expect(createBlog.mock.calls[0][0].url).toBe('http://test.com')
})