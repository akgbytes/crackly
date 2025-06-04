import axios from "axios";
import { useAppContext } from "../hooks/useAppContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { navigate, user, clearUser, SERVER_URL } = useAppContext();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${SERVER_URL}/api/v1/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      clearUser();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to log out. Please try again."
      );
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center space-x-3">
      <img
        src={user.avatar}
        alt="user-avatar"
        className="w-10 h-10 rounded-full object-cover"
      />

      <div>
        <div className="text-sm font-semibold leading-tight">{user.name}</div>
        <button
          onClick={handleLogout}
          className="text-sm text-red-400 hover:underline cursor-pointer font-medium bg-transparent border-none p-0"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
