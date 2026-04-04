"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type FloatingMusicControlProps = {
  audioSrc?: string;
};

export function FloatingMusicControl({
  audioSrc = "/audio/wedding-song.mp3",
}: FloatingMusicControlProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      audioRef.current.volume = 1;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.log("Nhấn nút để phát nhạc:", error);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, []);

  return (
    <>
      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+16px)] right-4 z-[90] flex items-center justify-center rounded-full border border-white/70 bg-white/90 shadow-[0_10px_24px_rgba(0,0,0,0.12)] backdrop-blur-md transition hover:bg-white sm:bottom-6 sm:right-6"
        aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: isPlaying ? [1, 1.04, 1] : 1,
          boxShadow: isPlaying
            ? [
                "0 10px 24px rgba(0,0,0,0.12)",
                "0 14px 30px rgba(0,0,0,0.16)",
                "0 10px 24px rgba(0,0,0,0.12)",
              ]
            : "0 10px 24px rgba(0,0,0,0.12)",
        }}
        transition={{
          opacity: { duration: 0.45, ease: "easeOut" },
          y: { duration: 0.45, ease: "easeOut" },
          scale: isPlaying
            ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.25 },
          boxShadow: isPlaying
            ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.25 },
        }}
      >
        {/* MOBILE: chỉ icon tròn nhỏ */}
        <div className="flex h-11 w-11 items-center justify-center sm:hidden">
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white"
            animate={isPlaying ? { rotate: [0, -6, 6, 0] } : { rotate: 0 }}
            transition={
              isPlaying
                ? {
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : { duration: 0.2 }
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {isPlaying ? (
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              ) : (
                <path d="M8 5v14l11-7L8 5z" />
              )}
            </svg>
          </motion.div>
        </div>

        {/* DESKTOP: pill nhỏ gọn */}
        <div className="hidden h-12 items-center gap-2 px-3 sm:flex">
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white"
            animate={isPlaying ? { rotate: [0, -6, 6, 0] } : { rotate: 0 }}
            transition={
              isPlaying
                ? {
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : { duration: 0.2 }
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {isPlaying ? (
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              ) : (
                <path d="M8 5v14l11-7L8 5z" />
              )}
            </svg>
          </motion.div>

          <span className="text-xs font-medium text-neutral-800">
            {isPlaying ? "Đang phát" : "Nhạc cưới"}
          </span>
        </div>
      </motion.button>

      <audio ref={audioRef} src={audioSrc} loop preload="auto" />
    </>
  );
}