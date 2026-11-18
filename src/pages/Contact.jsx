import React, { useState } from "react";
import { Phone, Mail, CheckCircle, MapPin } from "lucide-react";
import LinkedinIcon from "../components/LinkedinIcon";
import { offices, practices } from "../data/mockDb";
import logoImg from "../assets/TNT.png";

export default function Contact() {
  const [draftHref, setDraftHref] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", topic: "general", message: "" });

  const hqOffice = offices.find(o => o.id === "vadodara") || offices[0];
  const otherOffices = offices.filter(o => o.id !== "vadodara");

  const handleSubmit = (e) => {
    e.preventDefault();
    const topic = practices.find(p => p.id === formData.topic)?.name ?? "General Corporate Inquiry";
    const body = [`Name: ${formData.name}`, `Email: ${formData.email}`, "", formData.message].join("\r\n");
    const href = `mailto:niraj@nirajtrivedi-cs.com?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
    setDraftHref(href);
    window.location.href = href;
  };

  return (
    <div className="contact-page container section-padding fade-in-up">
      <div className="page-header">
        <span className="title-small accent-color">Contact Our Firm</span>
        <h1 className="title-display page-main-title">Schedule a Strategic Consultation</h1>
      </div>

      <div className="contact-grid">
        {/* Left Side: Office Information */}
        <div className="contact-left-col">
          <div className="active-office-details">
            {/* place <img src={logoImg} alt="TNT & Associates Logo" className="contact-hq-logo" /> */}
            <span className="title-small accent-color">Headquarters</span>
            <h2 className="serif-display hq-title">{hqOffice.city} Office</h2>
            <p className="office-address">{hqOffice.address}</p>

            <div className="office-meta-rows">
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hqOffice.address)}`} target="_blank" rel="noopener noreferrer" className="meta-row">
                <div className="meta-icon-wrapper"><MapPin size={16} /></div>
                <span>Directions to the Vadodara office ↗</span>
              </a>
              <a href={`tel:${hqOffice.phone}`} className="meta-row">
                <div className="meta-icon-wrapper"><Phone size={16} /></div>
                <span>{hqOffice.phone}</span>
              </a>
              <a href={`mailto:${hqOffice.email}`} className="meta-row">
                <div className="meta-icon-wrapper"><Mail size={16} /></div>
                <span>{hqOffice.email}</span>
              </a>
              <a href="mailto:niraj@nirajtrivedi-cs.com" className="meta-row">
                <div className="meta-icon-wrapper"><Mail size={16} /></div>
                <span>niraj@nirajtrivedi-cs.com</span>
              </a>
              <a href="https://www.linkedin.com/in/niraj-trivedi-5458a117" target="_blank" rel="noopener noreferrer" className="meta-row">
                <div className="meta-icon-wrapper"><LinkedinIcon size={16} /></div>
                <span>LinkedIn: CS Niraj Trivedi ↗</span>
              </a>
              {/* <div className="meta-row hours-row">
                <div className="meta-icon-wrapper"><Clock size={16} /></div>
                <div>
                  <strong>Business Hours</strong>
                  <p className="hours-detail">
                    Monday - Friday: 10:00 AM to 07:00 PM<br />
                    Saturday: By Appointment Only
                  </p>
                </div>
              </div> */}
            </div>
          </div>

          {/* Other Offices Grid - Moved to Left Column */}
          {otherOffices.length > 0 && (
            <div className="other-offices-section" style={{ marginTop: "4rem" }}>
              <span className="title-small accent-color" style={{ marginBottom: "1.5rem", display: "inline-block" }}>Branch & Associate Offices</span>
              <div className="other-offices-list" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {otherOffices.map((office) => (
                  <div key={office.id} className="other-office-card" style={{ border: "1px solid var(--border-light)", padding: "1.5rem", backgroundColor: "var(--bg-primary)", borderRadius: "12px", maxWidth: "420px" }}>
                    <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1.25rem", marginBottom: "1rem", color: "var(--text-primary)" }}>{office.city} Office</h3>
                    <p className="office-address" style={{ margin: 0, textAlign: "justify", textJustify: "inter-word", hyphens: "auto", WebkitHyphens: "auto" }}>{office.address}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Inquiry Form */}
        <div className="contact-right-col">
          <div className="contact-form-box">
            {!draftHref ? (
              <form onSubmit={handleSubmit} className="inquiry-form">
                <div className="form-header-box">
                  <h3>Submit an Inquiry</h3>
                  <p className="form-helper">Complete the fields below to open an email draft addressed to our office.</p>
                </div>

                <div className="form-fields">
                  <div className="form-row-2col">
                    <div className="input-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="custom-form-input"
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="emailAddress">Email Address</label>
                      <input
                        id="emailAddress"
                        type="email"
                        required
                        placeholder="e.g. john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="custom-form-input"
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="areaOfInterest">Area of Interest</label>
                    <select
                      id="areaOfInterest"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="custom-form-select"
                    >
                      <option value="general">General Corporate Inquiry</option>
                      {practices.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <label htmlFor="inquiryDetails">Inquiry Details</label>
                    <textarea
                      id="inquiryDetails"
                      rows={5}
                      required
                      placeholder="Please describe your requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="custom-form-textarea"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary form-submit-btn">Open Email Draft</button>
              </form>
            ) : (
              <div className="success-screen" role="status">
                <CheckCircle size={48} className="success-icon" />
                <h3 className="serif-display">Email Draft Ready</h3>
                <p>Send the draft from your email app to complete your inquiry. <a href={draftHref}>Open the draft again</a> if it did not open.</p>
                <button className="btn-primary" onClick={() => setDraftHref("")}>Back to Inquiry</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Other offices moved to the left column */}

      <style>{`
        .contact-page {
          padding-top: calc(var(--header-height) + 4rem);
          text-align: left;
        }
        .page-header {
          margin-bottom: 4rem;
          max-width: 800px;
        }
        .page-main-title {
          font-weight: 300;
          margin-top: 1rem;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        @media (max-width: 1080px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }
        .active-office-details {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .contact-hq-logo {
          height: 120px;
          width: auto;
          object-fit: contain;
          align-self: flex-start;
          margin-bottom: -0.5rem;
        }
        .hq-title {
          font-size: clamp(1.25rem, 4vw, 2.5rem);
          font-weight: 400;
          margin: 0;
        }
        .office-address {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 500px;
          margin: 0;
        }
        .office-meta-rows {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 1rem;
          min-width: 0;
        }
        .meta-row {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          font-size: 1.05rem;
          color: var(--text-secondary);
          transition: color 0.3s ease;
          text-decoration: none;
          min-width: 0;
        }
        .meta-row span {
          min-width: 0;
          word-break: break-word;
          overflow-wrap: break-word;
        }
        .meta-row:hover {
          color: var(--accent-gold);
        }
        .meta-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-light);
          color: var(--accent-gold);
          flex-shrink: 0;
        }
        .hours-row {
          align-items: flex-start;
        }
        .hours-detail {
          margin: 0.35rem 0 0 0;
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
        .contact-form-box {
          border: 1px solid var(--border-light);
          padding: 3rem;
          background-color: var(--bg-primary);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
        }
        @media (max-width: 768px) {
          .contact-form-box {
            padding: 2rem;
          }
        }
        .form-header-box {
          margin-bottom: 2.5rem;
        }
        .inquiry-form h3 {
          font-size: 1.5rem;
          font-family: var(--font-sans);
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
        }
        .form-helper {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }
        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .form-row-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .form-row-2col {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .input-group label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .custom-form-input,
        .custom-form-select,
        .custom-form-textarea {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-light);
          padding: 0.9rem 1.25rem;
          font-size: 0.95rem;
          color: var(--text-primary);
          outline: none;
          border-radius: 4px;
          font-family: var(--font-sans);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
          width: 100%;
        }
        .custom-form-input::placeholder,
        .custom-form-textarea::placeholder {
          color: var(--text-muted);
          opacity: 0.65;
        }
        .custom-form-input:hover,
        .custom-form-select:hover,
        .custom-form-textarea:hover {
          border-color: var(--text-muted);
        }
        .custom-form-input:focus,
        .custom-form-select:focus,
        .custom-form-textarea:focus {
          border-color: var(--accent-gold);
          background-color: var(--bg-primary);
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.12);
        }
        .custom-form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1.25rem center;
          padding-right: 3rem;
        }
        .custom-form-textarea {
          resize: vertical;
          min-height: 140px;
        }
        .form-submit-btn {
          margin-top: 2rem;
          width: 100%;
          justify-content: center;
          padding: 1rem;
          font-size: 0.9rem;
          letter-spacing: 0.15em;
        }
        .success-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
          padding: 2rem 0;
        }
        .success-icon {
          color: var(--accent-gold);
        }
      `}</style>
    </div>
  );
}
