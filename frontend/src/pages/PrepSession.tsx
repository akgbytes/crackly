import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert } from "react-icons/lu";
import AIResponsePreview from "../components/AIResponsePreview";
import SkeletonLoader from "../components/SkeletonLoader";
import axios from "axios";
import RoleInfo from "../components/RoleInfo";
import QuestionCard from "../components/QuestionCard";
import moment from "moment";
import Drawer from "../components/Drawer";

type Session = {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  userId: string;
  role: string;
  experience: number;
  importantTopics: string;
  description: string;
};

type Question = {
  createdAt: Date;
  updatedAt: Date;
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

const PrepSession = () => {
  const { sessionId } = useParams();
  const { SERVER_URL, navigate } = useAppContext();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  const [error, setError] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/v1/sessions/${sessionId}/questions`,
        { withCredentials: true }
      );

      console.log("session questions fetch response: ", response.data.data);

      setSessionData(response.data.data);
    } catch (error) {
      console.error("Error fetching session questions:", error);
    }
  };

  const generateConceptExplanation = async (question: string) => {
    try {
      setError("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axios.post(
        `${SERVER_URL}/api/v1/ai/generate-explanation`,
        { question },
        { withCredentials: true }
      );

      console.log("explanation response: ", response.data);

      if (response.data) {
        setExplanation(response.data.data);
      }
    } catch (error) {
      setExplanation(null);
      setError("Failed to generate explanation. Try again later.");
      console.error("Explanation Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId: string) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/question/pin/${questionId}`
      );
      if (response.data?.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Pin toggle error:", error);
    }
  };

  // const uploadMoreQuestions = async () => {};

  useEffect(() => {
    if (sessionId) fetchSessionDetailsById();
  }, [sessionId]);

  return (
    <>
      <RoleInfo
        role={sessionData?.session.role || ""}
        importantTopics={sessionData?.session.importantTopics || ""}
        experience={sessionData?.session.experience || "-"}
        questions={sessionData?.sessionQuestions.length || "-"}
        description={sessionData?.session.description || ""}
        lastUpdated={
          sessionData?.session.updatedAt
            ? moment(sessionData?.session.updatedAt).format("DD MMM YYYY")
            : "-"
        }
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-lg font-semibold text-black">Interview Q & A</h2>
        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
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
                  <QuestionCard
                    question={data?.question}
                    answer={data?.answer}
                    onLearnMore={() =>
                      generateConceptExplanation(data.question)
                    }
                    isPinned={data?.isPinned}
                    onTogglePin={() => toggleQuestionPinStatus(data.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

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
    </>
  );
};

export default PrepSession;
