"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const storyItems = [
  {
    year: "2022",
    title: "Lần đầu gặp gỡ",
    desc: "Chúng tôi gặp nhau trong một ngày rất bình thường, nhưng lại mở ra một câu chuyện không hề bình thường.",
  },
  {
    year: "2023",
    title: "Những chuyến đi đầu tiên",
    desc: "Từ những buổi cà phê đến những chuyến đi xa, chúng tôi hiểu rằng mình muốn đi cùng nhau lâu hơn nữa.",
  },
  {
    year: "2026",
    title: "Lời hứa trọn đời",
    desc: "Và giờ đây, chúng tôi muốn cùng nhau bước sang một chương mới – có gia đình, có yêu thương, có bạn bè chứng kiến.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut" as const,
    },
  },
};

export function StorySection() {
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
          className="max-w-2xl space-y-3"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Our Story
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
            Câu chuyện của chúng tôi
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
            className="absolute left-[18px] top-2 bottom-2 w-px origin-top bg-neutral-200"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          <motion.div
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {storyItems.map((item) => (
              <motion.div
                key={item.year}
                variants={itemVariants}
                className="relative pl-12"
              >
                {/* dot */}
                <div className="absolute left-[10px] top-6 h-4 w-4 rounded-full border border-white bg-neutral-800 shadow-md" />

                <Card className="rounded-3xl border-neutral-200 bg-white/90 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="space-y-4 p-6">
                    <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                      {item.year}
                    </p>
                    <h3 className="text-xl font-semibold text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-7 text-neutral-600">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* DESKTOP: timeline ngang */}
        <div className="relative hidden md:block">
          {/* line ngang */}
          <motion.div
            className="absolute left-[12%] right-[12%] top-10 h-px origin-left bg-neutral-200"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />

          <motion.div
            className="grid gap-6 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {storyItems.map((item) => (
              <motion.div key={item.year} variants={itemVariants} className="relative">
                {/* dot trên line */}
                <div className="mb-6 flex justify-center">
                  <div className="relative z-10 h-5 w-5 rounded-full border-4 border-white bg-neutral-800 shadow-md" />
                </div>

                <Card className="rounded-[2rem] border-neutral-200 bg-white/90 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <CardContent className="space-y-4 p-7">
                    <p className="text-sm uppercase tracking-[0.25em] text-neutral-400 transition-colors duration-300 group-hover:text-neutral-500">
                      {item.year}
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 md:text-2xl">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-7 text-neutral-600 md:text-[15px]">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}