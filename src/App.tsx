import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Camera from "./pages/Camera";
import Identify from "@/pages/games/Identify";
import Timer from "@/pages/games/Timer";
import Match from "@/pages/games/Match";
import Learning from "@/pages/Learning";
import Videos from "@/pages/Videos";

// Components
import HandRecognition from "./components/HandRecognition";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GetStarted />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/games" element={<Index />} />
            <Route path="/games/identify" element={<Identify />} />
            <Route path="/games/timer" element={<Timer />} />
            <Route path="/games/match" element={<Match />} />

            {/* NEW ROUTE FOR HAND RECOGNITION */}
            <Route path="/hand-recognition" element={<HandRecognition />} />

            {/* CATCH-ALL ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
