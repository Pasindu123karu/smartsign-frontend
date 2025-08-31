import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/BottomNavigation";
import { MascotHeader } from "@/components/MascotHeader";
import { Card, CardContent } from "@/components/ui/card";

export default function Match() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Match Signs | Smart Sign";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Match signs to images - Smart Sign game mode");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-bg pb-24">
      <div className="container mx-auto px-4 pt-6">
        <MascotHeader />

        <div className="animate-bounce-in" style={{ animationDelay: "200ms" }}>
          <h1 className="text-2xl font-bold text-foreground mb-2">Match Signs</h1>
          <p className="text-muted-foreground">Drag or tap to match signs with the right images.</p>
        </div>

        <Card className="mt-6 shadow-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="rounded-2xl h-24 bg-muted flex items-center justify-center text-muted-foreground">
                  Slot {i}
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
              <Button variant="success" onClick={() => { /* coming soon */ }}>Start Matching (Coming soon)</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation activeTab="games" onTabChange={(tab) => navigate(tab === "games" ? "/" : "/")} />
    </div>
  );
}
