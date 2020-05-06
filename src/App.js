import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isBlogSortAsc, setIsBlogSortAsc] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      });

      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogs(blogs.concat(newBlog));
      setSuccessMessage(`a new blog ${title} by ${author} added`);
      toggleVisibility();
    } catch (exception) {
    } finally {
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  };

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const onLike = (blog) => {
    blogService
      .update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      })
      .then((res) => {
        const updatedBlog = blogs.map((b) => {
          if (b.id !== blog.id) {
            return b;
          }

          return res;
        });
        setBlogs(updatedBlog);
      });
  };

  const onRemove = (blog) => {
    blogService.destroy(blog.id).then((res) => {
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    });
  };

  const onSortByLikes = () => {
    console.log(blogs);
    const sortFunc = isBlogSortAsc
      ? (a, b) => {
          return b.likes - a.likes;
        }
      : (a, b) => {
          return a.likes - b.likes;
        };
    const sortedBlogs = blogs.slice().sort(sortFunc);
    setBlogs(sortedBlogs);
    setIsBlogSortAsc(!isBlogSortAsc);
  };

  return (
    <div>
      {errorMessage ? <div>{errorMessage}</div> : null}
      {successMessage ? <div>{successMessage}</div> : null}
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button id="logout-button" onClick={logout}>
              logout
            </button>
          </p>
          <Togglable
            buttonLabelWhenHide={"create new blog"}
            buttonLabelWhenShow={"hide"}
            visible={visible}
            toggleVisibility={toggleVisibility}
          >
            <BlogForm
              handleCreateBlog={handleCreateBlog}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
              title={title}
              author={author}
              url={url}
            />
          </Togglable>
          <BlogList
            blogs={blogs}
            onLike={onLike}
            onSortByLikes={onSortByLikes}
            onRemove={onRemove}
            user={user}
          />
        </div>
      )}
    </div>
  );
};

export default App;
