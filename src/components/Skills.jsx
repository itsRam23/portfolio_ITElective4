import React from "react";

export default function Skills({ skills }) {
  const groups = Array.isArray(skills) ? skills : [];
  return (
    <section id="skills" className="skills container">
      <h3>Skills</h3>
      <div className="grid skills-grid">
        {groups.map((g) => (
          <div key={g.group} className="card skill-card">
            <h4>{g.group}</h4>
            <ul>
              {(g.items || []).map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
