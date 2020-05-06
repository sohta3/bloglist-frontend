import React from "react";

const BlogForm = ({
  handleCreateBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
}) => {
  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        title
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url
        <input
          type="text"
          id="url"
          value={url}
          name="Url"
          onChange={handleUrlChange}
        />
      </div>
      <button id="create-new-blog-button" type="submit">
        create
      </button>
    </form>
  );
};
export default BlogForm;
