import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
  organization: process.env.ORGANIZATION,
});

export async function fetchLessonFromOpenAI(lesson: string) {
  const prompt = `Please create a computer science lesson based on (${lesson}). Assume the student has experience coding and building applications. Each lesson and project should not be language specific but more general to allow users to understand the lesson or assignment with out needing in-depth knowledge of a specific language. Each lesson should end with an assignment, short written assignments are ok but hands on projects are much better. Please include in each lesson indepth explanations and extra resources. Also include an advance assignment that takes the concept and applies it to a simple application of some kind. Response in Mark Down,
`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return { data: completion.choices[0].message.content, error: null };
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        `Request Error: Failed to fetch new data \n Error: ${error?.message}`
      );
    } else {
      console.log(`Request Error: Failed to fetch new data \n Error: ${error}`);
    }

    return { data: null, error: error };
  }
}

export async function MockFetchLessonFromOpenAI(lesson: string) {
  return { data: `testing ${lesson}`, error: null };
}
