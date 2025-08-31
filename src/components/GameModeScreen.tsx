import { useState } from "react";
import { Brain, Clock, Shuffle } from "lucide-react";
import { GameCard } from "./GameCard";
import { BottomNavigation } from "./BottomNavigation";
import { MascotHeader } from "./MascotHeader";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const gameTypes = [
  {
    id: "identify",
    title: "Identify Signs",
    description: "See a sign and choose the correct word from options",
    icon: <Brain className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-primary",
  },
  {
    id: "timer",
    title: "Time Challenge", 
    description: "Quick questions with countdown timer for extra fun!",
    icon: <Clock className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-secondary",
  },
  {
    id: "match",
    title: "Match Signs",
    description: "Drag and drop or tap to match signs with images",
    icon: <Shuffle className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-success",
  },
];

export const GameModeScreen = () => {
  const [activeTab, setActiveTab] = useState("games");
  const navigate = useNavigate();

  const handleGameSelect = (gameId: string) => {
    const routes: Record<string, string> = {
      identify: "/games/identify",
      timer: "/games/timer",
      match: "/games/match",
    };
    const path = routes[gameId];
    if (path) {
      navigate(path);
      toast.success("Loading game...", { duration: 1500 });
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId !== "games") {
      toast.info(`${tabId.charAt(0).toUpperCase() + tabId.slice(1)} screen is under development.`, {
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg pb-24">
      <div className="container mx-auto px-4 pt-8">
        <MascotHeader />
        
        {/* Games Section */}
        <div className="space-y-6">
          <div className="text-center animate-bounce-in" style={{ animationDelay: "400ms" }}>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Choose Your Game Mode
            </h2>
            <p className="text-muted-foreground">
              Pick a fun way to practice sign language!
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gameTypes.map((game, index) => (
              <GameCard
                key={game.id}
                title={game.title}
                description={game.description}
                icon={game.icon}
                gradient={game.gradient}
                delay={600 + index * 200}
                onClick={() => handleGameSelect(game.id)}
              />
            ))}
          </div>

          {/* Encouragement Section */}
          <div className="text-center mt-8 animate-bounce-in" style={{ animationDelay: "1200ms" }}>
            <div className="inline-block bg-white rounded-2xl px-6 py-4 shadow-card">
              <p className="text-foreground font-medium">
                🌟 Great job learning! Keep practicing to become a sign language star! ⭐
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
      />
    </div>
  );
};