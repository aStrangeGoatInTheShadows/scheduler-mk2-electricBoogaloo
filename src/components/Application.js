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

  return <>{appArr}</>;
};

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////// CLEAR STATE AFTER DELETE SO TO NOT SHOW OLD DATA
// Attempts to delete an interview from the API.

/// API CALLS TO GET DATA
const apiGetDays = function () {
  return axios.get(`${api}/api/days`);
};
const apiGetAppointments = function () {
  return axios.get(`${api}/api/appointments`);
};
const apiGetInterviewers = function () {
  return axios.get(`${api}/api/interviewers`);
};
// API CALLS TO PUT DATA
const apiPutAppointment = function (appointment) {
  // const appointmentData = JSON.stringify(appointment.interview);
  // console.log(appointmentData);
  const interview = appointment.interview;

  return axios.put(`${api}/api/appointments/${appointment.id}`, {
    interview,
  });
};

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
  });

  const apiDeleteInterview = (id) => {
    return axios.delete(`${api}/api/appointments/${id}`);
  };

  const deleteInterview = (appointment, reset, back) => {
    apiDeleteInterview(appointment.id)
      .then(() => {
        const emptyAppointment = { ...appointment, interview: null };

        const appointments = {
          ...state.appointments,
          [appointment.id]: emptyAppointment,
        };

        setState({ ...state, appointments: appointments });

        // resets the visual mode to empty after update to state
        reset();
      })
      .catch(() => {
        //returns to form
        back();
      });
  };

  // accepts
  const bookInterview = (id, interview, successCB, failureCB) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = { ...state.appointments, [id]: appointment };

    apiPutAppointment(appointment)
      .then(() => {
        setState({ ...state, appointments });
        successCB();
      })
      .catch(() => {
        failureCB();
      });
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
