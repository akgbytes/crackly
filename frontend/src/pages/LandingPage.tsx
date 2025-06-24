import { Button } from "../components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import FeatureCard from "../components/FeatureCard";
import { useAppContext } from "../hooks/useAppContext";
import Footer from "../components/Footer";
import { FEATURES } from "../constants/features";
import { Badge } from "../components/ui/badge";
import { Navbar } from "../components/Navbar";

const LandingPage = () => {
  const { navigate, user } = useAppContext();

  const handleCTA = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <>
      <Navbar />

      <div className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 rounded-full bg-white/70 px-7 py-2 shadow">
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

        <Button onClick={handleCTA} className="mt-5 cursor-pointer">
          Get started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Session Preview */}
      <div>
        <div className="relative isolate">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src="/dashboard.png"
                  alt="session preview"
                  width={1364}
                  height={866}
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <section
        id="features"
        className="flex flex-col items-center container mt-32 mx-auto px-6 py-20"
      >
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-rose-100 text-rose-700 font-semibold">
            Why Choose PrepGenie
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Our AI-powered platform adapts to your specific needs and gives you
            the edge in any interview
          </p>
        </div>

        <div className="">
          <FeatureCard features={FEATURES} />
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="container mt-8 mx-auto px-6 py-8 mb-8"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700">
              How It Works
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple. Smart. Effective.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with your interview prep in just three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Set Your Profile</h3>
              <p className="text-gray-600">
                Tell us about your target role, experience level, and the topics
                you want to focus on
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Get AI Questions</h3>
              <p className="text-gray-600">
                Our AI generates personalized interview questions based on your
                profile and preferences
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Practice & Learn</h3>
              <p className="text-gray-600">
                Practice with detailed answers and deep-dive explanations to
                master each concept
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;
