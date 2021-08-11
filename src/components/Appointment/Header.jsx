import React from "react";

import "./styles.scss";

// Its a header, I like to think its like a fancy hat for html - It displays the time and a line
export default function Header(props) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}
