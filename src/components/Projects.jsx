import React from "react";
import Card from "./Card";
import { projects as staticProjects } from "../data/projects";
import { getApiBaseUrl } from "../api";

export default function Projects(props) {
  const fromProps = props && Array.isArray(props.projects) && props.projects.length > 0 ? props.projects : null;
  const list = fromProps || staticProjects;

  const buildImage = (p, index) => {
    const fallback = staticProjects[index] || {};
    let img = fallback.image;
    if (p && typeof p.imageUrl === "string" && p.imageUrl) {
      if (p.imageUrl.startsWith("/uploads/")) {
        const base = getApiBaseUrl() || "";
        img = base.replace(/\/$/, "") + p.imageUrl;
      } else {
        img = p.imageUrl;
      }
    }
    return img;
  };

  return (
    <section id="projects" className="projects container">
      <h3>Projects</h3>
      <div className="project-list grid">
        {list.map((p, index) => {
          const fallback = staticProjects[index] || {};
          const title = (p && p.title) || fallback.title;
          const subtitle = (p && p.subtitle) || fallback.subtitle;
          const tags = (p && p.tags) || fallback.tags || [];
          const summary = (p && p.summary) || fallback.summary;
          const link = (p && p.link) || fallback.link || null;
          const image = buildImage(p, index);
          const id = (p && p.id) || fallback.id || index;
          return (
            <Card
              key={id}
              title={title}
              subtitle={subtitle}
              tags={tags}
              image={image}
              className="project-card"
              actions={
                link ? (
                  <a className="btn" href={link} target="_blank" rel="noreferrer">
                    View
                  </a>
                ) : null
              }
            >
              {summary && <p className="muted">{summary}</p>}
            </Card>
          );
        })}
      </div>
      <p className="small">More details available on request.</p>
    </section>
  );
}
