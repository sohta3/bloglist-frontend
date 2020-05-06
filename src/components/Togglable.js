import React from "react";

const Togglable = ({
  visible,
  toggleVisibility,
  buttonLabelWhenHide,
  buttonLabelWhenShow,
  children,
}) => {
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id="create-new-blog" onClick={toggleVisibility}>
          {buttonLabelWhenHide}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{buttonLabelWhenShow}</button>
      </div>
    </div>
  );
};

export default Togglable;
