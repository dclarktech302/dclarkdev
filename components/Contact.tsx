"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    budget: "",
    timeline: "",
    message: ""
  });
  const [sent, setSent] = useState(false);
  const rv = useReveal();

  return (
    <section className="contact-sec" id="contact">
      <div className="container">
        <div ref={rv} className="rv" style={{ marginBottom: "3.5rem" }}>
          <div className="stag">Get in Touch</div>
          <h2 className="section-h">Let's build <em>something great</em></h2>
        </div>
        <div className="contact-grid">
          <div ref={rv} className="rv" style={{ transitionDelay: "0.1s" }}>
            <div className="contact-tagline">Start a conversation</div>
            <p className="contact-text">
              Whether you have a full spec or just an idea on a napkin, I'd love to hear about it.
              I typically respond within 24 hours and offer free discovery calls for new projects.
            </p>
            {[
              ["📍", "Location", "Your City, State"],
              ["📧", "Email", "hello@yoursite.dev"],
              ["⏱️", "Response Time", "Within 24 hours"]
            ].map(([ico, lbl, val]) => (
              <div className="contact-item" key={lbl}>
                <div className="contact-ico">{ico}</div>
                <div>
                  <div className="contact-lbl">{lbl}</div>
                  <div className="contact-val">{val}</div>
                </div>
              </div>
            ))}
          </div>

          <div ref={rv} className="rv" style={{ transitionDelay: "0.2s" }}>
            {sent ? (
              <div className="form-success">
                ◆ MESSAGE RECEIVED<br />
                <span style={{ opacity: 0.7, fontSize: "0.75rem" }}>
                  I'll be in touch within 24 hours.
                </span>
              </div>
            ) : (
              <form className="form" onSubmit={e => {
                e.preventDefault();
                setSent(true);
              }}>
                <div className="form-row">
                  <div className="form-grp">
                    <label className="form-lbl">Your Name *</label>
                    <input
                      className="form-ctrl"
                      required
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="form-grp">
                    <label className="form-lbl">Email Address *</label>
                    <input
                      className="form-ctrl"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-grp">
                    <label className="form-lbl">Project Type</label>
                    <select
                      className="form-ctrl"
                      value={form.type}
                      onChange={e => setForm({ ...form, type: e.target.value })}
                    >
                      <option value="">Select a type</option>
                      {["New Web App", "E-Commerce", "API / Backend", "Redesign / Rebuild", "Consulting", "Other"].map(o => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-grp">
                    <label className="form-lbl">Budget Range</label>
                    <select
                      className="form-ctrl"
                      value={form.budget}
                      onChange={e => setForm({ ...form, budget: e.target.value })}
                    >
                      <option value="">Select a range</option>
                      {["Under $2,500", "$2,500 – $7,500", "$7,500 – $20,000", "$20,000+", "Let's discuss"].map(o => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-grp">
                  <label className="form-lbl">Ideal Timeline</label>
                  <select
                    className="form-ctrl"
                    value={form.timeline}
                    onChange={e => setForm({ ...form, timeline: e.target.value })}
                  >
                    <option value="">When do you need this?</option>
                    {["ASAP (Rush)", "1 – 2 months", "3 – 6 months", "6+ months", "Flexible"].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="form-grp">
                  <label className="form-lbl">Tell me about your project *</label>
                  <textarea
                    className="form-ctrl"
                    required
                    placeholder="Describe your project, goals, and any specific requirements..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="form-submit">
                  <span className="form-submit-lbl">Send Message →</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
