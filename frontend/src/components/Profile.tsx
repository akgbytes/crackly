import { useAppContext } from "../hooks/useAppContext";
import { Button } from "./ui/button";

const Profile = () => {
  const { navigate, user, clearUser } = useAppContext();

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };
  return (
    user && (
      <div className="flex items-center">
        <img
          src={user?.avatar}
          alt="user-avatar"
          className="size-10 object-cover rounded-full mr-3"
        />

        <div className="mt-2">
          <div className="text-[15px] leading-3 font-bold">{user?.name}</div>
          <Button
            className="text-red-400 hover:text-primary hover:bg-transparent cursor-pointer font-semibold"
            variant={"ghost"}
            size={"sm"}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    )
  );
};

export default Profile;
