import React from "react";
import Button from "@material-ui/core/Button";

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
        <Button
          id="create-new-blog"
          variant="contained"
          onClick={toggleVisibility}
        >
          {buttonLabelWhenHide}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button variant="contained" onClick={toggleVisibility}>
          {buttonLabelWhenShow}
        </Button>
      </div>
    </div>
  );
};

export default Togglable;
