"use client";

import { Button } from "@/components/ui/button";

type OpeningOverlayProps = {
  open: boolean;
  onOpen: () => void;
};

export function OpeningOverlay({ open, onOpen }: OpeningOverlayProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f8f4ef] px-6">
      <div className="w-full max-w-xl rounded-3xl border border-neutral-200 bg-white/80 p-8 text-center shadow-sm backdrop-blur-sm md:p-12">
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 md:text-sm">
          Wedding Invitation
        </p>

        <h1 className="mt-6 font-serif text-3xl text-neutral-900 md:text-5xl">
          Trân Trọng Kính Mời
        </h1>

        <p className="mt-4 text-sm text-neutral-600 md:text-base">
          Hãy mở thiệp để cùng chúng mình bước vào khoảnh khắc đặc biệt này.
        </p>

        <Button
          onClick={onOpen}
          className="mt-8 rounded-full px-8 py-6 text-sm uppercase tracking-[0.2em]"
        >
          Mở Thiệp
        </Button>
      </div>
    </div>
  );
}