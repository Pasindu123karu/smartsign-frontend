import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/BottomNavigation";
import { MascotHeader } from "@/components/MascotHeader";
import { Card, CardContent } from "@/components/ui/card";

const alphabet = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i)
);

const TOTAL_TIME = 30; // seconds

export default function Timer() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [score, setScore] = useState(0);
  const [currentLetter, setCurrentLetter] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [streak, setStreak] = useState(0);

  // Set document title and meta
  useEffect(() => {
    document.title = "Time Challenge | Smart Sign";
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        "Time-based sign challenge with countdown - Smart Sign game mode"
      );
  }, []);

  // Timer effect
  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameStarted(false);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // cleanup if component unmounts or game restarts
  }, [gameStarted]);

  const shuffleArray = (arr: string[]) => arr.sort(() => Math.random() - 0.5);

  const loadNextSign = () => {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    setCurrentLetter(randomLetter);

    const otherOptions = alphabet
      .filter((l) => l !== randomLetter)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setOptions(shuffleArray([randomLetter, ...otherOptions]));
    setFeedback(null);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(TOTAL_TIME);
    setGameStarted(true);
    setGameOver(false);
    setStreak(0);
    loadNextSign();
  };

  const handleOptionClick = (option: string) => {
    if (!gameStarted || feedback) return;

    if (option === currentLetter) {
      setFeedback("correct");
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);

      // Bonus time after streak of 5
      if (streak + 1 === 5) {
        setTimeLeft((prev) => prev + 10);
        setStreak(0);
      }
    } else {
      setFeedback("wrong");
      setStreak(0);
    }

    // Load next sign after 1 second to show feedback
    setTimeout(() => {
      loadNextSign();
    }, 1000);
  };

  const restartGame = () => {
    startGame();
  };

  return (
    <div className="min-h-screen bg-gradient-bg pb-24">
      <div className="container mx-auto px-4 pt-6">
        <MascotHeader />

        {!gameOver ? (
          <>
            <div className="animate-bounce-in mb-4">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Time Challenge
              </h1>
              <p className="text-muted-foreground">
                {gameStarted
                  ? `Time left: ${timeLeft}s`
                  : "Click Start to begin!"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Score: {score} | Streak: {streak}
              </p>
            </div>

            <Card className="mt-6 shadow-card animate-bounce-in">
              <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-center">
                {/* Sign image */}
                <div className="rounded-2xl bg-muted h-48 w-48 flex items-center justify-center text-muted-foreground">
                  {currentLetter && gameStarted && (
                    <img
                      src={`/public/assets/signs/alphabet/${currentLetter}.png`}
                      alt={`Sign ${currentLetter}`}
                      className="h-full object-contain"
                    />
                  )}
                  {!gameStarted && !gameOver && <p>Press Start!</p>}
                </div>

                {/* Options */}
                <div className="flex-1 grid grid-cols-2 gap-3">
                  {options.map((option) => (
                    <Button
                      key={option}
                      size="xl"
                      className={`w-full transition-all duration-500 ${
                        feedback
                          ? option === currentLetter && feedback === "correct"
                            ? "bg-green-500 text-white animate-pulse"
                            : option === currentLetter && feedback === "wrong"
                            ? "bg-red-500 text-white animate-shake"
                            : ""
                          : ""
                      }`}
                      onClick={() => handleOptionClick(option)}
                      disabled={!gameStarted || feedback !== null}
                    >
                      {option.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {!gameStarted && (
              <div className="mt-6 text-center">
                <Button size="lg" className="animate-pulse" onClick={startGame}>
                  Start Timer
                </Button>
              </div>
            )}
          </>
        ) : (
          // Game Over Screen
          <div className="text-center mt-20 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-4 animate-bounce-in">
              🎉 Time's Up! 🎉
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Your final score: <span className="text-accent">{score}</span>
            </p>
          </div>
        )}

        {/* Back & Restart Buttons */}
        <div className="mt-6 flex gap-3">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button
            variant="secondary"
            onClick={restartGame}
            disabled={!gameStarted && !gameOver}
          >
            Restart
          </Button>
        </div>
      </div>

      <BottomNavigation
        activeTab="games"
        onTabChange={(tab) => navigate(tab === "games" ? "/" : "/")}
      />
    </div>
  );
}
