"use client";
import { use, useState, useEffect } from "react";
import { db } from "../../../../../utils/db";
import { MockInterview } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb } from "lucide-react";

const Page = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [interviewProblems, setInterviewProblems] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const resolvedParams = use(params);
  useEffect(() => {
    const getInterviewDetails = async () => {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, resolvedParams.interviewId));
      setInterviewData(result);
      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setInterviewProblems(jsonMockResp);

      console.log(jsonMockResp);
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
          <h1 className="text-4xl font-semibold">Start Interview</h1>
          <p className="text-gray-600 text-lg">
            Create and Start your AI Mockup Interview
          </p>
        </div>
        <div className="w-full h-auto flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-16">
          <div className="w-full h-auto flex flex-col gap-2 border  rounded-lg p-2 md:p-4 lg:p-8 md:gap-4">
            <div className="flex flex-row justify-start flex-wrap gap-2 gap-y-1 md:gap-4 text-xs md:text-sm">
              {interviewProblems &&
                interviewProblems.map((question, index) => {
                  return (
                    <h2
                      className={`px-3 py-1  rounded-full ${
                        index === currentQuestion
                          ? "bg-teal-600 text-white"
                          : "bg-secondary text-gray-600"
                      }`}
                      key={index}
                    >
                      {" "}
                      Question #{index + 1}
                    </h2>
                  );
                })}
            </div>
            <div className="w-full h-auto">
              <h2 className="w-full h-auto">
                {interviewData && interviewProblems[currentQuestion]?.question}
              </h2>
            </div>
            <div className="w-full h-auto p-5 border border-teal-300 bg-teal-100  rounded-lg">
              <div className="flex gap-2 items-center pb-2">
                <Lightbulb className="text-teal-500" />
                <h2 className="text-teal-500 text-sm">
                  Enable Webcam and Microphone to start Interview
                </h2>
              </div>
              <ul className="flex flex-col list-disc">
                <li className="block text-teal-500 text-sm">
                  Interview will have 5 questions which you can answer
                </li>
                <li className="block text-teal-500 text-sm">
                  You will get results based on answer of those questions
                </li>
                <li className="block text-teal-500 text-sm">
                  We never record your video. Webcam access can be disabled
                  anytime you want
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full h-auto flex flex-col gap-2 border bg-secondary rounded-lg p-2 md:p-4 lg:p-8">
            hi
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
