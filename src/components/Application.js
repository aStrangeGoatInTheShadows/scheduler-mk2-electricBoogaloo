import React, { useState, useEffect } from "react";
import axios from "axios";

////////////////// HELPERS IMPORT /////////////////////
import {
  getAppointmentsForDay,
  // getInterviewersForDay,
} from "helpers/selectors";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";

const api = `http://localhost:8001`;

// When passed the current day as well as the state
// this function will fetch appointments for the day
// It returns an array of react appointment components
const generateAppointmentList = (state, day, bookInterview) => {
  const appointments = getAppointmentsForDay(state, day);

  const appArr = appointments.map((appointment) => {
    // console.log("This is the appointment before map", appointment);
    return (
      <Appointment
        key={appointment.id}
        appointment={appointment}
        state={state}
        onSave={bookInterview}
      ></Appointment>
    );
  });

  return <>{appArr}</>;
};

const apiGetDays = function () {
  return axios.get(`${api}/api/days`);
};
const apiGetAppointments = function () {
  return axios.get(`${api}/api/appointments`);
};
const apiGetInterviewers = function () {
  return axios.get(`${api}/api/interviewers`);
};

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
  });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = { ...state.appointments, [id]: interview };

    setState({ ...state, appointments: [...appointments] });

    console.log("This is bookinterview state", state);

    console.log(id, interview);
  };

  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => setState({ ...state, days: days });
  // const setAppointments = (appointments) =>
  //   setState({ ...state, appointments: appointments });

  useEffect(() => {
    Promise.all([
      apiGetDays(),
      apiGetAppointments(),
      apiGetInterviewers(),
    ]).then((response) => {
      setState((stateClassic) => {
        const newState = {
          days: response[0].data,
          appointments: response[1].data,
          day: stateClassic.day,
          interviewers: response[2].data,
        };

        return newState;
      });
    });
  }, [setState]);

  const appointmentsComponentArr = generateAppointmentList(
    state,
    state.day,
    bookInterview
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
              <DayList
                key={1}
                state={state}
                setState={setState}
                setDay={setDay}
              />
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
