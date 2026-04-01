"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

export function HeroSection() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 1;
      audioRef.current
        .play()
        .catch(() => console.log("Nhấn Play để phát nhạc."));
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left content */}
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Wedding Invitation
            </p>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                Tường Vy <span className="text-neutral-400">& </span> Trung Nghĩa
              </h1>
              <p className="text-lg text-neutral-600 md:text-xl">
                Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của chúng tôi.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
                Save the Date
              </p>
              <p className="text-2xl font-medium md:text-3xl">26.04.2026</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => scrollToSection("event")}>
                Xem thông tin lễ cưới
              </Button>
              <Button variant="outline" onClick={() => scrollToSection("rsvp")}>
                Xác nhận tham dự
              </Button>
            </div>
          </div>

          {/* Right image + info box with music button */}
          <div className="relative">
            <div className="aspect-4/5 overflow-hidden rounded-4xl border-neutral-200 bg-white shadow-xl">
              <img
                src="/images/DSC05656.jpg"
                alt="Wedding couple"
                className="h-full w-full object-cover"
              />
            </div>

{/* Info box with music button */}
<div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex justify-between items-center rounded-3xl border border-white/70 bg-white/90 px-6 py-4 shadow-lg backdrop-blur w-[calc(100%+2rem)] md:w-[calc(100%+2rem)] max-w-[calc(100%+2rem)] gap-4">
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
  <button
    onClick={toggleMusic}
    className="w-12 h-12 flex-shrink-0 rounded-full border border-white/70 bg-white/90 shadow-lg flex items-center justify-center hover:bg-neutral-100 transition"
    aria-label="Toggle music"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-neutral-800"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      {isPlaying ? (
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
      ) : (
        <path d="M8 5v14l11-7L8 5z" />
      )}
    </svg>
  </button>
</div>

            {/* Hidden audio element */}
            <audio ref={audioRef} src="/audio/wedding-song.mp3" loop />
          </div>
        </div>
      </div>
    </section>
  );
}