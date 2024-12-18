"use client";
import { use, useState, useEffect } from "react";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const resolvedParams = use(params);
  useEffect(() => {
    const getInterviewDetails = async () => {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, resolvedParams.interviewId));
      setInterviewData(result);
      console.log(result);
    };
    if (resolvedParams) {
      console.log(resolvedParams.interviewId);
      getInterviewDetails();
    }
  }, [resolvedParams]);

  return (
    <div className="px-4 md:px-12 lg:px-32 xl:px-40">
      <div className="w-full h-auto flex flex-col py-2 md:py-4 lg:py-16 gap-2 md:gap-4 lg:gap-16 ">
        <div className="w-full h-auto flex flex-col items-center">
          <h1 className="text-4xl font-semibold">Interview</h1>
          <p className="text-gray-600 text-lg">
            Create and Start your AI Mockup Interview
          </p>
        </div>
        <div className="w-full h-auto flex flex-col md:flex-row-reverse gap-4 md:gap-8 lg:gap-16">
          <div className="w-full h-full flex flex-col md:justify-between items-center gap-2 md:gap-4">
            {webCamEnabled ? (
              <div className="w-full h-auto">
                <Webcam
                  audio={false}
                  onUserMedia={() => setWebCamEnabled(true)}
                  onUserMediaError={() => setWebCamEnabled(false)}
                  mirrored={true}
                  className="w-[36rem] h-72"
                />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="w-full h-auto flex justify-center bg-secondary border shadow-lg rounded-lg p-2">
                  <WebcamIcon className="w-64 h-64" />
                </div>
              </div>
            )}
            {webCamEnabled ? (
              <Button className="w-96 justify-center">
                {" "}
                <Link
                  href={`/dashboard/interview/${resolvedParams.interviewId}/start`}
                >
                  Start Interview
                </Link>
              </Button>
            ) : (
              <Button
                className="w-full justify-center"
                onClick={() => {
                  setWebCamEnabled(true);
                }}
              >
                Enable Webcam & Microphone
              </Button>
            )}
          </div>
          <div className="w-full h-auto flex flex-col gap-2 md:gap-4">
            <div className="w-full h-auto flex flex-col gap-2 border bg-secondary rounded-lg p-2 md:p-4 lg:p-8">
              <h1 className="font-semibold text-2xl">Interview Details</h1>
              <div className="w-full h-auto flex flex-col gap-1">
                <span className="w-full h-auto flex flex-row justify-start gap-2">
                  <h2 className=" text-black text-base font-medium">
                    Job Role/ Job Position:{" "}
                  </h2>{" "}
                  <p className="text-gray-500 text-base">
                    {interviewData && interviewData[0]?.jobPosition}
                  </p>
                </span>
                <span className="w-full h-auto flex flex-row justify-start gap-2">
                  <h2 className=" text-black text-base font-medium">
                    Job Experience:{" "}
                  </h2>{" "}
                  <p className="text-gray-500 text-base">
                    {interviewData && interviewData[0]?.jobExperience}{" "}
                    {" years"}
                  </p>
                </span>
                <span className="w-full h-auto flex flex-row flex-wrap justify-start gap-2">
                  <h2 className=" text-black text-base font-medium">
                    Job Description :{" "}
                  </h2>{" "}
                  <p className="text-gray-500 text-base">
                    {interviewData && interviewData[0]?.jobDesc}
                  </p>
                </span>
              </div>
            </div>
            <div className="w-full h-auto p-5 border border-yellow-300 bg-yellow-100  rounded-lg">
              <div className="flex gap-2 items-center pb-2">
                <Lightbulb className="text-yellow-500" />
                <h2 className="text-yellow-500 text-sm">
                  Enable Webcam and Microphone to start Interview
                </h2>
              </div>
              <ul className="flex flex-col list-disc">
                <li className="block text-yellow-500 text-sm">
                  Interview will have 5 questions which you can answer
                </li>
                <li className="block text-yellow-500 text-sm">
                  You will get results based on answer of those questions
                </li>
                <li className="block text-yellow-500 text-sm">
                  We never record your video. Webcam access can be disabled
                  anytime you want
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
