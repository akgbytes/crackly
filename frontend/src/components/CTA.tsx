import { CustomButton } from "./ui/custom-button";
import { Heading } from "./ui/heading";

const CTA = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <Heading>Ready to Make Interview Prep Less Stressful?</Heading>

          <p className="text-lg md:text-xl mb-8 text-gray-600 mt-12">
            Join thousands of candidates leveling up their interview prep with
            AI-powered questions and concept breakdowns. It&apos;s fast,
            focused, and completely free to start.
          </p>

          <div className="flex justify-center items-center gap-4">
            <div className="w-full max-w-80">
              <CustomButton
                to="/dashboard"
                className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                Start Preparing
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
