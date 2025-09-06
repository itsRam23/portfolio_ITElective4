// src/components/Header.jsx
import React from "react";
import logo from "../assets/react.svg";

export default function Header() {
  return (
    <header className="site-header">
      <nav className="navbar container">
        <div className="brand">
          <img src={logo} alt="logo" className="logo-img" />
          <span className="logo-text">Rameses Cruz</span>
        </div>

        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#resume">Resume</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
