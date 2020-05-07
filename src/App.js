import React, { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const blogs = state.blogs;
  const username = state.username;
  const password = state.password;
  const title = state.title;
  const author = state.author;
  const url = state.url;
  const user = state.user;
  const errorMessage = state.errorMessage;
  const successMessage = state.successMessage;
  const visible = state.visible;
  const isBlogSortAsc = state.isBlogSortAsc;

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch({ type: "SET_BLOGS", payload: { blogs: blogs } });
    });
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({ type: "SET_USER", payload: { user: user } });
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({ type: "SET_USER", payload: { user: user } });
    } catch (exception) {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: { errorMessage: "wrong username or password" },
      });
      setTimeout(() => {
        dispatch({
          type: "SET_ERROR_MESSAGE",
          payload: { errorMessage: null },
        });
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

      dispatch({
        type: "ADD_BLOG",
        payload: { blog: newBlog },
      });
      dispatch({
        type: "SET_SUCCESS_MESSAGE",
        payload: { successMessage: `a new blog ${title} by ${author} added` },
      });
      dispatch({
        type: "TOGGLE_VISIBILITY",
        payload: { visible: !visible },
      });
    } catch (exception) {
      //
    } finally {
      setTimeout(() => {
        dispatch({
          type: "SET_SUCCESS_MESSAGE",
          payload: { successMessage: null },
        });
      }, 5000);
    }
  };

  const logout = () => {
    window.localStorage.clear();
    dispatch({ type: "SET_USER", payload: { user: null } });
  };

  const toggleVisibility = () => {
    dispatch({ type: "SET_VISIBLE", payload: { visible: !visible } });
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
        const updatedBlogs = blogs.map((b) => {
          if (b.id !== blog.id) {
            return b;
          }

          return res;
        });
        dispatch({
          type: "SET_BLOGS",
          payload: { blogs: updatedBlogs },
        });
      });
  };

  const onRemove = (blog) => {
    blogService.destroy(blog.id).then((res) => {
      dispatch({
        type: "SET_BLOGS",
        payload: { blogs: blogs.filter((b) => b.id !== blog.id) },
      });
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
    dispatch({
      type: "SET_BLOGS",
      payload: { blogs: sortedBlogs },
    });
    dispatch({
      type: "SET_IS_BLOG_SORT_ASC",
      payload: { isBlogSortAsc: !isBlogSortAsc },
    });
  };

  return (
    <div>
      {errorMessage ? <div>{errorMessage}</div> : null}
      {successMessage ? <div>{successMessage}</div> : null}
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => {
            dispatch({
              type: "SET_USERNAME",
              payload: { username: target.value },
            });
          }}
          handlePasswordChange={({ target }) => {
            dispatch({
              type: "SET_PASSWORD",
              payload: { password: target.value },
            });
          }}
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
              handleTitleChange={({ target }) => {
                // setTitle(target.value);
                dispatch({
                  type: "SET_TITLE",
                  payload: { title: target.value },
                });
              }}
              handleAuthorChange={({ target }) => {
                // setAuthor(target.value);
                dispatch({
                  type: "SET_AUTHOR",
                  payload: { author: target.value },
                });
              }}
              handleUrlChange={({ target }) => {
                // setUrl(target.value);
                dispatch({
                  type: "SET_URL",
                  payload: { url: target.value },
                });
              }}
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
