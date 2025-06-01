import { FEATURES } from "../constants/features";
import { Button } from "../components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import FeatureCard from "../components/FeatureCard";

const LandingPage = () => {
  return (
    <>
      <div className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <Sparkles size={16} className="text-primary" />
          <p className="text-sm font-semibold text-zinc-800">AI Powered</p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          <span className="text-primary">Crack Interviews Smarter</span> Not
          Harder
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          PrepGenie delivers questions tailored to your role and experience.
          Explore answers on your terms, dive deep with AI-powered concept
          breakdowns, and stay organized with notes and pins.
        </p>

        <a href="/dashboard" target="_blank">
          <Button size={"lg"} className="mt-5">
            Get started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </a>
      </div>

      {/* Session Preview */}
      <div>
        <div className="relative isolate">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src="/dummy.png"
                  alt="session preview"
                  width={1364}
                  height={866}
                  className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
              Your Smarter Way to Interview
            </h2>
          </div>
        </div>

        <FeatureCard features={FEATURES} />
      </div>
    </>
  );
};

export default LandingPage;
