"use client";

import { getColorClass } from "@/components/(super-focus)/helper";
import { useSuperFocus } from "@/context/super-focus";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import TomatoLottie from "../../../public/tomato-lottie.json";
import { pomoSuperFocusTimerFeatures, themeColors } from "./constants";

const GetThemeColorText = (text: string, themeColor: string = "emerald") => {
  const colorClass = getColorClass(themeColor);
  return <span className={cn(`${colorClass} font-semibold`)}>{text}</span>;
};

const HowTo = () => {
  const { getColor } = useSuperFocus();
  let themeColor = getColor();

  return (
    <main className="flex flex-col items-center">
      <article className="flex flex-col items-center gap-16 max-w-[600px]">
        {/* Lottie  */}
        <div className="w-[250px] h-[200px] mt-5">
          <Lottie
            animationData={TomatoLottie}
            loop={true}
            width={250}
            height={200}
          />
        </div>
        {/* Section 1 */}
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl  font-bold">
            What is {GetThemeColorText("PomoSuperFocus", themeColor)} Timer?
          </h1>
          <div className="text-xl ">
            {GetThemeColorText("PomoSuperFocus Timer", themeColor)} is the
            pomodoro timer with {GetThemeColorText("flavor", themeColor)}. It's{" "}
            {GetThemeColorText("highly configurable", themeColor)} and
            aesthetically pleasing. It{" "}
            {GetThemeColorText("syncs music", themeColor)} with your study
            sessions to keep you focused and{" "}
            {GetThemeColorText("eliminate distractions", themeColor)}.
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold ">
            What is {GetThemeColorText("Pomodoro", themeColor)}?
          </h1>
          <div className="text-xl ">
            Pomodoro is a type of tomato and a{" "}
            {GetThemeColorText("popular productivity technique", themeColor)}.
            It can be useful for people who may get overwhelmed, procrastinate,
            or struggle to concentrate.
          </div>
          <div className="text-xl ">
            A {GetThemeColorText("pomosuperfocus timer", themeColor)} is also a
            type of tomato. It's used to make salsa verde, and in this case,
            make you more productive.
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold ">
            PomoSuperFocus Timer {GetThemeColorText("Features", themeColor)}
          </h1>
          <ul className="flex flex-col gap-2">
            {pomoSuperFocusTimerFeatures.map((feature, index) => (
              <li key={index} className="text-xl">
                {feature.icon} <span className="">{feature.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4 */}
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold ">
            How is it {GetThemeColorText("Free", themeColor)}?
          </h1>
          <div className="text-xl ">
            <span className="font-bold">PomoSuperFocus</span> will be{" "}
            <span className="font-bold">
              free and open source software forever.
            </span>{" "}
            However, we encourage you to{" "}
            <span className="font-bold">feed stray animals</span> if you see
            them next time, or by spreading the word to your{" "}
            <span className="font-bold">friends or on socials.</span> This keeps
            PomoSuperFocus{" "}
            <span className="font-bold">free-to-use and free of ads.</span> You
            can support PomoSuperFocus by{" "}
            <span className="font-bold">starring the GitHub repo</span> as well:{" "}
            <a
              href="https://github.com/samyakshah3008/pomo-super-focus-webapp"
              target="_blank"
              className={cn(themeColors[themeColor] || themeColors["emerald"])}
            >
              github
            </a>
          </div>
        </div>
      </article>
    </main>
  );
};

export default HowTo;
