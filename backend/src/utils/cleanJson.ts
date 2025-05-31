export const cleanJson = (raw: string) =>
  raw
    .replace(/^```json\s*/, "")
    .replace(/```$/, "")
    .trim();
