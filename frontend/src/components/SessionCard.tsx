import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../lib/utils";

interface SessionCardProps {
  colors: {
    bgcolor: string;
  };
  role: string;
  importantTopics: string;
  experience: number;
  questions: number;
  description?: string;
  lastUpdated: string;
  onSelect: () => void;
  onDelete: () => void;
}

const SessionCard: React.FC<SessionCardProps> = ({
  colors,
  role,
  importantTopics,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-gray-300/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative group"
      onClick={onSelect}
    >
      <div
        className="rounded-lg p-4 cursor-pointer relative"
        style={{ background: colors.bgcolor }}
      >
        <div className="flex items-start">
          <div className="shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4">
            <span className="text-lg font-semibold text-black">
              {getInitials(role)}
            </span>
          </div>

          <div className="grow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[17px] font-medium">{role}</h2>
                <p className="text-xs font-medium text-gray-900">
                  {importantTopics}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded border border-rose-100 hover:border-rose-200 absolute top-2 right-2"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 />
        </button>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <span className="text-[10px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full">
            Experience: {experience} {experience === 1 ? "Year" : "Years"}
          </span>

          <span className="text-[10px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full">
            {questions} Q&A
          </span>

          <span className="text-[10px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full">
            Last Updated: {lastUpdated}
          </span>
        </div>

        {description && (
          <p className="text-[12px] text-gray-700 font-medium line-clamp-1 mt-3">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SessionCard;
