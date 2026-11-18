import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, Search, User, ShieldCheck, ArrowRight } from "lucide-react";
import { people, practices } from "../data/mockDb";
import logoImg from "../assets/TNT.png";

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    practices: [],
    people: []
  });
  const inputRef = useRef(null);

  const suggestedKeywords = ["M&A", "FDI", "Insolvency", "Trademark", "Audit"];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ practices: [], people: [] });
      return;
    }

    const cleanQuery = query.toLowerCase();

    const matchedPractices = practices.filter(p =>
      p.name.toLowerCase().includes(cleanQuery) ||
      p.shortDescription.toLowerCase().includes(cleanQuery) ||
      (p.details && p.details.toLowerCase().includes(cleanQuery))
    );

    const matchedPeople = people.filter(p =>
      p.name.toLowerCase().includes(cleanQuery) ||
      p.title.toLowerCase().includes(cleanQuery) ||
      p.bio.toLowerCase().includes(cleanQuery)
    );

    setResults({
      practices: matchedPractices,
      people: matchedPeople
    });
  }, [query]);

  if (!isOpen) return null;

  const totalResults = results.practices.length + results.people.length;

  return (
    <div className="search-overlay-fullscreen">
      <div className="search-header-container container">
        <div className="search-logo">
          <img src={logoImg} alt="TNT & Associates Logo" width={842} height={595} className="search-logo-img" />
          <span className="logo-brand">TNT &amp; ASSOCIATES</span>
        </div>
        <button className="search-close-btn" onClick={onClose} aria-label="Close search">
          <X size={28} />
        </button>
      </div>

      <div className="search-body-container container">
        <div className="search-input-wrapper">
          <Search size={32} className="search-indicator-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search practices, team members..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-field"
          />
        </div>

        {/* Suggestion tags when query is empty */}
        {!query && (
          <div className="search-suggestions-box fade-in-up">
            <span className="suggestion-label">Suggested Keywords:</span>
            <div className="suggestion-tags">
              {suggestedKeywords.map((kw, i) => (
                <button key={i} className="suggestion-tag-btn" onClick={() => setQuery(kw)}>
                  {kw} <ArrowRight size={12} />
                </button>
              ))}
            </div>
          </div>
        )}

        {query && (
          <div className="search-results-wrapper fade-in-up">
            {totalResults > 0 ? (
              <>
                <p className="results-summary-text">
                  Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
                </p>

                <div className="results-grid">
                  {results.practices.length > 0 && (
                    <div className="results-section">
                      <h3><ShieldCheck size={18} /> Services</h3>
                      <div className="results-list">
                        {results.practices.map(p => (
                          <Link key={p.id} to="/services" onClick={onClose} className="result-item">
                            <strong>{p.name}</strong>
                            <span>{p.shortDescription}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.people.length > 0 && (
                    <div className="results-section">
                      <h3><User size={18} /> Our People</h3>
                      <div className="results-list">
                        {results.people.map(p => (
                          <Link key={p.id} to="/people" onClick={onClose} className="result-item">
                            <strong>{p.name}</strong>
                            <span>{p.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="no-search-results">
                <p className="serif-display">No advisory listings found matching "{query}"</p>
                <span>Please try alternative terms or check spelling.</span>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .search-overlay-fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: var(--bg-primary);
          z-index: 2000;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        .search-header-container {
          height: var(--header-height);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-light);
          flex-shrink: 0;
        }
        .search-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.25em;
        }
        .search-logo-img {
          height: 95px;
          width: auto;
          object-fit: contain;
        }
        .search-close-btn {
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .search-body-container {
          padding-top: 4rem;
          padding-bottom: 4rem;
          flex-grow: 1;
        }
        .search-input-wrapper {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          border-bottom: 2px solid var(--text-primary);
          padding-bottom: 1rem;
          margin-bottom: 3rem;
        }
        .search-indicator-icon {
          color: var(--text-muted);
        }
        .search-field {
          background: none;
          border: none;
          outline: none;
          font-size: 2rem;
          font-family: var(--font-sans);
          font-weight: 400;
          color: var(--text-primary);
          width: 100%;
        }
        .search-suggestions-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
        }
        .suggestion-label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }
        .suggestion-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .suggestion-tag-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid var(--border-light);
          padding: 0.5rem 1.25rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          background-color: var(--bg-secondary);
          transition: var(--transition-duration-fast) ease;
        }
        .suggestion-tag-btn:hover {
          border-color: var(--text-primary);
          color: var(--text-primary);
        }
        .results-summary-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: 3rem;
        }
        .results-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .results-section h3 {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 0.5rem;
        }
        .results-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .result-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.75rem;
          transition: var(--transition-duration-fast) ease;
        }
        .result-item:hover {
          background-color: var(--bg-secondary);
        }
        .result-item strong {
          font-size: 1.05rem;
          color: var(--text-primary);
        }
        .result-item span {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .no-search-results {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 4rem 0;
          text-align: center;
        }
        .no-search-results p {
          font-size: 1.8rem;
        }
        .no-search-results span {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
