import { dateCheck } from "../utils/datecheck.util";

test("test add new date", () => {
  let date;
  let [getNewData, currentDate] = dateCheck(date);
  expect(getNewData).toBe(true);
});

test("test compare old date", () => {
  let date = "Wed Jul 28 1993";

  let [getNewData, currentDate] = dateCheck(date);
  expect(getNewData).toBe(true);
});

test("test compare current date", () => {
  let date = new Date().toDateString();

  let [getNewData, currentDate] = dateCheck(date);
  expect(getNewData).toBe(false);
});
