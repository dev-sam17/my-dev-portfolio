"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import portfolioDp from "@/public/portfolio-dp.png";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";

const resumeLink =
  "https://drive.google.com/file/d/1Yf4beTSTQhPNkFTlpnZn80aI7W-HMcXV/view?usp=sharing";

export default function TypewriterEffectSmoothDemo() {
  const router = useRouter();
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
          <HoverBorderGradient
            containerClassName="w-40 rounded-full text-sm hover:scale-110 transition duration-300"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <Link href={resumeLink} target="_blank">
              <span className="bg-transparent">Resume</span>
            </Link>
          </HoverBorderGradient>
          <button
            onClick={() => router.push("/contact")}
            className="w-40 h-10 rounded-full bg-white text-black border border-black text-sm hover:scale-110 transition duration-300"
          >
            Contact
          </button>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
