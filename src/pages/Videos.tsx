import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { videosData, VideoData } from "@/data/videos";
import { 
  ArrowLeft, Play, Star, Heart, Type, BookOpen, 
  MessageSquare, Clock, Award, X 
} from "lucide-react";

const Videos = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("letters");
  const [currentVideo, setCurrentVideo] = useState<VideoData | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const letterVideos = videosData.filter(video => video.category === 'letters');
  const wordVideos = videosData.filter(video => video.category === 'words');
  const phraseVideos = videosData.filter(video => video.category === 'phrases');

  const getCurrentVideos = () => {
    switch (activeTab) {
      case 'letters': return letterVideos;
      case 'words': return wordVideos;
      case 'phrases': return phraseVideos;
      default: return letterVideos;
    }
  };

  const handleVideoPlay = (video: VideoData) => {
    setCurrentVideo(video);
  };

  // Seek video to startTime and stop at endTime
  useEffect(() => {
    if (currentVideo && videoRef.current) {
      const vid = videoRef.current;
      vid.currentTime = currentVideo.startTime;
      vid.play();

      const handleTimeUpdate = () => {
        if (vid.currentTime >= currentVideo.endTime) {
          vid.pause();
        }
      };

      vid.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        vid.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [currentVideo]);

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-gradient-success';
      case 'medium': return 'bg-gradient-secondary';
      case 'hard': return 'bg-gradient-accent';
      default: return 'bg-gradient-primary';
    }
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
              <div className="text-2xl animate-float">🎬</div>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Video Learning
            </h1>
          </div>
          
          <div className="w-10" />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card rounded-3xl p-2 shadow-card">
            <TabsTrigger value="letters" className="rounded-2xl flex items-center gap-2 text-sm font-semibold py-3">
              <Type className="h-4 w-4" />
              Letters
            </TabsTrigger>
            <TabsTrigger value="words" className="rounded-2xl flex items-center gap-2 text-sm font-semibold py-3">
              <BookOpen className="h-4 w-4" />
              Words
            </TabsTrigger>
            <TabsTrigger value="phrases" className="rounded-2xl flex items-center gap-2 text-sm font-semibold py-3">
              <MessageSquare className="h-4 w-4" />
              Phrases
            </TabsTrigger>
          </TabsList>

          {["letters", "words", "phrases"].map(tab => (
            <TabsContent key={tab} value={tab} className="space-y-6 mt-8">
              <div className="grid gap-4">
                {getCurrentVideos().map((video, index) => (
                  <div
                    key={video.id}
                    className={`bg-gradient-to-br ${video.color} rounded-3xl p-6 shadow-card animate-bounce-in cursor-pointer transition-all duration-300 hover:scale-105`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => handleVideoPlay(video)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <div className="text-2xl">{video.emoji}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-white">{video.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${getDifficultyBadgeColor(video.difficulty)} text-white`}>
                            {video.difficulty.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-white/90 text-sm mb-2">{video.description}</p>
                        <div className="flex items-center gap-3 text-white/80 text-xs">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {video.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            {video.difficulty}
                          </div>
                        </div>
                      </div>
                      <Button size="lg" className="rounded-full bg-white/30 hover:bg-white/40 text-white border-white/30 transition-all duration-300 hover:scale-110">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Video Player Overlay */}
        {currentVideo && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-card rounded-3xl shadow-lg p-4 relative max-w-3xl w-full">
              <button
                onClick={() => setCurrentVideo(null)}
                className="absolute top-3 right-3 text-white hover:text-red-400"
              >
                <X className="h-6 w-6" />
              </button>
              <video
                ref={videoRef}
                controls
                className="w-full rounded-xl"
                src={currentVideo.mainVideoPath}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
