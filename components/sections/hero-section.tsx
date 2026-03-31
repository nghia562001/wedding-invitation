"use client";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Wedding Invitation
            </p>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                Trung Nghĩa <span className="text-neutral-400">& </span> Tường Vy
              </h1>
              <p className="text-lg text-neutral-600 md:text-xl">
                Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của chúng tôi.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
                Save the Date
              </p>
              <p className="text-2xl font-medium md:text-3xl">24.04.2026</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => scrollToSection("event")}>
                Xem thông tin lễ cưới
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("rsvp")}
              >
                Xác nhận tham dự
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-4/5 overflow-hidden rounded-4xl border-neutral-200 bg-white shadow-xl">
              <img
                src="/images/DSC05994 13x18.jpg"
                alt="Wedding couple"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 rounded-3xl border border-white/70 bg-white/90 px-5 py-4 shadow-lg backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Forever starts here
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-800">
                Một ngày đặc biệt, một hành trình trọn đời
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

