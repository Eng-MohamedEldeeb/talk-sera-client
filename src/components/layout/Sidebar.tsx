import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  MessageSquare,
  User,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
const NAV = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/vocabulary", icon: BookOpen, label: "Vocabulary" },
  { to: "/flashcards", icon: Layers, label: "Flashcards" },
  { to: "/chat", icon: MessageSquare, label: "AI Chat" },
  { to: "/profile", icon: User, label: "Profile" },
];

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <aside className="w-60 shrink-0 bg-[#0D0E1A] border-r border-white/7 flex flex-col py-6 px-4">
      <div className="text-xl font-bold text-[#C9A84C] mb-8 px-2">Talksera</div>
      <nav className="flex flex-col gap-1 flex-1">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors 
            ${
              isActive
                ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                : "text-[#A0A0B0] hover:text-white hover:bg-white/5"
            }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="text-xs text-[#606070] px-2">{user?.email}</div>
    </aside>
  );
};

export default Sidebar;
