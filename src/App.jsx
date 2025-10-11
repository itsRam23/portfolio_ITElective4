import React from "react";
import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Quote from "./components/Quote";
import Contact from "./components/Contact";
import About from "./components/About";
import "./styles/global.css";

export default function App() {
  return (
    <div>
      <Header />
      <main className="container">
        <section id="hero" className="hero container" style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
          <ProfileCard />
          <div>
            <h1></h1>
            <p className="muted"></p>
          </div>
        </section>
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Quote />
        <Contact />
      </main>
    </div>
  );
}
