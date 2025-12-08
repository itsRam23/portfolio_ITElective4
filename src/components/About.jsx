import React from "react";

export default function About({ about }) {
  const paragraphs = about && Array.isArray(about.paragraphs) ? about.paragraphs : [];
  const education = about && about.education;
  return (
    <section id="about" className="about container">
      <div className="card">
        <h3>About</h3>
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
        {education && <p className="small">{education}</p>}
      </div>
    </section>
  );
}
