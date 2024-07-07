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
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const notificationMessages = (messagesList, msgType) => {
    const messagesString = messagesList.map(er => er.message).join(' ')
    setNotification({ type: msgType, message: messagesString})
    setTimeout(() => { setNotification(null) }, 5000)
  }

  const handleLogin = async (userLoginDetails) => {
    try {
      const user = await loginService.login(userLoginDetails)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
    } catch (error) {
      notificationMessages(Object.values(error.response.data), 'error')
    }    
  }

  const createBlog = async (newBlogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(newBlogObject)
      setBlogs(blogs.concat(returnedBlog))
      notificationMessages([{message:`A new blog ${returnedBlog.name} by ${returnedBlog.author} added`}], 'confirmation')
    } catch (error) {
      console.log(error)
      notificationMessages(Object.values(error.response.data.error), 'error')
    }
  }

  return (
    <div>
      {user === null
        ? <div>
            <h2>Login</h2>
            <Notification notification={notification} />
            <Login handleLogin={handleLogin} />
          </div>
        : <div>
            <h2>blogs</h2>
            <Notification notification={notification} />
            <User user={user} handleLogout={handleLogout}/>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <h2>create new</h2>
              <BlogForm createBlog={createBlog}/>
            </Togglable>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
      }
    </div>
  )
}

export default App