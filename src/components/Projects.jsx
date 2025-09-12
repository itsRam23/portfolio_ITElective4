import React from "react";
import Card from "./Card";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="projects container">
      <h3>Projects</h3>
      <div className="project-list grid">
        {projects.map((p) => (
          <Card
            key={p.id}
            title={p.title}
            subtitle={p.subtitle}
            tags={p.tags}
            image={p.image}
            className="project-card"
            actions={p.link ? <a className="btn" href={p.link} target="_blank" rel="noreferrer">View</a> : null}
          >
            <p className="muted">{p.summary}</p>
          </Card>
        ))}
      </div>
      <p className="small">More details available on request.</p>
    </section>
  );
}
