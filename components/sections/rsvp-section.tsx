"use client";

/* eslint-disable @next/next/no-img-element */

import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Wish = {
  id: number;
  name: string;
  message: string;
  createdAt: string;
};

type ApiWish = {
  id: number;
  name: string;
  phone: string | null;
  message: string;
  is_attending: boolean;
  is_approved: boolean;
  created_at: string;
};

type RevealDirection = "left" | "right" | "up";

type RsvpImageProps = {
  src: string;
  alt: string;
  className: string;
  direction?: RevealDirection;
  priority?: boolean;
  hero?: boolean;
  objectPosition?: string;
};

const NAME_MAX = 25;
const PHONE_MAX = 11;
const MESSAGE_MAX = 180;

// chiều cao cố định cho card lời chúc để tránh giật layout
const WISH_CARD_HEIGHT = 188;
// vùng hiển thị 2 card + gap
const WISHES_VIEWPORT_HEIGHT = 408;

function formatDateVNFromISO(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function getHiddenState(direction: RevealDirection, hero: boolean) {
  const distanceX = hero ? 20 : 14;
  const distanceY = hero ? 18 : 12;

  switch (direction) {
    case "left":
      return {
        opacity: 0,
        x: -distanceX,
        y: 0,
        scale: 0.994,
        filter: "blur(4px)",
      };
    case "right":
      return {
        opacity: 0,
        x: distanceX,
        y: 0,
        scale: 0.994,
        filter: "blur(4px)",
      };
    case "up":
    default:
      return {
        opacity: 0,
        x: 0,
        y: distanceY,
        scale: 0.996,
        filter: "blur(4px)",
      };
  }
}

function getVisibleState() {
  return {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  };
}

function RsvpImage({
  src,
  alt,
  className,
  direction = "up",
  priority = false,
  hero = false,
  objectPosition = "object-center",
}: RsvpImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const inView = useInView(ref, {
    amount: hero ? 0.12 : 0.14,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        ...getVisibleState(),
        transition: {
          type: "spring",
          stiffness: hero ? 62 : 68,
          damping: hero ? 20 : 22,
          mass: hero ? 1.05 : 0.95,
        },
      });
    } else {
      controls.start({
        ...getHiddenState(direction, hero),
        transition: {
          type: "spring",
          stiffness: hero ? 72 : 78,
          damping: hero ? 22 : 24,
          mass: 0.9,
        },
      });
    }
  }, [inView, controls, direction, hero]);

  return (
    <motion.div
      ref={ref}
      initial={getHiddenState(direction, hero)}
      animate={controls}
      className={`group relative overflow-hidden ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/10 via-transparent to-white/10 opacity-80 transition-opacity duration-1000 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 z-10 ring-1 ring-black/5 transition-all duration-1000 group-hover:ring-black/10" />

      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className={`h-full w-full object-cover ${objectPosition} transition-all duration-1000 ease-out will-change-transform group-hover:scale-[1.025] group-hover:brightness-[1.02]`}
      />
    </motion.div>
  );
}

function WishCard({ wish }: { wish: Wish }) {
  return (
    <div
      className="flex flex-col rounded-[1.75rem] border border-neutral-200/80 bg-gradient-to-br from-white to-neutral-50 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
      style={{ height: `${WISH_CARD_HEIGHT}px` }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-medium text-white">
            {wish.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-neutral-900 md:text-base">
              {wish.name}
            </p>
            <p className="text-xs text-neutral-400">{wish.createdAt}</p>
          </div>
        </div>

        <span className="shrink-0 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] text-neutral-500">
          Best wishes
        </span>
      </div>

      {/* vùng text cố định + scroll nội bộ nếu dài */}
      <div className="mt-4 flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pr-1 custom-scrollbar">
          <p className="whitespace-pre-wrap break-words text-sm leading-7 text-neutral-600 md:text-[15px]">
            “{wish.message}”
          </p>
        </div>
      </div>
    </div>
  );
}

function PaginationDots({
  totalPages,
  currentPage,
  onChange,
}: {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return <div className="h-2.5" />;

  const maxVisible = 5;

  let start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex max-w-[180px] items-center justify-center gap-2 overflow-hidden">
      {start > 1 && (
        <>
          <button
            type="button"
            onClick={() => onChange(1)}
            aria-label="Go to page 1"
            className={`transition-all duration-300 ${
              currentPage === 1
                ? "h-2.5 w-7 rounded-full bg-neutral-900"
                : "h-2.5 w-2.5 rounded-full bg-neutral-300 hover:bg-neutral-400"
            }`}
          />
          {start > 2 && <span className="text-xs text-neutral-400">...</span>}
        </>
      )}

      {pages.map((page) => {
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onChange(page)}
            aria-label={`Go to page ${page}`}
            className={`transition-all duration-300 ${
              isActive
                ? "h-2.5 w-7 rounded-full bg-neutral-900"
                : "h-2.5 w-2.5 rounded-full bg-neutral-300 hover:bg-neutral-400"
            }`}
          />
        );
      })}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-xs text-neutral-400">...</span>}
          <button
            type="button"
            onClick={() => onChange(totalPages)}
            aria-label={`Go to page ${totalPages}`}
            className={`transition-all duration-300 ${
              currentPage === totalPages
                ? "h-2.5 w-7 rounded-full bg-neutral-900"
                : "h-2.5 w-2.5 rounded-full bg-neutral-300 hover:bg-neutral-400"
            }`}
          />
        </>
      )}
    </div>
  );
}

export function RsvpSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [wishesLoading, setWishesLoading] = useState(true);
  const [wishesError, setWishesError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalWishes, setTotalWishes] = useState(0);

  const itemsPerPage = 2;

  const fetchWishes = async (page: number, slideDirection?: number) => {
    try {
      setWishesLoading(true);
      setWishesError("");

      if (typeof slideDirection === "number") {
        setDirection(slideDirection);
      }

      const res = await fetch(`/api/wishes?page=${page}&limit=${itemsPerPage}`, {
        method: "GET",
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Không thể tải lời chúc.");
      }

      const safeItems = Array.isArray(data?.items) ? data.items : [];
      const safePagination = data?.pagination || {
        page,
        limit: itemsPerPage,
        total: safeItems.length,
        totalPages: 1,
      };

      const mappedWishes: Wish[] = safeItems.map((item: ApiWish) => ({
        id: item.id,
        name: item.name,
        message: item.message,
        createdAt: formatDateVNFromISO(item.created_at),
      }));

      setWishes(mappedWishes);
      setCurrentPage(safePagination.page);
      setTotalPages(Math.max(1, safePagination.totalPages));
      setTotalWishes(safePagination.total);
    } catch (error) {
      console.error("fetchWishes error:", error);
      setWishesError(
        error instanceof Error ? error.message : "Không thể tải lời chúc."
      );
      setWishes([]);
      setTotalPages(1);
      setTotalWishes(0);
    } finally {
      setWishesLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes(1);
  }, []);

  const handlePhoneChange = (value: string) => {
    const onlyDigits = value.replace(/\D/g, "").slice(0, PHONE_MAX);
    setPhone(onlyDigits);
  };

  const handleNameChange = (value: string) => {
    setName(value.slice(0, NAME_MAX));
  };

  const handleMessageChange = (value: string) => {
    setMessage(value.slice(0, MESSAGE_MAX));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedMessage) {
      setSubmitError("Vui lòng nhập tên và lời chúc.");
      return;
    }

    if (trimmedName.length > NAME_MAX) {
      setSubmitError(`Tên chỉ được tối đa ${NAME_MAX} ký tự.`);
      return;
    }

    if (trimmedPhone.length > PHONE_MAX) {
      setSubmitError(`Số điện thoại chỉ được tối đa ${PHONE_MAX} ký tự.`);
      return;
    }

    if (trimmedMessage.length > MESSAGE_MAX) {
      setSubmitError(`Lời chúc chỉ được tối đa ${MESSAGE_MAX} ký tự.`);
      return;
    }

    try {
      setSubmitLoading(true);
      setSubmitError("");
      setSubmitted(false);

      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone,
          message: trimmedMessage,
          isAttending: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Không thể gửi lời chúc.");
      }

      setSubmitted(true);
      setName("");
      setPhone("");
      setMessage("");

      await fetchWishes(1, -1);
    } catch (error) {
      console.error("submit wish error:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Có lỗi xảy ra khi gửi lời chúc."
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const goPrev = async () => {
    if (currentPage === 1 || wishesLoading) return;
    await fetchWishes(currentPage - 1, -1);
  };

  const goNext = async () => {
    if (currentPage === totalPages || wishesLoading) return;
    await fetchWishes(currentPage + 1, 1);
  };

  const goToPage = async (page: number) => {
    if (page === currentPage || wishesLoading) return;
    await fetchWishes(page, page > currentPage ? 1 : -1);
  };

  useEffect(() => {
    if (!submitted) return;

    const timeout = setTimeout(() => {
      setSubmitted(false);
    }, 3500);

    return () => clearTimeout(timeout);
  }, [submitted]);

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden px-6 py-16 md:px-10 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-44 w-44 -translate-x-1/2 rounded-full bg-neutral-200/30 blur-3xl" />
        <div className="absolute bottom-16 right-10 h-32 w-32 rounded-full bg-neutral-100/60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2 md:items-stretch md:gap-8">
          {/* LEFT COLUMN */}
          <div className="flex h-full flex-col gap-5 md:min-h-[1120px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 20,
                mass: 1,
              }}
              className="space-y-3"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                RSVP
              </p>

              <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
                Xác nhận tham dự
              </h2>

              <p className="max-w-xl text-neutral-600 md:text-lg">
                Sự hiện diện của bạn là niềm vui lớn đối với chúng tôi. Hãy để
                lại một lời chúc thật đẹp cho ngày đặc biệt này nhé.
              </p>
            </motion.div>

            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4 md:hidden">
                <RsvpImage
                  src="/images/DSC05358.jpg"
                  alt="Wedding portrait main"
                  className="h-[420px] rounded-[1.75rem]"
                  direction="left"
                  priority
                  hero
                  objectPosition="object-top"
                />

                <div className="flex flex-col gap-4">
                  <RsvpImage
                    src="/images/DSC05287.jpg"
                    alt="Wedding portrait detail 1"
                    className="h-[200px] rounded-[1.75rem]"
                    direction="right"
                    objectPosition="object-top"
                  />
                  <RsvpImage
                    src="/images/DSC05333.jpg"
                    alt="Wedding portrait detail 2"
                    className="h-[200px] rounded-[1.75rem]"
                    direction="up"
                    objectPosition="object-top"
                  />
                </div>
              </div>

              <div className="hidden h-full grid-cols-2 gap-5 md:grid">
                <RsvpImage
                  src="/images/DSC05358.jpg"
                  alt="Wedding portrait main"
                  className="h-full min-h-[760px] rounded-[2rem]"
                  direction="left"
                  priority
                  hero
                  objectPosition="object-top"
                />

                <div className="flex h-full flex-col gap-5">
                  <RsvpImage
                    src="/images/DSC05287.jpg"
                    alt="Wedding portrait detail 1"
                    className="flex-[1.02] rounded-[2rem]"
                    direction="right"
                    objectPosition="object-top"
                  />

                  <RsvpImage
                    src="/images/DSC05333.jpg"
                    alt="Wedding portrait detail 2"
                    className="flex-[1.18] rounded-[2rem]"
                    direction="up"
                    objectPosition="object-top"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex h-full flex-col gap-5 md:min-h-[1120px]">
            <Card className="border-neutral-200/80 bg-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.04)] backdrop-blur-sm md:flex-[1.06]">
              <CardContent className="p-8 md:p-10 lg:p-11">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                      Confirmation
                    </p>
                    <h3 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                      Chia sẻ lời chúc cá nhân
                    </h3>
                    <p className="text-sm text-neutral-500">
                      Điền thông tin và gửi lời nhắn yêu thương đến cô dâu chú rể.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Input
                        placeholder="Tên của bạn *"
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        maxLength={NAME_MAX}
                        className="h-12 rounded-2xl border-neutral-200"
                        disabled={submitLoading}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Input
                        placeholder="Số điện thoại (tuỳ chọn)"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        inputMode="numeric"
                        maxLength={PHONE_MAX}
                        className="h-12 rounded-2xl border-neutral-200"
                        disabled={submitLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
<Textarea
  placeholder="Gửi lời chúc đến cô dâu chú rể... *"
  value={message}
  onChange={(e) => handleMessageChange(e.target.value)}
  maxLength={MESSAGE_MAX}
  className="min-h-[200px] resize-none rounded-2xl border-neutral-200 text-[15px] leading-6 md:min-h-[220px] md:text-base"
  disabled={submitLoading}
/>

                    <div className="flex items-center justify-between">
                      <p className="text-[11px] text-neutral-400">
                        Tối đa {MESSAGE_MAX} ký tự
                      </p>
                      <p
                        className={`text-[11px] font-medium ${
                          message.length >= MESSAGE_MAX
                            ? "text-amber-600"
                            : "text-neutral-400"
                        }`}
                      >
                        {message.length}/{MESSAGE_MAX}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitLoading}
                    className="h-12 w-full rounded-full text-sm font-medium"
                  >
                    {submitLoading ? "Đang gửi..." : "Gửi lời chúc"}
                  </Button>

                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.995 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{
                          type: "spring",
                          stiffness: 110,
                          damping: 18,
                        }}
                        className="rounded-[1.5rem] border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-4 shadow-sm"
                      >
                        <p className="text-sm font-medium text-neutral-800">
                          💌 Lời chúc của bạn đã được gửi thành công
                        </p>
                        <p className="mt-1 text-sm text-neutral-500">
                          Cảm ơn bạn đã xác nhận tham dự ngày vui của chúng tôi.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="rounded-[1.25rem] border border-red-200 bg-red-50 p-4"
                      >
                        <p className="text-sm text-red-600">{submitError}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="text-xs text-neutral-400">
                    * Vui lòng nhập tên và lời chúc trước khi gửi.
                  </p>
                </form>
              </CardContent>
            </Card>

            <Card className="border-neutral-200/80 bg-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.04)] backdrop-blur-sm md:flex-[0.94]">
              <CardContent className="flex h-full flex-col p-6 md:p-8">
                <div className="mb-5 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                      Wishes
                    </p>
                    <h3 className="mt-1 break-words text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                      Những lời chúc ngọt ngào
                    </h3>
                  </div>

                  {/* <p className="shrink-0 text-xs text-neutral-400 md:text-sm">
                    {totalWishes} lời chúc
                  </p> */}
                </div>

                <div
                  className="relative overflow-hidden"
                  style={{ minHeight: `${WISHES_VIEWPORT_HEIGHT}px` }}
                >
                  {wishesLoading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 2 }).map((_, index) => (
                        <div
                          key={index}
                          className="animate-pulse rounded-[1.75rem] border border-neutral-200/80 bg-neutral-50 p-5"
                          style={{ height: `${WISH_CARD_HEIGHT}px` }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-neutral-200" />
                            <div className="flex-1 space-y-2">
                              <div className="h-4 w-28 rounded bg-neutral-200" />
                              <div className="h-3 w-20 rounded bg-neutral-100" />
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="h-4 w-full rounded bg-neutral-100" />
                            <div className="h-4 w-11/12 rounded bg-neutral-100" />
                            <div className="h-4 w-9/12 rounded bg-neutral-100" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : wishesError ? (
                    <div
                      className="flex items-center justify-center"
                      style={{ minHeight: `${WISHES_VIEWPORT_HEIGHT}px` }}
                    >
                      <div className="w-full rounded-[1.5rem] border border-red-200 bg-red-50 p-5 text-center">
                        <p className="text-sm font-medium text-red-600">
                          Không thể tải lời chúc
                        </p>
                        <p className="mt-1 text-sm text-red-500">{wishesError}</p>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fetchWishes(currentPage)}
                          className="mt-4 rounded-full"
                        >
                          Thử lại
                        </Button>
                      </div>
                    </div>
                  ) : wishes.length === 0 ? (
                    <div
                      className="flex items-center justify-center"
                      style={{ minHeight: `${WISHES_VIEWPORT_HEIGHT}px` }}
                    >
                      <div className="w-full rounded-[1.5rem] border border-dashed border-neutral-200 bg-neutral-50/70 p-6 text-center">
                        <p className="text-sm font-medium text-neutral-700">
                          Chưa có lời chúc nào
                        </p>
                        <p className="mt-1 text-sm text-neutral-500">
                          Hãy là người đầu tiên gửi lời chúc cho cô dâu chú rể 💌
                        </p>
                      </div>
                    </div>
                  ) : (
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={currentPage}
                        initial={{
                          opacity: 0,
                          x: direction > 0 ? 24 : -24,
                          y: 0,
                          scale: 1,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          x: direction > 0 ? -18 : 18,
                          y: 0,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.32,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-0"
                      >
                        <div className="space-y-4">
                          {wishes.map((wish, index) => (
                            <motion.div
                              key={wish.id}
                              initial={{
                                opacity: 0,
                                y: 10,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              transition={{
                                duration: 0.26,
                                delay: index * 0.04,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              <WishCard wish={wish} />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goPrev}
                      disabled={currentPage === 1 || wishesLoading || totalWishes === 0}
                      className="rounded-full border-neutral-200 px-4"
                    >
                      Trước
                    </Button>

                    <div className="flex min-w-0 flex-1 justify-center">
                      <PaginationDots
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onChange={goToPage}
                      />
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={goNext}
                      disabled={
                        currentPage === totalPages || wishesLoading || totalWishes === 0
                      }
                      className="rounded-full border-neutral-200 px-4"
                    >
                      Sau
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}