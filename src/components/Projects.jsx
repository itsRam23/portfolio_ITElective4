// src/components/Projects.jsx
import React from "react";

const projects = [
  {
    title: "Student Grades Dashboard",
    summary: "PivotTables, formulas & visualization in Excel to track student performance.",
    tags: ["Excel", "PivotTables"]
  },
  {
    title: "Sales Database",
    summary: "Relational tables in Access with monthly summaries and exports.",
    tags: ["Access", "Reports"]
  },
  {
    title: "SQL Data Exploration",
    summary: "Queries to extract insights from sample datasets.",
    tags: ["SQL"]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="projects container">
      <h3>Projects</h3>
      <div className="project-list">
        {projects.map((p, i) => (
          <div key={i} className="project-card">
            <h4>{p.title}</h4>
            <p className="muted">{p.summary}</p>
            <div className="tags">
              {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
      <p className="small">More details available on request.</p>
    </section>
  );
}
