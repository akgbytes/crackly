import { useState } from "react";

const ImportantTopics = ({ topics }: { topics: string | undefined }) => {
  const [showAll, setShowAll] = useState(false);

  const parsedTopics = topics?.split(",").map((t) => t.trim()) || [];

  const visibleTopics = showAll ? parsedTopics : parsedTopics.slice(0, 3);
  const hiddenCount = parsedTopics.length - 3;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {visibleTopics.map((topic, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200"
        >
          {topic}
        </span>
      ))}

      {parsedTopics.length > 3 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200"
        >
          +{hiddenCount} more
        </button>
      )}

      {parsedTopics.length > 3 && showAll && (
        <button
          onClick={() => setShowAll(false)}
          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200"
        >
          Show less
        </button>
      )}
    </div>
  );
};

export default ImportantTopics;
