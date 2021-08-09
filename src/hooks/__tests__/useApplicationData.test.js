import { updateSpotsForDay } from "../useApplicationData";

const testData = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 4, 5],
      interviewers: [1, 2, 7, 9],
      spots: 1,
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [6, 7, 8, 9, 10],
      interviewers: [3, 4, 6, 7, 8],
      spots: 5,
    },
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: { student: "d", interviewer: 6 } },
    2: {
      id: 2,
      time: "1pm",
      interview: { student: "matrtsdfsdfsdf", interviewer: 6 },
    },
    4: { id: 4, time: "3pm", interview: { student: "matt", interviewer: 7 } },
    5: {
      id: 5,
      time: "4pm",
      interview: { student: "sdfsdfsdf", interviewer: 6 },
    },
    6: { id: 6, time: "12pm", interview: null },
    7: { id: 7, time: "1pm", interview: { student: "Matt", interviewer: 8 } },
    8: {
      id: 8,
      time: "2pm",
      interview: { student: "Mattfsdsfsd ", interviewer: 8 },
    },
    9: { id: 9, time: "3pm", interview: null },
    10: { id: 10, time: "4pm", interview: null },
  },
  day: "Tuesday",
  interviewers: {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
    3: {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png",
    },
    4: { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
    5: { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
    6: {
      id: 6,
      name: "Susan Reynolds",
      avatar: "https://i.imgur.com/TdOAdde.jpg",
    },
    7: { id: 7, name: "Alec Quon", avatar: "https://i.imgur.com/3tVgsra.jpg" },
    8: {
      id: 8,
      name: "Viktor Jain",
      avatar: "https://i.imgur.com/iHq8K8Z.jpg",
    },
    9: {
      id: 9,
      name: "Lindsay Chu",
      avatar: "https://i.imgur.com/nPywAp1.jpg",
    },
    10: {
      id: 10,
      name: "Samantha Stanic",
      avatar: "https://i.imgur.com/okB9WKC.jpg",
    },
  },
};

test("updateSpotsForDay return an object", () => {
  const state = testData;
  const result = updateSpotsForDay(state);

  expect(typeof result).toEqual(typeof state);
});

test("updateSpotsForDay removes a spot from Monday with only state input", () => {
  const state = testData;
  const result = updateSpotsForDay(state);

  expect(result.days[0].spots).toEqual(state.days[0].spots - 1);
});

test.skip("updateSpotsForDay add a free spot to Monday with no day input", () => {
  const state = testData;
  const booking = false;
  const result = updateSpotsForDay(state, booking);

  expect(result.days[0].spots).toEqual(state.days[0].spots + 1);
});
