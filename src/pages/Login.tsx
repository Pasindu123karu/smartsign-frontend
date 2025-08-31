import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, Star, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Oops! 😅",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Error 😅",
          description: data.message || "Login failed",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Save JWT and user info
      localStorage.setItem("smartSignToken", data.token);
      localStorage.setItem("smartSignUser", JSON.stringify(data.user));

      toast({
        title: "Welcome back! 🎉",
        description: "Logged in successfully",
      });

      navigate("/home");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error 😅",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
              <div className="text-4xl animate-float">👋</div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back 👋</h1>
            <p className="text-muted-foreground text-lg">Ready for more sign language fun?</p>
          </div>

          {/* Login Form */}
          <div className="bg-card rounded-3xl p-8 shadow-card animate-bounce-in" style={{ animationDelay: "200ms" }}>
            <div className="space-y-6">
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
                    placeholder="Enter your password"
                    className="pl-12 py-4 text-lg rounded-2xl border-2 focus:border-primary"
                  />
                </div>
              </div>

              {/* Login Button */}
              <Button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-gradient-primary text-white text-xl font-bold py-4 rounded-2xl shadow-float hover:scale-105 transform transition-all duration-300"
              >
                {loading ? "Logging in..." : "Login 🚀"}
              </Button>

              {/* Sign Up Link */}
              <div className="text-center pt-4">
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <button 
                    onClick={() => navigate("/signup")}
                    className="text-primary font-semibold hover:text-primary-light transition-colors"
                  >
                    Sign Up
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

export default Login;
