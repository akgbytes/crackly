import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";
import { BASE_URL } from "../constants";
import CreateInterviewSetDialog from "../components/CreateInterviewSetDialog";
import InterviewSetCard from "../components/InterviewSetCard";
import type { InterviewSet } from "../types";
import DeleteInterviewSetDialog from "../components/DeleteInterviewSetDialog";

const Dashboard = () => {
  const navigate = useNavigate();
  const [interviewSets, setInterviewSets] = useState<InterviewSet[]>([]);

  const { data } = authClient.useSession();

  const [openDeleteAlert, setOpenDeleteAlert] = useState<{
    open: boolean;
    data: InterviewSet | null;
  }>({
    open: false,
    data: null,
  });

  const fetchAllInterviewSets = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/summary`, {
        withCredentials: true,
      });
      setInterviewSets(response.data.data);
    } catch (error) {}
  };

  const deleteInterviewSet = async (interviewSet: InterviewSet | null) => {
    if (!interviewSet) return;
    try {
      await axios.delete(`${BASE_URL}/${interviewSet.id}`, {
        withCredentials: true,
      });

      toast.success("Interview set deleted successfully");

      setOpenDeleteAlert({ open: false, data: null });
      fetchAllInterviewSets();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllInterviewSets();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-2 md:px-4 mt-8">
          <div>
            <h1 className="text-4xl eb_garamond font-semibold text-gray-800">
              Welcome back, {data?.user?.name || "User"}
            </h1>
            <p className="text-base text-gray-500 mt-1 ml-2">
              Manage your interview set below
            </p>
          </div>

          <CreateInterviewSetDialog onSuccess={fetchAllInterviewSets}>
            <Button className="cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              Add Interview Set
            </Button>
          </CreateInterviewSetDialog>
        </div>

        {/* Interview set cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {interviewSets?.map((data) => (
            <InterviewSetCard
              interviewSet={{
                ...data,
                onSelect: () => navigate(`/interview-set/${data?.id}`),
                onDelete: () => setOpenDeleteAlert({ open: true, data }),
              }}
              key={data?.id}
            />
          ))}
        </div>

        <DeleteInterviewSetDialog
          open={openDeleteAlert.open}
          interviewSet={openDeleteAlert.data}
          onClose={() => setOpenDeleteAlert({ open: false, data: null })}
          onDelete={deleteInterviewSet}
        />
      </div>
    </>
  );
};

export default Dashboard;
