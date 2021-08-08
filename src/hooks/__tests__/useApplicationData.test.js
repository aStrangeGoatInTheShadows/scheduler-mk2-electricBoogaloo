import { testData } from "./testData";
import { updateSpotsForDay } from "../useApplicationData";

test("updateSpotsForDay returns the state its passed", () => {
  const state = testData;
  const result = updateSpotsForDay(state);

  expect(result).toEqual(state);
});
