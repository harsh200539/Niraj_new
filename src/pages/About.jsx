import React, { useState } from "react";
import { aboutOverview, visionMission, leadershipMessage, corporateValues, achievementsMilestones, people } from "../data/mockDb";
import { Shield, Target, Quote } from "lucide-react";
import logoImg from "../assets/TNT.png";

export default function About() {
  const [activeSection, setActiveSection] = useState("overview"); // 'overview' | 'values' | 'journey' | 'recognition'

  return (
    <div className="about-page container section-padding fade-in-up">
      <div className="page-header">
        {/* <img src={logoImg} alt="TNT & Associates Logo" className="page-header-logo" /> */}
        <span className="title-small accent-color">About Our Firm</span>
        <h1 className="title-display page-main-title">A legacy of trust, built on strategic integrity.</h1>
      </div>

      {/* Dynamic Content Panel */}
      <div className="about-content-panel">

        {/* Overview Section */}
        <div className="tab-pane fade-in-up">
          <div className="overview-text">

            {aboutOverview.paragraphs ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
                  gap: "3rem 4rem",
                  alignItems: "start"
                }}
              >
                {/* Left Column: First 3 points */}
                <ul
                  style={{
                    listStyleType: "none",
                    paddingLeft: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "2.25rem",
                    margin: 0
                  }}
                >
                  {aboutOverview.paragraphs.slice(0, 3).map((para, idx) => (
                    <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                      <span
                        style={{
                          color: "var(--accent-gold)",
                          fontSize: "1.35rem",
                          lineHeight: "1.4",
                          flexShrink: 0
                        }}
                      >
                        •
                      </span>
                      <span className="about-body-para" style={{ margin: 0 }}>
                        {para}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Right Column: Remaining 2 points */}
                <ul
                  style={{
                    listStyleType: "none",
                    paddingLeft: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "2.25rem",
                    margin: 0
                  }}
                >
                  {aboutOverview.paragraphs.slice(3, 5).map((para, idx) => (
                    <li key={idx + 3} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                      <span
                        style={{
                          color: "var(--accent-gold)",
                          fontSize: "1.35rem",
                          lineHeight: "1.4",
                          flexShrink: 0
                        }}
                      >
                        •
                      </span>
                      <span className="about-body-para" style={{ margin: 0 }}>
                        {para}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                <p className="about-body-para">{aboutOverview.body1}</p>
                <p className="about-body-para">{aboutOverview.body2}</p>
              </>
            )}
          </div>


          {/* Leadership Quote Message Box Below the Bullet Points */}
          {(() => {
            const partner = people.find(p => p.id === "niraj-trivedi");
            return (
              <div className="leadership-message-box" style={{ width: "100%", maxWidth: "1050px", margin: "4rem auto 0" }}>
                <div className="leadership-message-inner">
                  {/* Quote side */}
                  <div className="leadership-quote-side">
                    <Quote className="quote-mark" size={28} />
                    <blockquote className="message-quote" style={{ fontSize: "1.1rem", lineHeight: "1.85" }}>
                      "{leadershipMessage.quote}"
                    </blockquote>
                    <div className="quote-author-details" style={{ marginTop: "1.75rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div className="author-divider"></div>
                      <div>
                        <strong style={{ display: "block", fontSize: "0.95rem", letterSpacing: "0.05em" }}>{leadershipMessage.author}</strong>
                        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em" }}>{leadershipMessage.designation}</span>
                      </div>
                    </div>
                  </div>
                  {/* Portrait side */}
                  {partner && (
                    <div className="leadership-portrait-side">
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="leadership-portrait-img"
                      />
                      <div className="leadership-portrait-caption">
                        <span className="portrait-name">{partner.name}</span>
                        <span className="portrait-title">{partner.title}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Values Section */}
        <div className="tab-pane fade-in-up" style={{ marginTop: '6rem' }}>
          <div className="values-section-wrapper">
            <div className="vision-mission-row">
              <div className="card-item">
                <h3><Target size={20} className="icon-gold" /> Our Vision</h3>
                <p>{visionMission.vision}</p>
              </div>
              <div className="card-item">
                <h3><Shield size={20} className="icon-gold" /> Our Mission</h3>
                <p>{visionMission.mission}</p>
              </div>
            </div>
            <div className="values-list-col" style={{ marginTop: '4rem' }}>
              <h3 className="section-subtitle" style={{ marginBottom: '0.75rem' }}>Core Guiding Principles</h3>
              <p className="about-body-para" style={{ maxWidth: '100%', marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
                Our work is guided by principles that define our professional standards and commitment to every client –
              </p>
              <div className="principles-grid">
                {corporateValues.map((val, idx) => (
                  <div key={idx} className="principle-card">
                    <h4>{val.title}</h4>
                    <p>{val.body}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Achievements / Milestones Section */}
            <div className="achievements-section" style={{ marginTop: "5rem" }}>
              <h3 className="section-subtitle" style={{ marginBottom: "2rem" }}>
                Achievements / Milestones
              </h3>
              <div
                className="achievements-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                  gap: "2rem"
                }}
              >
                {achievementsMilestones.map((item, idx) => (
                  <div
                    key={idx}
                    className="principle-card"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      padding: "2rem",
                      borderBottom: "none",
                      borderTop: "3px solid var(--accent-gold)"
                    }}
                  >
                    <h4 style={{ fontSize: "1.15rem", marginBottom: "0.75rem", fontWeight: 600 }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>



      </div>

      <style>{`
        .about-page {
          padding-top: calc(var(--header-height) + 4rem);
          text-align: left;
        }
        .page-header {
          margin-bottom: 4rem;
          max-width: 100%;
        }
        .page-header-logo {
          height: 120px;
          width: auto;
          object-fit: contain;
          margin-bottom: 1.25rem;
          display: block;
        }
        .page-main-title {
          font-weight: 300;
          margin-top: 1rem;
        }
        .about-tabs {
          display: flex;
          border-bottom: 1px solid var(--border-light);
          gap: 2rem;
          margin-bottom: 4rem;
          overflow-x: auto;
        }
        .about-tab-btn {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
          padding-bottom: 1rem;
          position: relative;
        }
        .about-tab-btn.active {
          color: var(--text-primary);
        }
        .about-tab-btn.active::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--text-primary);
        }
        .overview-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 5rem;
          align-items: start;
        }
        @media (max-width: 1080px) {
          .overview-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }
        .panel-headline {
          font-size: clamp(1.25rem, 5vw, 3.5rem);
          line-height: 1.25;
          margin-bottom: 2rem;
        }
        .about-body-para {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          text-align: justify;
        }
        .leadership-message-box {
          border: 1px solid var(--border-light);
          background-color: var(--bg-secondary);
          overflow: hidden;
        }
        .leadership-message-inner {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 0;
        }
        @media (max-width: 900px) {
          .leadership-message-inner {
            grid-template-columns: 1fr;
          }
        }
        .leadership-quote-side {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          border-right: 1px solid var(--border-light);
        }
        @media (max-width: 900px) {
          .leadership-quote-side {
            border-right: none;
            border-bottom: 1px solid var(--border-light);
          }
        }
        .leadership-portrait-side {
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .leadership-portrait-img {
          width: 100%;
          height: 100%;
          min-height: 320px;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        @media (max-width: 900px) {
          .leadership-portrait-img {
            min-height: 260px;
            object-position: center 20%;
          }
        }
        .leadership-portrait-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%);
          padding: 1.5rem 1.25rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .portrait-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .portrait-title {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .author-divider {
          width: 32px;
          height: 2px;
          background: var(--accent-gold);
          flex-shrink: 0;
        }
        .quote-mark {
          color: var(--accent-gold);
        }
        .message-quote {
          text-align: justify;
          text-justify: inter-word;
          text-align-last: left;
          hyphens: none;
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-style: italic;
          line-height: 1.6;
          color: var(--text-primary);
        }
        .quote-author-details {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .quote-author-details strong {
          font-size: 1rem;
          font-weight: 600;
        }
        .quote-author-details span {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .message-body {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .vision-mission-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }
        @media (max-width: 768px) {
          .vision-mission-row {
            grid-template-columns: 1fr;
          }
        }
        .card-item {
          border: 1px solid var(--border-light);
          padding: 2.5rem;
          background-color: var(--bg-secondarymak);
        }
        .card-item h3 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .card-item p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .icon-gold {
          color: var(--accent-gold);
        }
        .section-subtitle {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 0.5rem;
        }
        .principles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem 2.5rem;
        }
        @media (max-width: 1080px) {
          .principles-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .principles-grid {
            grid-template-columns: 1fr;
          }
        }
        .principle-card {
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-width: 0;
        }

        .principle-card h4 {
          font-size: 1.15rem;
          font-family: var(--font-sans);
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .principle-card p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }


      `}</style>
    </div>
  );
}
