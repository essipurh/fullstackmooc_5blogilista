const BlogForm = ({ handleCreate, title, setTitle, author, setAuthor, url, setUrl  }) => {
  return (
    <form onSubmit={handleCreate}>
      <div>
        title
          <input 
          type="text"
          value={title}
          name="BlogTitle"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={author}
          name="BlogAuthor"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
          <input
          type="text"
          value={url}
          name="BlogUrl"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm