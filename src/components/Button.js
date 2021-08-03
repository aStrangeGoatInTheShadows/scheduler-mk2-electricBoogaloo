import React from "react";
import classNames from "classnames/bind";

/////////////////////////////////////////////////////////////////////////////////
// HOW TO USE CLASSNAMES ///////
/////////////////////////////////////////////////////////////////////////////////
// classNames('foo', 'bar'); // => 'foo bar'
// classNames('foo', { bar: true }); // => 'foo bar'
// classNames('foo', { bar: false }); // => 'foo'

import "components/Button.scss";

export default function Button(props) {
  // let buttonClass = "button";
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
