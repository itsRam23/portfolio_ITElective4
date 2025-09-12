import React from "react";
import profilePic from "../assets/profile.png";

export default function ProfileCard({ caption = "Aspiring Data Analyst" }) {
  return (
    <div className="profile-card">
      <img src={profilePic} alt="profile" className="profile-img" />
      <p className="profile-caption">{caption}</p>
    </div>
  );
}
