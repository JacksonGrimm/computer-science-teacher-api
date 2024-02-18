import express, { json } from "express";

import { handleGetLesson } from "./controllers/get_lessons";
import { lessonStore } from "./utils/access_json_store.util";
import CacheData from "./utils/cache.util";
import {
  MockFetchLessonFromOpenAI,
  fetchLessonFromOpenAI,
} from "./utils/gpt.util";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const cache = new CacheData();
cache.put("date", new Date().toDateString());

app.use("/get-lesson", async (req, res) => {
  try {
    const lessonResponse = await handleGetLesson(
      cache,
      lessonStore,
      "lessons.data.json",
      fetchLessonFromOpenAI
    );
    if (lessonResponse) {
      res.status(200).json({ lesson: lessonResponse });
    } else {
      throw new Error("No lesson response was found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use("/code-challenge", (req, res) => {
  res.redirect("https://codewarsapi.herokuapp.com/api/getDailyChallenge");
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
