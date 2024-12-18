"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import loader from "../../assets/loader.svg";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "../../utils/geminiModel";
import { db } from "../../utils/db";
import { MockInterview } from "../../utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [jobPosition, setJobPosition] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [josnResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();
  //console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const inputPrompt =
      "Job Position: " +
      jobPosition +
      ", Job Description: " +
      jobPosition +
      ", Years of Experience: " +
      jobExperience +
      ",\nBased on above information, generate " +
      process.env.NEXT_PUBLIC_QUESTIONS_COUNT +
      " real interview questions with answers in JSON format. Give question and answer as field in JSON.";
    console.log(jobPosition, jobExperience, jobDesc);
    const res = await chatSession.sendMessage(inputPrompt);
    const jsonMockResp = res.response
      .text()
      .replace("```json", "")
      .replace("```", ``);
    console.log(JSON.parse(jsonMockResp));
    setJsonResponse(jsonMockResp);
    if (jsonMockResp) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: jsonMockResp,
          jobPosition: jobPosition,
          jobExperience: jobExperience,
          jobDesc: jobDesc,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment.defaultFormat,
        })
        .returning({ mockId: MockInterview.mockId });
      if (resp) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${resp[0]?.mockId}`);
      }
      console.log("InsertedID", resp);
    } else {
      console.log("Error 69");
    }

    setLoading(false);
  };
  return (
    <div className="px-4 md:px-12 lg:px-32 xl:px-40">
      <div className="w-full h-auto flex flex-col py-2 md:py-4 lg:py-16 gap-2 md:gap-4 lg:gap-8 ">
        <div className="w-full h-auto flex flex-col">
          <h1 className="text-4xl font-semibold">Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Create and Start your AI Mockup Interview
          </p>
        </div>
        <Dialog open={openDialog}>
          <div className="w-full h-auto flex justify-start">
            <div className="w-auto flex flex-row justify-start p-10 bg-secondary rounded-lg border hover:scale-105 hover:shadow-md cursor-pointer transition-all">
              <DialogTrigger
                className="text-lg font-medium"
                onClick={() => setOpenDialog(true)}
              >
                + Add New
              </DialogTrigger>
            </div>
          </div>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Tell use more about your interview
              </DialogTitle>
              <DialogDescription className="text-base">
                Add details like job role, job description and exerience to
                start mock interview
              </DialogDescription>
              <form onSubmit={handleSubmit}>
                <div className="my-3">
                  <label>Job Role/ Job Position</label>
                  <Input
                    placeholder="Ex. Full Stack Developer, Devops Engineer"
                    required
                    onChange={(e) => setJobPosition(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Total Experience in years</label>
                  <Input
                    placeholder="Eg. 5, 10"
                    required
                    onChange={(e) => setJobExperience(e.target.value)}
                    type="number"
                    max="50"
                  />
                </div>
                <div className="my-3">
                  <label>Job Description/ Tech Stack</label>
                  <Textarea
                    placeholder="Eg. MERN Stack, React Native, Proficient in Backend testing"
                    required
                    onChange={(e) => setJobDesc(e.target.value)}
                  />
                </div>

                <div className="flex flex-row justify-end gap-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {" "}
                    {loading ? (
                      <span className="flex flex-row justify-center gap-2 text-white items-center">
                        <Image src={loader} alt="Loading" className="w-4 h-4" />{" "}
                        Loading
                      </span>
                    ) : (
                      <span>Submit</span>
                    )}
                  </Button>
                </div>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;
