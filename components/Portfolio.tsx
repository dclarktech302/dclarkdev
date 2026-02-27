"use client";

import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Stack from "./Stack";
import Blog from "./Blog";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Portfolio() {
  return (
    <>
      <div className="scanlines" />
      <Navigation />
      <Hero />
      <div className="deco-divider" />
      <About />
      <div className="deco-divider" />
      <Projects />
      <div className="deco-divider" />
      <Stack />
      <div className="deco-divider" />
      <Blog />
      <div className="deco-divider" />
      <Contact />
      <Footer />
    </>
  );
}
