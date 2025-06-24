import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import AIResponsePreview from "../components/AIResponsePreview";
import SkeletonLoader from "../components/SkeletonLoader";
import axios from "axios";
import RoleInfo from "../components/RoleInfo";
import QuestionCard from "../components/QuestionCard";

import Drawer from "../components/Drawer";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, MoreHorizontal, RefreshCcw } from "lucide-react";

type Session = {
  createdAt: string;
  updatedAt: string;
  id: string;
  userId: string;
  role: string;
  experience: number;
  importantTopics: string;
};

type Question = {
  createdAt: string;
  updatedAt: string;
  id: string;
  userId: string;
  sessionId: string;
  question: string;
  answer: string;
  note: string | null;
  isPinned: boolean;
};

interface SessionData {
  session: Session;
  sessionQuestions: Question[];
}

const PrepSession2 = () => {
  const { sessionId } = useParams();
  const { SERVER_URL, navigate } = useAppContext();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  const [error, setError] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/v1/sessions/${sessionId}/questions`,
        { withCredentials: true }
      );

      setSessionData(response.data.data);
    } catch (error) {}
  };

  const generateConceptExplanation = async (question: string, id: string) => {
    try {
      setError("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axios.post(
        `${SERVER_URL}/api/v1/sessions/${sessionData?.session.id}/question/${id}/explain`,
        { question },
        { withCredentials: true }
      );

      if (response.data) {
        setExplanation(response.data.data);
      }
    } catch (error) {
      setExplanation(null);
      setError("Failed to generate explanation. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId: string) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/v1/sessions/${sessionData?.session.id}/question/${questionId}/pin`,
        {},
        { withCredentials: true }
      );

      toast.success("Question Pinned Successfully");
      fetchSessionDetailsById();
    } catch (error) {}
  };

  const uploadMoreQuestions = async () => {
    const previousQuestions = sessionData?.sessionQuestions.map(
      ({ question }) => question
    );
    try {
      setIsUpdateLoader(true);
      const response = await axios.post(
        `${SERVER_URL}/api/v1/sessions/${sessionData?.session.id}/generate/more`,
        {
          questions: previousQuestions,
        },
        { withCredentials: true }
      );

      fetchSessionDetailsById();
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) fetchSessionDetailsById();
  }, [sessionId]);

  if (!sessionData) {
    return (
      // mx-auto w-full max-w-screen-xl px-2.5 md:px-20
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-xl px-2.5">
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        <RoleInfo
          role={sessionData?.session.role || ""}
          importantTopics={sessionData?.session.importantTopics || ""}
          experience={sessionData?.session.experience}
          questions={sessionData?.sessionQuestions.length}
          createdAt={sessionData?.session.createdAt}
        />

        <div className="container mx-auto pt-6 px-4 md:px-0">
          <h2 className="text-lg font-semibold text-black">Interview Q & A</h2>
          <div className="grid grid-cols-12 gap-4 mt-2 mb-10">
            <div
              className={`col-span-12 ${
                openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
              }`}
            >
              <AnimatePresence>
                {sessionData?.sessionQuestions?.map((data, index) => (
                  <motion.div
                    key={data.id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout
                    layoutId={`question-${data.id || index}`}
                  >
                    <>
                      <QuestionCard
                        index={index}
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() =>
                          generateConceptExplanation(data.question, data.id)
                        }
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(data.id)}
                      />

                      {!isLoading &&
                        sessionData.sessionQuestions?.length === index + 1 && (
                          <div className="flex items-center justify-center mt-5">
                            <Button
                              className="min-w-64 cursor-pointer"
                              disabled={isLoading || isUpdateLoader}
                              onClick={uploadMoreQuestions}
                            >
                              {isUpdateLoader ? (
                                <Spinner />
                              ) : (
                                // MoreHorizontal, RefreshCcw
                                <RefreshCcw size={15} />
                              )}
                              {"Load More"}
                            </Button>
                          </div>
                        )}
                    </>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <Drawer
              isOpen={openLearnMoreDrawer}
              onClose={() => setOpenLearnMoreDrawer(false)}
              title={!isLoading && explanation?.title}
            >
              {error && (
                <p className="flex gap-2 text-sm text-amber-600 font-medium">
                  <LuCircleAlert className="mt-1" />
                  {error}
                </p>
              )}

              {isLoading && <SkeletonLoader />}
              {!isLoading && explanation && (
                <AIResponsePreview content={explanation?.explanation} />
              )}
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrepSession2;
