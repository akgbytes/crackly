import { Check } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Heading } from "./ui/heading";
import { CustomButton } from "./ui/custom-button";

const HeroSection = () => {
  return (
    <section className="relative py-24">
      <MaxWidthWrapper className="text-center">
        <div className="relative mx-auto text-center flex flex-col items-center gap-10">
          <div>
            <Heading>
              <span>Crack Interviews Smarter,</span>
              <br />
              <span className="relative bg-gradient-to-r from-sky-700 to-sky-800 text-transparent bg-clip-text">
                Not Harder
              </span>
            </Heading>
          </div>

          <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
            Crackly helps you get ready for interviews with questions that
            actually match your role and experience. No fluff — just real
            explanations, helpful notes, and tools that keep you on track.
          </p>

          <ul className="space-y-2 text-base/7 text-gray-600 text-left flex flex-col items-start">
            {[
              "Get questions tailored to your exact role",
              "Understand concepts, not just answers",
              "Pin and organize what matters",
              "Prep without the overwhelm",
            ].map((item, index) => (
              <li key={index} className="flex gap-1.5 items-center text-left">
                <Check className="size-5 shrink-0 text-sky-700" />
                {item}
              </li>
            ))}
          </ul>

          <div className="w-full max-w-80">
            <CustomButton
              href="/sign-up"
              className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              Get Started with Crackly
            </CustomButton>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default HeroSection;
