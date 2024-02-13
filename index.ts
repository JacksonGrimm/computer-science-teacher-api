import express from "express";

import { dateCheck, dateCheckMiddleware } from "./utils/datecheck.util";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", dateCheckMiddleware, (req, res) => {
  res.send("got it!");
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
