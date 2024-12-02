"use client";

import { Button } from "@/components/ui/primitives/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/primitives/sheet";
import { updateHabitService } from "@/services/habits-scorecard/habits-scorecard";
import { IconArrowBack } from "@tabler/icons-react";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/primitives/input";
import { useToast } from "../ui/primitives/use-toast";
import {
  defineHabitsExamples,
  getSpecificExamples,
  groundItToIdentityExamples,
} from "./constants";

const UpdateHabitSidesheet = ({
  fetchHabitsItems,
  fetchTodayHabits,
  habitObj,
  open,
  onOpenChange,
  setSelectedHabitObj,
  repeat,
  setRepeat,
  selectedDays,
  setSelectedDays,
}: any) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const updateHabit = async () => {
    setLoading(true);

    try {
      await updateHabitService(
        habitObj?._id,
        habitObj.defineHabitText,
        habitObj.getSpecificText,
        habitObj.identityText,
        repeat,
        selectedDays
      );
      toast({
        variant: "default",
        title: "Item updated to Habits List ✅",
        description:
          "Yay! we have successfully added your new item to your habit list!",
      });
      fetchHabitsItems();
      fetchTodayHabits();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to add your item to habit list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDay = (day: string) => {
    setSelectedDays((prev: any) =>
      prev.includes(day) ? prev.filter((d: any) => d !== day) : [...prev, day]
    );
  };

  const getSidesheetTitle = () => {
    if (currentStep == 0) {
      return "Create New Habit";
    } else if (currentStep == 1) {
      return "Define Your Habit";
    } else if (currentStep == 2) {
      return "Get Specific";
    } else if (currentStep == 3) {
      return "Ground it in an identity";
    } else if (currentStep == 4) {
      return "Set Frequency";
    } else if (currentStep == 5) {
      return "Final Review";
    }
  };

  const getSidesheetDescription = () => {
    if (currentStep == 0) {
      return "The best habits are made up of an action, a time and place, and - most importantly -- an identity";
    } else if (currentStep == 1) {
      return "What's your habit? Think small and specific.";
    } else if (currentStep == 2) {
      return "Where can you do this habit easily?";
    } else if (currentStep == 3) {
      return "The goal is not to read a book, the goal is to become a reader. Set your identity!";
    } else if (currentStep == 4) {
      return "Decide when you want this habit to be done.";
    } else if (currentStep == 5) {
      return "Review your final version of habit!";
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              {getSidesheetTitle()}
            </SheetTitle>
            <SheetDescription>{getSidesheetDescription()}</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            {currentStep === 0 ? (
              <div className="flex flex-col gap-2">
                <div className="text-black text-sm font-semibold">
                  This is the skeleton of the habit which you will create:{" "}
                </div>
                <div className="border-2 rounded-md border-dashed p-2 text-sm">
                  I will <span className="underline">habit</span>,{" "}
                  <span className="underline">time/location</span> so that I can
                  become{" "}
                  <span className="underline">type of person I want to be</span>{" "}
                </div>
                <Button size="sm" onClick={() => setCurrentStep(1)}>
                  Ready to create mine! 🚀
                </Button>
              </div>
            ) : null}

            {currentStep === 1 ? (
              <div className="flex flex-col gap-2">
                <div className="text-sm text-black">Define your Habit!</div>
                <Input
                  value={habitObj?.defineHabitText}
                  onChange={(e: any) =>
                    setSelectedHabitObj({
                      ...habitObj,
                      defineHabitText: e.target.value,
                    })
                  }
                />
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-black">Check examples:</div>
                  <div className="flex flex-wrap gap-1">
                    {defineHabitsExamples?.map((habit: string, index) => {
                      return (
                        <div
                          key={index}
                          className="rounded-md border-2 p-2 text-sm cursor-pointer"
                          onClick={() => {
                            setSelectedHabitObj({
                              ...habitObj,
                              defineHabitText: habit,
                            });
                          }}
                        >
                          {" "}
                          {habit}{" "}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setCurrentStep(0)}
                  >
                    <IconArrowBack size={20} className="mr-2" /> Previous
                  </Button>
                  <Button
                    disabled={!habitObj?.defineHabitText?.length}
                    size="sm"
                    onClick={() => setCurrentStep(2)}
                  >
                    Go Next! 🚀
                  </Button>
                </div>
              </div>
            ) : null}

            {currentStep == 2 ? (
              <div className="flex flex-col gap-2">
                <div className="text-sm text-black">Get Specific!</div>
                <Input
                  value={habitObj?.getSpecificText}
                  onChange={(e: any) =>
                    setSelectedHabitObj({
                      ...habitObj,
                      getSpecificText: e.target.value,
                    })
                  }
                />
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-black">Check examples:</div>
                  <div className="flex flex-wrap gap-1">
                    {getSpecificExamples?.map((habit: string, index) => {
                      return (
                        <div
                          key={index}
                          className="rounded-md border-2 p-2 text-sm cursor-pointer"
                          onClick={() => {
                            setSelectedHabitObj({
                              ...habitObj,
                              getSpecificText: habit,
                            });
                          }}
                        >
                          {" "}
                          {habit}{" "}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-2 mt-5">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setCurrentStep(1)}
                  >
                    <IconArrowBack size={20} className="mr-2" /> Previous
                  </Button>
                  <Button
                    disabled={!habitObj?.getSpecificText.length}
                    size="sm"
                    onClick={() => setCurrentStep(3)}
                  >
                    Go Next! 🚀
                  </Button>
                </div>
              </div>
            ) : null}

            {currentStep == 3 ? (
              <div className="flex flex-col gap-2">
                <div className="text-sm text-black">
                  Ground it to an Identity!
                </div>
                <Input
                  value={habitObj?.identityText}
                  onChange={(e: any) =>
                    setSelectedHabitObj({
                      ...habitObj,
                      identityText: e.target.value,
                    })
                  }
                />
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-black">Check examples:</div>
                  <div className="flex flex-wrap gap-1">
                    {groundItToIdentityExamples?.map((habit: string, index) => {
                      return (
                        <div
                          key={index}
                          className="rounded-md border-2 p-2 text-sm cursor-pointer"
                          onClick={() => {
                            setSelectedHabitObj({
                              ...habitObj,
                              identityText: habit,
                            });
                          }}
                        >
                          {" "}
                          {habit}{" "}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-2 mt-5">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setCurrentStep(2)}
                  >
                    <IconArrowBack size={20} className="mr-2" /> Previous
                  </Button>
                  <Button
                    disabled={!habitObj?.identityText.length}
                    size="sm"
                    onClick={() => setCurrentStep(4)}
                  >
                    Go Next! 🚀
                  </Button>
                </div>
              </div>
            ) : null}

            {currentStep == 4 ? (
              <>
                <div className="flex flex-col gap-2">
                  <div className="font-semibold text-sm">Repeat:</div>
                  <div className="flex gap-4">
                    <Button
                      variant={repeat === "daily" ? "default" : "outline"}
                      onClick={() => {
                        setSelectedDays([
                          "Mon",
                          "Tue",
                          "Wed",
                          "Thu",
                          "Fri",
                          "Sat",
                          "Sun",
                        ]);
                        setRepeat("daily");
                      }}
                    >
                      Daily
                    </Button>
                    <Button
                      variant={repeat === "weekly" ? "default" : "outline"}
                      onClick={() => {
                        setRepeat("weekly");
                      }}
                    >
                      Weekly
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="font-semibold text-sm">Select Days:</div>
                  <div className="flex gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day, idx) => (
                        <Button
                          key={idx}
                          variant={
                            selectedDays?.includes(day) ? "default" : "outline"
                          }
                          onClick={() => handleToggleDay(day)}
                          size="sm"
                        >
                          {day}
                        </Button>
                      )
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-5">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setCurrentStep(3)}
                  >
                    <IconArrowBack size={20} className="mr-2" /> Previous
                  </Button>
                  <Button
                    disabled={!habitObj?.defineHabitText.length}
                    size="sm"
                    onClick={() => setCurrentStep(5)}
                  >
                    Go Next! 🚀
                  </Button>
                </div>
              </>
            ) : null}

            {currentStep == 5 ? (
              <div className="flex flex-col gap-4">
                <div className="text-black text-sm font-semibold">
                  This is the final preview of the habit which you created!:{" "}
                </div>
                <div className="border-2 rounded-md border-dashed p-2 text-sm">
                  I will{" "}
                  <span className="underline">
                    {" "}
                    {habitObj?.defineHabitText}{" "}
                  </span>
                  ,{" "}
                  <span className="underline">{habitObj?.getSpecificText}</span>{" "}
                  so that I can become{" "}
                  <span className="underline">{habitObj?.identityText}</span>{" "}
                </div>
                <div className="text-sm">Repeat Frequency: {repeat}</div>
                <div className="text-sm flex gap-2 flex-wrap items-center">
                  Repeat days:{" "}
                  {selectedDays?.map((day: any) => {
                    return <div className="rounded-md border-2 p-2">{day}</div>;
                  })}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-fit"
                  onClick={() => setCurrentStep(4)}
                >
                  <IconArrowBack size={20} className="mr-2" /> I want to edit!
                </Button>
              </div>
            ) : null}
          </div>
          <SheetFooter className="flex-1 items-end">
            <SheetClose asChild>
              <Button
                onClick={updateHabit}
                disabled={loading || currentStep !== 5}
                className="w-full"
              >
                {loading ? (
                  <Loader className="mr-2 h-8 w-8 animate-spin" />
                ) : null}
                {loading ? "Updating your habit..." : "Update Habit!"}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UpdateHabitSidesheet;
