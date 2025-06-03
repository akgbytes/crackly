import { useAppContext } from "../hooks/useAppContext";

const Dashboard = () => {
  const { user } = useAppContext();

  return user ? (
    <div>
      <p>Below are User details</p>
      <p>{user.id}</p>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.avatar}</p>
    </div>
  ) : (
    <div>Dashboard without user detail</div>
  );
};

export default Dashboard;
