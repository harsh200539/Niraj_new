import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { practices } from "../data/mockDb";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ServiceDetail() {
  const { id } = useParams();
  
  // Find the requested service from our mock DB
  const service = practices.find((p) => p.id === id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div className="service-detail-page" style={{ paddingTop: "calc(var(--header-height) + 4rem)", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h2 className="title-medium">Service Not Found</h2>
        <p className="text-muted mt-space">The service you are looking for does not exist.</p>
        <Link to="/services" className="btn-primary mt-space">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      {/* 1. Hero Banner */}
      <section className="service-hero hairline-bottom">
        <div className="container">
          <Link to="/services" className="back-link">
            <ArrowLeft size={18} /> Back to Services
          </Link>
          <div className="hero-content mt-space">
            <span className="title-small accent-gold">Practice Area</span>
            <h1 className="title-display service-title">{service.name}</h1>
          </div>
        </div>
      </section>

      {/* 2. Detailed Content */}
      <section className="service-content-section" style={{ padding: "1.5rem 0 3rem 0" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          <div className="service-description">
            {service.heading && <h2 className="title-medium" style={{ marginBottom: "1rem" }}>{service.heading}</h2>}
            <p className="body-large text-primary" style={{ marginBottom: "2rem" }}>
              {service.description}
            </p>
            {service.details && (
              <p className="text-muted" style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "2rem" }}>
                {service.details}
              </p>
            )}
          </div>

          {service.includes && service.includes.length > 0 && (
            <div className="service-includes-box editorial-card">
              <h3 className="title-small accent-gold" style={{ marginBottom: "1.5rem" }}>Core Capabilities</h3>
              <ul className="includes-list">
                {service.includes.map((item, idx) => (
                  <li key={idx} className="includes-item">
                    <CheckCircle2 size={20} className="gold-icon flex-shrink-0" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {service.closingNote && <p className="text-muted service-closing-note" style={{ marginTop: "2rem", lineHeight: "1.7" }}>{service.closingNote}</p>}
        </div>
      </section>

      {/* 3. CTA */}
      <section className="container" style={{ paddingBottom: "4rem" }}>
        <div className="service-cta-banner">
          <h3 className="title-medium">Require assistance with {service.name}?</h3>
          <p className="text-muted mt-space">Connect with our specialized advisory team for a strategic consultation.</p>
          <Link to="/contact" className="btn-primary" style={{ marginTop: "2rem", display: "inline-block" }}>Schedule Consultation</Link>
        </div>
      </section>

      <style>{`
        .service-detail-page {
          padding-top: calc(var(--header-height) + 2rem);
          text-align: left;
        }
        .service-description p,
        .includes-item span,
        .service-closing-note {
          text-align: justify;
          text-justify: inter-word;
          text-align-last: left;
          hyphens: none;
          overflow-wrap: break-word;
          min-width: 0;
        }
        .includes-item span { flex: 1; }
        .service-hero {
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s ease;
        }
        .back-link:hover {
          color: var(--accent-gold);
        }
        .service-title {
          margin-top: 1rem;
          line-height: 1.15;
          max-width: 900px;
        }
        .service-includes-box {
          background-color: var(--bg-card);
          padding: 3rem;
          border-radius: 16px;
          border: 1px solid var(--border-light);
          box-shadow: 0 12px 32px rgba(31, 31, 31, 0.04);
        }
        .includes-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .includes-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          font-size: 1.05rem;
          line-height: 1.6;
        }
        .gold-icon {
          color: var(--accent-gold);
          margin-top: 0.15rem;
        }
        .flex-shrink-0 {
          flex-shrink: 0;
        }
        .service-cta-banner {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-light);
          border-radius: 16px;
          padding: 4rem 3rem;
          text-align: center;
        }
        @media (max-width: 768px) {
          .service-includes-box {
            padding: 2rem;
          }
          .service-cta-banner {
            padding: 3rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
