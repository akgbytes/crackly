import React from "react";

interface RoleInfoProps {
  role: string;
  importantTopics: string;
  experience: number | string;
  questions: number | string;
  description: string;
  lastUpdated: string;
}

const RoleInfo: React.FC<RoleInfoProps> = ({
  role,
  importantTopics,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  console.log(
    "data receieved in roleInfo: ",
    role,
    importantTopics,
    experience,
    questions,
    description,
    lastUpdated
  );

  const expLabel = `${experience} ${
    Number(experience) === 1 ? "Year" : "Years"
  }`;
  return (
    <div className="bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-0">
        <div className="h-[200px] flex flex-col justify-center relative z-10">
          <div className="flex items-start">
            <div className="grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {role}
                  </h2>
                  <p className="text-sm font-medium text-gray-700 mt-1">
                    {importantTopics}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="text-[11px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              Experience: {expLabel}
            </div>
            <div className="text-[11px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              {questions} Q&A
            </div>
            <div className="text-[11px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfo;
