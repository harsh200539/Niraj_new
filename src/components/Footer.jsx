import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import LinkedinIcon from "./LinkedinIcon";
import { offices } from "../data/mockDb";
import logoImg from "../assets/TNT.png";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-container">
      <div className="container footer-content-grid">
        <div className="footer-brand-section">
          <Link to="/" className="footer-logo" aria-label="Home">
            <img src={logoImg} alt="TNT & Associates Logo" width={842} height={595} loading="lazy" decoding="async" className="footer-logo-img" />
            <span className="logo-brand">TNT &amp; ASSOCIATES</span>
            <span className="logo-sub">COMPANY SECRETARIES</span>
          </Link>
          <p className="footer-brief">
            Delivering bespoke strategic, regulatory, and corporate advisory solutions globally. Guided by excellence, built on trust.
          </p>
          <div style={{ marginTop: "1.25rem" }}>
            <a
              href="https://www.linkedin.com/in/niraj-trivedi-5458a117"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--accent-gold)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "600"
              }}
            >
              <LinkedinIcon size={16} />
              <span>Connect with CS Niraj Trivedi on LinkedIn ↗</span>
            </a>
          </div>
        </div>

        <div className="footer-offices-section">
          <h4 className="footer-title">Our Offices</h4>
          {offices.filter(o => o.id === "vadodara").map((office) => (
            <div key={office.id} className="office-card">
              <h5>Head Office Vadodara</h5>
              <p className="office-address">{office.address}</p>
              <p className="office-contact" style={{ fontWeight: 600, marginTop: "0.5rem", marginBottom: "0.25rem" }}>Contact :</p>
              <p className="office-contact">Phone: {office.phone}</p>
              <p className="office-contact" style={{ whiteSpace: "nowrap" }}>Email: {office.email}</p>
              <p className="office-contact" style={{ whiteSpace: "nowrap" }}>Email: niraj@nirajtrivedi-cs.com</p>
            </div>
          ))}
        </div>

        <div className="footer-branches-section">
          <h4 className="footer-title">Other Branches</h4>
          <div className="offices-grid-2">
            {offices.filter(o => o.id !== "vadodara").map((office) => (
              <div key={office.id} className="office-card">
                <h5>{office.city}</h5>
                <p className="office-address">{office.address}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-links-section">
          <h4 className="footer-title">Navigation</h4>
          <div className="links-col">
            <Link to="/services">Services</Link>
            <Link to="/people">Our People</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container bottom-bar-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} TNT &amp; Associates. All rights reserved.
          </p>
          <div className="legal-links">
            <a href="#disclaimer" onClick={() => {
              localStorage.removeItem("disclaimerAccepted");
              window.location.reload();
            }}>Regulatory Disclaimer</a>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer-container {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          border-top: 1px solid var(--border-light);
          padding-top: 5rem;
          margin-top: auto;
          width: 100%;
          transition: background-color 0.4s ease, color 0.4s ease;
        }
        .footer-content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          padding-bottom: 4rem;
          width: 100%;
        }
        @media (max-width: 1080px) {
          .footer-content-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }
        @media (max-width: 464px) {
          .footer-content-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
        .footer-brand-section {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .footer-logo {
          display: flex;
          flex-direction: column;
          text-decoration: none;
        }
        .footer-logo-img {
          height: 110px;
          width: auto;
          object-fit: contain;
          margin-bottom: 0.5rem;
          align-self: flex-start;
          transition: transform 0.3s ease;
        }
        .footer-logo:hover .footer-logo-img {
          transform: scale(1.03);
        }
        .footer-logo .logo-brand {
          font-size: clamp(1rem, 3vw, 1.4rem);
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--text-primary);
        }
        .footer-logo .logo-sub {
          font-size: clamp(0.5rem, 1.5vw, 0.65rem);
          letter-spacing: 0.25em;
          color: var(--accent-gold);
          margin-top: 2px;
        }
        .footer-brief {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 100%;
        }
        .footer-title {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-gold);
          margin-bottom: 1.5rem;
          font-weight: 600;
        }
        .offices-grid-2 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .offices-grid-2 {
            grid-template-columns: 1fr;
          }
        }
        .office-card {
          display: flex;
          flex-direction: column;
        }
        .office-card h5 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.6rem;
          color: var(--text-primary);
        }
        .office-card .office-address {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 0.75rem;
          text-align: justify;
          text-justify: inter-word;
          hyphens: auto;
          -webkit-hyphens: auto;
        }
        .office-card .office-contact {
          font-size: 0.85rem;
          color: var(--text-primary);
          line-height: 1.5;
          margin-bottom: 0.25rem;
        }
        .links-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .links-col a {
          font-size: 0.9rem;
          color: var(--text-muted);
          transition: var(--transition-duration-fast) ease;
        }
        .links-col a:hover {
          color: var(--accent-gold);
        }
        .footer-bottom-bar {
          border-top: 1px solid var(--border-light);
          padding: 2rem 0;
        }
        .bottom-bar-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .bottom-bar-inner {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
        .legal-links {
          display: flex;
          gap: 2rem;
        }
        .legal-links a {
          color: var(--text-muted);
          transition: var(--transition-duration-fast) ease;
        }
        .legal-links a:hover {
          color: var(--accent-gold);
        }
        .back-to-top-btn {
          color: var(--text-muted);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          transition: var(--transition-duration-fast) ease;
        }
        .back-to-top-btn:hover {
          color: var(--accent-gold);
        }
      `}</style>
    </footer>
  );
}
