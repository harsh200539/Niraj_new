import React, { useState, useEffect } from "react";
import logoImg from "../assets/TNT.png";

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("disclaimerAccepted");
    if (!accepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("disclaimerAccepted", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="disclaimer-overlay">
      <div className="disclaimer-box">
        <img src={logoImg} alt="TNT & Associates Logo" width={842} height={595} className="disclaimer-logo" />
        <h2 className="serif-display font-large">Regulatory Information</h2>
        <div className="disclaimer-divider"></div>
        <p className="disclaimer-text">
          As per regulatory standards governing professional services:
          <br /><br />
          The user wishes to gain more information about <strong>TNT &amp; Associates</strong> for their own information and use.
          The information about TNT &amp; Associates is provided to the user only on their specific request, and any information
          obtained or materials downloaded from this website is completely at the user's volition.
          Any transmission, receipt or use of this site would not create any professional relationship.
        </p>
        <div className="disclaimer-actions">
          <button className="btn-primary" onClick={handleAccept}>
            I Agree & Enter
          </button>
        </div>
      </div>

      <style>{`
        .disclaimer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: var(--bg-dark);
          color: #f4f3ec;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .disclaimer-box {
          background-color: #121316;
          border: 1px solid var(--accent-gold);
          max-width: 650px;
          width: 100%;
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          box-shadow: 0 30px 60px rgba(0,0,0,0.8);
        }
        .disclaimer-logo {
          height: 110px;
          width: auto;
          object-fit: contain;
          align-self: flex-start;
          margin-bottom: -0.5rem;
        }
        .disclaimer-box h2 {
          font-size: 2.2rem;
          color: var(--accent-gold);
        }
        .disclaimer-divider {
          width: 60px;
          height: 1px;
          background-color: var(--accent-gold);
        }
        .disclaimer-text {
          font-size: 0.95rem;
          line-height: 1.8;
          color: #a9abb3;
        }
        .disclaimer-actions {
          display: flex;
          justify-content: flex-start;
          margin-top: 1rem;
        }
        @media (max-width: 768px) {
          .disclaimer-box {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
