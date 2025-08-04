import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { BookOpen, Clock, Play, Target } from "lucide-react";

interface SessionCardProps {
  session: {
    id: string;
    role: string;
    experience: number;
    importantTopics: string;
    createdAt: string;
    questionsCount: number;
    onSelect: () => void;
    onDelete: () => void;
  };
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300  bg-[#fef9f7]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
              {session.role}
            </CardTitle>
          </div>

          <Button
            className="text-xs text-sky-500 font-medium bg-transparent cursor-pointer px-3 py-1 border-none hover:border-sky-200 hover:bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
              session.onDelete();
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
              {session.experience} {session.experience <= 1 ? "year" : "years"}{" "}
              exp.
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4 text-sky-500" />
            <span>
              {new Date(session.createdAt).toLocaleDateString("en-US", {
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
          <div className="flex flex-wrap gap-1.5">
            {session.importantTopics
              .split(",")
              .slice(0, 3)
              .map((topic, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200"
                >
                  {topic.trim()}
                </span>
              ))}
            {session.importantTopics.split(",").length > 3 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                +{session.importantTopics.split(",").length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            {session.questionsCount || 0} questions prepared
          </div>
          <Button
            size="sm"
            className="bg-primary hover:bg-sky-600 text-white px-4 py-2 cursor-pointer"
            onClick={session.onSelect}
          >
            <Play className="h-4 w-4 mr-1.5" />
            View Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
