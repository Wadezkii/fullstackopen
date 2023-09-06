const BlogForm = ({ addBlog, title, setTitle, author, setAuthor, url, setUrl }) => {
  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
            Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
            Author
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
            URL
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm