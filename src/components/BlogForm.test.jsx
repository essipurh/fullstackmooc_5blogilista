import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { beforeEach } from 'vitest'

describe('<BlogForm />', () => {
  let formElement
  let createBlog

  beforeEach(() => {
    createBlog = vi.fn()
    formElement = render(
      <BlogForm createBlog={createBlog}/>
    ).container
  })

  test('BlogForm tested; blog and calls onSubmit', async () => {
    const user = userEvent.setup()
    const titleInput = formElement.querySelector('#blogTitle')
    const authorInput = formElement.querySelector('#blogAuthor')
    const urlInput = formElement.querySelector('#blogUrl')
    const createButton = screen.getByText('Create')

    await user.type(titleInput, 'Test From title')
    await user.type(authorInput, 'Test From author')
    await user.type(urlInput, 'Test From url')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test From title')
    expect(createBlog.mock.calls[0][0].author).toBe('Test From author')
    expect(createBlog.mock.calls[0][0].url).toBe('Test From url')
  })

})

