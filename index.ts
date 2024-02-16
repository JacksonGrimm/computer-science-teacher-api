import express from "express";

import { dateCheckMiddleware } from "./utils/datecheck.util";
import { getLesson } from "./routes/gpt";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/get-lesson", dateCheckMiddleware, async (req, res) => {
  //   const lesson = await getLesson();
  console.log("fetch");
  res.send("lesson");
});

app.use("/code-challenge", (req, res) => {
  res.redirect("https://codewarsapi.herokuapp.com/api/getDailyChallenge");
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
