import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "./AIResponsePreview";

interface QuestionCardProps {
  index: number;
  question: string;
  answer: string;
  onLearnMore: () => void;
  isPinned: boolean;
  onTogglePin: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  index,
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setHeight(contentRef.current.scrollHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group transition-all">
      <div className="flex items-start justify-between cursor-pointer">
        <div className="flex items-start gap-3.5">
          <span className="text-sm md:text-base font-medium text-gray-800">
            {`Q${index + 1}.`}
          </span>
          <h3
            className="text-sm md:text-base font-medium text-gray-800 mr-0 md:mr-20"
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>

        <div className="flex items-center ml-4 relative">
          <div
            className={`flex items-center ${
              isExpanded ? "md:flex" : "md:hidden group-hover:flex"
            }`}
          >
            <button
              className="flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1 mr-2 rounded border border-indigo-50 hover:border-indigo-200"
              onClick={onTogglePin}
              aria-label="Toggle pin"
            >
              {isPinned ? <LuPinOff size={14} /> : <LuPin size={14} />}
            </button>

            <button
              className="flex items-center gap-2 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 mr-2 rounded border border-cyan-50 hover:border-cyan-200"
              onClick={() => {
                setIsExpanded(true);
                onLearnMore();
              }}
              aria-label="Learn more"
            >
              <LuSparkles size={14} />
              <span className="hidden md:block">Learn More</span>
            </button>
          </div>

          <button
            className="text-gray-400 hover:text-gray-500"
            onClick={toggleExpand}
            aria-label="Toggle answer"
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg"
        >
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
