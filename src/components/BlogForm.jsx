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
            type="text"
            value={title}
            name="BlogTitle"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="BlogAuthor"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="BlogUrl"
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