import React from "react";

export default function Contact({ contacts }) {
  const list = Array.isArray(contacts) ? contacts : [];
  return (
    <section id="contact" className="contact container">
      <h3>Contact</h3>
      <p>If you'd like to reach out for OJT, collaborations, or questions:</p>
      <ul className="contact-list">
        {list.map((c) => (
          <li key={c.id}>
            {c.href ? <a href={c.href}>{c.value}</a> : c.value}
          </li>
        ))}
      </ul>
      <p className="small">Available for OJT starting January 2026.</p>
    </section>
  );
}
