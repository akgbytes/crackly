import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useAppContext } from "../hooks/useAppContext";
import axios from "axios";
import SessionCard from "../components/SessionCard";
import moment from "moment";
import CreateSessionDialog from "../components/CreateSessionDialog";

export const CARD_BG = [
  { id: 1, bgcolor: "linear-gradient(135deg, #e6f8f3 0%, #f7fcfa 100%)" },
  { id: 2, bgcolor: "linear-gradient(135deg, #fef9e7 0%, #fffdf4 100%)" },
  { id: 3, bgcolor: "linear-gradient(135deg, #eaf7ff 0%, #f3fbff 100%)" },
  { id: 4, bgcolor: "linear-gradient(135deg, #fff2e9 0%, #fff8f3 100%)" },
  { id: 5, bgcolor: "linear-gradient(135deg, #e7f6fe 0%, #f4fafd 100%)" },
  { id: 6, bgcolor: "lineas-gradient(135deg, #f5f5f5 0%, #fbfbfb 100%)" },
  { id: 7, bgcolor: "linear-gradient(135deg, #fff4fc 0%, #fff8fd 100%)" },
  { id: 8, bgcolor: "linear-gradient(135deg, #e8fef3 0%, #f5fef8 100%)" },
  { id: 9, bgcolor: "linear-gradient(135deg, #f0ecff 0%, #f7f5ff 100%)" },
  { id: 10, bgcolor: "linear-gradient(135deg, #fef2f2 0%, #fff8f8 100%)" },
];

interface Session {
  id: string;
  role: string;
  importantTopics: string;
  experience: number;
  description: string;
  lastUpdated: string;
  questionCount: number;
}

const Dashboard = () => {
  const { navigate, SERVER_URL, user } = useAppContext();

  const [sessions, setSessions] = useState<Session[]>([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSession = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/v1/sessions/summary`,
        { withCredentials: true }
      );
      setSessions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSession = async (session: any) => {
    // baad me krunga
  };

  useEffect(() => {
    fetchAllSession();
  }, []);

  return (
    <div className="container mx-auto pt-6 pb-4 px-4 md:px-0 h-screen relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-2 md:px-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || "/default-avatar.png"}
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Welcome back, {user?.name || "User"}
            </h1>
            <p className="text-sm text-gray-500">
              Manage your interview prep sessions below
            </p>
          </div>
        </div>

        <CreateSessionDialog onSuccess={fetchAllSession}>
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-[#f43f5e] to-[#ec4899]
text-sm font-semibold text-white px-5 py-2.5 rounded-full hover:shadow-xl transition"
          >
            <LuPlus className="text-xl" />
            Add New
          </button>
        </CreateSessionDialog>
      </div>

      {/* Session Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7">
        {sessions?.map((data, index) => (
          <SessionCard
            key={data?.id}
            colors={CARD_BG[index % CARD_BG.length]}
            role={data?.role}
            importantTopics={data?.importantTopics}
            experience={data?.experience}
            questions={data?.questionCount}
            description={data?.description}
            lastUpdated={
              data?.lastUpdated
                ? moment(data.lastUpdated).format("DD MMM YYYY")
                : ""
            }
            onSelect={() => navigate(`/prep-session/${data?.id}`)}
            onDelete={() => setOpenDeleteAlert({ open: true, data: null })}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
