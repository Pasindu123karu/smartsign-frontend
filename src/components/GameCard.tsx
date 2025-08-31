import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  onClick?: () => void;
  delay?: number;
}

export const GameCard = ({ 
  title, 
  description, 
  icon, 
  gradient, 
  onClick,
  delay = 0 
}: GameCardProps) => {
  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-all duration-500 hover:scale-110 hover:shadow-rainbow",
        "animate-bounce-in border-0 shadow-rainbow hover:-translate-y-4 hover:animate-wiggle",
        "transform-gpu will-change-transform overflow-hidden", // Hardware acceleration
        gradient
      )}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      <CardContent className="p-8 text-center relative overflow-hidden">
        {/* Magical background effects */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/20 rounded-full animate-pulse-soft"></div>
        <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/10 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-6 left-6 w-8 h-8 bg-white/15 rounded-full animate-float"></div>
        
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-white/25 p-8 backdrop-blur-sm transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 shadow-glow animate-bounce-gentle">
            {icon}
          </div>
        </div>
        <h3 className="mb-3 text-3xl font-bold text-white drop-shadow-lg animate-pulse-soft">
          {title}
        </h3>
        <p className="text-white/95 text-lg leading-relaxed font-semibold">
          {description}
        </p>
        
        {/* Magical progress indicator */}
        <div className="mt-6 w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-rainbow rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 animate-rainbow"></div>
        </div>
        
        {/* Sparkle effects on hover */}
        <div className="absolute top-2 right-2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-tada">✨</div>
        <div className="absolute bottom-2 left-2 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-wiggle">🌟</div>
      </CardContent>
    </Card>
  );
};