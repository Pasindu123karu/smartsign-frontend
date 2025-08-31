import { Star, Heart } from "lucide-react";

export const MascotHeader = () => {
  return (
    <div className="relative mb-10 text-center">
      {/* Floating decorations - More Sparkly */}
      <div className="absolute left-6 top-4 animate-float">
        <div className="text-3xl animate-wiggle">🌟</div>
      </div>
      <div className="absolute right-6 top-8 animate-float" style={{ animationDelay: "1s" }}>
        <div className="text-2xl animate-bounce-gentle">💫</div>
      </div>
      <div className="absolute left-12 top-16 animate-float" style={{ animationDelay: "2s" }}>
        <div className="text-2xl animate-tada">✨</div>
      </div>
      <div className="absolute right-12 top-2 animate-float" style={{ animationDelay: "0.5s" }}>
        <div className="text-2xl animate-wiggle">🎈</div>
      </div>
      <div className="absolute left-20 top-6 animate-float" style={{ animationDelay: "1.5s" }}>
        <div className="text-xl animate-pulse-soft">🎀</div>
      </div>
      <div className="absolute right-20 top-14 animate-float" style={{ animationDelay: "2.5s" }}>
        <div className="text-xl animate-bounce-gentle">🌈</div>
      </div>
      
      {/* Mascot Character Area - More Playful */}
      <div className="mx-auto mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-rainbow shadow-float animate-bounce-gentle relative overflow-hidden">
        <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse-soft"></div>
        <div className="absolute inset-2 rounded-full bg-gradient-primary opacity-80"></div>
        <div className="text-8xl animate-wiggle relative z-10">
          👋
        </div>
        {/* Sparkle effects */}
        <div className="absolute top-4 right-6 text-2xl animate-tada" style={{ animationDelay: "1s" }}>✨</div>
        <div className="absolute bottom-4 left-6 text-xl animate-tada" style={{ animationDelay: "2s" }}>⭐</div>
        <div className="absolute top-8 left-4 text-lg animate-tada" style={{ animationDelay: "0.5s" }}>🌟</div>
      </div>
      
      {/* Welcome Message - More Colorful */}
      <div className="animate-bounce-in" style={{ animationDelay: "200ms" }}>
        <h1 className="mb-3 text-5xl font-bold bg-gradient-rainbow bg-clip-text text-transparent animate-pulse-soft">
          Smart Sign
        </h1>
        <p className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">
          Let's learn signs together! 🎉✨
        </p>
      </div>
    </div>
  );
};