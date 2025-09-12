import React from "react";
import profileImg from "../assets/profile.png";
import { navItems } from "../data/nav";

export default function Header() {
  return (
    <header className="site-header">
      <nav className="navbar container">
        <div className="brand">
          <img src={profileImg} alt="logo" className="logo-img" />
          <span className="logo-text">Rameses Cruz</span>
        </div>
        <ul className="nav-links">
          {navItems.map((n) => (
            <li key={n.id}><a href={n.href}>{n.label}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
