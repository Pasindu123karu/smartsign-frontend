import React from "react";
import HandRecognition from "@/components/HandRecognition";

const Camera: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <HandRecognition />
    </div>
  );
};

export default Camera;
