import React from "react";
import Card from "./Card";
import { experiences } from "../data/experiences";

export default function Experience() {
  return (
    <section id="experience" className="experience container">
      <h3>Experience & Projects</h3>
      <div className="grid">
        {experiences.map((ex) => (
          <Card key={ex.id} title={ex.title} subtitle={ex.subtitle} tags={ex.tags}>
            <p>{ex.summary}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
