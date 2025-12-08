import React from "react";
import Card from "./Card";

export default function Experience({ experiences }) {
  const list = Array.isArray(experiences) ? experiences : [];
  return (
    <section id="experience" className="experience container">
      <h3>Experience & Projects</h3>
      <div className="grid">
        {list.map((ex) => (
          <Card
            key={ex.id}
            title={ex.title}
            subtitle={ex.subtitle}
            tags={Array.isArray(ex.tags) ? ex.tags : []}
          >
            <p>{ex.summary}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
