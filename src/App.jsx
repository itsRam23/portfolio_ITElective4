// src/App.jsx
import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import "./styles/global.css";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

export default function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Resume />
        <Contact />

        <section className="container" style={{ textAlign: "center", padding: "2rem 0" }}>
          <h3>Vite + React Starter</h3>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <a href="https://vite.dev" target="_blank" rel="noreferrer">
              <img src={viteLogo} className="logo" alt="Vite logo" width={60} />
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              <img src={reactLogo} className="logo react" alt="React logo" width={60} />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer container">
        © {new Date().getFullYear()} Rameses Cruz — Aspiring Data Analyst
      </footer>
    </div>
  );
}
