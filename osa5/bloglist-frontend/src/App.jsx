import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
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
  //states
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)
  const [errorMessage , setErrorMessage] = useState(null)

  //effects
  useEffect(() => {
    const loggedTokenJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedTokenJSON) {
      const token = JSON.parse(loggedTokenJSON)
      userService.getOne(token.id).then(user => setUser(user))
      blogService.setToken(token.token)
    }
  }, [])

  //handlers
  const handleNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      userId: user.id
    }
    try {
      const response = await blogService.create(blogObject)
      setBlogAuthor('')
      setBlogTitle('')
      setBlogUrl('')
      setAlertMessage(`${blogTitle} by ${blogAuthor} added succesfully!`)
      setTimeout(() => setAlertMessage(null), 5000)
      return response.data
    } catch (exception) {
      setErrorMessage('An error occurred while adding new blog!')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setBlogs([])
    window.location.reload()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    var new_user = null
    try {
      var token = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(token))
      setUsername('')
      setPassword('')
      new_user = await userService.getOne(token.id)
      setBlogs(new_user.blogs)
      blogService.setToken(token.token)
      setUser(new_user)
      setAlertMessage('Login succesfull')
      setTimeout(() => setAlertMessage(null), 5000)
    } catch (exception) {
      setErrorMessage('Invalid login credentials!')
      setUsername('')
      setPassword('')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  } 

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  //forms
  const loginForm = () => {
    return (
      <div>
        <LoginForm handleLogin={handleLogin} handlePasswordChange={handlePasswordChange}
          handleUsernameChange={handleUsernameChange} password={password} username={username}/>
      </div>
    )
  }

  const blogForm = () => {
    return (
    <form onSubmit={handleNewBlog}>
      <div>
        <h2>Create new blog</h2>
        title: 
          <input
            type='text'
            value={blogTitle}
            name='Title'
            onChange={({ target }) => setBlogTitle(target.value)}/><br/>
        author: 
          <input
            type='text'
            value={blogAuthor}
            name='Author'
            onChange={({ target }) => setBlogAuthor(target.value)}/><br/>
        url: 
          <input
            type='text'
            value={blogUrl}
            name='Url'
            onChange={({ target }) => setBlogUrl(target.value)}/>
      </div>
      <button type='submit'>create</button>
    </form>
  )}

  //misc components
  const showUser = ( user ) => {
    return (
      <div>
        <p>
          {user.name} logged in
        </p>
        <button onClick={handleLogout}>logout</button>
        <ul>
          {user.blogs.map((b) => <Blog key={b.id} blog={b}/>)}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Alert message={alertMessage}/>
      <Error message={errorMessage}/>
      {!user && loginForm()}
      {user && showUser(user)}
      {user && blogForm()}
    </div>
  )
}
export default App