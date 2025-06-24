import { useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import axios from "axios";
import CreateSessionDialog from "../components/CreateSessionDialog";
import DeleteSessionDialog from "../components/DeleteSessionDialog";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import SessionCard from "../components/SessionCard";
import { Navbar } from "../components/Navbar";

export interface Session {
  id: string;
  role: string;
  experience: number;
  importantTopics: string;
  createdAt: string;
  questionsCount: number;
}

const Dashboard = () => {
  const { navigate, SERVER_URL, user } = useAppContext();

  const [sessions, setSessions] = useState<Session[]>([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState<{
    open: boolean;
    data: Session | null;
  }>({
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
    } catch (error) {}
  };

  const deleteSession = async (session: Session | null) => {
    if (!session) return;
    try {
      await axios.delete(`${SERVER_URL}/api/v1/sessions/${session.id}`, {
        withCredentials: true,
      });

      toast.success("Session deleted successfully");

      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSession();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllSession();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-2 md:px-4 mt-8">
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
            <Button className="mt-5 cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              Add Session
            </Button>
          </CreateSessionDialog>
        </div>

        {/* Session Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {sessions?.map((data) => (
            <SessionCard
              session={{
                ...data,
                onSelect: () => navigate(`/prep-session/${data?.id}`),
                onDelete: () => setOpenDeleteAlert({ open: true, data }),
              }}
              key={data?.id}
            />
          ))}
        </div>

        <DeleteSessionDialog
          open={openDeleteAlert.open}
          session={openDeleteAlert.data}
          onClose={() => setOpenDeleteAlert({ open: false, data: null })}
          onDelete={deleteSession}
        />
      </div>
    </>
  );
};

export default Dashboard;
