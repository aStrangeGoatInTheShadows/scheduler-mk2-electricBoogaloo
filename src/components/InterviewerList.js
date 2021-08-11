import React from "react";
import PropTypes from "prop-types";

import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

// This generates the react component that shows the circles with faces as when you edit a form or create a new appointment
export default function InterviewerList(props) {
  const interviewerKeys = Object.keys(props.interviewers);

  let interviewersComponents = [];

  for (let key of interviewerKeys) {
    const interviewer = props.interviewers[key];

    interviewersComponents.push(
      <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={props.interviewer === interviewer.id}
        setInterviewer={props.setInterviewer}
      />
    );
  }

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersComponents}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
