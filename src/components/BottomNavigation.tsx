import { Home, Gamepad2, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <Home className="h-6 w-6" /> },
  { id: "games", label: "Games", icon: <Gamepad2 className="h-6 w-6" /> },
  { id: "profile", label: "Profile", icon: <User className="h-6 w-6" /> },
];

const gradients = {
  home: "bg-gradient-primary",
  games: "bg-gradient-secondary", 
  profile: "bg-gradient-success"
};

interface BottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export const BottomNavigation = ({ 
  activeTab = "games", 
  onTabChange 
}: BottomNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-float border-t border-border/20 px-4 py-3">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const gradient = gradients[item.id as keyof typeof gradients];
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "home") {
                  window.location.href = "/home";
                } else if (item.id === "games") {
                  window.location.href = "/games";
                } else if (item.id === "profile") {
                  window.location.href = "/profile";
                } else {
                  onTabChange?.(item.id);
                }
              }}
              className={cn(
                "flex flex-col items-center gap-1 py-3 px-4 rounded-2xl transition-all duration-500 min-w-[70px]",
                "hover:scale-110 active:scale-95 transform-gpu",
                isActive 
                  ? `${gradient} text-white shadow-float scale-110`
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <div className={cn(
                "transition-transform duration-300",
                isActive && "scale-110"
              )}>
                {item.icon}
              </div>
              <span className={cn(
                "text-xs font-semibold transition-all duration-300",
                isActive && "scale-105"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};