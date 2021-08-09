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
const updateSpotsForDay = (state, booking = true, day = "Monday") => {
  const newState = { ...state };

  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      let spots = 0;

      for (let appt of dayObj.appointments) {
        if (!state.appointments[appt].interview) {
          if (booking) {
            spots--;
          }
          if (!booking) {
            spots++;
          }
        }
      }
      dayObj = { ...dayObj, spots: spots };
      const newDaysArr = [...state.days];
      newDaysArr[dayObj.id - 1] = dayObj;
      newState.days = [...newDaysArr];
    }
  }

  return newState;
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
        let newState = { ...state, appointments };

        setState({ ...updateSpotsForDay(newState) });

        ///////////////////// YOUR NOT PASSING THE DAY

        transitionToShow();
      })
      .catch((err) => {
        console.log(err);
        displaySaveErr();
      });
  };

  // Makes api call to delete an interview
  const deleteInterview = (appointment, resetVisualMode, returnToForm) => {
    apiDeleteInterview(appointment.id)
      .then(() => {
        removeInterviewFromState(
          appointment,
          state,
          setState,
          updateSpotsForDay
        );

        resetVisualMode();
      })
      .catch(() => {
        returnToForm();
      });
  };

  return { state, setDay, bookInterview, deleteInterview };
}

export { updateSpotsForDay };
