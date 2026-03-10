import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function TeamPage() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />

      {/* Next section placeholder for scroll morphing */}
      <section
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(160deg, #1a0a1e 0%, #0d0515 100%)" }}
      >
        <div className="text-center">
          <h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Discover Your Style
          </h2>
          <p className="text-white/50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The next chapter of fashion begins here.
          </p>
        </div>
      </section>
    </main>
  );
}