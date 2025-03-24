"use client";

import Image from "next/image";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import portfolioDp from "@/public/portfolio-dp.png";

export default function TypewriterEffectSmoothDemo() {
  // Define multiple sentences to display sequentially
  const sentences = [
    [
      { text: "Full" },
      { text: "Stack" },
      { text: "Web" },
      {
        text: "Developer",
        className: "text-pink-500 dark:text-pink-500",
      },
    ],
    [
      { text: "Create" },
      { text: "Stunning" },
      { text: "Websites" },
      { text: "For Your" },
      { text: "Business", className: "text-violet-500 dark:text-violet-500" },
    ],
    [
      { text: "Design" },
      { text: "Beautiful" },
      { text: "Interfaces" },
      { text: "For Your " },
      { text: "Portfolio", className: "text-yellow-500 dark:text-yellow-500" },
    ],
    [
      { text: "Develop" },
      { text: "Robust" },
      { text: "Backend" },
      { text: "Services", className: "text-purple-500 dark:text-purple-500" },
    ],
    [
      { text: "Launch" },
      { text: "Your" },
      { text: "Ideas" },
      { text: "Into" },
      { text: "Reality", className: "text-blue-500 dark:text-blue-500" },
    ],
  ];

  return (
    <BackgroundBeamsWithCollision>
      <div className="flex flex-col items-center justify-center h-[40rem]">
        <div className="mb-10 flex justify-center items-center rounded-full w-[158px] h-[158px] bg-gradient-to-b from-red-600 to-indigo-600">
          <Image
            src={portfolioDp}
            width={150}
            height={150}
            alt="Portfolio Display Picture"
          />
        </div>

        <p className="text-neutral-600 dark:text-neutral-200 text-sm sm:text-xl">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500  text-transparent bg-clip-text">
            Saurav
          </span>{" "}
          Kumar (Full Stack Web Developer)
        </p>
        <TypewriterEffectSmooth sentences={sentences} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-10">
          <button className="w-40 h-10 rounded-xl bg-black border hover:scale-125 transition duration-300 dark:border-white border-transparent text-white text-sm bg-gradient-to-r b from-red-600 to-indigo-600">
            Resume
          </button>
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm hover:scale-125 transition duration-300">
            Contact
          </button>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
