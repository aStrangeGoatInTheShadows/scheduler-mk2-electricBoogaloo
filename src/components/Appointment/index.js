import React from "react";

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";

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
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // if (props.id === "last") {
  //   return <Header />;
  // }
  // if (!props.interview) {
  //   return <Empty />;
  // }
  // if (props.interview) {
  //   return <Show />;
  // }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.intObj.interviewer}
          id={props.id}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => {
            transition(EDIT);
          }}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          onCancel={() => {
            back();
          }}
        />
      )}
      {/* {mode === EDIT && createOrEdit(EDIT)} */}
      {/* {mode === ERROR_SAVE && (
        <Error
          message={"We are unable to save at this time."}
          onClose={() => {
            back();
          }}
        />
      )} */}
      {/* {mode === ERROR_DELETE && (
        <Error
          message={"We are unable to delete at this time."}
          onClose={() => {
            resetTo(SHOW);
          }}
        />
      )} */}
      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === DELETING && <Status message={"Deleting..."} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onCancel={() => {
            back();
          }}
          onConfirm={() => {
            // transition(DELETING);
            // props.onDelete(props.id, resetTo, EMPTY, () =>
            //   transition(ERROR_DELETE)
            // );
          }}
        />
      )}
    </article>
  );
}
