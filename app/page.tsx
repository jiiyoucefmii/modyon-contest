"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ContestForm from "./components/ContestForm";
import FAQ from "./components/FAQ";
import IntroOverlay from "./components/IntroOverlay";
import HowItWorks from "./components/HowItWorks";
import Prizes from "./components/Prizes";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  const handleReveal = () => {
    setShowContent(true);
  };

  return (
    <main>
      {!showContent && <IntroOverlay onReveal={handleReveal} />}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.8s ease-in",
        }}
      >
        <Navbar />
        <Hero />
        <HowItWorks />
        <ContestForm />
        <Prizes />
        <FAQ />
      </div>
    </main>
  );
}
