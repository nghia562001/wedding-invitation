"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const storyItems = [
  {
    year: "2022",
    title: "Lần đầu gặp gỡ",
    desc: "Chúng tôi gặp nhau trong một ngày rất bình thường, nhưng lại mở ra một câu chuyện không hề bình thường.",
  },
  {
    year: "2023",
    title: "Hành trình đầu tiên",
    desc: "Từ những buổi cà phê đến những chuyến đi xa, chúng tôi hiểu rằng mình muốn đi cùng nhau lâu hơn nữa.",
  },
  {
    year: "2026",
    title: "Lời hứa trọn đời",
    desc: "Giờ đây chúng tôi viết tiếp câu chuyện của riêng mình với gia đình, tình yêu và bạn bè đồng hành chứng kiến.",
  },
];

type StoryCardProps = {
  year: string;
  title: string;
  desc: string;
  index: number;
};

function StoryCard({ year, title, desc, index }: StoryCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const inView = useInView(ref, {
    amount: 0.14,
  });

  // desktop xen kẽ trái/phải nhẹ, mobile vẫn nhìn mượt
  const isEven = index % 2 === 0;
  const hiddenState = {
    opacity: 0,
    y: 14,
    x: isEven ? -10 : 10,
    scale: 0.994,
    filter: "blur(4px)",
  };

  const visibleState = {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
  };

  useEffect(() => {
    if (inView) {
      controls.start({
        ...visibleState,
        transition: {
          type: "spring",
          stiffness: 66,
          damping: 22,
          mass: 0.95,
        },
      });
    } else {
      controls.start({
        ...hiddenState,
        transition: {
          type: "spring",
          stiffness: 78,
          damping: 24,
          mass: 0.9,
        },
      });
    }
  }, [inView, controls, isEven]);

  return (
    <motion.div
      ref={ref}
      initial={hiddenState}
      animate={controls}
      className="relative"
    >
      <Card className="group rounded-[2rem] border-neutral-200 bg-white/90 shadow-sm backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
        <CardContent className="space-y-4 p-6 md:p-7">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-400 transition-colors duration-500 group-hover:text-neutral-500">
            {year}
          </p>

          <h3 className="text-xl font-semibold text-neutral-900 md:text-2xl">
            {title}
          </h3>

          <p className="text-sm leading-7 text-neutral-600 md:text-[15px]">
            {desc}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function StorySection() {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const headingControls = useAnimation();
  const headingInView = useInView(headingRef, { amount: 0.3 });

  const mobileLineRef = useRef<HTMLDivElement | null>(null);
  const mobileLineControls = useAnimation();
  const mobileLineInView = useInView(mobileLineRef, { amount: 0.15 });

  const desktopLineRef = useRef<HTMLDivElement | null>(null);
  const desktopLineControls = useAnimation();
  const desktopLineInView = useInView(desktopLineRef, { amount: 0.15 });

  useEffect(() => {
    if (headingInView) {
      headingControls.start({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 68,
          damping: 22,
          mass: 1,
        },
      });
    } else {
      headingControls.start({
        opacity: 0,
        y: 12,
        filter: "blur(4px)",
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 24,
          mass: 0.9,
        },
      });
    }
  }, [headingInView, headingControls]);

  useEffect(() => {
    if (mobileLineInView) {
      mobileLineControls.start({
        scaleY: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 60,
          damping: 20,
          mass: 1,
        },
      });
    } else {
      mobileLineControls.start({
        scaleY: 0,
        opacity: 0.5,
        transition: {
          type: "spring",
          stiffness: 72,
          damping: 22,
          mass: 0.9,
        },
      });
    }
  }, [mobileLineInView, mobileLineControls]);

  useEffect(() => {
    if (desktopLineInView) {
      desktopLineControls.start({
        scaleX: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 60,
          damping: 20,
          mass: 1,
        },
      });
    } else {
      desktopLineControls.start({
        scaleX: 0,
        opacity: 0.5,
        transition: {
          type: "spring",
          stiffness: 72,
          damping: 22,
          mass: 0.9,
        },
      });
    }
  }, [desktopLineInView, desktopLineControls]);

  return (
    <section
      id="story"
      className="relative overflow-hidden px-6 py-16 md:px-10 md:py-24"
    >
      {/* background glow nhẹ */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-8 h-40 w-40 -translate-x-1/2 rounded-full bg-neutral-200/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl space-y-10 md:space-y-14">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={headingControls}
          className="max-w-2xl space-y-3"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Love Story
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
            Câu chuyện tình yêu
          </h2>

          <p className="text-neutral-600 md:text-lg">
            Một hành trình được viết nên từ những điều giản dị nhất, nhưng lại
            trở thành ký ức đẹp nhất.
          </p>
        </motion.div>

        {/* MOBILE: timeline dọc */}
        <div className="relative md:hidden">
          {/* line dọc */}
          <motion.div
            ref={mobileLineRef}
            className="absolute left-[18px] top-2 bottom-2 w-px origin-top bg-neutral-200"
            initial={{ scaleY: 0, opacity: 0.5 }}
            animate={mobileLineControls}
          />

          <div className="space-y-5">
            {storyItems.map((item, index) => (
              <div key={item.year} className="relative pl-12">
                {/* dot */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 18,
                    mass: 0.8,
                  }}
                  className="absolute left-[10px] top-6 h-4 w-4 rounded-full border border-white bg-neutral-800 shadow-md"
                />

                <StoryCard
                  year={item.year}
                  title={item.title}
                  desc={item.desc}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP: timeline ngang */}
        <div className="relative hidden md:block">
          {/* line ngang */}
          <motion.div
            ref={desktopLineRef}
            className="absolute left-[12%] right-[12%] top-10 h-px origin-left bg-neutral-200"
            initial={{ scaleX: 0, opacity: 0.5 }}
            animate={desktopLineControls}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {storyItems.map((item, index) => (
              <div key={item.year} className="relative">
                {/* dot trên line */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 18,
                    mass: 0.8,
                  }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative z-10 h-5 w-5 rounded-full border-4 border-white bg-neutral-800 shadow-md" />
                </motion.div>

                <StoryCard
                  year={item.year}
                  title={item.title}
                  desc={item.desc}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}