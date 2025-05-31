import { OpenAI } from "openai";
import { env } from "../configs/env";

export const openai = new OpenAI({
  apiKey: env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const getAIResponse = async (prompt: string) => {
  const completion = await openai.chat.completions.create({
    model: "gemini-2.5-flash-preview-04-17",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return completion.choices[0].message.content || "";
};
