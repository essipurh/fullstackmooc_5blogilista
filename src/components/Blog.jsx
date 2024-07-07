import { useState } from "react"

const BlogRow = ({ displayBlogDetails, blog, addLike }) => (
  <div style={displayBlogDetails}>
    <div>{blog.url}</div>
    <div>
      likes {blog.likes}
      <button onClick={addLike}>like</button>
    </div>
    <div>
      {blog.user ? blog.user.name: ''}
    </div>
  </div>
)

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)
  const displayBlogDetails = { display: visible ? '' : 'none' }
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))

  const addLike = () => {
    const updatedBlogObject = { 
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    handleLike(blog.id, updatedBlogObject)
  }

  const deleteBlog = () => handleDelete(blog)
  const sameUser = user && blog.user && (blog.user.username === user.username) // ei paras, koska  mitä jos virheellisesti kaksi samannmistä useria.. id olisi parempi
  
  return (
  <div className="blogPost">
    {blog.title} {blog.author}
    <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
    <BlogRow displayBlogDetails={displayBlogDetails} blog={blog} addLike={addLike} deleteBlog={deleteBlog} />
    <div>
      {sameUser && <button className="deleteButton" onClick={deleteBlog}>delete</button>}
    </div>
  </div>  
)}

export default Blog