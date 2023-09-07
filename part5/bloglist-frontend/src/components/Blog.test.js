import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'TOIMII',
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('TOIMII')
  expect(element).toBeDefined()
})

test('click button show more info', async () => {
    const blog = {
        title: 'asdasd',
        url: 'dsfs',
        likes: 1,
        user: {
            name: 'Superuser'
        }
    }

    render(
        <Blog blog={blog}/>
    )
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText('URL: dsfs')).toBeInTheDocument()
    expect(screen.getByText('Likes: 1')).toBeInTheDocument()
    expect(screen.getByText('Added by: Superuser')).toBeInTheDocument()
})