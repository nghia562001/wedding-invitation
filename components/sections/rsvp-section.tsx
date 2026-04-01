/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function RsvpSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              RSVP
            </p>
            <h2 className="text-3xl font-semibold md:text-5xl">
              Xác nhận tham dự
            </h2>
            <p className="text-neutral-600">
              Sự hiện diện của bạn là niềm vui lớn đối với chúng tôi. Hãy để lại lời nhắn thật đẹp nhé.
            </p>

            <div className="overflow-hidden rounded-[2rem]">
              <img
                src="/images/DSC04785.jpg"
                alt="RSVP"
                className="h-full min-h-[320px] w-full object-cover"
              />
            </div>
          </div>

          <Card className="h-fit">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Tên của bạn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Input placeholder="Số điện thoại (tuỳ chọn)" />

                <Textarea
                  placeholder="Gửi lời chúc đến cô dâu chú rể..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <Button type="submit" className="w-full">
                  Gửi lời chúc & xác nhận
                </Button>

                {submitted && (
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                    <p className="text-sm text-neutral-700">
                      Cảm ơn <span className="font-medium">{name || "bạn"}</span> đã xác nhận tham dự 💌
                    </p>
                    {message && (
                      <p className="mt-2 text-sm text-neutral-500">
                        Lời nhắn của bạn đã được ghi nhận: “{message}”
                      </p>
                    )}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}