import React, { useState } from "react";
const Blog = ({ blog, onLike, onRemove, user }) => {
  const blogCreatedUserId =
    typeof blog.user[0] === "string" ? blog.user[0] : blog.user[0].id;
  const [isShowDetail, setIsShowDetail] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const onClickView = () => {
    setIsShowDetail(true);
  };

  const onClickHide = () => {
    setIsShowDetail(false);
  };

  const onClickLike = () => {
    onLike(blog);
  };

  const onClickRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      onRemove(blog);
    }
  };

  return (
    <div>
      {isShowDetail ? (
        <div style={blogStyle}>
          {blog.id} {blog.title} {blog.author}{" "}
          <button onClick={onClickHide}>hide</button>
          <div className="url">{blog.url}</div>
          <div className="like">
            likes{blog.likes}{" "}
            <button id="like-button" onClick={onClickLike}>
              like
            </button>
          </div>
          {user.id === blogCreatedUserId ? (
            <button id="remove-button" onClick={onClickRemove}>
              remove
            </button>
          ) : null}
        </div>
      ) : (
        <div style={blogStyle}>
          {blog.title} {blog.author}{" "}
          <button id="view-blog-button" onClick={onClickView}>
            view
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
