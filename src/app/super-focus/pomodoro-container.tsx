"use client";

import { useToast } from "@/components/ui/primitives/use-toast";
import { useSuperFocus } from "@/context/super-focus";
import useBeforeUnload from "@/hooks/useBeforeUnload";
import {
  fetchActivePomodoroSession,
  pausePomodoroSessionService,
} from "@/services/super-focus/super-focus";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import MusicWidget from "./music-widget";
import SuperFocusTimer from "./super-focus-timer";

const PomodoroContainer = ({ currentSettingDetails }: any) => {
  const [studyTime, setStudyTime] = useState<any>(null);
  const [shortBreakTime, setShortBreakTime] = useState<any>(null);
  const [longBreakTime, setLongBreakTime] = useState<any>(null);
  const [isStudyTimerPaused, setIsStudyTimerPaused] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isStudyTimeInitialized, setIsStudyTimeInitialized] = useState(false);

  const { activeState } = useSuperFocus();

  const { toast } = useToast();

  const handleBeforeUnload = async () => {
    if (!isStudyTimerPaused) {
      const payload = {
        action: "pause",
        timeLeftInSeconds: studyTime,
      };
      try {
        await pausePomodoroSessionService(payload);
      } catch (error) {
        console.error("Error making API call:", error);
      }
    }
  };

  useBeforeUnload(handleBeforeUnload);

  const fetchActivePomodoro = async () => {
    try {
      const response = await fetchActivePomodoroSession();
      if (response?.data?.data?.found) {
        setStudyTime(response?.data?.data?.currentPomodoro?.timeLeftInSeconds);
        setIsStudyTimeInitialized(true);
        if (!response?.data?.data?.currentPomodoro?.isPaused) {
          setIsStudyTimerPaused(false);
        }
      } else {
        setStudyTime(currentSettingDetails?.time?.studyTime * 60);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to fetch your pomodoro session details! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentSettingDetails?.time?.studyTime) return;
    if (!shortBreakTime) {
      fetchActivePomodoro();
      setShortBreakTime(currentSettingDetails?.time?.shortBreak * 60);
      setLongBreakTime(currentSettingDetails?.time?.longBreak * 60);
    }
  }, [currentSettingDetails]);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-[620px] flex flex-col gap-5 m-auto">
      <SuperFocusTimer
        studyTime={studyTime}
        shortBreakTime={shortBreakTime}
        longBreakTime={longBreakTime}
        setStudyTime={setStudyTime}
        setLongBreakTime={setLongBreakTime}
        setShortBreakTime={setShortBreakTime}
        currentSettingDetails={currentSettingDetails}
        isStudyTimerPaused={isStudyTimerPaused}
        setIsStudyTimerPaused={setIsStudyTimerPaused}
        isStudyTimeInitialized={isStudyTimeInitialized}
        setIsStudyTimeInitialized={setIsStudyTimeInitialized}
      />
      <MusicWidget
        studySource={
          activeState == "study"
            ? currentSettingDetails?.studyOptions?.studyMusicSource
            : currentSettingDetails?.breakOptions?.breakMusicSource
        }
        currentSettingDetails={currentSettingDetails}
      />
    </div>
  );
};

export default PomodoroContainer;
