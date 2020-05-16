import React from "react";
import { useParams } from "react-router-dom";

const Blog = ({
  blogs,
  onLike,
  onRemove,
  user,
  handleCreateComment,
  handleBlogCommentChange,
  comment,
}) => {
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return null;
  }
  if (!blog.user) {
    return null;
  }

  let blogCreatedUserId;
  if (blog.user) {
    blogCreatedUserId =
      typeof blog.user[0] === "string" ? blog.user[0] : blog.user[0].id;
  }

  const onClickLike = () => {
    onLike(blog);
  };

  const onClickCreateComment = () => {
    handleCreateComment(blog);
  };

  const onClickRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      onRemove(blog);
    }
  };

  const comments = blog.comments.map((c) => {
    return <li id={c}>{c}</li>;
  });

  return (
    <div>
      <div>
        <h2>
          {blog.title} {blog.author}
        </h2>
        {/* <button onClick={onClickHide}>hide</button> */}
        <div className="url">
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div className="like">
          likes{blog.likes}{" "}
          <button id="like-button" onClick={onClickLike}>
            like
          </button>
        </div>
        <div>added by {blog.author}</div>
        {/* {user.id === blogCreatedUserId ? (
          <button id="remove-button" onClick={onClickRemove}>
            remove
          </button>
        ) : null} */}
        <h3>comments</h3>
        {blog.comments.length > 0 ? <ul>{comments}</ul> : null}
        <input
          type="text"
          onChange={handleBlogCommentChange}
          value={comment}
        ></input>
        <button
          id="create-new-blog-comment-button"
          onClick={onClickCreateComment}
        >
          comment
        </button>
      </div>
    </div>
  );
};

export default Blog;
