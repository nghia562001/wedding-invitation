"use client";

/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { motion } from "framer-motion";

const heroImages = [
  "/images/DSC05980.jpg",
  "/images/DSC05749.jpg",
  "/images/DSC05589.jpg",
];
// const heroImages = [
//   "/images/DSC05287.jpg",
//   "/images/DSC05358.jpg",
//   "/images/DSC05333.jpg",
// ];

export function HeroSection() {
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

  return (
    <section className="relative overflow-hidden px-6 py-16 pb-24 md:px-10 md:py-24 md:pb-28 lg:py-28 lg:pb-32">
      {/* Background glow nhẹ */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8%] top-[4%] h-44 w-44 rounded-full bg-neutral-200/40 blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute bottom-[8%] right-[-8%] h-52 w-52 rounded-full bg-stone-200/40 blur-3xl sm:h-72 sm:w-72" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left content */}
          <motion.div
            className="space-y-6 md:pt-2 lg:pt-4"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.p
              className="text-xs uppercase tracking-[0.28em] text-neutral-500 sm:text-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Wedding Invitation
            </motion.p>

            <div className="space-y-4">
              <motion.h1
                className="text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.03em] sm:text-[3.2rem] md:text-6xl lg:text-[4.25rem]"
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
                className="max-w-[34rem] text-base leading-relaxed text-neutral-600 sm:text-lg md:text-xl"
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
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500 sm:text-sm">
                Save the Date
              </p>
              <p className="text-2xl font-medium md:text-3xl">26.04.2026</p>
            </motion.div>

            {/* Buttons - luôn ngang trên mobile */}
            <motion.div
              className="flex flex-nowrap gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            >
              <Button
                onClick={() => scrollToSection("event")}
                className="h-11 flex-1 whitespace-nowrap px-3 text-[11px] sm:px-4 sm:text-sm"
              >
                Xem thông tin lễ cưới
              </Button>

              <Button
                variant="outline"
                onClick={() => scrollToSection("rsvp")}
                className="h-11 flex-1 whitespace-nowrap px-3 text-[11px] sm:px-4 sm:text-sm"
              >
                Xác nhận tham dự
              </Button>
            </motion.div>
          </motion.div>

          {/* Right image collage */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          >
            <HeroEditorialImageStack images={heroImages} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type HeroEditorialImageStackProps = {
  images: string[];
};

function HeroEditorialImageStack({ images }: HeroEditorialImageStackProps) {
  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      {/* Chiều cao responsive cho collage */}
      <div className="relative h-[400px] sm:h-[500px] md:h-[560px] lg:h-[620px]">
        {/* Ảnh chính */}
        <motion.div
          className="absolute left-0 top-8 z-20 w-[70%] overflow-hidden rounded-[2rem] bg-white p-2 shadow-2xl sm:top-10 sm:w-[68%]"
          initial={{ opacity: 0, x: -20, y: 18, rotate: -2 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: -2 }}
          transition={{ duration: 0.9, delay: 0.28, ease: "easeOut" }}
          whileHover={{ y: -4 }}
        >
          <div className="aspect-[4/5] overflow-hidden rounded-[1.6rem]">
            <motion.img
              src={images[0]}
              alt="Wedding photo 1"
              className="h-full w-full object-cover"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 1.5, delay: 0.34, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Ảnh phụ trên phải */}
        <motion.div
          className="absolute right-0 top-0 z-10 w-[42%] overflow-hidden rounded-[1.7rem] bg-white p-2 shadow-xl sm:w-[40%]"
          initial={{ opacity: 0, x: 20, y: -12, rotate: 3 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 3 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          whileHover={{ y: -3 }}
        >
          <div className="aspect-[3/4] overflow-hidden rounded-[1.25rem]">
            <motion.img
              src={images[1]}
              alt="Wedding photo 2"
              className="h-full w-full object-cover"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 1.4, delay: 0.46, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Ảnh phụ dưới phải */}
        <motion.div
          className="absolute bottom-0 right-4 z-30 w-[48%] overflow-hidden rounded-[1.7rem] bg-white p-2 shadow-2xl sm:bottom-4 sm:right-6 sm:w-[46%]"
          initial={{ opacity: 0, x: 18, y: 18, rotate: -3 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: -3 }}
          transition={{ duration: 0.95, delay: 0.52, ease: "easeOut" }}
          whileHover={{ y: -4 }}
        >
          <div className="aspect-[4/5] overflow-hidden rounded-[1.25rem]">
            <motion.img
              src={images[2]}
              alt="Wedding photo 3"
              className="h-full w-full object-cover"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 1.4, delay: 0.58, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}