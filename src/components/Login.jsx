import { useState } from 'react'

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const resetUsernamePassword = () => {
    setUsername('')
    setPassword('')
  }

  const loginUser = (event) => {
    event.preventDefault()
    console.log('logging in', username, password)
    handleLogin({ username, password })
    resetUsernamePassword()
  }

  return (
    <form onSubmit={loginUser}>
      <div>
        username
        <input
          data-testid='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )

}

export default Login