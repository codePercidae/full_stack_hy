import { useState } from "react"

const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
  }

  return (
    <form onSubmit={login}>
      <div>
        <h2>Login</h2>
        username
        <input
        type='text'
        value={username}
        name='Username'
        onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div>
        password
        <input
        type='password'
        value={password}
        name='Password'
        onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
)}

export default LoginForm