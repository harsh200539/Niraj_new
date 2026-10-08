import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { ChevronRight, ShieldCheck, Compass, BarChart, ArrowRight, HelpCircle, X, CheckCircle2 } from "lucide-react";
import { practices, people } from "../data/mockDb";

export default function ServicesList() {
  const [selectedService, setSelectedService] = useState(null);

  const steps = [
    { year: "Phase 1", title: "Diagnostic Assessment", desc: "We review operational compliance, term sheets, and covenant bindings." },
    { year: "Phase 2", title: "Strategic Structuring", desc: "Our team designs custom transaction vehicles and regulatory alignment frameworks." },
    { year: "Phase 3", title: "Clearance & Execution", desc: "We coordinate with administrative agencies to close the transaction smoothly." }
  ];

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.classList.add('menu-open-lock');
      document.documentElement.classList.add('menu-open-lock');
    } else {
      document.body.classList.remove('menu-open-lock');
      document.documentElement.classList.remove('menu-open-lock');
    }
    return () => {
      document.body.classList.remove('menu-open-lock');
      document.documentElement.classList.remove('menu-open-lock');
    };
  }, [selectedService]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelectedService(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="services-landing-page container section-padding fade-in-up">
      {/* 2. Interactive Service Grid */}
      <section className="services-directory-section" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
        <div className="section-header-styled" style={{ marginBottom: "2.5rem" }}>
          <span className="title-small accent-gold">Our Expertise</span>
          <h2 className="title-display" style={{ marginTop: "1rem" }}>Practice Areas</h2>
        </div>
        <div className="services-cards-grid">
          {practices.map((p) => {
            return (
              <div
                key={p.id}
                className="service-landing-card editorial-card"
                onClick={() => setSelectedService(p)}
                style={{ cursor: "pointer" }}
              >
                {p.image && (
                  <div className="card-bg-img" style={{ backgroundImage: `url(${p.image})` }}></div>
                )}
                <div className="card-content-wrap" style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
                  <h3>{p.name}</h3>
                  <p className="text-muted card-desc">{p.shortDescription}</p>
                  <div style={{ marginTop: "auto", paddingTop: "1.5rem" }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedService(p); }}
                      className="show-more-link"
                      style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", color: "var(--accent-gold)", fontWeight: "500", fontSize: "0.95rem" }}
                    >
                      Show more <span style={{ marginLeft: "0.5rem", fontSize: "1.2rem", transition: "transform 0.3s ease" }}>→</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Service Detail Modal Popup */}
      {selectedService && createPortal(
        <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="service-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="service-modal-close-x" onClick={() => setSelectedService(null)} aria-label="Close">
              <X size={20} />
            </button>
            <div className="service-modal-header">
              <span className="title-small accent-gold">Practice Area</span>
              <h2 className="service-modal-title">{selectedService.name}</h2>
            </div>

            <div className="service-modal-body">
              {selectedService.heading && <h3 className="title-medium" style={{ marginBottom: "1rem" }}>{selectedService.heading}</h3>}
              <p className="service-modal-desc">
                {selectedService.description}
              </p>
              {selectedService.details && (
                <p className="service-modal-details">
                  {selectedService.details}
                </p>
              )}

              {selectedService.includes && selectedService.includes.length > 0 && (
                <div className="service-modal-capabilities">
                  <h4 className="title-small accent-gold" style={{ marginBottom: "1rem" }}>Core Capabilities</h4>
                  <ul className="service-modal-list">
                    {selectedService.includes.map((item, idx) => (
                      <li key={idx} className="service-modal-item">
                        <CheckCircle2 size={18} className="gold-icon flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedService.closingNote && <p className="service-modal-details" style={{ marginTop: "1.5rem" }}>{selectedService.closingNote}</p>}
            </div>

            <div className="service-modal-footer">
              <Link to="/contact" className="btn-primary" onClick={() => setSelectedService(null)}>
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* 3. Key Benefits / Featured Expertise */}




      {/* 5. CTA & Contact Gateway */}
      <section className="services-cta-banner">
        <div className="cta-box-layout">
          <h3 className="title-medium">Need bespoke advisory on an upcoming transaction?</h3>
          <p className="text-muted">Our regional coordinators are ready to align specialist teams with your goals.</p>
          <Link to="/contact" className="btn-primary mt-space">Consult Strategy Leads</Link>
        </div>
      </section>

      <style>{`
        .services-landing-page {
          padding-top: calc(var(--header-height) + 4rem);
          text-align: left;
        }
        .services-hero-banner {
          padding-bottom: var(--space-lg);
          margin-bottom: var(--space-lg);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .max-width-para {
          max-width: 850px;
          align-self: center;
          margin: 0 auto;
        }
        .padding-v {
          padding: 4rem 0;
        }
        .section-subtitle {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
        }
        .services-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }
        @media (max-width: 1080px) {
          .services-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .services-cards-grid {
            grid-template-columns: 1fr;
          }
        }
        .service-landing-card {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-height: 380px;
          height: 100%;
          background-color: var(--bg-card);
          padding: 2.5rem;
          min-width: 0;
          border-radius: 8px;
          border: 1px solid var(--border-light);
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .service-landing-card .card-bg-img {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          opacity: 0.16;
          filter: grayscale(15%);
          transition: transform 0.5s ease, opacity 0.5s ease;
          z-index: 1;
        }
        .service-landing-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-gold);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
        }
        .service-landing-card:hover .card-bg-img {
          transform: scale(1.08);
          opacity: 0.32;
        }
        .card-content-wrap {
          position: relative;
          z-index: 2;
        }
        .service-landing-card h3 {
          font-size: 1.35rem;
          font-family: var(--font-sans);
          font-weight: 600;
          line-height: 1.3;
          margin-bottom: 1rem;
          min-height: 3.6rem;
        }
        .service-landing-card:hover .show-more-link span {
          transform: translateX(4px);
        }
        .card-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: var(--space-md);
          text-align: justify;
          text-justify: inter-word;
          hyphens: auto;
          -webkit-hyphens: auto;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .benefits-box-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-light);
          padding: 3.5rem;
          border-radius: 4px;
          width: 100%;
        }
        @media (max-width: 768px) {
          .benefits-box-card {
            padding: 2rem;
          }
        }
        .benefits-split-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
        }
        @media (max-width: 1080px) {
          .benefits-split-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
        .benefits-title-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .benefits-list-box {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .benefit-row {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
        }
        .benefit-row h4 {
          font-size: 1.2rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        .benefit-row p {
          font-size: 0.95rem;
        }
        .process-timeline-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
        }
        @media (max-width: 1080px) {
          .process-timeline-grid {
            grid-template-columns: 1fr;
          }
        }
        .process-step-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
          background-color: var(--bg-secondary) !important;
          border: 1px solid var(--border-light);
          border-radius: 16px;
          padding: 2.5rem;
          transition: var(--transition-curve-prestige);
          min-width: 0;
        }
        .process-step-card:hover {
          border-color: var(--accent-gold);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(31, 31, 31, 0.06);
        }
        .process-step-card .step-phase {
          font-size: 1.75rem;
          color: var(--accent-gold);
          font-weight: 500;
        }
        .process-step-card h4 {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .process-step-card p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-muted);
        }
        .services-cta-banner {
          background-color: var(--bg-secondary) !important;
          border: 1px solid var(--border-light);
          border-radius: 16px;
          padding: 4.5rem 3rem;
          margin-top: 4rem;
          box-shadow: 0 4px 24px rgba(31, 31, 31, 0.04);
        }
        .cta-box-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-align: center;
        }
        .companies-act-box {
          background-color: var(--bg-card);
          padding: 3.5rem;
          border-radius: 16px;
          border: 1px solid var(--border-light);
          box-shadow: 0 12px 32px rgba(31, 31, 31, 0.04);
        }
        @media (max-width: 768px) {
          .companies-act-box {
             padding: 2rem;
          }
        }
        .services-bullet-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .services-bullet-list li {
          position: relative;
          padding-left: 1.5rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1.75rem;
          break-inside: avoid;
          page-break-inside: avoid;
          text-align: justify;
          text-justify: inter-word;
          hyphens: auto;
          -webkit-hyphens: auto;
        }
        .services-bullet-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--accent-gold);
          font-size: 1.5rem;
          line-height: 1;
          top: -2px;
        }

        /* Service Modal Styles */
        .service-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.25s ease;
          padding: 1.5rem;
        }
        .service-modal-content {
          background: var(--bg-primary);
          width: 100%;
          max-width: 750px;
          max-height: 80vh;
          border-radius: 8px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid var(--border-light);
          padding: 2.5rem;
        }
        @media (max-width: 768px) {
          .service-modal-content {
            padding: 1.75rem;
            max-height: 85vh;
          }
        }
        .service-modal-close-x {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s, color 0.2s;
        }
        .service-modal-close-x:hover {
          background: var(--text-primary);
          color: var(--bg-primary);
        }
        .service-modal-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-light);
        }
        .service-modal-title {
          font-size: 1.75rem;
          font-weight: 600;
          font-family: var(--font-sans);
          color: var(--text-primary);
          margin-top: 0.5rem;
          line-height: 1.25;
        }
        @media (max-width: 768px) {
          .service-modal-title {
            font-size: 1.35rem;
          }
        }
        .service-modal-body {
          overflow-y: auto;
          flex-grow: 1;
          padding-right: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .service-modal-desc,
        .service-modal-details,
        .service-modal-item span {
          text-align: justify;
          text-justify: inter-word;
          text-align-last: left;
          hyphens: none;
          overflow-wrap: break-word;
          min-width: 0;
        }
        .service-modal-item span { flex: 1; }
        .service-modal-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          text-align: justify;
        }
        .service-modal-details {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }
        .service-modal-capabilities {
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          padding: 1.5rem;
          border-radius: 6px;
        }
        .service-modal-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .service-modal-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .service-modal-footer {
          display: flex;
          justify-content: flex-end;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }
      `}</style>
    </div>
  );
}
