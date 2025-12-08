import React from "react";
import ProfileCard from "./ProfileCard";

export default function Hero({ hero, profile }) {
  const heading = hero && hero.heading ? hero.heading : "Portfolio";
  const line1 = hero && hero.line1 ? hero.line1 : "";
  const line2 = hero && hero.line2 ? hero.line2 : "";
  return (
    <section id="hero" className="hero container">
      <h1>{heading}</h1>
      {line1 && <p className="muted">{line1}</p>}
      {line2 && <p className="muted">{line2}</p>}
      <ProfileCard name={profile && profile.name} caption={profile && profile.caption} imageUrl={profile && profile.imageUrl} />
    </section>
  );
}
