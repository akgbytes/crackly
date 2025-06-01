import type { FC } from "react";
import type { Feature } from "../constants/features";

interface FeatureCardProps {
  features: Feature[];
}

const FeatureCard: FC<FeatureCardProps> = ({ features }) => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-[#f8fbff] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-blue-100 transition border border-blue-50"
          >
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-zinc-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCard;
