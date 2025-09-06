// src/components/Experience.jsx
import React from "react";

export default function Experience() {
  return (
    <section id="experience" className="experience container">
      <h3>Experience & Projects</h3>

      <div className="grid">
        <article className="card">
          <h4>Student Grades Dashboard</h4>
          <p className="muted">Excel — pivot tables & analysis</p>
          <p>Analyzed student performance using PivotTables and formulas to highlight trends and outliers.</p>
        </article>

        <article className="card">
          <h4>Sales Database (Access + Excel)</h4>
          <p className="muted">Database design & reporting</p>
          <p>Built relational tables in Access and created monthly summaries/exportable reports in Excel.</p>
        </article>

        <article className="card">
          <h4>SQL Data Exploration</h4>
          <p className="muted">Querying sample datasets</p>
          <p>Used SELECT, JOIN, GROUP BY and filters to extract insights from prepared datasets.</p>
        </article>

        <article className="card">
          <h4>Research Team Lead</h4>
          <p className="muted">Team coordination & reporting</p>
          <p>Led a research team — organized tasks, compiled results, and presented findings.</p>
        </article>
      </div>

      <p className="note">Certifications and dates appear on the resume; list them under Education/Certs when you host it.</p>
    </section>
  );
}
