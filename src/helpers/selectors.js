// Takes in state containing both days and appointments.

// Returns the relevent appointments
const getAppointmentsForDay = (state, selectedDay) => {
  let appIndexes = [];

  for (let day of state.days) {
    if (day.name === selectedDay) {
      appIndexes = day.appointments;
    }
  }

  let appointments = [];
  for (let index of appIndexes) {
    appointments.push(state.appointments[index]);
  }

  return appointments;
};

// When passed the state and day, the function returns
// a specific interview?
const getInterviewersForDay = (state, selectedDay) => {
  const interviewersForDay = [];
  let appointments = [];

  for (let day of state.days) {
    if (day.name === selectedDay) {
      appointments = [...day.appointments];
    }
  }

  for (let index of appointments) {
    interviewersForDay.push(state.appointments[index]);
  }

  return interviewersForDay;
};

export { getAppointmentsForDay, getInterviewersForDay };
