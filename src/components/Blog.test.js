import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;

  const user = {
    id: "5eb04e33b0663721cfb309db",
    name: "Haris",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QyIiwiaWQiOiI1ZWIwNGUzM2IwNjYzNzIxY2ZiMzA5ZGIiLCJpYXQiOjE1ODg3MzYzNzJ9.gKJyWyCpfgSuvDCkgxXEiO0XG9QYt6z6OT20Ux0Kc5U",
    username: "root2",
  };

  const blog = {
    title: "hello",
    author: "haris",
    url: "google.com",
    likes: 9000,
    id: "5eb0510def470627bde51652",
    user: [user],
  };

  const likeHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog
        key={blog.id}
        blog={blog}
        onLike={likeHandler}
        onRemove={jest.fn()}
        user={user}
      />
    );
  });

  test("renders content", () => {
    expect(component.container).toHaveTextContent("hello haris");
    expect(component.container.querySelector(".url")).toBeNull();
    expect(component.container.querySelector(".like")).toBeNull();
  });

  test("after clicking view button, like and url are displayed", () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    expect(component.container.querySelector(".url")).toBeDefined();
    expect(component.container.querySelector(".like")).toBeDefined();

    const likeButton = component.container.querySelector(".like button");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(likeHandler.mock.calls).toHaveLength(2);
  });
});
