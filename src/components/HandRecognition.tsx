import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const practiceLetters = ["A", "B", "C", "D", "E"]; // expand as needed
const classifier = knnClassifier.create();
let model: handpose.HandPose | null = null;

const HandRecognition: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [modelLoaded, setModelLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detectedLetter, setDetectedLetter] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const targetLetter = practiceLetters[currentIndex];

  // =====================
  // Load saved KNN dataset
  // =====================
  const loadKNNDataset = () => {
    const dataset = localStorage.getItem("knnDataset");
    if (dataset) {
      const tensorObj = JSON.parse(dataset);
      const tensorData: any = {};
      Object.keys(tensorObj).forEach((key) => {
        tensorData[key] = tf.tensor(tensorObj[key].data, tensorObj[key].shape);
      });
      classifier.setClassifierDataset(tensorData);
      console.log("KNN dataset loaded from localStorage");
      toast.success("📂 Loaded saved training data");
    }
  };

  // =====================
  // Setup model and camera
  // =====================
  const setupModel = async () => {
    try {
      model = await handpose.load();
      setModelLoaded(true);
      toast.success("🤖 Handpose model loaded!");
      loadKNNDataset();
      await setupCamera();
      requestAnimationFrame(drawLoop);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load Handpose model.");
    }
  };

  const setupCamera = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          video.play();
          resolve(true);
        };
      });
    } catch (err) {
      console.error(err);
      toast.error("Cannot access camera.");
    }
  };

  // =====================
  // Capture hand landmarks
  // =====================
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

  // =====================
  // Add training example
  // =====================
  const addTrainingExample = async (label: string) => {
    const result = await captureHandLandmarks();
    if (result) {
      classifier.addExample(result.tensor, label);
      toast.success(`Added example for "${label}"`);

      // Save updated KNN dataset
      const dataset = classifier.getClassifierDataset();
      const datasetObj: any = {};
      Object.keys(dataset).forEach((key) => {
        datasetObj[key] = {
          data: Array.from(dataset[key].dataSync()),
          shape: dataset[key].shape,
        };
      });
      localStorage.setItem("knnDataset", JSON.stringify(datasetObj));
      console.log("KNN dataset saved to localStorage");
    } else {
      toast.error("No hand detected. Try again!");
    }
  };

  // =====================
  // Predict current letter
  // =====================
  const predictLetter = async () => {
    if (!modelLoaded || classifier.getNumClasses() === 0) return;
    setIsAnalyzing(true);
    const result = await captureHandLandmarks();
    if (result && classifier.getNumClasses() > 0) {
      const prediction = await classifier.predictClass(result.tensor);
      setDetectedLetter(prediction.label);

      if (prediction.label === targetLetter) {
        toast.success(`✅ Correct! You signed '${targetLetter}'!`);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % practiceLetters.length);
          setDetectedLetter(null);
        }, 2000);
      } else {
        toast.error(`❌ Detected '${prediction.label}', try again!`);
      }
    } else {
      toast.error("No hand detected or classifier empty!");
    }
    setIsAnalyzing(false);
  };

  // =====================
  // Draw red dots + green bounding box
  // =====================
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
        // Green bounding box
        const xs = hand.landmarks.map((l) => l[0]);
        const ys = hand.landmarks.map((l) => l[1]);
        const minX = Math.min(...xs);
        const minY = Math.min(...ys);
        const maxX = Math.max(...xs);
        const maxY = Math.max(...ys);
        ctx.strokeStyle = "lime";
        ctx.lineWidth = 3;
        ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);

        // Red landmarks
        hand.landmarks.forEach(([x, y]) => {
          ctx.fillStyle = "red";
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();
        });
      });
    }

    requestAnimationFrame(drawLoop);
  };

  useEffect(() => {
    setupModel();
  }, []);

  return (
    <div className="p-4 flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Sign Language Game</h1>

      {/* Target Letter */}
      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white text-3xl font-bold shadow-lg">
        {targetLetter}
      </div>
      <p className="mt-2 text-center text-gray-700">
        Show the hand sign for <strong>{targetLetter}</strong>
      </p>

      {/* Video + Canvas */}
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-[320px] h-[240px] rounded-lg border-2 border-gray-300"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-[320px] h-[240px] pointer-events-none"
        />
      </div>

      {/* Training Buttons */}
      <div className="flex flex-wrap gap-2 mt-4">
        {practiceLetters.map((letter) => (
          <Button key={letter} onClick={() => addTrainingExample(letter)}>
            Train {letter}
          </Button>
        ))}
      </div>

      {/* Recognize Button */}
      <Button
        onClick={predictLetter}
        disabled={!modelLoaded || isAnalyzing}
        className="mt-4"
      >
        {isAnalyzing ? "Analyzing..." : "Recognize Sign"}
      </Button>

      {/* Detected Letter */}
      {detectedLetter && (
        <p className="mt-4 text-xl font-bold text-blue-600">
          Detected: {detectedLetter}
        </p>
      )}
    </div>
  );
};

export default HandRecognition;
