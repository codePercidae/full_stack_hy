const BlogForm = ({ handleNewBlog, handleTitleChange, handleAuthorChange, handleUrlChange, blogTitle,
    blogAuthor, blogUrl }) => {
  return (
    <form onSubmit={handleNewBlog}>
      <div>
        <h2>Create a new blog</h2>
        title: 
        <input
          type='text'
          value={blogTitle}
          name='Title'
          onChange={handleTitleChange}/><br/>
        author: 
        <input
          type='text'
          value={blogAuthor}
          name='Author'
          onChange={handleAuthorChange}/><br/>
        url: 
        <input
          type='text'
          value={blogUrl}
          name='Url'
          onChange={handleUrlChange}/>
      </div>
      <button type='submit'>create</button>
    </form>
)}

export default BlogForm