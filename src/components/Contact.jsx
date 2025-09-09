// src/components/Contact.jsx
import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="contact container">
      <h3>Contact</h3>
      <p>If you'd like to reach out for OJT, collaborations, or questions:</p>

      <ul className="contact-list">
        <li>Email: <a href="mailto:ramcruz.mail@gmail.com">ramcruz.mail@gmail.com</a></li>
        <li>Phone: <a href="tel:09668470711">0966-847-0711</a></li>
        <li>Location: Malolos City, Bulacan</li>
      </ul>

      <p className="small">Available for OJT starting January 2026. </p>
    </section>
  );
}
