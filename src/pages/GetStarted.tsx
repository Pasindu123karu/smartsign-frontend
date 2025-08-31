import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Star, Heart } from "lucide-react";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden" style={{ background: 'var(--gradient-background)' }}>
      {/* Floating decorations */}
      <div className="absolute left-6 top-10 animate-float">
        <Star className="h-12 w-12 text-accent animate-pulse-soft" />
      </div>
      <div className="absolute right-8 top-20 animate-float" style={{ animationDelay: "1s" }}>
        <Heart className="h-10 w-10 text-secondary animate-pulse-soft" />
      </div>
      <div className="absolute left-16 top-40 animate-float" style={{ animationDelay: "2s" }}>
        <Star className="h-8 w-8 text-success animate-pulse-soft" />
      </div>
      <div className="absolute right-16 top-60 animate-float" style={{ animationDelay: "0.5s" }}>
        <Heart className="h-9 w-9 text-primary animate-pulse-soft" />
      </div>

      <div className="container mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen text-center">
        {/* App Logo & Mascot */}
        <div className="animate-bounce-in mb-8">
          <div className="mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-primary shadow-float relative">
            <div className="absolute inset-0 rounded-full bg-white/10"></div>
            <div className="text-8xl animate-float">
              👋
            </div>
          </div>
          
          <h1 className="mb-4 text-6xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Smart Sign
          </h1>
          
          <p className="text-muted-foreground text-2xl font-medium mb-2">
            Learn and play with signs! 🎉
          </p>
          
          <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
            Join our fun world of sign language learning with games, challenges, and your friendly mascot guide!
          </p>
        </div>

        {/* Get Started Button */}
        <div className="animate-bounce-in" style={{ animationDelay: "400ms" }}>
          <Button
            onClick={() => navigate("/login")}
            className="bg-gradient-primary text-white text-2xl font-bold py-6 px-12 rounded-3xl shadow-float hover:scale-110 transform transition-all duration-300 hover:shadow-soft"
          >
            Get Started! 🚀
          </Button>
        </div>

        {/* Fun decorative elements */}
        <div className="mt-12 flex space-x-8 animate-bounce-in" style={{ animationDelay: "600ms" }}>
          <div className="w-4 h-4 bg-gradient-secondary rounded-full animate-pulse-soft"></div>
          <div className="w-6 h-6 bg-gradient-success rounded-full animate-pulse-soft" style={{ animationDelay: "0.5s" }}></div>
          <div className="w-4 h-4 bg-gradient-accent rounded-full animate-pulse-soft" style={{ animationDelay: "1s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;