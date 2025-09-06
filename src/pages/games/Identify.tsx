import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/BottomNavigation";
import { MascotHeader } from "@/components/MascotHeader";
import { Card, CardContent } from "@/components/ui/card";

const alphabet = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i) // a-z
);

const TOTAL_ROUNDS = 10;

export default function Identify() {
  const navigate = useNavigate();
  const [currentLetter, setCurrentLetter] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    document.title = "Identify Signs | Smart Sign";
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        "Identify sign language from options - Smart Sign game mode"
      );

    loadNextSign();
  }, []);

  const shuffleArray = (arr: string[]) => arr.sort(() => Math.random() - 0.5);

  const loadNextSign = () => {
    if (round > TOTAL_ROUNDS) {
      setGameOver(true);
      return;
    }

    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    setCurrentLetter(randomLetter);
    setCorrectAnswer(randomLetter);

    const otherOptions = alphabet
      .filter((l) => l !== randomLetter)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setOptions(shuffleArray([randomLetter, ...otherOptions]));
    setFeedback(null);
  };

  const handleOptionClick = (option: string) => {
    if (feedback) return;

    if (option === currentLetter) {
      setFeedback("correct");
      setScore((prev) => prev + 1);
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => {
      setRound((prev) => {
        const nextRound = prev + 1;
        if (nextRound > TOTAL_ROUNDS) {
          setGameOver(true);
          return prev;
        } else {
          loadNextSign();
          return nextRound;
        }
      });
    }, 1500);
  };

  const restartGame = () => {
    setScore(0);
    setRound(1);
    setGameOver(false);
    loadNextSign();
  };

  return (
    <div className="min-h-screen bg-gradient-bg pb-24">
      <div className="container mx-auto px-4 pt-6">
        <MascotHeader />

        {!gameOver ? (
          <>
            <div className="animate-bounce-in mb-4">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Identify Signs
              </h1>
              <p className="text-muted-foreground">
                Round {round} of {TOTAL_ROUNDS}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Correct selections: {score}
              </p>
            </div>

            <Card className="mt-6 shadow-card animate-bounce-in">
              <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-center">
                {/* Sign image */}
                <div className="rounded-2xl bg-muted h-48 w-48 flex items-center justify-center text-muted-foreground">
                  {currentLetter && (
                    <img
                      src={`/public/assets/signs/alphabet/${currentLetter}.png`}
                      alt={`Sign ${currentLetter}`}
                      className="h-full object-contain"
                    />
                  )}
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
                            : option === correctAnswer && feedback === "wrong"
                            ? "bg-green-500 text-white animate-pulse"
                            : ""
                          : ""
                      }`}
                      onClick={() => handleOptionClick(option)}
                      disabled={!!feedback}
                    >
                      {option.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          // Game Over Screen
          <div className="text-center mt-20 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-4 animate-bounce-in">
              🎉 Game Over! 🎉
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Your final score:{" "}
              <span className="text-accent">{score}</span> / {TOTAL_ROUNDS}
            </p>
            <Button size="lg" className="animate-pulse" onClick={restartGame}>
              Play Again
            </Button>
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
            disabled={round === 1 && !gameOver}
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


