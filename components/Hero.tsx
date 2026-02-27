import { STARS } from "@/data/portfolioData";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-sky" />

      {/* Stars */}
      <div className="hero-stars">
        {STARS.map(s => (
          <div 
            key={s.id} 
            className="star" 
            style={{ 
              left: `${s.x}%`, 
              top: `${s.y}%`, 
              width: `${s.size}px`, 
              height: `${s.size}px`, 
              "--op": s.op, 
              "--delay": `${s.delay}s`, 
              "--d": `${s.dur}s` 
            } as React.CSSProperties} 
          />
        ))}
      </div>

      <div className="hero-sun" />
      <div className="hero-horizon" />
      <div className="hero-grid">
        <div className="hero-grid-inner" />
      </div>

      {/* Skyline placeholder */}
      <div className="hero-skyline" />

      <div className="hero-content">
        <div className="hero-badge">Available for new projects</div>
        <div className="hero-eyebrow">Full Stack Engineer &amp; Software Architect</div>
        <h1 className="hero-h1">
          <span className="w1">Build</span>
          <span className="w2">Something Great.</span>
        </h1>
        <p className="hero-sub">
          5+ years crafting fast, scalable web apps from database to deployment.
          React, Next.js, Node.js &amp; cloud-native — built for startups &amp; local businesses.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn-a">
            <span>View Projects</span>
          </a>
          <a href="#contact" className="btn-b">Start a Project</a>
        </div>
        <div className="hero-stats">
          {[
            ["5+", "Years Exp."], 
            ["40+", "Projects Shipped"], 
            ["15+", "Happy Clients"], 
            ["99%", "Satisfaction"]
          ].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div className="stat-val">{v}</div>
              <div className="stat-lbl">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-cue">
        <div className="scroll-line" />
        SCROLL
      </div>
    </section>
  );
}
