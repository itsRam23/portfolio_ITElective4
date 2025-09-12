import React from "react";

export default function Card({ title, subtitle, children, tags = [], image, actions = null, className = "" }) {
  return (
    <article className={`card ${className}`}>
      {image && <img src={image} alt={title} className="card-img" />}
      <div className="card-content">
        {title && <h4 className="card-title">{title}</h4>}
        {subtitle && <p className="muted card-subtitle">{subtitle}</p>}
        <div className="card-body">{children}</div>
        {tags.length > 0 && (
          <div className="tags">
            {tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        )}
        {actions && <div className="card-actions">{actions}</div>}
      </div>
    </article>
  );
}
