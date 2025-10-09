import React from "react";
import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Quote from "./components/Quote";
import Contact from "./components/Contact";
import "./styles/global.css";

export default function App() {
  return (
    <div>
      <Header />
      <main className="container">
        <section
          id="hero"
          className="hero container"
          style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}
        >
          <ProfileCard />
          <div>
            <h1>Hi — I'm Rameses</h1>
            <p className="muted">Aspiring Data Analyst / Junior Developer</p>
          </div>
        </section>
        <Projects />
        <Experience />
        <Skills />
        <Quote />
        <Contact />
      </main>
    </div>
  );
}
