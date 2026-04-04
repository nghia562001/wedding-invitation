import { CountdownSection } from "@/components/sections/countdown-section";
import { EventSection } from "@/components/sections/event-section";
import { FooterSection } from "@/components/sections/footer-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { HeroSection } from "@/components/sections/hero-section";
import { RsvpSection } from "@/components/sections/rsvp-section";
import { StorySection } from "@/components/sections/story-section";
import { FloatingMusicControl } from "@/components/sections/FloatingMusicControl";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-neutral-900">
      <HeroSection />
      <StorySection />
      <GallerySection />
      <EventSection />
      <CountdownSection />
      <RsvpSection />
      <FooterSection />
      <FloatingMusicControl/>
    </main>
  );
}

