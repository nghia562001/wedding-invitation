"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Khi vào trang / reload -> luôn về đầu trang
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // Fix cho một số trường hợp iPhone Safari giữ vị trí scroll cũ
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handlePageShow = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 1;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => console.log("Nhấn Play để phát nhạc."));
    }
  };

  return (
    <section className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.p
              className="text-sm uppercase tracking-[0.3em] text-neutral-500"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Wedding Invitation
            </motion.p>

            <div className="space-y-4">
              <motion.h1
                className="text-[3rem] font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
              >
                <span className="block">
                  Tường Vy <span className="text-neutral-400">&</span>
                </span>
                <span className="block">Trung Nghĩa</span>
              </motion.h1>

              <motion.p
                className="text-lg text-neutral-600 md:text-xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
              >
                Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của
                chúng tôi.
              </motion.p>
            </div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
                Save the Date
              </p>
              <p className="text-2xl font-medium md:text-3xl">26.04.2026</p>
            </motion.div>

            {/* 2 nút luôn nằm ngang trên mobile như iPhone 11 Pro */}
            <motion.div
              className="flex flex-nowrap gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            >
              <Button
                onClick={() => scrollToSection("event")}
                className="h-11 flex-1 whitespace-nowrap px-3 text-xs sm:px-4 sm:text-sm"
              >
                Xem thông tin lễ cưới
              </Button>

              <Button
                variant="outline"
                onClick={() => scrollToSection("rsvp")}
                className="h-11 flex-1 whitespace-nowrap px-3 text-xs sm:px-4 sm:text-sm"
              >
                Xác nhận tham dự
              </Button>
            </motion.div>
          </motion.div>

          {/* Right image + info box with music button */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          >
            {/* Ảnh */}
            <motion.div
              className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-white shadow-xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
            >
              <motion.img
                src="/images/DSC05980.jpg"
                alt="Wedding couple"
                className="h-full w-full object-cover"
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, delay: 0.35, ease: "easeOut" }}
              />
            </motion.div>

            {/* Info box with music button */}
            <motion.div
              className="absolute -bottom-6 left-1/2 flex w-[calc(100%+2rem)] max-w-[calc(100%+2rem)] -translate-x-1/2 items-center justify-between gap-4 rounded-3xl border border-white/70 bg-white/90 px-6 py-4 shadow-lg backdrop-blur"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
            >
              {/* Text bên trái */}
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                  Forever starts here
                </p>
                <p className="mt-1 text-sm font-medium text-neutral-800">
                  Cùng nhau viết tiếp chuyện trăm năm
                </p>
              </div>

              {/* Nút nhạc bên phải */}
              <motion.button
                onClick={toggleMusic}
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/90 shadow-lg transition hover:bg-neutral-100"
                aria-label="Toggle music"
                whileTap={{ scale: 0.92 }}
                animate={
                  isPlaying
                    ? {
                        scale: [1, 1.08, 1],
                        boxShadow: [
                          "0 8px 20px rgba(0,0,0,0.08)",
                          "0 10px 28px rgba(0,0,0,0.14)",
                          "0 8px 20px rgba(0,0,0,0.08)",
                        ],
                      }
                    : {
                        scale: 1,
                        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                      }
                }
                transition={
                  isPlaying
                    ? {
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : {
                        duration: 0.3,
                      }
                }
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-neutral-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: isPlaying ? [0, -4, 4, 0] : 0 }}
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
                  {isPlaying ? (
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  ) : (
                    <path d="M8 5v14l11-7L8 5z" />
                  )}
                </motion.svg>
              </motion.button>
            </motion.div>

            {/* Hidden audio element */}
            <audio ref={audioRef} src="/audio/wedding-song.mp3" loop />
          </motion.div>
        </div>
      </div>
    </section>
  );
}