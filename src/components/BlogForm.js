import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
        <TextField
          label="title"
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <TextField
          label="author"
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        <TextField
          label="url"
          type="text"
          id="url"
          value={url}
          name="Url"
          onChange={handleUrlChange}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        id="create-new-blog-button"
        type="submit"
      >
        create
      </Button>
    </form>
  );
};
export default BlogForm;
