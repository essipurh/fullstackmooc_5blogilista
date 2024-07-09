import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog  }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const resetBlogInputs = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const addBlog = (event) => {
    event.preventDefault()
    const newBlogObject = {
      author: author,
      title: title,
      url: url
    }
    createBlog(newBlogObject)
    resetBlogInputs()
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            data-testid='blogTitle'
            type="text"
            value={title}
            name="BlogTitle"
            id='blogTitle'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            data-testid='blogAuthor'
            type="text"
            value={author}
            name="BlogAuthor"
            id='blogAuthor'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            data-testid='blogUrl'
            type="text"
            value={url}
            name="BlogUrl"
            id="blogUrl"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm