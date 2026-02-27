"use client";

import { TIMELINE } from "@/data/portfolioData";
import { useReveal } from "@/hooks/useReveal";

export default function About() {
  const rv = useReveal();

  return (
    <section className="about-sec" id="about">
      <div className="container">
        <div className="about-grid">
          <div ref={rv} className="rv">
            <div style={{ marginBottom: "2rem" }}>
              <div className="stag">About Me</div>
              <h2 className="section-h">Turning <em>ideas</em> into<br />production</h2>
            </div>
            <p className="about-bio">
              I'm a <strong>full stack engineer with 5+ years of experience</strong> building apps that are fast, accessible, and architected to scale. From MVP to enterprise, I handle the full stack — frontend, backend, database, and deployment.
            </p>
            <p className="about-bio" style={{ marginTop: "1rem" }}>
              I work with <strong>startups, agencies, and local businesses</strong> who need more than a template. If you need a custom solution built right the first time, let's talk.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
              <a href="#contact" className="btn-a">
                <span>Get in Touch</span>
              </a>
              <a href="#" className="btn-b">Download CV</a>
            </div>
          </div>

          <div ref={rv} className="rv" style={{ transitionDelay: "0.15s" }}>
            <div className="stag" style={{ marginBottom: "1.8rem" }}>Experience</div>
            <div className="timeline">
              {TIMELINE.map((t, i) => (
                <div className="tl-item" key={i}>
                  <div className={`tl-dot${t.active ? " active" : ""}`} />
                  <div className="tl-period">{t.period}</div>
                  <div className="tl-role">{t.role}</div>
                  <div className="tl-company">{t.company}</div>
                  <div className="tl-desc">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
