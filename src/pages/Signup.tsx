import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, User, Star, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
  if (!name || !email || !password || !confirmPassword) {
    toast({
      title: "Oops! 😅",
      description: "Please fill in all fields to continue.",
      variant: "destructive",
    });
    return;
  }

  if (password !== confirmPassword) {
    toast({
      title: "Oops! 😅",
      description: "Passwords don't match. Please try again.",
      variant: "destructive",
    });
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast({
        title: "Signup Failed 😢",
        description: data.message || "Something went wrong on the server.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Welcome to Smart Sign! 🎉",
      description: "Account created successfully!",
    });

    localStorage.setItem("smartSignUser", JSON.stringify({ name: data.user.name, email: data.user.email, token: data.token }));
    navigate("/home");

  } catch (error: any) {
    console.error("Signup error:", error);
    toast({
      title: "Error 😢",
      description: error.message || "Something went wrong.",
      variant: "destructive",
    });
  }
};
  return (
    <div className="min-h-screen bg-gradient-bg relative overflow-hidden">
      {/* Floating decorations */}
      <div className="absolute left-6 top-10 animate-float">
        <Star className="h-10 w-10 text-accent animate-pulse-soft" />
      </div>
      <div className="absolute right-8 top-20 animate-float" style={{ animationDelay: "1s" }}>
        <Heart className="h-8 w-8 text-secondary animate-pulse-soft" />
      </div>
      <div className="absolute left-16 bottom-20 animate-float" style={{ animationDelay: "2s" }}>
        <Star className="h-6 w-6 text-success animate-pulse-soft" />
      </div>
      <div className="absolute right-16 bottom-40 animate-float" style={{ animationDelay: "0.5s" }}>
        <Heart className="h-7 w-7 text-primary animate-pulse-soft" />
      </div>

      <div className="container mx-auto px-6 py-8 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10 animate-bounce-in">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary shadow-float">
              <div className="text-4xl animate-float">🌟</div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Join Smart Sign! ✨</h1>
            <p className="text-muted-foreground text-lg">Start your sign language journey today</p>
          </div>

          {/* Signup Form */}
          <div className="bg-card rounded-3xl p-8 shadow-card animate-bounce-in" style={{ animationDelay: "200ms" }}>
            <div className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg font-semibold text-foreground">
                  Your Name
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="pl-12 py-4 text-lg rounded-2xl border-2 focus:border-primary"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg font-semibold text-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="pl-12 py-4 text-lg rounded-2xl border-2 focus:border-primary"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-lg font-semibold text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="pl-12 py-4 text-lg rounded-2xl border-2 focus:border-primary"
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-lg font-semibold text-foreground">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="pl-12 py-4 text-lg rounded-2xl border-2 focus:border-primary"
                  />
                </div>
              </div>

              {/* Signup Button */}
              <Button
                onClick={handleSignup}
                disabled={loading}
                className="w-full bg-gradient-primary text-white text-xl font-bold py-4 rounded-2xl shadow-float hover:scale-105 transform transition-all duration-300"
              >
                {loading ? "Creating Account..." : "Create Account 🚀"}
              </Button>

              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <button 
                    onClick={() => navigate("/login")}
                    className="text-primary font-semibold hover:text-primary-light transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
