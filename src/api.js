export function getApiBaseUrl() {
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (typeof window !== "undefined" && window.location && window.location.hostname === "localhost" && window.location.port === "5173") {
    return "http://localhost:5000";
  }
  return "";
}

export function apiFetch(path, options = {}, token) {
  const base = getApiBaseUrl();
  const url = base + path;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };
  if (token) {
    headers.Authorization = "Bearer " + token;
  }
  return fetch(url, {
    ...options,
    headers
  }).then(async (res) => {
    const text = await res.text();
    if (!res.ok) {
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        data = null;
      }
      const message = data && data.error ? data.error : "Request failed";
      if (res.status === 401) {
        try { localStorage.removeItem("token"); } catch (e) {}
        if (typeof window !== "undefined") { window.location.reload(); }
      }
      throw new Error(message);
    }
    return text ? JSON.parse(text) : null;
  });
}
