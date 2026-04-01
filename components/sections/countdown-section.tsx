"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

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

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(getTimeLeft(TARGET_DATE));

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(TARGET_DATE));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: "Ngày", value: timeLeft.days },
    { label: "Giờ", value: timeLeft.hours },
    { label: "Phút", value: timeLeft.minutes },
    { label: "Giây", value: timeLeft.seconds },
  ];

  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Header */}
        <div className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Countdown
          </p>
          <h2 className="text-3xl font-semibold md:text-5xl">
            Đếm ngược đến ngày cưới
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-600">
            Chúng tôi đang đếm từng ngày để được chào đón bạn trong khoảnh khắc ý nghĩa nhất.
          </p>
        </div>

        {/* Countdown cards */}
        <div className="flex justify-center gap-4 flex-wrap md:flex-nowrap">
          {items.map((item) => (
            <Card
              key={item.label}
              className="flex-1 min-w-[70px] md:min-w-0 max-w-[150px]"
            >
              <CardContent className="space-y-2 p-4 md:p-6 text-center">
                <p className="text-4xl font-semibold md:text-5xl">
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                  {item.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}