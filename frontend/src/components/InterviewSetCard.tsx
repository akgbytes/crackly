import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { BookOpen, Clock, Play, Target } from "lucide-react";
import ImportantTopics from "./ImportantTopics";

interface InterviewSetCardProps {
  interviewSet: {
    id: string;
    role: string;
    experience: number;
    importantTopics?: string;
    createdAt: string;
    questionsCount: number;
    onSelect: () => void;
    onDelete: () => void;
  };
}

const InterviewSetCard: React.FC<InterviewSetCardProps> = ({
  interviewSet,
}) => {
  const topics =
    interviewSet.importantTopics?.split(",").map((t) => t.trim()) || [];
  return (
    <Card className="group hover:shadow-lg transition-all duration-300  bg-[#fef9f7]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
              {interviewSet.role}
            </CardTitle>
          </div>

          <Button
            className="text-xs text-sky-500 font-medium bg-transparent cursor-pointer px-3 py-1 border-none hover:border-sky-200 hover:bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
              interviewSet.onDelete();
            }}
          >
            <LuTrash2 />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 -mt-8">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Target className="h-4 w-4 text-sky-500" />
            <span>
              {interviewSet.experience}{" "}
              {interviewSet.experience <= 1 ? "year" : "years"} exp.
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4 text-sky-500" />
            <span>
              {new Date(interviewSet.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BookOpen className="h-4 w-4 text-sky-500" />
            <span className="font-medium">Focus Topics:</span>
          </div>
          <ImportantTopics topics={interviewSet.importantTopics} />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            {interviewSet.questionsCount || 0} questions prepared
          </div>
          <Button
            size="sm"
            className="bg-primary hover:bg-sky-600 text-white px-4 py-2 cursor-pointer"
            onClick={interviewSet.onSelect}
          >
            <Play className="h-4 w-4 mr-1.5" />
            View interview Set
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewSetCard;
