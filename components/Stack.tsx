"use client";

import { STACK } from "@/data/portfolioData";
import { useReveal } from "@/hooks/useReveal";

export default function Stack() {
  const rv = useReveal();

  return (
    <section className="stack-sec" id="stack">
      <div className="container">
        <div ref={rv} className="rv" style={{ marginBottom: "3.5rem" }}>
          <div className="stag">Tech Stack</div>
          <h2 className="section-h">Tools I <em>work with</em></h2>
        </div>
        <div className="stack-cats">
          {STACK.map((cat, i) => (
            <div ref={rv} className="rv stack-row" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="stack-cat-lbl">{cat.label}</div>
              <div className="stack-badges">
                {cat.items.map(item => (
                  <div className="stack-badge" key={item.n}>
                    <span style={{ fontSize: "0.95rem" }}>{item.i}</span>
                    {item.n}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
