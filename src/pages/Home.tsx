import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Play, Trophy, Target, Star, Heart,BrainCircuit  } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [userName, setUserName] = useState("Little Learner");
  const [progress] = useState(65); // Dummy progress data
  const [starLevel] = useState(3); // Dummy star level

  useEffect(() => {
    // Get user data from localStorage if available
    const userData = localStorage.getItem("smartSignUser");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name || "Little Learner");
    }
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "games") {
      navigate("/games");
    } else if (tabId === "profile") {
      navigate("/profile");
    }
  };

  const quickActions = [
    {
      title: "Start Learning",
      description: "Begin your sign language journey!",
      icon: <Target className="h-10 w-10 text-white" />,
      gradient: "bg-gradient-accent",
      onClick: () => navigate("/learning"),
    },
    {
      title: "Watch Video Lessons",
      description: "Learn with fun video tutorials!",
      icon: <Play className="h-10 w-10 text-white rotate-0" style={{ transform: 'rotate(0deg)' }} />,
      gradient: "bg-gradient-primary",
      onClick: () => navigate("/videos"),
    },
     {
      title: "Try AI Sign Recognition",
      description: "Show me your signs with the camera!",
      icon: <BrainCircuit  className="h-10 w-10 text-white" />,
      gradient: "bg-gradient-secondary",
      onClick: () => navigate("/camera"),
    },
    {
      title: "View Progress",
      description: "See how far you've come!",
      icon: <Trophy className="h-10 w-10 text-white" />,
      gradient: "bg-gradient-success",
      onClick: () => navigate("/profile"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-bg relative overflow-hidden pb-20">
      {/* Floating decorations */}
      <div className="absolute left-6 top-10 animate-float">
        <Star className="h-8 w-8 text-accent animate-pulse-soft" />
      </div>
      <div className="absolute right-8 top-20 animate-float" style={{ animationDelay: "1s" }}>
        <Heart className="h-7 w-7 text-secondary animate-pulse-soft" />
      </div>
      <div className="absolute left-12 top-40 animate-float" style={{ animationDelay: "2s" }}>
        <Star className="h-5 w-5 text-success animate-pulse-soft" />
      </div>
      <div className="absolute right-12 top-60 animate-float" style={{ animationDelay: "0.5s" }}>
        <Heart className="h-6 w-6 text-primary animate-pulse-soft" />
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Header with Greeting */}
        <div className="text-center mb-10 animate-bounce-in">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary shadow-float">
            <div className="text-4xl animate-float">👋</div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Hello, {userName}! 🌟
          </h1>
          <p className="text-muted-foreground text-xl">
            Ready to learn some amazing signs today?
          </p>
        </div>

        {/* Progress Section */}
        <div className="bg-card rounded-3xl p-6 shadow-card mb-8 animate-bounce-in" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Your Progress</h2>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < starLevel 
                      ? "text-accent fill-current animate-pulse-soft" 
                      : "text-muted-foreground"
                  }`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-muted-foreground">Learning Progress</span>
              <span className="text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3 rounded-full" />
            <p className="text-sm text-muted-foreground">
              Keep it up! You're doing amazing! 🎉
            </p>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground mb-6 animate-bounce-in" style={{ animationDelay: "400ms" }}>
            What would you like to do?
          </h2>
          
          {quickActions.map((action, index) => (
            <div
              key={action.title}
              className={`${action.gradient} rounded-3xl p-6 shadow-card cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-float animate-bounce-in`}
              style={{ animationDelay: `${600 + index * 200}ms` }}
              onClick={action.onClick}
            >
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                  {action.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {action.title}
                  </h3>
                  <p className="text-white/90 text-lg">
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Home;