/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function EventSection() {
  return (
    <section id="event" className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Heading */}
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Event Details
          </p>
          <h2 className="text-3xl font-semibold md:text-5xl">
            Thông tin buổi lễ
          </h2>
          <p className="max-w-2xl text-neutral-600">
            Chúng tôi rất hạnh phúc nếu có thể đón tiếp bạn trong ngày trọng đại này.
          </p>
        </div>

        {/* Equal height layout */}
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          {/* Left card */}
          <Card className="h-full rounded-[2rem] border border-neutral-200">
            <CardContent className="flex h-full flex-col justify-between space-y-5 p-8 md:p-10">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                  Lễ Vu Quy
                </p>
                <h3 className="mt-2 text-2xl font-semibold md:text-3xl">
                  09:00 AM
                </h3>
                <p className="mt-2 text-neutral-600">
                  Thứ Bảy, 25 tháng 04 năm 2026
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                  Địa điểm
                </p>
                <h4 className="mt-2 text-lg font-medium md:text-xl">
                  Tư Gia Nhà Gái
                </h4>
                <p className="mt-2 text-sm leading-7 text-neutral-600 md:text-base">
                  Ấp Bờ Cảng, xã Long Điền, tỉnh Cà Mau
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right image */}
          <div className="h-full overflow-hidden rounded-[2rem]">
            <img
              src="/images/DSC05994.jpg"
              alt="Wedding venue"
              className="h-full min-h-[360px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}