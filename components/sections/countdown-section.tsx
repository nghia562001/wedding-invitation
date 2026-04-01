"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion, useInView } from "framer-motion";

const TARGET_DATE = "2026-04-26T09:00:00";

function getTimeLeft(targetDate: string) {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const EMPTY_TIME = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

type NumberSlotProps = {
  value: number;
};

function NumberSlot({ value }: NumberSlotProps) {
  const formatted = String(value).padStart(2, "0");

  return (
    <div className="relative h-[2.2rem] overflow-hidden sm:h-[2.8rem] md:h-[4.2rem]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={formatted}
          initial={{ y: "45%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-45%", opacity: 0, filter: "blur(4px)" }}
          transition={{
            type: "spring",
            stiffness: 95,
            damping: 20,
            mass: 0.9,
          }}
          className="absolute inset-0 flex items-center justify-center font-semibold tabular-nums tracking-[-0.03em] text-2xl sm:text-3xl md:text-5xl"
        >
          {formatted}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

type CountdownCardProps = {
  label: string;
  value: number;
  index: number;
  pulse?: boolean;
};

function CountdownCard({
  label,
  value,
  index,
  pulse = false,
}: CountdownCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, {
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 14,
        scale: 0.996,
        filter: "blur(4px)",
      }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
          : {
              opacity: 0,
              y: 14,
              scale: 0.996,
              filter: "blur(4px)",
            }
      }
      transition={{
        type: "spring",
        stiffness: 62,
        damping: 22,
        mass: 1,
        delay: index * 0.06,
      }}
      className="w-full"
    >
      <motion.div
        animate={
          pulse
            ? {
                scale: [1, 1.015, 1],
              }
            : {
                scale: 1,
              }
        }
        transition={{
          duration: 0.55,
          ease: "easeOut",
        }}
      >
        <Card className="overflow-hidden rounded-[1.6rem] border-neutral-200 bg-white/90 shadow-sm backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:rounded-[2rem]">
          <CardContent className="p-3 text-center sm:p-4 md:p-6">
            <NumberSlot value={value} />
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-neutral-500 sm:text-xs md:text-sm md:tracking-[0.2em]">
              {label}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export function CountdownSection() {
  // ⚠️ SSR-safe: luôn giống nhau giữa server và client lần đầu
  const [timeLeft, setTimeLeft] = useState(EMPTY_TIME);
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // cập nhật ngay sau khi mount để hiện đúng số thật
    setTimeLeft(getTimeLeft(TARGET_DATE));

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(TARGET_DATE));
      setTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = useMemo(
    () => [
      { label: "Ngày", value: timeLeft.days },
      { label: "Giờ", value: timeLeft.hours },
      { label: "Phút", value: timeLeft.minutes },
      { label: "Giây", value: timeLeft.seconds },
    ],
    [timeLeft]
  );

  return (
    <section
      id="countdown"
      className="relative overflow-hidden px-4 py-16 md:px-10 md:py-24"
    >
      {/* background glow nhẹ */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-44 w-44 -translate-x-1/2 rounded-full bg-neutral-200/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl space-y-10 md:space-y-14">
        {/* Header */}
        <motion.div
          className="space-y-3 text-center"
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 20,
            mass: 1,
          }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Countdown
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
            Đếm ngược đến ngày cưới
          </h2>

          <p className="mx-auto max-w-2xl text-neutral-600 md:text-lg">
            Chúng tôi đang đếm từng ngày để được chào đón bạn trong khoảnh khắc
            ý nghĩa nhất.
          </p>
        </motion.div>

        {/* Countdown cards */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {items.map((item, index) => (
            <CountdownCard
              key={item.label}
              label={item.label}
              value={item.value}
              index={index}
              pulse={mounted && item.label === "Giây" ? true : false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}