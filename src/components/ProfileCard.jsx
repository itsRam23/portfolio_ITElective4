import React from "react";
import defaultProfilePic from "../assets/profile.png";
import { getApiBaseUrl } from "../api";

export default function ProfileCard({ name, caption, imageUrl }) {
  const displayName = name || "Rameses Soraya A. Cruz";
  const displayCaption = caption || "Aspiring Data Analyst/Junior Developer • Available OJT Jan 2026";
  let src = defaultProfilePic;
  if (typeof imageUrl === "string" && imageUrl) {
    if (imageUrl.startsWith("/uploads/")) {
      const base = getApiBaseUrl() || "";
      src = base.replace(/\/$/, "") + imageUrl;
    } else {
      src = imageUrl;
    }
  }
  return (
    <div className="card profile-card">
      <img src={src} alt={displayName} className="profile-img" />
      <div className="profile-meta">
        <div className="profile-name">{displayName}</div>
        <div className="profile-caption muted">{displayCaption}</div>
      </div>
    </div>
  );
}
