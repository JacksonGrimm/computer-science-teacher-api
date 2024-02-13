import { Request, Response, NextFunction } from "express";

export function dateCheck(date: string) {
  const currentDate = new Date();

  if (date) {
    return [date !== currentDate.toDateString(), currentDate.toString()];
  }

  return [true, currentDate.toDateString()];
}

let lastDate: string;

export function dateCheckMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const [getNewData, current] = dateCheck(lastDate);
  if (getNewData && typeof current === "string") {
    console.log("getting new data");
    lastDate = current;
    next();
    return;
  } else {
    console.log("same data");
  }
}
