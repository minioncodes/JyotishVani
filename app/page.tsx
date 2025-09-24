import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Horoscope from "@/components/Horoscope";
import Reviews from "@/components/Reviews";
// import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <>
      <header className="bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-700 shadow-2xl">
      <Navbar />
      </header>
      <main className="bg-gradient-to-b from-pink-50 via-yellow-100 to-teal-100 min-h-screen">
      <Hero />
      <About />
      <Contact />
      <Services />
      <Horoscope />
      <Reviews />
      {/* <CTA /> */}
      </main>
      <footer className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-pink-100">
      <Footer />
      </footer>
    </>
  );
}