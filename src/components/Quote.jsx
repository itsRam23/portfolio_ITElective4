import React, { useEffect, useState } from "react";

export default function Quote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = "CO/xsjeGFp8HJ/Dj7Cr81A==gn1aEcStpEkIh2tT";

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": API_KEY },
      });
      const data = await res.json();
      if (data && data.length > 0) {
        setQuote(data[0].quote);
        setAuthor(data[0].author);
      }
    } catch (e) {
      setQuote("Could not fetch quote.");
      setAuthor("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <section id="quote" className="quote container">
      <h3>Quote of the day:</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <blockquote>
          <p>"{quote}"</p>
          {author && <footer>- {author}</footer>}
        </blockquote>
      )}
      <button className="btn" onClick={fetchQuote} disabled={loading}>
        New Quote
      </button>
    </section>
  );
}
