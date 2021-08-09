import { testData } from "./testData";
import { updateSpotsForDay } from "../useApplicationData";

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

test("updateSpotsForDay add a free spot to Monday with no day input", () => {
  const state = testData;
  const booking = false;
  const result = updateSpotsForDay(state, booking);

  expect(result.days[0].spots).toEqual(state.days[0].spots + 1);
});
