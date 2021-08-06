import React, { useState, useEffect } from "react";
import axios from "axios";
// import dotenv from "dotenv";

import "components/Application.scss";
import DayList from "./DayList";
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

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
];

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

  // useEffect(() => {
  //   apiGetDays()
  //     .then((res) => {
  //       setDays(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(`An error has occured contacting the server `);
  //       console.log(err);
  //     });

  //   apiGetAppointments()
  //     .then((res) => {
  //       setAppointments(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(`An error has occured contacting the server `);
  //       console.log(err);
  //     });
  // }, []);

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
      <section className="schedule">{/* APPP ARRAY GOES HERER*/}</section>
    </main>
  );
}

//       return (
//   <main className="layout">
//       <section className="sidebar">
//         {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
//       </section>
//       <section className="schedule">
//         {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
//       </section>
//     </main>
//   )
// }
