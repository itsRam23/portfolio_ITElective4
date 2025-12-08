import React, { useEffect, useState } from "react";
import { apiFetch, getApiBaseUrl } from "./api";

function useToken() {
  const [token, setTokenState] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }
    return window.localStorage.getItem("adminToken") || "";
  });

  const setToken = (value) => {
    setTokenState(value);
    if (typeof window !== "undefined") {
      if (value) {
        window.localStorage.setItem("adminToken", value);
      } else {
        window.localStorage.removeItem("adminToken");
      }
    }
  };

  return [token, setToken];
}

export default function Admin() {
  const [token, setToken] = useToken();
  const [loginForm, setLoginForm] = useState({ username: "admin", password: "" });
  
  const [loginShow, setLoginShow] = useState(false);
const [loginError, setLoginError] = useState("");
  const [content, setContent] = useState(null);
  const [status, setStatus] = useState("");
  const [pwForm, setPwForm] = useState({ username: "admin", currentPassword: "", newPassword: "", show: false });
  const toggleShowPw = () => setPwForm((p) => ({ ...p, show: !p.show }));
  
  const submitPasswordChange = () => {
    if (!pwForm.username || !pwForm.currentPassword || !pwForm.newPassword) {
      setStatus("Missing fields");
      return;
    }
    setStatus("Saving...");
    apiFetch("/api/auth/password", {
      method: "PUT",
      body: JSON.stringify({
        username: pwForm.username,
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword
      })
    }, token)
      .then(() => {
        setStatus("Password updated");
        setPwForm({ username: pwForm.username, currentPassword: "", newPassword: "", show: pwForm.show });
      })
      .catch((err) => {
        setStatus(err.message || "Failed");
      });
  };


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }
    setLoading(true);
    apiFetch("/api/content", {}, token)
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        setStatus(err.message || "Failed to load content");
        setLoading(false);
      });
  }, [token]);

  const handleLoginChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setLoginError("");
    apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(loginForm)
    })
      .then((data) => {
        setToken(data.token);
        setStatus("");
      })
      .catch((err) => {
        setLoginError(err.message || "Login failed");
      });
  };

  const handleFieldChange = (section, field, value) => {
    setContent((prev) => {
      const next = { ...(prev || {}) };
      const current = next[section] || {};
      next[section] = { ...current, [field]: value };
      return next;
    });
  };

  const handleArrayItemChange = (section, index, field, value) => {
    setContent((prev) => {
      const base = prev || {};
      const list = Array.isArray(base[section]) ? base[section].slice() : [];
      const item = { ...(list[index] || {}) };
      item[field] = value;
      list[index] = item;
      return { ...base, [section]: list };
    });
  };

  const handleAddArrayItem = (section, template) => {
    setContent((prev) => {
      const base = prev || {};
      const list = Array.isArray(base[section]) ? base[section].slice() : [];
      list.push(template);
      return { ...base, [section]: list };
    });
  };

  const handleRemoveArrayItem = (section, index) => {
    setContent((prev) => {
      const base = prev || {};
      const list = Array.isArray(base[section]) ? base[section].slice() : [];
      list.splice(index, 1);
      return { ...base, [section]: list };
    });
  };

  const handleSave = () => {
    if (!token || !content) {
      return;
    }
    setStatus("Saving...");
    apiFetch(
      "/api/content",
      {
        method: "PUT",
        body: JSON.stringify(content)
      },
      token
    )
      .then(() => {
        setStatus("Saved");
      })
      .catch((err) => {
        setStatus(err.message || "Save failed");
      });
  };

  const handleLogout = () => {
    setToken("");
    setContent(null);
    setStatus("");
  };

  const handleUpload = (event, section, index) => {
    const files = event.target.files;
    if (!files || !files[0] || !token) {
      return;
    }
    const file = files[0];
    const base = getApiBaseUrl();
    const formData = new FormData();
    formData.append("file", file);
    setStatus("Uploading...");
    fetch(base + "/api/upload", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      },
      body: formData
    })
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) {
          throw new Error(text || "Upload failed");
        }
        const data = text ? JSON.parse(text) : null;
        const url = data && data.url ? data.url : "";
        if (url) {
          handleArrayItemChange(section, index, "imageUrl", url);
        }
        setStatus("Upload complete");
      })
      .catch((err) => {
        setStatus(err.message || "Upload failed");
      });
  };

  if (!token) {
    
    return (
      <main className="container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLoginSubmit} className="card">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" value={loginForm.username} onChange={handleLoginChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-button">
              <input id="password" type={loginShow ? "text" : "password"} name="password" value={loginForm.password} onChange={handleLoginChange} />
              <button type="button" className="btn" onClick={()=>setLoginShow(s=>!s)}>{loginShow ? "Hide" : "Show"}</button>
            </div>
          </div>
          {loginError && <p className="error">{loginError}</p>}
          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </main>
    );
  }

  if (loading || !content) {
    return (
      <main className="container">
        <p>Loading content...</p>
      </main>
    );
  }

  const header = content.header || {};
  const hero = content.hero || {};
  const profile = content.profile || {};
  const about = content.about || {};
  const projects = content.projects || [];
  const experiences = content.experiences || [];
  const skills = content.skills || [];
  const contacts = content.contacts || [];

  return (
    <main className="container">
      <h2>Admin Panel</h2>
      <p className="small">You can edit the portfolio content here.</p>
      <div className="admin-actions">
        <button className="btn" type="button" onClick={handleSave}>
          Save changes
        </button>
        <button className="btn" type="button" onClick={handleLogout}>
          Logout
        </button>
        {status && (
          <span className="muted status-text">
            {status}
          </span>
        )}
      </div>

      
      <section className="admin-section">
        <h3>Account</h3>
        <div className="form-group">
          <label>Username</label>
          <input
            value={pwForm.username || "admin"}
            onChange={(e)=>setPwForm((p)=>({...p, username:e.target.value}))}
            placeholder="admin"
          />
        </div>
        <div className="form-group">
          <label>Current password</label>
          <input
            type={pwForm.show ? "text" : "password"}
            value={pwForm.currentPassword}
            onChange={(e)=>setPwForm((p)=>({...p, currentPassword:e.target.value}))}
          />
        </div>
        <div className="form-group">
          <label>New password</label>
          <input
            type={pwForm.show ? "text" : "password"}
            value={pwForm.newPassword}
            onChange={(e)=>setPwForm((p)=>({...p, newPassword:e.target.value}))}
          />
        </div>
        <div className="admin-actions">
          <button className="btn" type="button" onClick={toggleShowPw}>{pwForm.show ? "Hide" : "Show"}</button>
          <button className="btn" type="button" onClick={submitPasswordChange}>Change password</button>
        </div>
      </section>
<section className="admin-section">
        <h3>Header</h3>
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            id="brand"
            value={header.brand || ""}
            onChange={(event) => handleFieldChange("header", "brand", event.target.value)}
          />
        </div>
      </section>

      <section className="admin-section">
        <h3>Hero</h3>
        <div className="form-group">
          <label htmlFor="hero-heading">Heading</label>
          <input
            id="hero-heading"
            value={hero.heading || ""}
            onChange={(event) => handleFieldChange("hero", "heading", event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hero-line1">Line 1</label>
          <input
            id="hero-line1"
            value={hero.line1 || ""}
            onChange={(event) => handleFieldChange("hero", "line1", event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hero-line2">Line 2</label>
          <input
            id="hero-line2"
            value={hero.line2 || ""}
            onChange={(event) => handleFieldChange("hero", "line2", event.target.value)}
          />
        </div>
      </section>

      <section className="admin-section">
        <h3>Profile</h3>
        <div className="form-group">
          <label htmlFor="profile-name">Name</label>
          <input
            id="profile-name"
            value={profile.name || ""}
            onChange={(event) => handleFieldChange("profile", "name", event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="profile-caption">Caption</label>
          <input
            id="profile-caption"
            value={profile.caption || ""}
            onChange={(event) => handleFieldChange("profile", "caption", event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="profile-imageUrl">Image URL</label>
          <input
            id="profile-imageUrl"
            value={profile.imageUrl || ""}
            onChange={(event) => handleFieldChange("profile", "imageUrl", event.target.value)}
          />
        </div>
      </section>

      <section className="admin-section">
        <h3>About</h3>
        <div className="form-group">
          <label htmlFor="about-paragraphs">Paragraphs (one per line)</label>
          <textarea
            id="about-paragraphs"
            value={(about.paragraphs || []).join("\n")}
            onChange={(event) =>
              handleFieldChange("about", "paragraphs", event.target.value.split("\n"))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="about-education">Education</label>
          <input
            id="about-education"
            value={about.education || ""}
            onChange={(event) => handleFieldChange("about", "education", event.target.value)}
          />
        </div>
      </section>

      <section className="admin-section">
        <h3>Projects</h3>
        {projects.map((p, index) => (
          <div key={p.id || index} className="card admin-card">
            <div className="form-group">
              <label>Id</label>
              <input
                value={p.id || ""}
                onChange={(event) => handleArrayItemChange("projects", index, "id", event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                value={p.title || ""}
                onChange={(event) => handleArrayItemChange("projects", index, "title", event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <input
                value={p.subtitle || ""}
                onChange={(event) => handleArrayItemChange("projects", index, "subtitle", event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Summary</label>
              <textarea
                value={p.summary || ""}
                onChange={(event) => handleArrayItemChange("projects", index, "summary", event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Tags (comma separated)</label>
              <input
                value={(p.tags || []).join(", ")}
                onChange={(event) =>
                  handleArrayItemChange(
                    "projects",
                    index,
                    "tags",
                    event.target.value.split(",").map((t) => t.trim()).filter((t) => t.length > 0)
                  )
                }
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                value={p.imageUrl || ""}
                onChange={(event) => handleArrayItemChange("projects", index, "imageUrl", event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Upload image</label>
              <input type="file" onChange={(event) => handleUpload(event, "projects", index)} />
            </div>
            <button
              className="btn"
              type="button"
              onClick={() => handleRemoveArrayItem("projects", index)}
            >
              Remove project
            </button>
          </div>
        ))}
        <button
          className="btn"
          type="button"
          onClick={() =>
            handleAddArrayItem("projects", {
              id: "",
              title: "",
              subtitle: "",
              summary: "",
              tags: [],
              imageUrl: ""
            })
          }
        >
          Add project
        </button>
      </section>

      <section className="admin-section">
        <h3>Experience</h3>
        {experiences.map((ex, index) => (
          <div key={ex.id || index} className="card admin-card">
            <div className="form-group">
              <label>Id</label>
              <input
                value={ex.id || ""}
                onChange={(event) => handleArrayItemChange("experiences", index, "id", event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                value={ex.title || ""}
                onChange={(event) => handleArrayItemChange("experiences", index, "title", event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <input
                value={ex.subtitle || ""}
                onChange={(event) => handleArrayItemChange("experiences", index, "subtitle", event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Summary</label>
              <textarea
                value={ex.summary || ""}
                onChange={(event) => handleArrayItemChange("experiences", index, "summary", event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Tags (comma separated)</label>
              <input
                value={(ex.tags || []).join(", ")}
                onChange={(event) =>
                  handleArrayItemChange(
                    "experiences",
                    index,
                    "tags",
                    event.target.value.split(",").map((t) => t.trim()).filter((t) => t.length > 0)
                  )
                }
              />
            </div>
            <button
              className="btn"
              type="button"
              onClick={() => handleRemoveArrayItem("experiences", index)}
            >
              Remove experience
            </button>
          </div>
        ))}
        <button
          className="btn"
          type="button"
          onClick={() =>
            handleAddArrayItem("experiences", {
              id: "",
              title: "",
              subtitle: "",
              summary: "",
              tags: []
            })
          }
        >
          Add experience
        </button>
      </section>

      <section className="admin-section">
        <h3>Skills</h3>
        {skills.map((g, index) => (
          <div key={g.group || index} className="card admin-card">
            <div className="form-group">
              <label>Group</label>
              <input
                value={g.group || ""}
                onChange={(event) => handleArrayItemChange("skills", index, "group", event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Items (comma separated)</label>
              <input
                value={(g.items || []).join(", ")}
                onChange={(event) =>
                  handleArrayItemChange(
                    "skills",
                    index,
                    "items",
                    event.target.value.split(",").map((t) => t.trim()).filter((t) => t.length > 0)
                  )
                }
              />
            </div>
            <button
              className="btn"
              type="button"
              onClick={() => handleRemoveArrayItem("skills", index)}
            >
              Remove skill group
            </button>
          </div>
        ))}
        <button
          className="btn"
          type="button"
          onClick={() =>
            handleAddArrayItem("skills", {
              group: "",
              items: []
            })
          }
        >
          Add skill group
        </button>
      </section>

      <section className="admin-section">
        <h3>Contacts</h3>
        {contacts.map((c, index) => (
          <div key={c.id || index} className="card admin-card">
            <div className="form-group">
              <label>Id</label>
              <input
                value={c.id || ""}
                onChange={(event) => handleArrayItemChange("contacts", index, "id", event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Label</label>
              <input
                value={c.label || ""}
                onChange={(event) => handleArrayItemChange("contacts", index, "label", event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Value</label>
              <input
                value={c.value || ""}
                onChange={(event) => handleArrayItemChange("contacts", index, "value", event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Href</label>
              <input
                value={c.href || ""}
                onChange={(event) => handleArrayItemChange("contacts", index, "href", event.target.value)}
              />
            </div>
            <button
              className="btn"
              type="button"
              onClick={() => handleRemoveArrayItem("contacts", index)}
            >
              Remove contact
            </button>
          </div>
        ))}
        <button
          className="btn"
          type="button"
          onClick={() =>
            handleAddArrayItem("contacts", {
              id: "",
              label: "",
              value: "",
              href: ""
            })
          }
        >
          Add contact
        </button>
      </section>
    </main>
  );
}
