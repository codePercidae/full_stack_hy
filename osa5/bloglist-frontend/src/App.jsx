import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import './index.css'

const Alert = ({ message }) => {
  if (message === null){
    return null
  }
  return (
    <div className='alert'>
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null){
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)
  const [errorMessage , setErrorMessage] = useState(null)

  //useEffect(() => {
  //  blogService.getAll().then(blogs =>
  //    setBlogs( blogs )
  //  )  
  //}, [])

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          <h2>Login</h2>
          username
            <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password
            <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type='submit'>login</button>
      </form>
  )}

  const showUser = (user, blogs) => {
    console.log(blogs)
    return (
      <div>
        <p>
          {user.name} logged in <br />
        </p>
        <ul>
          {blogs.map((b) => <Blog key={b.id} blog={b}/>)}
        </ul>
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    var new_user = null
    try {
      new_user = await loginService.login({ username, password })
      setUser(new_user)
      setUsername('')
      setPassword('')
      setAlertMessage('Login succesfull')
      setTimeout(() => setAlertMessage(null), 5000)
    } catch (exception) {
      setErrorMessage('Invalid login credentials!')
      setUsername('')
      setPassword('')
      setTimeout(() => setErrorMessage(null), 5000)
    }
    try {
      const userData = await userService.getOne(new_user.id)
      setBlogs(userData.blogs)
      console.log('User data aquired!')
    }
    catch(exception){
      console.log('Error while fetching user data! ', exception)
    }
    return
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Alert message={alertMessage}/>
      <Error message={errorMessage}/>
      {!user && loginForm()}
      {user && showUser(user, blogs)}
    </div>
  )
}

export default App