import React from "react";

import {
  render,
  cleanup,
  getByPlaceholderText,
  getByTestId,
} from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
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
        name={"Lydia Miller-Jones"}
      />
    );

    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });

  xit("calls onSave function when the name is defined", () => {
    /* 3. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    /* 4. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);

    /* 5. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
});
