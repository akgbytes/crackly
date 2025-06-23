import { BookOpen, Clock, Target } from "lucide-react";
import React from "react";
import { Badge } from "./ui/badge";

interface RoleInfoProps {
  role: string;
  importantTopics: string;
  experience: number;
  questions: number;
  createdAt: string;
}

const RoleInfo: React.FC<RoleInfoProps> = ({
  role,
  importantTopics,
  experience,
  questions,
  createdAt,
}) => {
  const expLabel = `${experience} ${
    Number(experience) <= 1 ? "year" : "years"
  }`;
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {role} Interview Session
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-pink-500" />
              <span>{experience} years experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-pink-500" />
              <span>{new Date(createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-pink-500" />
              <span>{questions} questions</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {importantTopics.split(",").map((topic, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-pink-50 text-pink-700 border-pink-200"
          >
            {topic}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default RoleInfo;
