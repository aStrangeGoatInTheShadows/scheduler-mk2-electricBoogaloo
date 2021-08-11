import React from "react";

import "./styles.scss";

// Creates an empty card with a Big plus sign on it. You can click on this to book a new interview
export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}
