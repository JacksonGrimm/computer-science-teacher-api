import { AccessJsonStore } from "../utils/access_json_store.util";
import { dateCheck } from "../utils/datecheck.util";
import CacheData from "../utils/cache";

export async function handleGetLesson(
  cache: CacheData,
  lessonStore: AccessJsonStore,
  fileName: string,
  fetchLessonFromOpenAI: Function
): Promise<string> {
  //check the date and update cache
  const [isNewDay] = dateCheck(cache.get("date"));
  if (!isNewDay) return cache.get("lesson");

  cache.put("date", new Date().toDateString());

  //get lesson from JSON
  const { data: lesson, error: jsonStoreError } = await lessonStore.popData(
    fileName
  );
  if (jsonStoreError) throw new Error(jsonStoreError);

  //fetch lesson from Open AI
  const { data: openAIResponse, error: fetchError } =
    await fetchLessonFromOpenAI(lesson);
  if (jsonStoreError || !openAIResponse)
    throw new Error(fetchError || openAIResponse);

  //updates cache
  cache.put("lesson", openAIResponse);

  return openAIResponse;
}
