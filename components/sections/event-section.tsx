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

function RevealBlock({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.22 });

  useEffect(() => {
    if (inView) {
      controls.start({
        ...getVisibleState(),
        transition: {
          type: "spring",
          stiffness: 62,
          damping: 22,
          delay,
        },
      });
    } else {
      controls.start(getHiddenState(direction));
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
        <RevealBlock>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Event Details
            </p>
            <h2 className="text-3xl font-semibold md:text-5xl">
              Thông tin buổi lễ
            </h2>
            <p className="max-w-2xl text-neutral-600 md:text-lg">
              Chúng tôi rất hạnh phúc nếu có thể đón tiếp bạn trong ngày trọng đại này.
            </p>
          </div>
        </RevealBlock>

        {/* Layout */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Lễ Vu Quy */}
          <RevealBlock direction="left">
            <Card className="h-full rounded-[2rem] border bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
              <CardContent className="p-8 space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                    Lễ Vu Quy
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">16:30 PM</h3>
                  <p className="text-neutral-600">
                    Thứ Bảy, 25 tháng 04 năm 2026
                  </p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                    Địa điểm
                  </p>
                  <h4 className="mt-2 text-lg font-medium">
                    Tư Gia Nhà Gái
                  </h4>
                  <p className="text-neutral-600">
                    Ấp Bờ Cảng, xã Long Điền, Cà Mau
                  </p>
                </div>
              </CardContent>
            </Card>
          </RevealBlock>

          {/* Lễ Tân Hôn */}
          <RevealBlock direction="right">
            <Card className="h-full rounded-[2rem] border bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
              <CardContent className="p-8 space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                    Lễ Tân Hôn
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">16:30 PM</h3>
                  <p className="text-neutral-600">
                    Chủ Nhật, 26 tháng 04 năm 2026
                  </p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                    Địa điểm
                  </p>
                  <h4 className="mt-2 text-lg font-medium">
                    Tư Gia Nhà Trai
                  </h4>
                  <p className="text-neutral-600">
                    Khóm 5A, phường Giá Rai, Cà Mau
                  </p>
                </div>
              </CardContent>
            </Card>
          </RevealBlock>

          {/* IMAGE */}
          <RevealBlock direction="up" className="md:col-span-2">
            <motion.div className="relative h-[360px] sm:h-[420px] overflow-hidden rounded-[2rem]">
              <Image
                src="/images/DSC05994.jpg"
                alt="Wedding"
                fill
                className="
                  object-cover
                  object-center
                  md:object-[center_20%]
                  rounded-[1.6rem]
                "
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