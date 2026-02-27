"use client";

import { PROJECTS } from "@/data/portfolioData";
import { useReveal } from "@/hooks/useReveal";

export default function Projects() {
  const rv = useReveal();

  return (
    <section className="projects-sec" id="projects">
      <div className="container">
        <div ref={rv} className="rv" style={{ marginBottom: "3rem" }}>
          <div className="stag">Recent Work</div>
          <h2 className="section-h">Projects I've <em>shipped</em></h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div ref={rv} className="rv proj-card" key={i} style={{ transitionDelay: `${i * 0.07}s` }}>
              <div className="proj-thumb">
                <span className="proj-thumb-icon">{p.icon}</span>
                <div className="proj-thumb-grad" />
                <div className="proj-thumb-grid" />
              </div>
              <div className="proj-body">
                <div className="proj-tags">
                  {p.tags.map(([n, c]) => (
                    <span key={n} className={`proj-tag tag-${c}`}>{n}</span>
                  ))}
                </div>
                <div className="proj-name">{p.name}</div>
                <div className="proj-desc">{p.desc}</div>
                <div className="proj-links">
                  <a href="#" className="proj-link">↗ Live Demo</a>
                  <a href="#" className="proj-link">⌥ Source</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
