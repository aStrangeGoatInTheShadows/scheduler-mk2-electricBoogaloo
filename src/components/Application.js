import React from "react";

import { getAppointmentsForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData.js";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index.jsx";

const api = `http://localhost:8001`;

// When passed the current day as well as the state
// this function will fetch appointments for the day
// It returns an array of react appointment components
const generateAppointmentList = (
  state,
  day,
  bookInterview,
  deleteInterview
) => {
  const appointments = getAppointmentsForDay(state, day);

  const appArr = appointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        appointment={appointment}
        state={state}
        onSave={bookInterview}
        onDelete={deleteInterview}
      ></Appointment>
    );
  });

  appArr.push(
    <Appointment key="last" id="last" appointment={{ time: "5pm" }} />
  );

  return appArr;
};

// This is our main application component - All other components are children or grandchildren
export default function Application(props) {
  const { state, setDay, bookInterview, deleteInterview } =
    useApplicationData();

  const appointmentsComponentArr = generateAppointmentList(
    state,
    state.day,
    bookInterview,
    deleteInterview
  );

  return (
    <main className="layout">
      <section className="sidebar">
        {
          <>
            <img
              className="sidebar--centered"
              src="images/logo.png"
              alt="Interview Scheduler"
            />

            <hr className="sidebar__separator sidebar--centered" />
            <nav className="sidebar__menu">
              <DayList key={1} state={state} setDay={setDay} />
            </nav>

            <img
              className="sidebar__lhl sidebar--centered"
              src="images/lhl.png"
              alt="Lighthouse Labs"
            />
          </>
        }
      </section>
      <section className="schedule">{appointmentsComponentArr}</section>
    </main>
  );
}
