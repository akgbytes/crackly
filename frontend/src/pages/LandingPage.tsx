import { Navbar } from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import { Heading } from "../components/ui/heading";

import CTA from "../components/CTA";
import { Footer } from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />;
      <div>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flow-root">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                src="/hero-image.png"
                alt="product preview"
                width={1364}
                height={866}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-center text-base/7 font-semibold text-sky-600">
              How It Works
            </h2>
            <Heading>Start preparing in minutes</Heading>
            <p className="mt-4 text-lg text-gray-600">
              Getting interview-ready with Crackly is fast, simple, and
              personalized.
            </p>
          </div>
        </div>

        {/* Steps */}
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-sky-600">Step 1</span>
              <span className="text-xl font-semibold">Create your account</span>
              <span className="mt-2 text-zinc-700">
                Sign up in seconds — no credit card, no paywall.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-sky-600">Step 2</span>
              <span className="text-xl font-semibold">Pick your role</span>
              <span className="mt-2 text-zinc-700">
                Tell us what you&apos;re aiming for so we can tailor the right
                questions for you.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-sky-600">Step 3</span>
              <span className="text-xl font-semibold">Start practicing</span>
              <span className="mt-2 text-zinc-700">
                Get smart, role-specific questions with clear explanations.
              </span>
            </div>
          </li>
        </ol>

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                src="/interview-set.png"
                alt="uploading preview"
                width={1419}
                height={732}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
      <CTA />
      <Footer />
    </>
  );
};

export default LandingPage;
