import React from "react";
import classNames from "classnames/bind";

import "components/Button.scss";

// This generates a fairly open ended button thats used in multiple places
export default function Button(props) {
  // Generates a class tag to determine if the button is green or red
  let buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={buttonClass}
    >
      {props.children}
    </button>
  );
}
