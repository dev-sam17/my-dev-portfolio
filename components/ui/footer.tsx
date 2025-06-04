"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconMail,
  IconHeart,
} from "@tabler/icons-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-200 dark:bg-neutral-950 py-12 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About / Logo Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold dark:text-white">Saurav Kumar</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md">
              Full-stack developer specializing in creating beautiful,
              functional, and user-friendly web applications.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <motion.a
                href="https://github.com/dev-sam17"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconBrandGithub size={24} />
                <span className="sr-only">GitHub</span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/sauravkumar7546/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconBrandLinkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/sam_the_maverick/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconBrandInstagram size={24} />
                <span className="sr-only">Instagram</span>
              </motion.a>

              <motion.a
                href="mailto:codewizard.saurav@gmail.com"
                className="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconMail size={24} />
                <span className="sr-only">Email</span>
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#hero"
                  className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#tech-stack"
                  className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/#freelance"
                  className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Freelance Works
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Email:</span>{" "}
                codewizard.saurav@gmail.com
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Location:</span> Ranchi, India
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Availability:</span> Open to
                opportunities
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-neutral-400 dark:border-neutral-800 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Saurav Kumar. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center justify-center">
            Made with <IconHeart size={14} className="mx-1 text-red-500" />{" "}
            using Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
