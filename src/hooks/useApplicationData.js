import React, { useState, useEffect } from "react";
import axios from "axios";

const api = `http://localhost:8001`;

const removeInterviewFromState = (appointment, state, setState) => {
  const emptyAppointment = { ...appointment, interview: null };

  const newAppointments = {
    ...state.appointments,
    [appointment.id]: emptyAppointment,
  };

  setState({ ...state, appointments: newAppointments });
};

/////////////////////////////////////////////////////////////////////////////
// Uses local state by default, accepts outside state for testing or feature expansion
// Updates spots for day, assumes new spot booked unless told otherwise
const updateSpotsForDay = (state, day, booking = true) => {
  console.log(state.days);

  return state;
};

///////////////////////////////////////// WORKING HERE

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
  });

  const setDay = (day) => setState({ ...state, day });

  /////////////////////////// API CALLS ///////////////////////////////////
  const apiDeleteInterview = (id) => {
    console.log(JSON.stringify(state));
    return axios.delete(`${api}/api/appointments/${id}`);
  };

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
    const interview = appointment.interview;

    return axios.put(`${api}/api/appointments/${appointment.id}`, {
      interview,
    });
  };

  useEffect(() => {
    Promise.all([
      apiGetDays(),
      apiGetAppointments(),
      apiGetInterviewers(),
    ]).then((response) => {
      console.log("api fetches rab");
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

  const bookInterview = (id, interview, transitionToShow, displaySaveErr) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = { ...state.appointments, [id]: appointment };

    apiPutAppointment(appointment)
      .then(() => {
        setState({ ...state, appointments });

        transitionToShow();
      })
      .catch(() => {
        displaySaveErr();
      });
  };

  // Makes api call to delete an interview
  const deleteInterview = (appointment, resetVisualMode, returnToForm) => {
    apiDeleteInterview(appointment.id)
      .then(() => {
        removeInterviewFromState(appointment, state, setState);

        resetVisualMode();
      })
      .catch(() => {
        returnToForm();
      });
  };

  return { state, setDay, bookInterview, deleteInterview, updateSpotsForDay };
}

export { updateSpotsForDay };
