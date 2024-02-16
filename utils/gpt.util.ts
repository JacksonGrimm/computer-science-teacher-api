import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
  organization: process.env.ORGANIZATION,
});

export async function fetchLessonFromOpenAI(lesson) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Act as a computer science teacher, you provide an in-depth and comprehensive educational experience, emulating a traditional classroom setting. your lectures, and assignments cover a broad spectrum of computer science and software engineering. The lessons are now more detailed and extensive with summaries about the topic and its real world implementation, designed to offer students a deeper understanding of each subject. encourage students to explore beyond the curriculum by recommending additional resources for a broader perspective. This is not a lesson plan but the lesson its self so details. Do not include time of each section. this section is on ${lesson}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return { data: completion.choices[0].message.content, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

export async function MockFetchLessonFromOpenAI(lesson) {
  return { data: `testing ${lesson}`, error: null };
}
