import { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate
import { BottomNavigation } from "@/components/BottomNavigation";
import { MascotHeader } from "@/components/MascotHeader";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Trophy, Heart, Award, Target, Calendar, LogOut } from "lucide-react"; // ✅ Added LogOut icon

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userName] = useState("Little Learner");
  const [level] = useState(3);
  const [totalStars] = useState(42);
  const [streakDays] = useState(7);
  const [gamesPlayed] = useState(15);

  const navigate = useNavigate(); // ✅ Hook for navigation

  const badges = [
    { id: 1, name: "First Sign!", icon: "👋", earned: true },
    { id: 2, name: "Star Collector", icon: "⭐", earned: true },
    { id: 3, name: "Quick Learner", icon: "🚀", earned: true },
    { id: 4, name: "Perfect Week", icon: "🏆", earned: false },
    { id: 5, name: "Sign Master", icon: "🎯", earned: false },
    { id: 6, name: "Daily Champion", icon: "💪", earned: false },
  ];

  const stats = [
    { label: "Games Played", value: gamesPlayed, icon: <Target className="h-6 w-6" />, gradient: "bg-gradient-primary" },
    { label: "Learning Streak", value: `${streakDays} days`, icon: <Calendar className="h-6 w-6" />, gradient: "bg-gradient-secondary" },
    { label: "Total Stars", value: totalStars, icon: <Star className="h-6 w-6" />, gradient: "bg-gradient-success" },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "home") {
      navigate("/home");
    } else if (tabId === "games") {
      navigate("/games");
    }
  };

  const handleLogout = () => {
    // clear session/localstorage if needed
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login"); // ✅ Go to login page
  };

  return (
    <div className="min-h-screen bg-gradient-bg pb-24">
      {/* Floating decorations */}
      <div className="absolute left-6 top-10 animate-float">
        <Star className="h-8 w-8 text-accent animate-pulse-soft" />
      </div>
      <div className="absolute right-8 top-20 animate-float" style={{ animationDelay: "1s" }}>
        <Heart className="h-7 w-7 text-secondary animate-pulse-soft" />
      </div>

      <div className="container mx-auto px-4 pt-8">
        <MascotHeader />

        {/* Profile Header */}
        <div className="text-center mb-8 animate-bounce-in" style={{ animationDelay: "400ms" }}>
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary shadow-float">
            <div className="text-4xl animate-float">🧒</div>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {userName}
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Trophy className="h-6 w-6 text-accent" />
            <span className="text-xl font-semibold text-foreground">Level {level}</span>
          </div>
          <Progress value={(level / 10) * 100} className="h-3 rounded-full max-w-xs mx-auto" />
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`${stat.gradient} rounded-3xl p-6 shadow-card animate-bounce-in`}
              style={{ animationDelay: `${600 + index * 200}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm text-white">
                  {stat.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Badges Section */}
        <div className="animate-bounce-in" style={{ animationDelay: "1200ms" }}>
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Your Badges 🏅
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge, index) => (
              <div
                key={badge.id}
                className={`bg-card rounded-2xl p-4 shadow-card text-center transition-all duration-300 ${
                  badge.earned 
                    ? "border-2 border-accent shadow-glow" 
                    : "opacity-50 grayscale"
                } animate-bounce-in`}
                style={{ animationDelay: `${1400 + index * 100}ms` }}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <p className={`text-sm font-semibold ${
                  badge.earned ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {badge.name}
                </p>
                {badge.earned && (
                  <Badge variant="secondary" className="mt-2 text-xs">
                    Earned!
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Encouragement Section */}
        <div className="text-center mt-8 animate-bounce-in" style={{ animationDelay: "2000ms" }}>
          <div className="inline-block bg-white rounded-2xl px-6 py-4 shadow-card">
            <p className="text-foreground font-medium">
              🌟 You're doing amazing! Keep up the great work! 🎉
            </p>
          </div>
        </div>

      {/* ✅ Logout Button */}
<div className="text-center mt-8 mb-8">   {/* added mb-8 here */}
  <button
    onClick={handleLogout}
    className="flex items-center justify-center mx-auto space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-md transition"
  >
    <LogOut className="h-5 w-5" />
    <span className="font-semibold">Logout</span>
  </button>
</div>

      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Profile;
