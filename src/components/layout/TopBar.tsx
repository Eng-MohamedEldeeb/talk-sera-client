import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui";

const TopBar = () => {
  const { user, logout } = useAuth();
  return (
    <header className="h-14 border-b border-white/7 flex items-center justify-between px-6 bg-[#0D0E1A]">
      <div className="text-sm text-[#A0A0B0]">
        Welcome, <span className="text-white font-medium">{user?.name}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-xs text-[#C9A84C] font-mono">{user?.xp} XP</div>
        <Button variant="ghost" size="sm" onClick={logout}>
          Sign out
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
