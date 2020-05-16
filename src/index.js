import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";

const blogReducer = (
  state = {
    blogs: [],
    username: "",
    password: "",
    title: "",
    author: "",
    url: "",
    comment: "",
    user: null,
    errorMessage: null,
    successMessage: null,
    visible: false,
    isBlogSortAsc: false,
    users: [],
  },
  action
) => {
  switch (action.type) {
    case "SET_SUCCESS_MESSAGE":
      return {
        ...state,
        successMessage: action.payload.successMessage,
      };
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    case "TOGGLE_VISIBILITY":
      return {
        ...state,
        visible: action.payload.visible,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    case "ADD_BLOG":
      return {
        ...state,
        blogs: state.blogs.concat(action.payload.blog),
      };
    case "SET_BLOGS":
      return {
        ...state,
        blogs: action.payload.blogs,
      };
    case "SET_IS_BLOG_SORT_ASC":
      return {
        ...state,
        isBlogSortAsc: action.payload.isBlogSortAsc,
      };
    case "SET_USERNAME":
      return {
        ...state,
        username: action.payload.username,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload.password,
      };
    case "SET_VISIBLE":
      return {
        ...state,
        visible: action.payload.visible,
      };
    case "SET_TITLE":
      return {
        ...state,
        title: action.payload.title,
      };
    case "SET_AUTHOR":
      return {
        ...state,
        author: action.payload.author,
      };
    case "SET_URL":
      return {
        ...state,
        url: action.payload.url,
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.payload.users,
      };
    case "SET_COMMENT":
      return {
        ...state,
        comment: action.payload.comment,
      };
    default:
      return state;
  }
};

const store = createStore(
  blogReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

renderApp();
store.subscribe(renderApp);
