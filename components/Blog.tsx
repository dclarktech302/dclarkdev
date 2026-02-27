"use client";

import { BLOG } from "@/data/portfolioData";
import { useReveal } from "@/hooks/useReveal";

export default function Blog() {
  const rv = useReveal();

  return (
    <section className="blog-sec" id="blog">
      <div className="container">
        <div ref={rv} className="rv" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "3rem"
        }}>
          <div>
            <div className="stag">Writing</div>
            <h2 className="section-h">From the <em>blog</em></h2>
          </div>
          <a href="#" className="btn-b" style={{ padding: "0.6rem 1.4rem", fontSize: "0.6rem" }}>
            All Posts →
          </a>
        </div>
        <div className="blog-grid">
          {BLOG.map((post, i) => (
            <div ref={rv} className="rv blog-card" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="blog-meta">
                <span className="blog-cat">{post.cat}</span>
                <span className="blog-date">{post.date}</span>
              </div>
              <div className="blog-title">{post.title}</div>
              <div className="blog-exc">{post.exc}</div>
              <div className="blog-read">Read more</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
