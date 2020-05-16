import React, { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import userService from "./services/users";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import User from "./components/User";
import Blog from "./components/Blog";
import Header from "./components/Header";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
  const users = state.users;
  const comment = state.comment;

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch({ type: "SET_BLOGS", payload: { blogs: blogs } });
    });
  }, [dispatch]);

  useEffect(() => {
    userService.getAll().then((users) => {
      dispatch({ type: "SET_USERS", payload: { users: users } });
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
      dispatch({
        type: "SET_TITLE",
        payload: { title: "" },
      });
      dispatch({
        type: "SET_AUTHOR",
        payload: { author: "" },
      });
      dispatch({
        type: "SET_URL",
        payload: { url: "" },
      });
    }
  };

  const logout = () => {
    window.localStorage.clear();
    dispatch({ type: "SET_USER", payload: { user: null } });
    dispatch({ type: "SET_VISIBLE", payload: { visible: false } });
  };

  const toggleVisibility = () => {
    dispatch({ type: "SET_VISIBLE", payload: { visible: !visible } });
  };

  const handleCreateComment = async (blog) => {
    let newBlog;

    try {
      newBlog = await blogService.createComment(blog.id, comment);

      dispatch({
        type: "SET_SUCCESS_MESSAGE",
        payload: { successMessage: `${comment} by ${author} added` },
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

      const updatedBlogs = blogs.map((b) => {
        if (b.id !== blog.id) {
          return b;
        }
        return newBlog;
      });

      dispatch({
        type: "SET_BLOGS",
        payload: { blogs: updatedBlogs },
      });

      dispatch({
        type: "SET_COMMENT",
        payload: { comment: "" },
      });
    }
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
          <Router>
            <Switch>
              <Route path="/blogs/:id">
                <Header user={user} logout={logout} />
                <Blog
                  blogs={blogs}
                  onLike={onLike}
                  onRemove={onRemove}
                  handleCreateComment={handleCreateComment}
                  handleBlogCommentChange={({ target }) => {
                    dispatch({
                      type: "SET_COMMENT",
                      payload: { comment: target.value },
                    });
                  }}
                  comment={comment}
                />
              </Route>
              <Route path="/users/:id">
                <Header user={user} logout={logout} />
                <User users={users} />
              </Route>
              <Route path="/users">
                <Header user={user} logout={logout} />
                <UserList users={users} blogs={blogs} />
              </Route>
              <Route path="/">
                <Header user={user} logout={logout} />
                <h1>blogs app</h1>
                <Togglable
                  buttonLabelWhenHide={"create new blog"}
                  buttonLabelWhenShow={"hide"}
                  visible={visible}
                  toggleVisibility={toggleVisibility}
                >
                  <BlogForm
                    handleCreateBlog={handleCreateBlog}
                    handleTitleChange={({ target }) => {
                      dispatch({
                        type: "SET_TITLE",
                        payload: { title: target.value },
                      });
                    }}
                    handleAuthorChange={({ target }) => {
                      dispatch({
                        type: "SET_AUTHOR",
                        payload: { author: target.value },
                      });
                    }}
                    handleUrlChange={({ target }) => {
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
                <BlogList blogs={blogs} />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
