export const generateInterviewQuestionsPrompt = (
  role: string,
  experience: number,
  importantTopics: string,
  numberOfQuestions: number
) => `
You are an AI assistant specialized in generating technical interview content.

Instructions:
- Target Role: "${role}"
- Candidate Experience: ${experience} ${experience <= 0 ? "year" : "years"} 
- Focus Areas: ${importantTopics}
- Generate ${numberOfQuestions} technical interview questions.
- For each question, provide a clear and concise answer.

Output Format:
Return ONLY a valid JSON array structured like this:
[
  {
    "question": "Sample question?",
    "answer": "Sample answer."
  },
  ...
]

Important Guidelines:
- Ensure the output is **only** the JSON array—no commentary, markdown, or extra text.
- The array should be complete, well-formatted, and parseable.
`;

export const generateConceptExplanationPrompt = (question: string) => `
You are an AI assistant trained to explain technical concepts behind interview questions.

Task:
- Explain the following question in a beginner-friendly way:
"${question}"

Requirements:
- Provide a clear explanation of the concept.
- Include a small, relevant code snippet if applicable.
- Add a short title that summarizes the concept.

Output Format:
Return ONLY a valid JSON object like:
{
  "title": "Short summary title",
  "explanation": "Beginner-friendly explanation goes here."
}

Important Guidelines:
- Do NOT include any markdown formatting, commentary, or surrounding text.
- Output must be strictly valid JSON.
`;
