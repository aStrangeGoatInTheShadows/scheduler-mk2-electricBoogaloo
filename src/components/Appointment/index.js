import React from "react";

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import Form from "./Form";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const REPLACE = true;

export default function Appointment(props) {
  const interview = props.appointment.interview || null;

  const { mode, transition, back, reset, showHistory } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    props.onSave(
      props.appointment.id,
      interview,
      () => transition(SHOW),
      () => {
        console.log("API SAVE CALL FAILED, SHOW ERROR");
        transition(ERROR_SAVE);
      }
    );
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  const deleteInterview = () => {
    transition(DELETING);
    props.onDelete(
      props.appointment,
      () => {
        /**success cb */
      },
      () => {
        // transition(ERROR_DELETE);
        console.log("API DELETE CALL FAILED, SHOW ERROR");
        transition(ERROR_DELETE, REPLACE);
      }
    );
  };

  const inputFormData = () => {
    return (
      <Form
        state={props.state}
        onCancel={() => {
          back();
        }}
        onSave={save}
        appointment={props.appointment}
      />
    );
  };

  return (
    <article className="appointment">
      <Header time={props.appointment.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => {
            transition(EDIT);
          }}
          state={props.state}
        />
      )}
      {(mode === CREATE || mode === EDIT) && inputFormData(mode)}
      {mode === ERROR_SAVE && (
        <Error
          message={"We are unable to save at this time."}
          onClose={() => {
            back();
          }}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"We are unable to delete at this time."}
          onClose={() => {
            back();
          }}
        />
      )}
      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === DELETING && <Status message={"Deleting..."} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onCancel={() => {
            back();
          }}
          onConfirm={() => {
            deleteInterview();
          }}
        />
      )}
    </article>
  );
}
