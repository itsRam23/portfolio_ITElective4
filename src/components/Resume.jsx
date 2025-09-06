// src/components/Resume.jsx
import React, { useRef, useState, useEffect } from "react";

export default function Resume() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // cleanup object URL when unmounted or file changes
    return () => {
      if (preview && preview.url) URL.revokeObjectURL(preview.url);
    };
  }, [preview]);

  function handleFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    // ensure it's a PDF
    if (f.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }
    const url = URL.createObjectURL(f);
    setPreview({ file: f, url });
  }

  return (
    <section id="resume" className="resume container">
      <h3>Resume</h3>

      <div className="resume-actions">
        <button className="btn" onClick={() => fileInputRef.current.click()}>
          Upload Resume (local preview)
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      <div className="pdf-viewer">
        {preview ? (
          <iframe
            src={preview.url}
            title="Resume preview"
            width="100%"
            height="640"
            style={{ border: "1px solid #e6e9ef", borderRadius: 8 }}
          />
        ) : (
          <div style={{ padding: "1rem" }}>
            <p className="muted">No resume uploaded. Click "Upload Resume" to preview a PDF from your device.</p>
            <p className="small">If you later want the resume hosted online (so visitors can open it directly), we can add hosting steps.</p>
          </div>
        )}
      </div>
    </section>
  );
}
