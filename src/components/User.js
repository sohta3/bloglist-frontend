import React from "react";
import { useParams } from "react-router-dom";

const User = ({ users }) => {
  const id = useParams().id;
  const user = users.find((u) => u.id === id);
  if (!user) {
    return null;
  }
  const blogs = user.blogs.map((blog) => {
    return <li key={blog.id}>{blog.title}</li>;
  });
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {blogs.length > 0 ? <ul>{blogs}</ul> : null}
    </div>
  );
};

export default User;
