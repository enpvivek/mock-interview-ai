"use client";
import useSpeechToText from "react-hook-speech-to-text";
import Image from "next/image";
import webCamImage from "../../../assets/webcam.png";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const RecordAudio = () => {
  const [userAnswer, setUserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      const lastTranscript = results[results.length - 1]?.transcript;
      if (lastTranscript) {
        setUserAnswer((prev) => prev + lastTranscript);
      }
    }
  }, [results]);

  const showUserAns = () => {
    console.log(userAnswer);
  };
  return (
    <div className="w-full h-full flex flex-col justify-around gap-4 items-center">
      <div className="w-full h-auto relative flex justify-center bg-black">
        <Image
          src={webCamImage}
          alt="web cam"
          className="w-64 h-64 rounded-lg object-cover"
        />
        <div className="w-auto h-auto"></div>
        <Webcam className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-72 rounded-lg" />
      </div>

      <div className="w-full h-auto flex flex-row items-center justify-center gap-4">
        <Button
          variant="secondary"
          className="justify-center"
          onClick={() => {}}
        >
          Record Video
        </Button>
        <Button
          variant="secondary"
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
        >
          {isRecording ? "Stop Recording" : "Record Answer"}
        </Button>
      </div>
    </div>
  );
};

export default RecordAudio;
