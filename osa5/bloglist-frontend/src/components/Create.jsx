import { useState } from "react"

const Create = ({ createNewBlog }) => {

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createNewBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })

    setBlogAuthor('')
    setBlogTitle('')
    setBlogUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <h2>Create a new blog</h2>
        title: 
        <input
          type='text'
          value={blogTitle}
          name='Title'
          onChange={event => setBlogTitle(event.target.value)}/><br/>
        author: 
        <input
          type='text'
          value={blogAuthor}
          name='Author'
          onChange={event => setBlogAuthor(event.target.value)}/><br/>
        url: 
        <input
          type='text'
          value={blogUrl}
          name='Url'
          onChange={event => setBlogUrl(event.target.value)}/>
      </div>
      <button type='submit'>create</button>
    </form>
)}

export default Create