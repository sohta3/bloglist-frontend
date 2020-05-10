import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Blog = ({ blogs, onLike, onRemove, user }) => {
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);

  const blogCreatedUserId =
    typeof blog.user[0] === "string" ? blog.user[0] : blog.user[0].id;

  // const onClickView = () => {
  //   setIsShowDetail(true);
  // };

  // const onClickHide = () => {
  //   setIsShowDetail(false);
  // };

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
      </div>
    </div>
  );
};

export default Blog;
