import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TeamGrid from "@/components/TeamGrid";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <TeamGrid />

      {/* Next section that the mentor grid scrolls to after the fall animation */}
      <section
        id="next-section"
        className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f7]"
      >
        <div className="w-full max-w-6xl px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-2 mb-10">
            <div className="h-64 md:h-80 rounded-3xl bg-neutral-200" />
            <div className="h-64 md:h-80 rounded-3xl bg-neutral-200" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <div className="h-32 rounded-2xl bg-neutral-200" />
            <div className="h-32 rounded-2xl bg-neutral-200" />
            <div className="h-32 rounded-2xl bg-neutral-200" />
            <div className="h-32 rounded-2xl bg-neutral-200" />
            <div className="h-32 rounded-2xl bg-neutral-200" />
          </div>
        </div>
      </section>
    </main>
  );
}