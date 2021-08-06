import React, { useState, useEffect } from "react";
import axios from "axios";
// import dotenv from "dotenv";

////////////////// HELPERS IMPORT /////////////////////
import {
  getAppointmentsForDay,
  getInterviewersForDay,
} from "helpers/selectors";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
// dotenv.config();

// console.log(dotenv.config({ path: "../../.env.development" }));
// console.log(process.env.API_ADDRESS);

// const apiAddress = process.env.API_ADDRESS;
const api = `http://localhost:8001`;

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// When passed the current day as well as the state
// this function will fetch appointments for the day
// It returns an array of react appointment components
const generateAppointmentList = (state, day) => {
  const appointments = getAppointmentsForDay(state, day);
  const interviewerArr = [...getInterviewersForDay(state, state.day)];

  const appArr = appointments.map((appointment) => {
    return <Appointment appointment={appointment} state={state}></Appointment>;
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

  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState({ ...state, days: days });
  const setAppointments = (appointments) =>
    setState({ ...state, appointments: appointments });

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

  const appointmentsComponentArr = generateAppointmentList(state, state.day);

  // console.log("This is appointmentsComponentArr", appointmentsComponentArr);

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
              <DayList state={state} setState={setState} setDay={setDay} />
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
