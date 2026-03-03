import { useAuth } from "@/hooks/useAuth";

const DashboardPage = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">
        Welcome back, {user?.name}
      </h1>
      <p className="text-[#A0A0B0]">Full dashboard coming in Phase 2.</p>
    </div>
  );
};

export default DashboardPage;
