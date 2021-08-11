import React from "react";

import "./styles.scss";

// This shows a message during asyncronous opperations so the user knows things are still in working in the back ground
export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}
