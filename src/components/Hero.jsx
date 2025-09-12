import React from "react";
import ProfileCard from "./ProfileCard";

export default function Hero() {
  return (
    <section id="hero" className="hero container">
      <h1>Hello, I’m Rameses Soraya A. Cruz</h1>
      <p className="muted">
        Aspiring Data Analyst · Fourth-Year BSIT Student. 
        I turn messy data into clear stories — strong with Excel & Access; learning SQL and Power BI.
      </p>
      <p className="muted">
        Malolos City, Bulacan · <a href="tel:09668470711">0966-847-0711</a> ·{" "}
        <a href="mailto:ramcruz.mail@gmail.com">ramcruz.mail@gmail.com</a>
      </p>

      <ProfileCard caption="Aspiring Data Analyst • Available OJT Jan 2026" />
    </section>
  );
}
