import type { FC } from "react";
import type { Feature } from "../constants/features";

interface FeatureCardProps {
  features: Feature[];
}

const FeatureCard: FC<FeatureCardProps> = ({ features }) => {
  return (
    <div className="flex flex-col items-center max-w-[70vw]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white border border-gray-100 rounded-2xl py-4 px-4 shadow-sm hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-2">
              <div className="py-3 rounded-xl">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCard;
