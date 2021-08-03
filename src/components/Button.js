import React from "react";
import classNames from "classnames/bind";

/////////////////////////////////////////////////////////////////////////////////
// HOW TO USE CLASSNAMES ///////
/////////////////////////////////////////////////////////////////////////////////
// classNames('foo', 'bar'); // => 'foo bar'
// classNames('foo', { bar: true }); // => 'foo bar'
// classNames('foo', { bar: false }); // => 'foo'

import "components/Button.scss";

// Creates our main button
export default function Button(props) {
  // Sets the class dependant on button state
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
