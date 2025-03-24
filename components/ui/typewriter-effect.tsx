"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";
import React from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-white text-black opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  sentences,
  className,
  cursorClassName,
}: {
  sentences: {
    text: string;
    className?: string;
  }[][];
  className?: string;
  cursorClassName?: string;
}) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = React.useState(0);
  const [animationState, setAnimationState] = React.useState<
    "typing" | "erasing"
  >("typing");
  const currentSentence = sentences[currentSentenceIndex];

  // split text inside of words into array of characters
  const wordsArray = currentSentence.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  useEffect(() => {
    if (sentences.length <= 1) return;

    let timer: NodeJS.Timeout;

    if (animationState === "typing") {
      // After typing finishes, wait and then start erasing
      timer = setTimeout(() => {
        setAnimationState("erasing");
      }, 3000); // Wait time after typing completes
    } else {
      // After erasing finishes, move to next sentence and start typing
      timer = setTimeout(() => {
        setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length);
        setAnimationState("typing");
      }, 1000); // Short delay after erasing before typing next sentence
    }

    return () => clearTimeout(timer);
  }, [sentences.length, animationState]);

  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className={cn(`inline-block`)}>
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`dark:text-white text-black `, word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        key={`${currentSentenceIndex}-${animationState}`}
        initial={{
          width: animationState === "typing" ? "0%" : "fit-content",
        }}
        animate={{
          width: animationState === "typing" ? "fit-content" : "0%",
        }}
        transition={{
          duration: animationState === "typing" ? 2 : 1,
          ease: "easeInOut",
        }}
      >
        <div
          className="text-lg sm:text-xl md:text-2xl lg:text:3xl xl:text-5xl font-bold"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[4px]  h-4 sm:h-6 xl:h-12 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
