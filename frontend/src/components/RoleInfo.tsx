import { BookOpen, Clock, Target } from "lucide-react";
import React from "react";
import { Badge } from "./ui/badge";

interface RoleInfoProps {
  role: string;
  importantTopics?: string;
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
  return (
    <div className="max-w-3xl p-6 rounded-lg shadow-sm border">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {role} Interview Set
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-sky-500" />
              <span>{experience} years experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-sky-500" />
              <span>{new Date(createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-sky-500" />
              <span>{questions} questions</span>
            </div>
          </div>
        </div>
      </div>

      {importantTopics?.trim() && (
        <div className="flex flex-wrap gap-2">
          {importantTopics.split(",").map((topic, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-sky-50 text-sky-700 border-sky-200"
            >
              {topic.trim()}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoleInfo;
