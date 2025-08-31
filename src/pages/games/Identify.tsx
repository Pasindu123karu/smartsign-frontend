import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/BottomNavigation";
import { MascotHeader } from "@/components/MascotHeader";
import { Card, CardContent } from "@/components/ui/card";

export default function Identify() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Identify Signs | Smart Sign";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Identify sign language from options - Smart Sign game mode");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-bg pb-24">
      <div className="container mx-auto px-4 pt-6">
        <MascotHeader />

        <div className="animate-bounce-in" style={{ animationDelay: "200ms" }}>
          <h1 className="text-2xl font-bold text-foreground mb-2">Identify Signs</h1>
          <p className="text-muted-foreground">See a sign and pick the correct word from choices.</p>
        </div>

        <Card className="mt-6 shadow-card">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-muted h-48 flex items-center justify-center text-muted-foreground">
                Sign image placeholder
              </div>
              <div className="space-y-3">
                <Button variant="playful" size="xl" className="w-full">Option A</Button>
                <Button variant="fun" size="xl" className="w-full">Option B</Button>
                <Button variant="success" size="xl" className="w-full">Option C</Button>
                <Button variant="magical" size="xl" className="w-full">Option D</Button>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
              <Button variant="default" onClick={() => { /* coming soon */ }}>Start (Coming soon)</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation activeTab="games" onTabChange={(tab) => navigate(tab === "games" ? "/" : "/")} />
    </div>
  );
}
