import React from "react";
import profileImg from "../assets/profile.png";

export default function Header({ brand, navItems }) {
  const text = brand || "Portfolio";
  const items = Array.isArray(navItems) ? navItems : [];
  return (
    <header className="site-header">
      <nav className="navbar container">
        <div className="brand">
          <img src={profileImg} alt="logo" className="logo-img" />
          <span className="logo-text">{text}</span>
        </div>
        <ul className="nav-links">
          {items.map((n) => (
            <li key={n.id}>
              <a href={n.href}>{n.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
