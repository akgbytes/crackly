import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import AIResponsePreview from "../components/AIResponsePreview";
import SkeletonLoader from "../components/SkeletonLoader";
import axios from "axios";
import RoleInfo from "../components/RoleInfo";
import QuestionCard from "../components/QuestionCard";
import Drawer from "../components/Drawer";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { Button } from "../components/ui/button";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import type { InterviewSetData } from "../types";
import { BASE_URL } from "../constants";

const InterviewSetPage = () => {
  const { setId } = useParams();
  const navigate = useNavigate();

  const [interviewSetData, setinterviewSetData] =
    useState<InterviewSetData | null>(null);

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/${setId}/questions`, {
        withCredentials: true,
      });

      setinterviewSetData(response.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  const generateConceptExplanation = async (question: string, id: string) => {
    try {
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axios.post(
        `${BASE_URL}/${interviewSetData?.interviewSet.id}/question/${id}/explain`,
        { question },
        { withCredentials: true }
      );

      if (response.data) {
        setExplanation(response.data.data);
      }
    } catch (error: any) {
      setExplanation(null);
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId: string) => {
    try {
      await axios.post(
        `${BASE_URL}/${interviewSetData?.interviewSet.id}/question/${questionId}/pin`,
        {},
        { withCredentials: true }
      );

      toast.success("Question Pinned Successfully");
      fetchSessionDetailsById();
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  const uploadMoreQuestions = async () => {
    const previousQuestions = interviewSetData?.interviewSetQuestions.map(
      ({ question }) => question
    );
    try {
      setIsUpdateLoader(true);
      await axios.post(
        `${BASE_URL}/${interviewSetData?.interviewSet.id}/generate/more`,
        {
          questions: previousQuestions,
        },
        { withCredentials: true }
      );

      toast.success("More questions loaded successfully");

      fetchSessionDetailsById();
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (setId) fetchSessionDetailsById();
  }, [setId]);

  if (!interviewSetData) {
    return (
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
            className="mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        <RoleInfo
          role={interviewSetData?.interviewSet?.role || ""}
          importantTopics={interviewSetData?.interviewSet.importantTopics || ""}
          experience={interviewSetData?.interviewSet.experience}
          questions={interviewSetData?.interviewSetQuestions.length}
          createdAt={interviewSetData?.interviewSet.createdAt}
        />

        <div className="container mx-auto pt-6 px-4 md:px-0">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Interview Set
          </h2>
          <div className="grid grid-cols-12 gap-4 mt-2 mb-10">
            <div
              className={`col-span-12 ${
                openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
              }`}
            >
              <AnimatePresence>
                {interviewSetData?.interviewSetQuestions?.map((data, index) => (
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
                        interviewSetData?.interviewSetQuestions?.length ===
                          index + 1 && (
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

export default InterviewSetPage;
