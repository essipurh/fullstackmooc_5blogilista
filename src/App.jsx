import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import User from './components/User'
import BlogForm from './components/BlogForm'
import Notification from './components/NotificationBanner'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
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

  const notificationMessages = (messagesList, msgType) => {
    const messagesString = messagesList.map(er => er.message).join(' ')
    setNotification({ type: msgType, message: messagesString})
    setTimeout(() => { setNotification(null) }, 5000)
  }

  const resetUsernamePassword = () => {
    setUsername('')
    setPassword('')
  }

  const resetBlogInputs = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in', username, password)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      //console.log(window.localStorage);
      //blogService.setToken(user.token)
      setUser(user)
      resetUsernamePassword()
    } catch (error) {
      notificationMessages(Object.values(error.response.data), 'error')
    }    
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      author: author,
      title: title,
      url: url
    }
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      resetBlogInputs()
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
            <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
          </div>
        : <div>
            <h2>blogs</h2>
            <Notification notification={notification} />
            <User user={user} handleLogout={handleLogout}/>
            <h2>create new</h2>
            <BlogForm handleCreate={handleCreate} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
      }
    </div>
  )
}

export default App