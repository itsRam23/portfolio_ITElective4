import React from "react";
import profilePic from "../assets/profile.png";

export default function ProfileCard({ caption = "Aspiring Data Analyst/Junior Developer • Available OJT Jan 2026" }) {
  return (
    <div className="card profile-card">
      <img src={profilePic} alt="Rameses Soraya A. Cruz" className="profile-img" />
      <div className="profile-meta">
        <div className="profile-name">Rameses Soraya A. Cruz</div>
        <div className="profile-caption muted">{caption}</div>
      </div>
    </div>
  );
}
