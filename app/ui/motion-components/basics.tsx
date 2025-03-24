"use client";
import { motion } from "framer-motion";

export default function Basics() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.5,
      }}
      className="h-screen w-screen flex justify-center items-center"
    >
      <div className="w-[150px] h-[150px] bg-pink-500"></div>
    </motion.div>
  );
}
