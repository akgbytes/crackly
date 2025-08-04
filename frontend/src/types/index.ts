export interface InterviewSet {
  id: string;
  role: string;
  experience: number;
  importantTopics: string;
  createdAt: string;
  questionsCount: number;
}

export type InterviewSetExtended = {
  createdAt: string;
  updatedAt: string;
  id: string;
  userId: string;
  role: string;
  experience: number;
  importantTopics: string;
};

type Question = {
  createdAt: string;
  updatedAt: string;
  id: string;
  userId: string;
  interviewSetId: string;
  question: string;
  answer: string;
  note: string | null;
  isPinned: boolean;
};

interface SessionData {
  session: Session;
  sessionQuestions: Question[];
}

export interface InterviewSetForm {
  role: string;
  experience: number;
  importantTopics?: string;
}
