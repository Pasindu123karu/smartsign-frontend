import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/BottomNavigation";
import { MascotHeader } from "@/components/MascotHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Hourglass } from "lucide-react";

export default function Timer() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Time Challenge | Smart Sign";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Time-based sign challenge with countdown - Smart Sign game mode");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-bg pb-24">
      <div className="container mx-auto px-4 pt-6">
        <MascotHeader />

        <div className="animate-bounce-in" style={{ animationDelay: "200ms" }}>
          <h1 className="text-2xl font-bold text-foreground mb-2">Time Challenge</h1>
          <p className="text-muted-foreground">Answer quickly before the time runs out!</p>
        </div>

        <Card className="mt-6 shadow-card bg-gradient-secondary text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Hourglass className="h-6 w-6" />
              <span className="font-semibold">Countdown: 00:30</span>
            </div>
            <div className="mt-4 rounded-2xl bg-white/20 p-6">
              <p className="font-semibold">Question placeholder — Coming soon</p>
            </div>
            <div className="mt-6 flex gap-3">
              <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
              <Button variant="magical" onClick={() => { /* coming soon */ }}>Start Timer (Coming soon)</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation activeTab="games" onTabChange={(tab) => navigate(tab === "games" ? "/" : "/")} />
    </div>
  );
}
