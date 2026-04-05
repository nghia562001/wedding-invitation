"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const galleryImages = [
  "/images/DSC05551.jpg",
  "/images/DSC05659.jpg",
  "/images/DSC05662.jpg",
  "/images/DSC05629.jpg",
];

type RevealDirection = "left" | "right" | "up";

type GalleryImageProps = {
  src: string;
  alt: string;
  className: string;
  direction?: RevealDirection;
  priority?: boolean;
  hero?: boolean;
  objectPosition?: string;
};

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

function GalleryImage({
  src,
  alt,
  className,
  direction = "up",
  priority = false,
  hero = false,
  objectPosition = "object-center",
}: GalleryImageProps) {
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
      {/* overlay cinematic nhẹ */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/8 via-transparent to-white/5 opacity-80 transition-opacity duration-1000 group-hover:opacity-100" />

      {/* ring nhẹ */}
      <div className="pointer-events-none absolute inset-0 z-10 ring-1 ring-black/5 transition-all duration-1000 group-hover:ring-black/10" />

      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          className={`object-cover ${objectPosition} transition-all duration-1000 ease-out will-change-transform group-hover:scale-[1.02] group-hover:brightness-[1.02]`}
        />
      </div>
    </motion.div>
  );
}

export function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden px-6 py-16 md:px-10 md:py-24"
    >
      {/* background glow nhẹ */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-44 w-44 -translate-x-1/2 rounded-full bg-neutral-200/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl space-y-10 md:space-y-14">
        {/* Heading */}
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
          className="max-w-2xl space-y-3"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Gallery
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
            Khoảnh khắc đáng nhớ
          </h2>

          <p className="text-neutral-600 md:text-lg">
            Những khoảnh khắc nhỏ bé nhưng chất chứa thật nhiều yêu thương trên
            hành trình của chúng tôi.
          </p>
        </motion.div>

        {/* MOBILE LAYOUT */}
        <div className="space-y-4 md:hidden">
          <GalleryImage
            src={galleryImages[0]}
            alt="Gallery 1"
            className="aspect-[4/5] rounded-[2rem]"
            direction="left"
            priority
            hero
          />

          <div className="grid grid-cols-2 gap-4">
            <GalleryImage
              src={galleryImages[1]}
              alt="Gallery 2"
              className="aspect-[4/5] rounded-[1.5rem]"
              direction="left"
            />
            <GalleryImage
              src={galleryImages[2]}
              alt="Gallery 3"
              className="aspect-[4/5] rounded-[1.5rem]"
              direction="right"
            />
          </div>

          <GalleryImage
            src={galleryImages[3]}
            alt="Gallery 4"
            className="aspect-[5/4] rounded-[2rem]"
            direction="up"
          />
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden gap-4 md:grid md:grid-cols-2 md:gap-5">
          <GalleryImage
            src={galleryImages[0]}
            alt="Gallery 1"
            className="aspect-[4/5] rounded-[2rem]"
            direction="left"
            priority
            hero
          />
          <GalleryImage
            src={galleryImages[1]}
            alt="Gallery 2"
            className="aspect-[5/4] rounded-[2rem]"
            direction="right"
          />
          <GalleryImage
            src={galleryImages[2]}
            alt="Gallery 3"
            className="aspect-[5/4] rounded-[2rem]"
            direction="left"
          />
          <GalleryImage
            src={galleryImages[3]}
            alt="Gallery 4"
            className="aspect-[4/5] rounded-[2rem]"
            direction="right"
          />
        </div>
      </div>
    </section>
  );
}