//get the current date
//compare the last date
//if there is no date or the date is old
//update the date to the new date
//run new API value
//else if date is currently date
//return current api value
import { dateCheck } from "../utils/datecheck.util";

test("test add new date", () => {
  let date;
  let [getNewData, currentDate] = dateCheck();
  expect(getNewData).toBe(true);
});

test("test compare old date", () => {
  let [getNewData, currentDate] = dateCheck();
  expect(getNewData).toBe(true);
});

test("test compare current date", () => {
  let [getNewData, currentDate] = dateCheck();
  expect(getNewData).toBe(false);
});
