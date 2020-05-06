import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, onLike, onSortByLikes, onRemove, user }) => {
  return (
    <>
      {blogs.length > 0 ? (
        <button onClick={onSortByLikes}>sort by likes</button>
      ) : null}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onLike={onLike}
          onRemove={onRemove}
          user={user}
        />
      ))}
    </>
  );
};

export default BlogList;
