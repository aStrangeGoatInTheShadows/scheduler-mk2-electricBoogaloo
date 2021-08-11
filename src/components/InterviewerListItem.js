import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

// Creates the each individual item that is then displayed by InterviewerList Component
export default function InterviewListItem(props) {
  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li
      className={interviewerClass}
      onClick={() => {
        props.setInterviewer(props.id);
      }}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
