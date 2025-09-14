import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // make sure you have your Tabs components

const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const numbers = Array.from({ length: 10 }, (_, i) => i.toString());
const practiceKeys = [...letters, ...numbers];

const classifier = knnClassifier.create();
let model: handpose.HandPose | null = null;

const HandRecognition: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [modelLoaded, setModelLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"training" | "quiz">("training");
  const [trainingIndex, setTrainingIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [detectedKey, setDetectedKey] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [flashColor, setFlashColor] = useState<string | null>(null);

  // Quiz state
  const [quizRounds, setQuizRounds] = useState<string[]>([]);
  const [quizResults, setQuizResults] = useState<{ correct: number; skipped: number }>({ correct: 0, skipped: 0 });
  const [quizFinished, setQuizFinished] = useState(false);

  const trainingTarget = practiceKeys[trainingIndex];
  const quizTarget = quizRounds[quizIndex];

  const loadKNNDataset = () => {
    const dataset = localStorage.getItem("knnDataset");
    if (dataset) {
      const tensorObj = JSON.parse(dataset);
      const tensorData: any = {};
      Object.keys(tensorObj).forEach((key) => {
        tensorData[key] = tf.tensor(tensorObj[key].data, tensorObj[key].shape);
      });
      classifier.setClassifierDataset(tensorData);
      toast.success("🎉 Training data loaded!");
    }
  };

  const setupModel = async () => {
    try {
      model = await handpose.load();
      setModelLoaded(true);
      toast.success("🤖 Hand model ready!");
      await setupCamera();
      requestAnimationFrame(drawLoop);
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Could not load model");
    }
  };

  const setupCamera = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      video.srcObject = stream;
      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          video.play();
          resolve(true);
        };
      });
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Please allow camera access");
    }
  };

  const captureHandLandmarks = async () => {
    const video = videoRef.current;
    if (!model || !video) return null;
    const predictions = await model.estimateHands(video);
    if (predictions.length > 0) {
      const landmarks = predictions[0].landmarks.flat();
      return { tensor: tf.tensor([landmarks]), hand: predictions[0] };
    }
    return null;
  };

  const addTrainingExample = async (label: string) => {
    const result = await captureHandLandmarks();
    if (result) {
      classifier.addExample(result.tensor, label);
      toast.success(`⭐ Saved example for "${label}"`);

      const dataset = classifier.getClassifierDataset();
      const datasetObj: any = {};
      Object.keys(dataset).forEach((key) => {
        datasetObj[key] = { data: Array.from(dataset[key].dataSync()), shape: dataset[key].shape };
      });
      localStorage.setItem("knnDataset", JSON.stringify(datasetObj));
    } else {
      toast.error("🙋 No hand found, try again!");
    }
  };

  const predictKey = async () => {
    if (!modelLoaded || classifier.getNumClasses() === 0) return;
    setIsAnalyzing(true);
    const result = await captureHandLandmarks();
    if (result && classifier.getNumClasses() > 0) {
      const prediction = await classifier.predictClass(result.tensor);
      setDetectedKey(prediction.label);

      let target = activeTab === "training" ? trainingTarget : quizTarget;

      if (prediction.label === target) {
        setFlashColor("rgba(0,255,0,0.2)");
        setTimeout(() => setFlashColor(null), 500);
        toast.success(`🎉 Great job! You signed '${target}'!`);

        if (activeTab === "training") {
          setTimeout(() => {
            setTrainingIndex((prev) => (prev + 1) % practiceKeys.length);
            setDetectedKey(null);
          }, 1000);
        } else if (activeTab === "quiz") {
          setQuizResults((prev) => ({ ...prev, correct: prev.correct + 1 }));
          nextQuizRound();
        }
      } else {
        setFlashColor("rgba(255,0,0,0.2)");
        setTimeout(() => setFlashColor(null), 500);
        toast.error(`😅 That was '${prediction.label}', try again!`);
      }
    } else {
      toast.error("🙋 Hand not detected!");
    }
    setIsAnalyzing(false);
  };

  const nextQuizRound = () => {
    if (quizIndex + 1 >= quizRounds.length) {
      setQuizFinished(true);
    } else {
      setQuizIndex((prev) => prev + 1);
      setDetectedKey(null);
    }
  };

  const skipQuizRound = () => {
    setQuizResults((prev) => ({ ...prev, skipped: prev.skipped + 1 }));
    nextQuizRound();
  };

  const startQuiz = () => {
    const rounds = Array.from({ length: 10 }, () => practiceKeys[Math.floor(Math.random() * practiceKeys.length)]);
    setQuizRounds(rounds);
    setQuizIndex(0);
    setQuizResults({ correct: 0, skipped: 0 });
    setQuizFinished(false);
    setDetectedKey(null);
  };

  const drawLoop = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (model) {
      const predictions = await model.estimateHands(video);
      predictions.forEach((hand) => {
        const xs = hand.landmarks.map((l) => l[0]);
        const ys = hand.landmarks.map((l) => l[1]);
        ctx.strokeStyle = "#00ff99";
        ctx.lineWidth = 3;
        ctx.strokeRect(
          Math.min(...xs),
          Math.min(...ys),
          Math.max(...xs) - Math.min(...xs),
          Math.max(...ys) - Math.min(...ys)
        );
        hand.landmarks.forEach(([x, y]) => {
          ctx.fillStyle = "#ff4444";
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI);
          ctx.fill();
        });
      });
    }

    requestAnimationFrame(drawLoop);
  };

  useEffect(() => {
    loadKNNDataset();
    setupModel();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-start w-full min-h-screen p-4 text-gray-200 bg-[#1f1f2e]">
      <Tabs value={activeTab} onValueChange={(val: "training" | "quiz") => setActiveTab(val)} className="w-full max-w-md">
  <TabsList className="flex justify-center gap-4 bg-card rounded-3xl p-2 shadow-card mb-6">
    <TabsTrigger
      value="training"
      className="flex-1 flex items-center justify-center gap-2 text-lg font-semibold py-3 px-6
                 rounded-2xl bg-card text-foreground
                 data-[state=active]:bg-gradient-primary data-[state=active]:text-white
                 data-[state=active]:shadow-lg
                 transition-all duration-300 hover:bg-gray-100 hover:text-foreground hover:shadow-md"
    >
      🖐️ Training
    </TabsTrigger>

    <TabsTrigger
      value="quiz"
      className="flex-1 flex items-center justify-center gap-2 text-lg font-semibold py-3 px-6
                 rounded-2xl bg-card text-foreground
                 data-[state=active]:bg-gradient-secondary data-[state=active]:text-white
                 data-[state=active]:shadow-lg
                 transition-all duration-300 hover:bg-gray-100 hover:text-foreground hover:shadow-md"
    >
      🎮 Quiz
    </TabsTrigger>
  </TabsList>
</Tabs>

      {/* Flash overlay */}
      {flashColor && <div className="absolute inset-0 z-50" style={{ backgroundColor: flashColor }} />}

      <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-400 mb-3 text-center">
        🖐️ Smart Sign Trainer
      </h1>

      {/* Target bubble */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center rounded-full bg-indigo-600 text-white text-4xl sm:text-5xl font-bold shadow-lg">
        {activeTab === "training" ? trainingTarget : quizFinished ? "🏁" : quizTarget}
      </div>
      <p className="text-center text-lg sm:text-xl font-semibold mt-2">
        {activeTab === "training"
          ? `Try making ${trainingTarget} with your hand!`
          : quizFinished
          ? `Quiz finished! Correct: ${quizResults.correct}, Skipped: ${quizResults.skipped}`
          : `Try making ${quizTarget} with your hand!`}
      </p>

      {/* Video + Canvas */}
      <div className="relative mt-4 w-[90%] sm:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-indigo-500">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
      </div>

      {/* Training tab */}
      {activeTab === "training" && (
        <div className="w-full mt-4 max-w-[700px] mx-auto flex flex-col items-center gap-4">
          <h2 className="text-lg sm:text-xl font-bold text-indigo-400 mb-2 text-center">Train Letters & Numbers</h2>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 sm:gap-2 justify-center">
            {practiceKeys.map((key) => (
              <Button
                key={key}
                onClick={() => addTrainingExample(key)}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full text-sm sm:text-base font-bold text-white shadow-md bg-gradient-to-br from-indigo-700 to-purple-600 hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                {key}
              </Button>
            ))}
          </div>

          {/* Recognize button */}
          <Button
            onClick={predictKey}
            disabled={!modelLoaded || isAnalyzing}
            className="mt-4 px-6 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl rounded-full shadow-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-teal-400 hover:to-indigo-500 text-white font-bold"
          >
            {isAnalyzing ? "🤔 Thinking..." : "🎯 Recognize Sign"}
          </Button>
        </div>
      )}

      {/* Quiz tab */}
      {activeTab === "quiz" && !quizFinished && (
        <div className="flex gap-4 mt-4">
          <Button onClick={predictKey} disabled={!modelLoaded || isAnalyzing} className="px-6 py-3 text-lg rounded-full bg-green-500">
            {isAnalyzing ? "🤔 Thinking..." : "🎯 Recognize"}
          </Button>
          <Button onClick={skipQuizRound} disabled={quizFinished} className="px-6 py-3 text-lg rounded-full bg-red-500">
            ⏭️ Skip
          </Button>
        </div>
      )}

      {!quizRounds.length && activeTab === "quiz" && (
        <Button onClick={startQuiz} className="mt-4 px-6 py-3 text-lg rounded-full bg-blue-600">
          🎮 Start Quiz
        </Button>
      )}

      {/* Detected Key */}
      {detectedKey && !quizFinished && (
        <p className="mt-3 text-center text-xl sm:text-2xl font-extrabold text-indigo-200">
          {flashColor === "rgba(0,255,0,0.2)" ? `🎉 Correct! I saw: ${detectedKey}` : `😅 That was: ${detectedKey}`}
        </p>
      )}

      {activeTab === "quiz" && quizRounds.length > 0 && (
  <Button
    onClick={startQuiz}
    className="mt-4 px-6 py-3 text-lg rounded-full bg-blue-600"
  >
    🔄 Restart Quiz
  </Button>
)}
    </div>
    
  );
};

export default HandRecognition;
