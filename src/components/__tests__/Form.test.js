import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    [
      {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
      {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      },
      {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      },
      { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
      { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
      {
        id: 6,
        name: "Susan Reynolds",
        avatar: "https://i.imgur.com/TdOAdde.jpg",
      },
      { id: 7, name: "Alec Quon", avatar: "https://i.imgur.com/3tVgsra.jpg" },
      {
        id: 8,
        name: "Viktor Jain",
        avatar: "https://i.imgur.com/iHq8K8Z.jpg",
      },
      {
        id: 9,
        name: "Lindsay Chu",
        avatar: "https://i.imgur.com/nPywAp1.jpg",
      },
      {
        id: 10,
        name: "Samantha Stanic",
        avatar: "https://i.imgur.com/okB9WKC.jpg",
      },
    ],
  ];

  const days = [
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
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form
        state={{ interviewers }}
        onCancel={() => {}}
        onSave={() => {}}
        appointment={{}}
        name={""}
      />
    );

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const appointment = {
      id: 5,
      time: "4pm",
      interview: { student: "Lydia Miller-Jones", interviewer: 2 },
    };

    const { getByTestId } = render(
      <Form
        state={{ interviewers }}
        onCancel={() => {}}
        onSave={() => {}}
        appointment={appointment}
      />
    );

    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form
        state={{ interviewers }}
        onCancel={() => {}}
        onSave={onSave}
        appointment={{}}
      />
    );
    /* 3. Click the save button */

    fireEvent.click(getByText("Save"));
    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    /* 2. onSave is not called */
    // expect(onSave).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name is defined", () => {
    const onSave = jest.fn();

    const appointment = {
      id: 5,
      time: "4pm",
      interview: { student: "Lydia Miller-Jones", interviewer: null },
    };

    const { queryByText, getByText } = render(
      <Form
        state={{ interviewers }}
        onCancel={() => {}}
        onSave={onSave}
        appointment={appointment}
      />
    );
    fireEvent.click(getByText("Save"));

    /* 3. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    /* 4. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);

    /* 5. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
});
