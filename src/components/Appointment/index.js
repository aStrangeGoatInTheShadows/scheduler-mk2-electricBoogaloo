import React from "react";

import "./styles.scss";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

const createInterviewList = (props) => {
  return (
    <InterviewerList
      interviewers={props.interviewers}
      // value={interviewer}
      // onChange={setInterviewer}
      onChange={(event) => {
        console.log("on change running from Appointment/index.js prop");
      }}
    />
  );
};

export default function Appointment(props) {
  console.log("Currently testing appointment list generation", props);

  if (props.id === "last") {
    return <Header />;
  }
  if (!props.interview) {
    return <Empty />;
  }
  if (props.interview) {
    return <Show />;
  }

  return (
    <article>
      <Header />
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off">
            <input
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              /*
          This must be a controlled component
        */
            />
          </form>{" "}
          {createInterviewList(props)}
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger>Cancel</Button>
            <Button confirm>Save</Button>
          </section>
        </section>
      </main>
    </article>
  );
}
