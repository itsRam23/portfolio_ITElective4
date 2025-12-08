import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Admin from "./Admin";
import "./styles/global.css";

const rootElement = document.getElementById("root");
const basename = (import.meta && import.meta.env && import.meta.env.BASE_URL) || "/";

createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
