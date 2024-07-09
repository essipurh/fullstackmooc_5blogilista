import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let blogElement
  let mockDelete
  let mockLike

  beforeEach(() => {
    const blog = {
      title: 'Frontti testaus blogi',
      author: 'Testaus Author',
      url: 'www.testurl.fi',
      likes:2,
      user: {
        id: '1234567'
      }
    }
    mockLike = vi.fn()
    mockDelete = vi.fn()
    blogElement = render(
      <Blog blog={blog} handleLike={mockLike} handleDelete={mockDelete} />
    ).container
  })

  test('renders components', () => {
    screen.getByText('Frontti testaus blogi Testaus Author')
    screen.getByText('www.testurl.fi')
    screen.getByText('likes 2')
  })

  test('at the beginning only title and author displayed', () => {
    const div = blogElement.querySelector('.blogDetails')
    expect(div).toHaveStyle('display: none')
  })

  test('when button view cliked, url and likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = blogElement.querySelector('.blogDetails')
    expect(div).not.toHaveStyle('display: none')
  })

  test('when button hide cliked, url and likes are hidden', async () => {
    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)
    const hide = screen.getByText('hide')
    await user.click(hide)
    const div = blogElement.querySelector('.blogDetails')
    expect(div).toHaveStyle('display: none')
  })

  test('when button like clicked twice function called twice', async () => {
    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)
    const likeBtn = screen.getByText('like')
    await user.click(likeBtn)
    await user.click(likeBtn)
    expect(mockLike.mock.calls).toHaveLength(2)
    expect(mockDelete.mock.calls).toHaveLength(0)
  })
})


