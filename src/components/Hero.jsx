// src/components/Hero.jsx
import React from "react";

export default function Hero() {
  return (
    <section id="hero" className="hero container">
      <div className="hero-left">
        <h2>Hello, I’m <span className="accent">Rameses Soraya A. Cruz</span></h2>
        <p className="lead">
          Aspiring Data Analyst · Fourth-Year BSIT Student. I turn messy data into clear stories — strong with Excel & Access; learning SQL and Power BI.
        </p>

        <p className="meta">
          Malolos City, Bulacan • <a href="tel:09668470711">0966-847-0711</a> •
          <a href="mailto:ramcruz.mail@gmail.com"> ramcruz.mail@gmail.com</a>
        </p>

        <div className="cta-row">
          <a className="btn" href="#projects">View Projects</a>
          <a className="btn secondary" href="#resume">Resume</a>
        </div>
      </div>

      <div className="hero-right">
        <div className="profile-card">
          <div className="profile-initials">Ram Cruz</div>
          <p className="profile-caption">Aspiring Data Analyst • Available OJT Jan 2026</p>
        </div>
      </div>
    </section>
  );
}
