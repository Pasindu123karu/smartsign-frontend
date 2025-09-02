import React from "react";
import HandRecognition from "@/components/HandRecognition";

const Camera: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      <HandRecognition />
    </div>
  );
};

export default Camera;
