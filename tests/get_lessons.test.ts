import { handleGetLesson } from "../controllers/get_lessons";
import { AccessJsonStore } from "../utils/access_json_store.util";
import CacheData from "../utils/cache";

const name = "get_lessons.test.data.json";

const mockFetchLessonFromOpenAI = (lesson) => {
  return { data: lesson, error: null };
};

test("retrieves data on empty cache", async () => {
  const mockLesson = new AccessJsonStore("./tests/output/");

  const file = await mockLesson.writeFile(name, [
    "testing lesson",
    "testing lesson",
    "testing lesson",
    "testing lesson",
  ]);

  const cache = new CacheData();
  const lessonPlan = await handleGetLesson(
    cache,
    mockLesson,
    name,
    mockFetchLessonFromOpenAI
  );

  const newFileData = await mockLesson.accessJsonData(name);

  //this checks the the top lesson was removed from the lesson file when returned
  expect(newFileData.data.length).toBe(3);
  expect(cache.get("lesson")).toBe("testing lesson");
  expect(lessonPlan).toBe("testing lesson");
  expect(cache.get("date")).toBe(new Date().toDateString());
});

test("retrieves data on new date", async () => {
  const mockLesson = new AccessJsonStore("./tests/output/");

  const file = await mockLesson.writeFile(name, [
    "testing lesson",
    "testing lesson",
    "testing lesson",
    "testing lesson",
  ]);

  //sets cache values to check is handleGetLesson overwrite the old data
  const cache = new CacheData();
  cache.put("date", new Date("1995-12-17T03:24:00").toDateString());
  cache.put("lesson", "old lesson");

  const lessonPlan = await handleGetLesson(
    cache,
    mockLesson,
    name,
    mockFetchLessonFromOpenAI
  );
  const newFileData = await mockLesson.accessJsonData(name);

  //this checks the the top lesson was removed from the lesson file when returned
  expect(newFileData.data.length).toBe(3);
  expect(cache.get("lesson")).toBe("testing lesson");
  expect(lessonPlan).toBe("testing lesson");
  expect(cache.get("date")).toBe(new Date().toDateString());
});

test("If lesson plan file is empty", async () => {
  const mockLesson = new AccessJsonStore("./tests/output/");

  const file = await mockLesson.writeFile(name, []);

  //sets cache values to check is handleGetLesson overwrite the old data
  const cache = new CacheData();
  cache.put("date", new Date("1995-12-17T03:24:00").toDateString());
  cache.put("lesson", "old lesson");

  let lessonPlanError;
  try {
    const lessonPlan = await handleGetLesson(
      cache,
      mockLesson,
      name,
      mockFetchLessonFromOpenAI
    );
  } catch (error) {
    lessonPlanError = error;
  }

  expect(lessonPlanError.message).toBe("No lesson Data in lesson store found");
});

test("If it is the same day but the lesson cache is empty", async () => {
  const mockLesson = new AccessJsonStore("./tests/output/");

  const file = await mockLesson.writeFile(name, [
    "testing lesson",
    "testing lesson",
    "testing lesson",
    "testing lesson",
  ]);

  //sets cache values to check is handleGetLesson overwrite the old data
  const cache = new CacheData();
  cache.put("date", new Date().toDateString());

  const lessonPlan = await handleGetLesson(
    cache,
    mockLesson,
    name,
    mockFetchLessonFromOpenAI
  );
  const newFileData = await mockLesson.accessJsonData(name);

  //this checks the the top lesson was removed from the lesson file when returned
  expect(newFileData.data.length).toBe(3);
  expect(cache.get("lesson")).toBe("testing lesson");
  expect(lessonPlan).toBe("testing lesson");
  expect(cache.get("date")).toBe(new Date().toDateString());
});
