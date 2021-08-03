import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewListItem(props) {
  let InterviewListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li
      className={InterviewListItemClass}
      onClick={() => {
        console.log("setInterviewer");
      }}
    >
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  );
}
