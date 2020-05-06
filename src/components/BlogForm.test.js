import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";
import { prettyDOM } from "@testing-library/dom";

describe("<BlogForm />", () => {
  let component;

  const authorOnChangeHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <BlogForm
        handleCreateBlog={jest.fn()}
        handleTitleChange={jest.fn()}
        handleAuthorChange={authorOnChangeHandler}
        handleUrlChange={jest.fn()}
        title={"haris"}
        author={"hello"}
        url={"google.com"}
      />
    );
  });

  test("onchange author", () => {
    const authorTextInput = component.container.querySelector("#author");
    console.log(prettyDOM(authorTextInput));
    fireEvent.change(authorTextInput, { target: { value: "hoge" } });

    console.log(authorOnChangeHandler.mock);
    expect(authorOnChangeHandler.mock.calls).toHaveLength(1);
    expect(authorOnChangeHandler).toHaveBeenCalledTimes(1);
  });
});
