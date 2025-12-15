import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { alphabetData } from "@/data/alphabet";
import { wordsData } from "@/data/words";
import { ArrowLeft, Volume2, BookOpen, Type, Star, Heart } from "lucide-react";

const Learning = () => {
  const navigate = useNavigate();
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("letters");
  const [activeCategory, setActiveCategory] = useState("All");
  const [letterApi, setLetterApi] = useState<UseEmblaCarouselType[1] | null>(null);
  const [wordApi, setWordApi] = useState<UseEmblaCarouselType[1] | null>(null);

  const filteredWords =
    activeCategory === "All"
      ? wordsData
      : wordsData.filter((word) => word.category === activeCategory);

  const currentLetter = alphabetData[currentLetterIndex];
  const currentWord = filteredWords[currentWordIndex];
  const letterProgressPercentage = ((currentLetterIndex + 1) / alphabetData.length) * 100;
  const wordProgressPercentage = ((currentWordIndex + 1) / filteredWords.length) * 100;

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const handleLetterSlideChange = (api: UseEmblaCarouselType[1] | null) => {
    if (!api) return;
    api.on("select", () => setCurrentLetterIndex(api.selectedScrollSnap()));
  };

  const handleWordSlideChange = (api: UseEmblaCarouselType[1] | null) => {
    if (!api) return;
    api.on("select", () => setCurrentWordIndex(api.selectedScrollSnap()));
  };

  return (
    <div className="min-h-screen bg-gradient-bg relative overflow-hidden">
      {/* Floating decorations */}
      <div className="absolute left-6 top-10 animate-float">
        <Star className="h-8 w-8 text-accent animate-pulse-soft" />
      </div>
      <div className="absolute right-8 top-20 animate-float" style={{ animationDelay: "1s" }}>
        <Heart className="h-7 w-7 text-secondary animate-pulse-soft" />
      </div>
      <div className="absolute left-12 top-60 animate-float" style={{ animationDelay: "2s" }}>
        <Star className="h-5 w-5 text-success animate-pulse-soft" />
      </div>
      <div className="absolute right-12 top-80 animate-float" style={{ animationDelay: "0.5s" }}>
        <Heart className="h-6 w-6 text-primary animate-pulse-soft" />
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/home")}
            className="rounded-full bg-white/20 border-white/30 text-foreground hover:bg-white/30"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center flex-1 mx-4">
            <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary shadow-float">
              <div className="text-2xl animate-float">📚</div>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Learn Sign Language</h1>
          </div>
          <div className="w-10" />
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Triggers */}
          <TabsList className="flex justify-center gap-4 bg-card rounded-3xl p-2 shadow-card mb-6">
            <TabsTrigger
              value="letters"
              className="flex-1 flex items-center justify-center gap-2 text-lg font-semibold py-3 px-6
                         rounded-2xl bg-card text-foreground
                         data-[state=active]:bg-gradient-primary data-[state=active]:text-white
                         data-[state=active]:shadow-lg
                         transition-all duration-300 hover:bg-gray-100 hover:text-foreground hover:shadow-md"
            >
              <Type className="h-5 w-5" /> Letters A-Z
            </TabsTrigger>

            <TabsTrigger
              value="words"
              className="flex-1 flex items-center justify-center gap-2 text-lg font-semibold py-3 px-6
                         rounded-2xl bg-card text-foreground
                         data-[state=active]:bg-gradient-secondary data-[state=active]:text-white
                         data-[state=active]:shadow-lg
                         transition-all duration-300 hover:bg-gray-100 hover:text-foreground hover:shadow-md"
            >
              <BookOpen className="h-5 w-5" /> Words
            </TabsTrigger>
          </TabsList>

          {/* Letters Tab Content */}
          <TabsContent value="letters" className="space-y-8">
            <div className="bg-card rounded-3xl p-4 shadow-card animate-bounce-in">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Letter {currentLetterIndex + 1} of {alphabetData.length}
                </span>
                <span className="text-sm font-bold text-primary">
                  {Math.round(letterProgressPercentage)}%
                </span>
              </div>
              <Progress value={letterProgressPercentage} className="h-2 rounded-full" />
            </div>

            <Carousel
              className="w-full"
              setApi={(api) => {
                setLetterApi(api);
                handleLetterSlideChange(api);
              }}
            >
              <CarouselContent>
                {alphabetData.map((letter) => (
                  <CarouselItem key={letter.letter}>
                    <div
                      className={`bg-gradient-to-br ${letter.color} rounded-3xl p-8 shadow-card text-center animate-bounce-in`}
                    >
                      <div className="mb-6">
                        <div className="text-8xl font-bold text-white mb-4 drop-shadow-lg">
                          {letter.letter}
                        </div>
                        <div className="text-6xl mb-4 animate-float">{letter.emoji}</div>
                      </div>
                      <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm mb-6">
                        <h2 className="text-3xl font-bold text-white mb-2">{letter.word}</h2>
                        <p className="text-white/90 text-lg leading-relaxed">{letter.description}</p>
                      </div>
                      {letter.image && (
                        <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm mb-6">
                          <img
                            src={letter.image}
                            alt={`Sign for ${letter.letter}`}
                            className="w-80 h-80 sm:w-96 sm:h-96 max-w-full mx-auto rounded-2xl object-contain shadow-lg"
                          />
                        </div>
                      )}
                      <Button
                        onClick={() => speak(letter.description)}
                        className="bg-white/30 hover:bg-white/40 text-white border-white/30 rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                        size="lg"
                      >
                        <Volume2 className="mr-3 h-6 w-6" /> Say "{letter.description}"
                      </Button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>

          {/* Words Tab Content */}
          <TabsContent value="words" className="space-y-8">
            {/* Category Filter Buttons */}
            <div className="mb-4 flex flex-wrap justify-center gap-3">
              {["All", ...Array.from(new Set(wordsData.map((w) => w.category)))].map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={activeCategory === cat ? "default" : "outline"}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentWordIndex(0);
                    if (wordApi) wordApi.scrollTo(0);
                  }}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="bg-card rounded-3xl p-4 shadow-card animate-bounce-in">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Word {currentWordIndex + 1} of {filteredWords.length}
                </span>
                <span className="text-sm font-bold text-primary">{Math.round(wordProgressPercentage)}%</span>
              </div>
              <Progress value={wordProgressPercentage} className="h-2 rounded-full" />
            </div>

            <Carousel
              className="w-full"
              setApi={(api) => {
                setWordApi(api);
                handleWordSlideChange(api);
              }}
            >
              <CarouselContent>
                {filteredWords.map((word) => (
                  <CarouselItem key={word.word}>
                    <div
                      className={`bg-gradient-to-br ${word.color} rounded-3xl p-8 shadow-card text-center animate-bounce-in`}
                    >
                      <div className="mb-6">
                        <div className="text-6xl mb-4 animate-float">{word.emoji}</div>
                        <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{word.word}</div>
                        <div className="text-lg text-white/80 font-medium">{word.category}</div>
                      </div>
                      <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm mb-6">
                        <p className="text-white/90 text-lg leading-relaxed">{word.description}</p>
                      </div>
                      {word.image && (
                        <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm mb-6">
                          <img
                            src={word.image}
                            alt={`Sign for ${word.word}`}
                            className="w-80 h-80 sm:w-96 sm:h-96 max-w-full mx-auto rounded-2xl object-contain shadow-lg"
                          />
                        </div>
                      )}
                      <Button
                        onClick={() => speak(word.word)}
                        className="bg-white/30 hover:bg-white/40 text-white border-white/30 rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                        size="lg"
                      >
                        <Volume2 className="mr-3 h-6 w-6" /> Say "{word.word}"
                      </Button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learning;
