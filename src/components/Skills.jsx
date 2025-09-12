import React from "react";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="skills container">
      <h3>Skills</h3>
      <div className="grid skills-grid">
        {skillGroups.map((g) => (
          <div key={g.group} className="card skill-card">
            <h4>{g.group}</h4>
            <ul>
              {g.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
