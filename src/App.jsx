import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import User from './components/User'
import Togglable from './components/Togglabel'
import BlogForm from './components/BlogForm'
import Notification from './components/NotificationBanner'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      const returnedBlogs = await blogService.getAll()
      returnedBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
      setBlogs(returnedBlogs)
    }) ();
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const blogFormRef = useRef()
  const notificationRef = useRef()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleLogin = async (userLoginDetails) => {
    try {
      const user = await loginService.login(userLoginDetails)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
    } catch (error) {
      notificationRef.current.notificationMessages(Object.values(error.response.data), 'error')
    }    
  }

  const createBlog = async (newBlogObject) => {
    try {
      const returnedBlog = await blogService.create(newBlogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog))
      notificationRef.current.notificationMessages([{message:`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`}], 'confirmation')
    } catch (error) {
      console.log(error)
      notificationRef.current.notificationMessages(Object.values(error.response.data.error), 'error')
    }
  }

  const updateLikes = async (objectId, updatedBlogObject) => {
    try {
      const returnedBlog = await blogService.update(objectId, updatedBlogObject)
      setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog).sort((blog1, blog2) => blog2.likes - blog1.likes))
      notificationRef.current.notificationMessages([{message:`${returnedBlog.title} by ${returnedBlog.author} liked.`}], 'confirmation')
    } catch (error) {
      console.log(error)
      notificationRef.current.notificationMessages(Object.values(error.response.data.error), 'error')
    }
  }

  const deleteBlog = async (blogToBeDeleted) => {
    if (!window.confirm(`Remove blog ${blogToBeDeleted.title} by ${blogToBeDeleted.author}?`)) { return }
    try {
      const response = await blogService.remove(blogToBeDeleted.id)
      console.log(response)
      setBlogs(blogs.filter(blog => blog.id !== blogToBeDeleted.id))
      notificationRef.current.notificationMessages([{message:`${blogToBeDeleted.title} by ${blogToBeDeleted.author} deleted.`}], 'confirmation')
    } catch (error) {
      console.log(error)
      notificationRef.current.notificationMessages(Object.values(error.response.data.error), 'error')
    }
  }

  return (
    <div>
      {user === null
        ? <div>
            <h2>Login</h2>
            <Notification ref={notificationRef} />
            <Login handleLogin={handleLogin} />
          </div>
        : <div>
            <h2>blogs</h2>
            <Notification ref={notificationRef} />
            <User user={user} handleLogout={handleLogout}/>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm createBlog={createBlog}/>
            </Togglable>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} handleLike={updateLikes} handleDelete={deleteBlog} />
            )}
          </div>
      }
    </div>
  )
}

export default App