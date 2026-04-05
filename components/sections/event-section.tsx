"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type RevealDirection = "left" | "right" | "up";

function getHiddenState(direction: RevealDirection) {
  switch (direction) {
    case "left":
      return { opacity: 0, x: -16, y: 0, scale: 0.997, filter: "blur(4px)" };
    case "right":
      return { opacity: 0, x: 16, y: 0, scale: 0.997, filter: "blur(4px)" };
    case "up":
    default:
      return { opacity: 0, x: 0, y: 14, scale: 0.998, filter: "blur(4px)" };
  }
}

function getVisibleState() {
  return { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };
}

type RevealBlockProps = {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
};

function RevealBlock({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: RevealBlockProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const inView = useInView(ref, { amount: 0.22 });

  useEffect(() => {
    if (inView) {
      controls.start({
        ...getVisibleState(),
        transition: { type: "spring", stiffness: 62, damping: 22, mass: 1, delay },
      });
    } else {
      controls.start({
        ...getHiddenState(direction),
        transition: { type: "spring", stiffness: 70, damping: 24, mass: 0.95 },
      });
    }
  }, [inView, controls, direction, delay]);

  return (
    <motion.div ref={ref} initial={getHiddenState(direction)} animate={controls} className={className}>
      {children}
    </motion.div>
  );
}

export function EventSection() {
  return (
    <section id="event" className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl space-y-10 md:space-y-14">
        {/* Heading */}
        <RevealBlock direction="up" delay={0}>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">Event Details</p>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl">Thông tin buổi lễ</h2>
            <p className="max-w-2xl text-neutral-600 md:text-lg">
              Chúng tôi rất hạnh phúc nếu có thể đón tiếp bạn trong ngày trọng đại này.
            </p>
          </div>
        </RevealBlock>

        {/* Equal height layout */}
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          {/* Left card */}
          <RevealBlock direction="left" delay={0.04} className="h-full">
            <Card className="h-full rounded-[2rem] border border-neutral-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="flex h-full flex-col justify-between space-y-5 p-8 md:p-10">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">Lễ Vu Quy</p>
                  <h3 className="mt-2 text-2xl font-semibold md:text-3xl">16:30 PM</h3>
                  <p className="mt-2 text-neutral-600">Thứ Bảy, 25 tháng 04 năm 2026</p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">Địa điểm</p>
                  <h4 className="mt-2 text-lg font-medium md:text-xl">Tư Gia Nhà Gái</h4>
                  <p className="mt-2 text-sm leading-7 text-neutral-600 md:text-base">
                    Ấp Bờ Cảng, xã Long Điền, tỉnh Cà Mau
                  </p>
                </div>
              </CardContent>
            </Card>
          </RevealBlock>

          {/* Right image */}
          <RevealBlock direction="right" delay={0.08} className="h-full">
            <motion.div
              className="relative overflow-hidden rounded-[2rem] h-[360px] sm:h-[420px] md:h-full"
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 140, damping: 18 } }}
            >
              <Image
                src="/images/DSC05994.jpg"
                alt="Wedding venue"
                fill
                style={{ objectFit: "cover", borderRadius: "1.6rem" }}
                quality={80}
                priority
              />
            </motion.div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}