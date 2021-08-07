import React from "react";

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

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

export default function Appointment(props) {
  const interview = props.appointment.interview || null;

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    props.onSave(props.appointment.id, interview);
    // transition(SHOW);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
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
          state={props.state}
          onCancel={() => {
            back();
          }}
          onSave={save}
          // id={props.id}
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
