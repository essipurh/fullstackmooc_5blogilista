import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)
  const displayBlogDetails = { display: visible ? '' : 'none' }

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
  


  return (
  <div className="blogPost">
    {blog.title} {blog.author}
    <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
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
  </div>  
)}

export default Blog