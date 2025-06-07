import {
  Brain,
  BookOpenCheck,
  FileQuestion,
  NotebookPen,
  SquareMousePointer,
} from "lucide-react";

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export const FEATURES: Feature[] = [
  {
    id: "1",
    title: "Smart Questions, Just for You",
    description:
      "No more one-size-fits-all. Get tailored interview questions based on your role, experience, and focus areas — like having a personal coach by your side.",
    icon: <FileQuestion className="w-6 h-6 text-blue-600 bg-transparent" />,
  },
  {
    id: "2",
    title: "Click to Dive Deeper",
    description:
      "Review at your pace. Expand answers when you’re ready, and instantly explore deeper concepts with AI-powered explanations designed to reinforce your understanding.",
    icon: <SquareMousePointer className="w-6 h-6 text-indigo-600" />,
  },
  {
    id: "3",
    title: "Understand the Why Behind Answers",
    description:
      "Don’t just memorize — master. Get clear, AI-generated explanations that break down the reasoning behind each answer so you truly understand the logic.",
    icon: <Brain className="w-6 h-6 text-rose-600" />,
  },
  {
    id: "4",
    title: "Customize Your Prep Journey",
    description:
      "Pin important questions, add personal notes, and organize your prep your way. Stay focused and make every session more effective and personalized.",
    icon: <NotebookPen className="w-6 h-6 text-teal-600" />,
  },
];

// <div className="flex gap-4">
//   <FileQuestion />
//   <ListChecks />
//   <Target />
//   <Settings2 />
//   <FaQuestionCircle />
//   <br />
//   <h1>dive</h1>
//   <BookOpenCheck />
//   <SearchCheck /> <Expand /> <ZoomIn />
//   <br />
//   <h2>why</h2>
//   <Brain />
//   <Lightbulb /> <Code2 />
//   <Workflow />
//   {/* pers */}
//   <NotebookPen />
//   <Pin /> <StickyNote /> <Settings />
// </div>;
