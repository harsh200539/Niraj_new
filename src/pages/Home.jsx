import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Award, MapPin } from "lucide-react";
import heroBg from "../assets/hero-bg.jpg";
import { practices, people, offices, achievements } from "../data/mockDb";
import logoImg from "../assets/TNT.png";

export default function Home() {
  // Statistics state counters
  const [stats, setStats] = useState({ years: 0, experts: 0, officesCount: 0, volume: 0 });

  // Core Values sticky-scroll refs
  const coreValuesRef = useRef(null);
  const valueItemsRef = useRef([]);
  const progressFillRef = useRef(null);

  // Reveal each value item as it enters the viewport
  useEffect(() => {
    const items = valueItemsRef.current.filter(Boolean);
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            // Update progress bar based on how many items are visible
            const visible = valueItemsRef.current.filter(
              (el) => el && el.classList.contains("in-view")
            ).length;
            if (progressFillRef.current) {
              progressFillRef.current.style.width = `${(visible / items.length) * 100}%`;
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -5% 0px" }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Stats counter animation
  useEffect(() => {
    const duration = 1200; // ms
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setStats({
        years: Math.min(Math.floor((30 / steps) * step), 30),
        experts: Math.min(Math.floor((5 / steps) * step), 5),
        officesCount: Math.min(Math.floor((3 / steps) * step), 3),
        volume: Math.min(Math.floor((40 / steps) * step), 40)
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-container fade-in-up">
      {/* 1. HERO SECTION */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(var(--bg-overlay), var(--bg-overlay)), url(${heroBg})`
        }}
      >
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title title-display" style={{ fontWeight: "500", lineHeight: "1.1" }}>
              Company Secretary Services in <span style={{ fontStyle: "italic" }}>Vadodara</span>
            </h1>
            <p className="hero-description body-large" style={{ maxWidth: "850px" }}>
              TNT & Associates, practising company secretaries with a head office in Fatehgunj, Vadodara, provides company secretary services and corporate compliance advisory to businesses in Vadodara, Ahmedabad and across India. The firm offers corporate and regulatory advisory services with expertise in Initial Public Offerings (IPOs), Due Diligence, NCLT representation under the Companies Act, 2013 and the Insolvency and Bankruptcy Code, 2016 (IBC), FEMA compliances including FDI, ODI, and ECB, Secretarial Audits, Corporate Restructuring, Capital Restructuring, Change of Management and Intellectual Property Law services. With a strong focus on regulatory compliance and strategic advisory, the firm provides practical, efficient, and result-oriented solutions to businesses across diverse sectors.
            </p>
            <div className="hero-actions">
              <Link to="/services" className="btn-primary">Explore Company Secretary Services</Link>
            </div>
          </div>
        </div>
        {/* <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span className="scroll-text">Scroll to explore</span>
        </div> */}
      </section>

      {/* 2. COMPANY INTRODUCTION */}
      <section className="intro-section section-padding">
        <div className="container intro-grid">
          <div className="intro-title-col">
            {/* <img src={logoImg} alt="TNT & Associates Logo" className="intro-logo-badge" /> */}
            <span className="title-small accent-gold">Company Overview</span>
            <h2 className="title-medium intro-headline">Company secretarial and corporate compliance support in Vadodara.</h2>
            <Link to="/about" className="gold-link mt-space">About Our Company Secretaries →</Link>
          </div>
          <div className="intro-text-col" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <p
              style={{
                paddingLeft: "1.25rem",
                borderLeft: "3px solid var(--accent-gold)",
                fontWeight: "400",
                fontSize: "1.1rem",
                color: "var(--text-primary)",
                lineHeight: "1.7",
                margin: 0
              }}
            >
              At TNT &amp; Associates, CS Niraj Trivedi and our team help businesses with company incorporation, Companies Act compliance, secretarial audits and corporate transactions. Our Vadodara head office is at 218-220 Saffron Complex, Fatehgunj.
            </p>
            <p
              style={{
                paddingLeft: "1.25rem",
                borderLeft: "3px solid var(--accent-gold)",
                fontWeight: "400",
                fontSize: "1.1rem",
                color: "var(--text-primary)",
                lineHeight: "1.7",
                margin: 0
              }}
            >
              By mapping compliance goals directly against local statutory frameworks, we empower capital allocators and enterprise leaders to operate confidently.
            </p>
            <p
              style={{
                paddingLeft: "1.25rem",
                borderLeft: "3px solid var(--accent-gold)",
                fontWeight: "400",
                fontSize: "1.1rem",
                color: "var(--text-primary)",
                lineHeight: "1.7",
                margin: 0
              }}
            >
              More than 35 years of experience in the field of Corporate Law, FEMA, IBC, Intellectual Property Rights.
            </p>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC STATISTICS */}
      {/* <section className="stats-section">
        <div className="container stats-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          <div className="stat-card">
            <span className="stat-num serif-display">{stats.years}+</span>
            <span className="stat-label">Years of Experience</span>
          </div>
          <div className="stat-card">
            <span className="stat-num serif-display">Dedicated</span>
            <span className="stat-label">Compliance Focus</span>
          </div>
        </div>
      </section> */}

      {/* 6. WHY CHOOSE US (VALUES) */}

      <section className="why-us-section section-padding" ref={coreValuesRef}>
        <div className="container why-us-grid">

          {/* LEFT: sticky — stays in place while right side scrolls */}
          <div className="why-us-info-col">
            <span className="title-small accent-gold">Our Values</span>
            <h2 className="title-medium">Core Guiding Principles</h2>
            <p className="body-large text-muted mt-space">
              We operate under a strict code of ethics, delivering meticulous accuracy, absolute confidentiality, and timely compliance execution.
            </p>
            <div className="values-progress-bar">
              <div className="values-progress-fill" ref={progressFillRef}></div>
            </div>
          </div>

          {/* RIGHT: items revealed one by one via IntersectionObserver */}
          <div className="why-us-list-col">
            {[
              { title: "Professional Ethics",    desc: "Unwavering commitment to ICSI code of conduct and professional integrity." },
              { title: "Strict Confidentiality", desc: "Absolute discretion and security regarding all corporate data and strategies." },
              { title: "Meticulous Accuracy",    desc: "Precision in drafting, filing, and representing clients before regulatory bodies." },
              { title: "Timely Execution",        desc: "Proactive compliance management to avoid penalties and ensure smooth operations." }
            ].map((val, i) => (
              <div key={i} className="value-differentiator-item" ref={el => valueItemsRef.current[i] = el}>
                <div className="diff-icon-dot"></div>
                <h4>{val.title}</h4>
                <p className="text-muted">{val.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. LEADERSHIP PREVIEW */}
      {/* <section className="leadership-section section-padding">
        <div className="container">
          <div className="section-header">
            <div className="header-meta">
              <span className="title-small accent-gold">Leadership</span>
              <h2 className="title-medium">Managing Partners</h2>
            </div>
            <Link to="/people" className="gold-link">Our Directory →</Link>
          </div>

          <div className="leadership-cards-grid">
            {people.slice(0, 2).map((leader) => (
              <Link key={leader.id} to={`/people/${leader.id}`} className="leader-card">
                <div className="leader-image-frame">
                  <img src={leader.image} alt={leader.name} />
                </div>
                <div className="leader-info-block">
                  <h4>{leader.name}</h4>
                  <span className="leader-title-tag text-muted">{leader.title}</span>
                  <span className="view-profile-hover">View Strategic Bio →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* 9. GLOBAL HUB LOCATIONS */}
      <section className="global-presence-section section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <div className="header-meta">
              <span className="title-small accent-gold">Global Presence</span>
              <h2 className="title-medium">Our Hub Locations</h2>
            </div>
          </div>

          <div className="offices-grid-layout">
            {offices.map((office) => (
              <div key={office.id} className="office-location-card editorial-card">
                <div className="office-card-header">
                  <MapPin size={18} className="pin-icon" />
                  <span className="office-card-tag title-small">Office Hub</span>
                </div>
                <h3 className="serif-display">{office.city}</h3>
                <p className="office-card-address text-muted">{office.address}</p>
                <div className="office-card-meta">
                  <span className="office-meta-item">T: {office.phone}</span>
                  <span className="office-meta-item">E: {office.email}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. ACHIEVEMENTS & AWARDS */}
      <section className="awards-timeline-section section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="title-medium text-center section-title-border">Achievements</h2>

          <div className="awards-table-list">
            {achievements.map((ach, i) => (
              <div key={i} className="award-table-row">
                <div className="award-row-main">
                  <p className="body-large text-muted">{ach}</p>
                </div>
                <div className="award-row-decoration">
                  <Award size={20} className="gold-icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preserved empty section to maintain nth-of-type CSS parity for CTA banner */}
      <section style={{ display: "none" }}></section>

      {/* 13. CALL TO ACTION (CTA) */}
      <section className="container" style={{ paddingBottom: "4rem", paddingTop: "4rem" }}>
        <div className="service-cta-banner">
          <h3 className="title-medium">Ready to discuss your corporate secretarial strategy?</h3>
          <p className="text-muted mt-space">Connect with our specialized advisory team for a strategic consultation.</p>
          <Link to="/contact" className="btn-primary" style={{ marginTop: "2rem", display: "inline-block" }}>Schedule Consultation</Link>
        </div>
      </section>

      <style>{`
        .home-container {
          /* overflow: hidden removed — it breaks position: sticky on child elements */
        }
        
        /* 1. Hero Styles */
        .hero-section {
          padding-top: calc(var(--header-height) + 6rem);
          padding-bottom: 9rem;
          border-bottom: 1px solid var(--border-light);
          position: relative;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--space-sm);
          text-align: left;
          max-width: 900px;
        }
        .hero-tagline {
          color: var(--accent-gold);
        }
        .hero-title {
          font-weight: 300;
        }
        .hero-description {
          color: var(--text-secondary);
          max-width: 720px;
        }
        .hero-actions {
          display: flex;
          gap: var(--space-md);
          margin-top: var(--space-sm);
        }
        @media (max-width: 464px) {
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-actions a {
            justify-content: center;
          }
        }
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-muted);
          pointer-events: none;
        }
        @media (max-width: 1080px) {
          .scroll-indicator {
            display: none;
          }
        }
        .scroll-line {
          width: 1px;
          height: 50px;
          background-color: var(--border-light);
          position: relative;
          overflow: hidden;
        }
        .scroll-line::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 15px;
          background-color: var(--accent-gold);
          animation: scrollDownAnimation 2s infinite ease-in-out;
        }
        @keyframes scrollDownAnimation {
          0% { top: -15px; }
          100% { top: 50px; }
        }
        .scroll-text {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
        }

        /* 2. Company Intro Styles */
        .intro-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: var(--space-lg);
        }
        @media (max-width: 1080px) {
          .intro-grid {
            grid-template-columns: 1fr;
            gap: var(--space-md);
          }
        }
        .intro-title-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .intro-logo-badge {
          height: 115px;
          width: auto;
          object-fit: contain;
          margin-bottom: var(--space-md);
        }
        .intro-headline {
          font-weight: 300;
          margin-top: var(--space-sm);
        }
        .mt-space {
          margin-top: var(--space-md);
        }
        .intro-text-col {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          text-align: left;
        }

        /* 3. Statistics Section */
        .stats-section {
          background-color: var(--bg-secondary);
          padding: var(--space-lg) 0;
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-lg);
        }
        @media (max-width: 1080px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 464px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--space-xs);
        }
        .stat-num {
          font-size: clamp(2.5rem, 6vw, 4rem);
          line-height: 1;
          color: var(--text-primary);
        }
        .stat-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        /* 4. Featured Services */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: var(--space-lg);
          border-bottom: 1px solid var(--border-light);
          padding-bottom: var(--space-sm);
        }
        .header-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .services-showcase-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: var(--space-md);
        }
        .service-showcase-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          background-color: var(--bg-primary);
          min-height: 420px;
          height: 100%;
          padding: 2.5rem;
        }
        .service-number {
          font-size: clamp(1.75rem, 5vw, 2.5rem);
          color: var(--accent-gold);
          margin-bottom: var(--space-md);
        }
        .service-title {
          font-size: 1.35rem;
          font-family: var(--font-sans);
          font-weight: 600;
          line-height: 1.3;
          margin-bottom: 1rem;
          min-height: 3.6rem;
        }
        .service-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: var(--space-md);
          flex-grow: 1;
        }


        /* 5. Industries Rows */
        .industries-rows-list {
          display: flex;
          flex-direction: column;
        }
        .industry-row-item {
          display: grid;
          grid-template-columns: 0.5fr 3fr 1fr;
          gap: var(--space-md);
          padding: var(--space-md) 0;
          border-bottom: 1px solid var(--border-light);
          align-items: center;
          text-align: left;
          transition: var(--transition-duration-fast) ease;
        }
        @media (max-width: 768px) {
          .industry-row-item {
            grid-template-columns: 1fr;
            gap: var(--space-xs);
          }
        }
        .industry-row-item:hover {
          padding-left: var(--space-sm);
          border-color: var(--text-primary);
        }
        .industry-row-num {
          font-size: clamp(1.5rem, 4vw, 2rem);
          color: var(--accent-gold);
        }
        .industry-row-main h3 {
          font-size: 1.4rem;
          font-family: var(--font-sans);
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .industry-row-main p {
          font-size: 0.95rem;
        }
        .industry-row-action {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
        }
        @media (max-width: 768px) {
          .industry-row-action {
            justify-content: flex-start;
            margin-top: var(--space-xs);
          }
        }
        .row-link-text {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0;
          transform: translateX(-10px);
          transition: var(--transition-duration-fast) ease;
        }
        .industry-row-item:hover .row-link-text {
          opacity: 1;
          transform: translateX(0);
        }
        .row-arrow {
          transition: transform 0.3s ease;
        }
        .industry-row-item:hover .row-arrow {
          transform: translateX(5px);
        }

        /* 6. Why Choose Us */
        .why-us-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 5rem;
          align-items: start;
        }
        @media (max-width: 1080px) {
          .why-us-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
        /* Left col sticks while right col scrolls past it */
        .why-us-info-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          position: sticky;
          top: calc(var(--header-height, 80px) + 3rem);
          align-self: start;
        }
        @media (max-width: 1080px) {
          .why-us-info-col { position: static; }
        }
        .values-progress-bar {
          width: 100%;
          height: 2px;
          background: var(--border-light);
          margin-top: 2.5rem;
          border-radius: 2px;
          overflow: hidden;
        }
        .values-progress-fill {
          height: 100%;
          width: 0%;
          background: var(--accent-gold);
          border-radius: 2px;
          transition: width 0.4s ease;
        }
        .why-us-list-col {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .value-differentiator-item {
          padding: 2.25rem 0;
          border-bottom: 1px solid var(--border-light);
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .value-differentiator-item:first-child {
          border-top: 1px solid var(--border-light);
        }
        .value-differentiator-item.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 1080px) {
          .value-differentiator-item {
            opacity: 1;
            transform: none;
          }
        }
        .diff-icon-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-gold);
          margin-bottom: 0.75rem;
        }
        .value-differentiator-item h4 {
          font-size: 1.25rem;
          font-weight: 500;
          margin: 0 0 0.5rem 0;
          line-height: 1.3;
        }
        .value-differentiator-item p {
          font-size: 0.95rem;
          margin: 0;
          line-height: 1.65;
        }
        /* 7. Featured Insights */
        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: var(--space-md);
        }
        .insight-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          height: 380px;
          background-color: var(--bg-primary);
        }
        .insight-card-meta {
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: var(--space-md);
        }
        .pub-badge {
          color: var(--accent-gold);
          font-weight: 600;
          letter-spacing: 0.1em;
        }
        .pub-reading-time {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }
        .insight-title {
          font-size: 1.35rem;
          font-family: var(--font-sans);
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: var(--space-xs);
        }
        .insight-excerpt {
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: var(--space-md);
          flex-grow: 1;
        }
        .insight-card-action {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-gold);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* 8. Leadership Preview */
        .leadership-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
        }
        @media (max-width: 768px) {
          .leadership-cards-grid {
            grid-template-columns: 1fr;
          }
        }
        .leader-card {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-light);
          position: relative;
          overflow: hidden;
          transition: var(--transition-curve-prestige);
        }
        .leader-card:hover {
          border-color: var(--text-primary);
        }
        .leader-image-frame {
          position: relative;
          width: 100%;
          padding-top: 125%; /* 4:5 Aspect Ratio matching People directory */
          overflow: hidden;
          background-color: var(--bg-secondary);
        }
        .leader-image-frame img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-curve-prestige);
        }
        .leader-card:hover .leader-image-frame img {
          transform: scale(1.05);
        }
        .leader-info-block {
          padding: var(--space-md);
          text-align: left;
          background-color: var(--bg-primary);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .leader-info-block h4 {
          font-size: 1.2rem;
          font-family: var(--font-sans);
          font-weight: 600;
        }
        .leader-title-tag {
          font-size: 0.85rem;
        }
        .view-profile-hover {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--accent-gold);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: var(--space-xs);
          opacity: 0;
          transform: translateY(5px);
          transition: var(--transition-duration-fast) ease;
        }
        .leader-card:hover .view-profile-hover {
          opacity: 1;
          transform: translateY(0);
        }

        /* 9. Global Hub Locations */
        .offices-grid-layout {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
          margin-top: 3rem;
        }
        @media (max-width: 1080px) {
          .offices-grid-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        .office-location-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background-color: var(--bg-secondary);
        }
        .office-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--accent-gold);
          margin-bottom: 1.25rem;
        }
        .office-card-tag {
          margin: 0;
        }
        .office-location-card h3 {
          font-size: 1.4rem;
          margin: 0 0 1rem 0;
          font-family: var(--font-sans);
          font-weight: 600;
        }
        .office-card-address {
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0 0 2rem 0;
          flex-grow: 1;
        }
        .office-card-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          width: 100%;
          border-top: 1px solid var(--border-light);
          padding-top: 1.25rem;
        }
        .office-meta-item {
          display: block;
        }

        /* 10. Achievements Table */
        .section-title-border {
          border-bottom: 1px solid var(--border-light);
          padding-bottom: var(--space-md);
          margin-bottom: var(--space-lg);
        }
        .awards-table-list {
          display: flex;
          flex-direction: column;
        }
        .award-table-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: var(--space-md);
          padding: var(--space-md) 0;
          border-bottom: 1px solid var(--border-light);
          align-items: center;
          text-align: left;
          transition: var(--transition-duration-fast) ease;
        }
        @media (max-width: 768px) {
          .award-table-row {
            grid-template-columns: 1fr;
            gap: var(--space-xs);
          }
        }
        .award-table-row:hover {
          border-color: var(--text-primary);
          background-color: var(--bg-secondary);
          padding-left: var(--space-sm);
        }

        .award-row-main h4 {
          font-size: 1.25rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        .award-row-main p {
          font-size: 0.9rem;
        }
        .award-row-decoration {
          display: flex;
          justify-content: flex-end;
        }
        @media (max-width: 768px) {
          .award-row-decoration {
            justify-content: flex-start;
          }
        }
        .gold-icon {
          color: var(--accent-gold);
        }

        /* 11. Testimonials */
        .testimonials-inner-box {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
          border: 1px solid var(--border-light);
          padding: var(--space-xl) var(--space-lg);
          background-color: var(--bg-secondary);
        }
        .block {
          display: block;
        }
        .testimonial-carousel-window {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
          text-align: center;
        }
        .carousel-quote-text {
          font-size: 1.8rem;
          line-height: 1.5;
          color: var(--text-primary);
        }
        .carousel-author-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .carousel-author-info strong {
          font-size: 1.05rem;
        }
        .carousel-author-info span {
          font-size: 0.85rem;
        }
        .carousel-navigation-buttons {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-top: var(--space-sm);
        }
        .carousel-nav-btn {
          width: 48px;
          height: 48px;
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: var(--transition-duration-fast) ease;
        }
        .carousel-nav-btn:hover {
          border-color: var(--text-primary);
          background-color: var(--bg-primary);
        }
        .carousel-index-counter {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
        }

        /* 12. Latest Updates */
        .updates-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: var(--space-md);
        }
        .update-card-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          height: 300px;
          background-color: var(--bg-primary);
        }
        .update-date {
          font-size: 0.75rem;
          color: var(--text-muted);
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          margin-bottom: var(--space-md);
        }
        .update-card-item h4 {
          font-size: 1.25rem;
          font-family: var(--font-sans);
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: var(--space-xs);
          flex-grow: 1;
        }
        .update-card-item p {
          font-size: 0.90rem;
          line-height: 1.6;
          margin-bottom: var(--space-md);
        }
        .read-news-link {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-gold);
        }

        /* 13. CTA Banner */
        .service-cta-banner {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-light);
          border-radius: 16px;
          padding: 4.5rem 3rem;
          text-align: center;
        }
        @media (max-width: 768px) {
          .service-cta-banner {
            padding: 3rem 1.5rem;
          }
        }
        
        /* 14. Newsletter Area */
        .newsletter-box-inner {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: var(--space-lg);
          align-items: center;
          border-top: 1px solid var(--border-light);
          padding-top: var(--space-lg);
        }
        @media (max-width: 1080px) {
          .newsletter-box-inner {
            grid-template-columns: 1fr;
            gap: var(--space-md);
          }
        }
        .newsletter-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 0.5rem;
        }
        .newsletter-info h3 {
          font-size: 1.8rem;
          font-family: var(--font-serif);
          font-weight: 400;
        }
        .newsletter-submission-form {
          display: flex;
          border-bottom: 2px solid var(--text-primary);
          padding-bottom: 0.5rem;
          align-items: center;
        }
        .newsletter-input-field {
          background: none;
          border: none;
          outline: none;
          font-size: 1.15rem;
          font-family: var(--font-sans);
          font-weight: 400;
          color: var(--text-primary);
          width: 100%;
        }
        .newsletter-submit-btn {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-gold);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
