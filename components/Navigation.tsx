"use client";

import { useState, useEffect } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navLinks = ["About", "Projects", "Stack", "Blog", "Contact"];

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#" className="nav-logo">DEV.FOLIO</a>
        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}>{l}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="nav-cta">
          <span>Hire Me</span>
        </a>
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-nav${menuOpen ? " open" : ""}`}>
        {navLinks.map(l => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
          >
            {l}
          </a>
        ))}
      </div>
    </>
  );
}
