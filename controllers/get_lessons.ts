import { AccessJsonStore } from "../utils/access_json_store.util";
import { dateCheck } from "../utils/datecheck.util";
import CacheData from "../utils/cache.util";

export async function handleGetLesson(
  cache: CacheData,
  lessonStore: AccessJsonStore,
  fileName: string,
  fetchLessonFromOpenAI: Function
): Promise<string> {
  //check the date

  const [isNewDay] = dateCheck(cache.get("date") || "");
  if (!isNewDay && cache.get("lesson")) return cache.get("lesson") || "";

  //get lesson from JSON
  const { data: lesson, error: jsonStoreError } = await lessonStore.popData(
    fileName
  );
  if (jsonStoreError) throw jsonStoreError;

  //fetch lesson from Open AI
  console.log("fetch new");
  const { data: openAIResponse, error: fetchError } =
    await fetchLessonFromOpenAI(lesson);
  if (jsonStoreError || !openAIResponse)
    throw new Error(fetchError || "No lesson Data in lesson store found");

  //updates cache
  cache.put("lesson", openAIResponse);
  cache.put("date", new Date().toDateString());

  return openAIResponse;
}
