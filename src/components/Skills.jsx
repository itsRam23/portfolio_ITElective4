// src/components/Skills.jsx
import React from "react";

export default function Skills() {
  return (
    <section id="skills" className="skills container">
      <h3>Skills</h3>

      <div className="skill-groups">
        <div className="skill-group">
          <h4>Data & Tools</h4>
          <ul>
            <li>Microsoft Excel — Advanced (PivotTables, formulas)</li>
            <li>Microsoft Access — Relational design & reporting</li>
            <li>Power BI — learning / in progress</li>
            <li>SQL — querying basics</li>
          </ul>
        </div>

        <div className="skill-group">
          <h4>Programming & Web</h4>
          <ul>
            <li>HTML, CSS, React (basic)</li>
            <li>Python, Java, C# — introductory</li>
          </ul>
        </div>

        <div className="skill-group">
          <h4>Soft Skills</h4>
          <ul>
            <li>Analytical mindset • Fast learner • Teamwork • Time management </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
