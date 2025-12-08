import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Quote from "./components/Quote";
import Contact from "./components/Contact";
import About from "./components/About";
import Hero from "./components/Hero";
import { apiFetch } from "./api";
import contentDefault from "./content-default";
import "./styles/global.css";

export default function App() {
  const [content, setContent] = useState(null);
  const [status, setStatus] = useState("Loading portfolio...");

  useEffect(() => {
    let cancelled = false;
    apiFetch("/api/content")
      .then((data) => {
        if (cancelled) {
          return;
        }
        setContent(data);
        setStatus("");
      })
      .catch(() => {
        if (cancelled) {
          return;
        }
        setContent(contentDefault);
        setStatus("");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!content) {
    return (
      <main className="container">
        <p>{status}</p>
      </main>
    );
  }

  const header = content.header || {};
  const hero = content.hero || {};
  const profile = content.profile || {};
  const about = content.about || {};
  const projects = content.projects || [];
  const experiences = content.experiences || [];
  const skills = content.skills || [];
  const contacts = content.contacts || [];

  return (
    <div>
      <Header brand={header.brand} navItems={header.navItems} />
      <main className="container">
        <Hero hero={hero} profile={profile} />
        <About about={about} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Skills skills={skills} />
        <Quote />
        <Contact contacts={contacts} />
      </main>
    </div>
  );
}
