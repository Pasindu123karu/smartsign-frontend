import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/BottomNavigation";
import { MascotHeader } from "@/components/MascotHeader";
import { Card, CardContent } from "@/components/ui/card";

// Define all 25 image paths
const alldoneImg = "/assets/signs/word/alldone.jpg";
const dontImg = "/assets/signs/word/dont.jpg";
const eatImg = "/assets/signs/word/eat.jpg";
const friendsImg = "/assets/signs/word/friends.jpg";
const helloImg = "/assets/signs/word/hello.jpg";
const helpImg = "/assets/signs/word/help.jpg";
const hungryImg = "/assets/signs/word/hungry.jpg";
const likeImg = "/assets/signs/word/like.jpg";
const meImg = "/assets/signs/word/me.jpg";
const moreImg = "/assets/signs/word/more.jpg";
const noImg = "/assets/signs/word/no.jpg";
const playImg = "/assets/signs/word/play.jpg";
const pleaseImg = "/assets/signs/word/please.jpg";
const stopImg = "/assets/signs/word/stop.jpg";
const thankyouImg = "/assets/signs/word/thankyou.jpg";
const toiletImg = "/assets/signs/word/toilet.jpg";
const wantImg = "/assets/signs/word/want.jpg";
const waterImg = "/assets/signs/word/water.jpg";
const whatImg = "/assets/signs/word/what.jpg";
const whenImg = "/assets/signs/word/when.jpg";
const whereImg = "/assets/signs/word/where.jpg";
const whoImg = "/assets/signs/word/who.jpg";
const whyImg = "/assets/signs/word/why.jpg";
const yesImg = "/assets/signs/word/yes.jpg";
const youImg = "/assets/signs/word/you.jpg";


const words = [
  { word: "alldone", img: alldoneImg },
  { word: "dont", img: dontImg },
  { word: "eat", img: eatImg },
  { word: "friends", img: friendsImg },
  { word: "hello", img: helloImg },
  { word: "help", img: helpImg },
  { word: "hungry", img: hungryImg },
  { word: "like", img: likeImg },
  { word: "me", img: meImg },
  { word: "more", img: moreImg },
  { word: "no", img: noImg },
  { word: "play", img: playImg },
  { word: "please", img: pleaseImg },
  { word: "stop", img: stopImg },
  { word: "thankyou", img: thankyouImg },
  { word: "toilet", img: toiletImg },
  { word: "want", img: wantImg },
  { word: "water", img: waterImg },
  { word: "what", img: whatImg },
  { word: "when", img: whenImg },
  { word: "where", img: whereImg },
  { word: "who", img: whoImg },
  { word: "why", img: whyImg },
  { word: "yes", img: yesImg },
  { word: "you", img: youImg },
];

export default function Match() {
  const navigate = useNavigate();
  const [pairs, setPairs] = useState<typeof words>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    document.title = "Match Signs | Smart Sign";
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 5);
    setPairs(shuffled);
  }, []);

  useEffect(() => {
    if (matched.length === pairs.length && pairs.length > 0) {
      setGameOver(true);
    }
  }, [matched, pairs]);

  const handleMatch = () => {
    if (selectedImage && selectedWord) {
      if (selectedImage === selectedWord) {
        setMatched((prev) => [...prev, selectedImage]);
        setCorrectCount((c) => c + 1);
      } else {
        setWrong((prev) => [...prev, selectedWord]);
        setWrongCount((c) => c + 1);
        setTimeout(() => {
          setWrong((prev) => prev.filter((w) => w !== selectedWord));
        }, 1000);
      }
      setSelectedImage(null);
      setSelectedWord(null);
    }
  };

  useEffect(() => {
    if (selectedImage && selectedWord) {
      setTimeout(handleMatch, 400);
    }
  }, [selectedImage, selectedWord]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-indigo-300 pb-24">
      <div className="container mx-auto px-4 pt-6">
        <MascotHeader />

        {/* Title + score */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-indigo-800 mb-3 drop-shadow">
            Match the Sign with the Word 🎯
          </h1>
          <p className="text-lg text-indigo-700 font-medium mb-2">
            👆 Tap a picture, then tap the matching word!
          </p>
          <div className="text-lg font-semibold">
            ✅ Correct:{" "}
            <span className="text-green-600">{correctCount}</span> | ❌ Wrong:{" "}
            <span className="text-red-600">{wrongCount}</span>
          </div>
        </div>

        <Card className="shadow-2xl rounded-2xl border-2 border-indigo-200">
          <CardContent className="p-6">
            {!gameOver ? (
              <>
                {/* Images */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                  {pairs.map((item) => (
                    <div
                      key={item.word}
                      className={`rounded-2xl p-3 border-4 cursor-pointer shadow-md transition-transform duration-200 ${
                        matched.includes(item.word)
                          ? "opacity-40 pointer-events-none border-green-400"
                          : selectedImage === item.word
                          ? "border-yellow-400 scale-105"
                          : "border-gray-300 hover:scale-105"
                      }`}
                      onClick={() => setSelectedImage(item.word)}
                    >
                      <img
                        src={item.img}
                        alt={item.word}
                        className="h-40 w-full object-contain rounded-xl bg-white shadow-inner"
                      />
                    </div>
                  ))}
                </div>

                {/* Words */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {pairs
                    .map((item) => item.word)
                    .sort(() => Math.random() - 0.5)
                    .map((word) => (
                      <Button
                        key={word}
                        className={`w-full text-lg font-bold py-4 rounded-xl shadow-md transition ${
                          matched.includes(word)
                            ? "bg-green-500 text-white pointer-events-none"
                            : wrong.includes(word)
                            ? "bg-red-500 text-white"
                            : selectedWord === word
                            ? "bg-yellow-300 text-black"
                            : "bg-white text-indigo-700 hover:bg-indigo-100"
                        }`}
                        onClick={() => setSelectedWord(word)}
                      >
                        {word.toUpperCase()}
                      </Button>
                    ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-4xl font-bold mb-4 text-indigo-800">
                  🎉 Game Over! 🎉
                </h2>
                <p className="text-xl font-semibold mb-6">
                  ✅ Correct:{" "}
                  <span className="text-green-600">{correctCount}</span> | ❌
                  Wrong: <span className="text-red-600">{wrongCount}</span>
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-indigo-600 text-white text-lg px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-700"
                >
                  Play Again
                </Button>
              </div>
            )}

            <div className="mt-8 flex gap-3 justify-center">
              <Button
                variant="secondary"
                onClick={() => navigate(-1)}
                className="px-6 py-2 rounded-lg shadow-md"
              >
              Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation
        activeTab="games"
        onTabChange={(tab) => navigate(tab === "games" ? "/" : "/")}
      />
    </div>
  );
}
