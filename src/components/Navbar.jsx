import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { practices } from "../data/mockDb";
import logoImg from "../assets/TNT.png";

export default function Navbar({ onSearchOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null); // 'practices' | 'about' | null
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
  }, [location]);

  useEffect(() => {
    const root = document.documentElement;
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("menu-open-lock");
      document.documentElement.classList.add("menu-open-lock");
    } else {
      document.body.classList.remove("menu-open-lock");
      document.documentElement.classList.remove("menu-open-lock");
    }
    return () => {
      document.body.classList.remove("menu-open-lock");
      document.documentElement.classList.remove("menu-open-lock");
    };
  }, [mobileMenuOpen]);

  const handleToggleMegaMenu = (menuName) => {
    setActiveMegaMenu(activeMegaMenu === menuName ? null : menuName);
  };

  // Close menus on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".nav-item-wrapper")) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-container">
          <Link to="/" className="logo-area" aria-label="Home" onClick={() => { setMobileMenuOpen(false); window.scrollTo(0, 0); }}>
            <img src={logoImg} alt="TNT & Associates Logo" width={842} height={595} className="navbar-logo-img" />
            <div className="logo-text">
              <span className="logo-brand">TNT &amp; ASSOCIATES</span>
              <span className="logo-sub">COMPANY SECRETARIES</span>
            </div>
          </Link>

          <nav className="nav-desktop">
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/people" className="nav-link">Our People</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          <div className="nav-actions">
            <button className="action-btn menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="mobile-drawer">
            <div className="mobile-drawer-links">
              <Link to="/about">About Us</Link>
              <Link to="/people">Our People</Link>
              <Link to="/services">Services</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        )}
      </header>

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--header-height);
          z-index: 1000;
          border-bottom: 1px solid transparent;
          background-color: transparent;
          display: flex;
          align-items: center;
          transition: var(--transition-smooth);
        }
        .navbar-header.scrolled {
          background-color: rgba(252, 251, 247, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-light);
          height: 70px;
        }
        [data-theme="dark"] .navbar-header.scrolled {
          background-color: rgba(10, 11, 13, 0.85);
          border-bottom: 1px solid var(--border-light);
        }
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .logo-area {
          display: flex;
          align-items: center;
          gap: clamp(0.5rem, 2vw, 0.85rem);
          text-decoration: none;
          min-width: 0;
        }
        .navbar-logo-img {
          height: clamp(50px, 10vw, 88px);
          max-width: 55vw;
          width: auto;
          object-fit: contain;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .logo-area:hover .navbar-logo-img {
          transform: scale(1.04);
        }
        .logo-v {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 2.2rem;
          line-height: 1;
          color: var(--accent-gold);
        }
        .logo-text {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .logo-brand {
          font-size: clamp(0.75rem, 2vw, 1.35rem);
          font-weight: 700;
          letter-spacing: 0.15em;
          line-height: 1.1;
          white-space: nowrap;
        }
        .logo-sub {
          font-size: clamp(0.4rem, 1vw, 0.65rem);
          font-weight: 600;
          letter-spacing: 0.2em;
          color: var(--text-muted);
          margin-top: 2px;
          white-space: nowrap;
        }
        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }
        @media (max-width: 1080px) {
          .nav-desktop {
            display: none;
          }
        }
        .nav-link, .nav-link-btn {
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .nav-link:hover, .nav-link-btn:hover {
          color: var(--text-primary);
        }
        .nav-item-wrapper {
          position: relative;
          height: var(--header-height);
          display: flex;
          align-items: center;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 220px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-light);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          padding: 1rem 0;
          z-index: 1000;
        }
        .dropdown-item {
          padding: 0.75rem 2rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }
        .dropdown-item:hover {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          padding-left: 2.5rem;
        }
        .mega-menu {
          position: fixed;
          top: var(--header-height);
          left: 0;
          width: 100vw;
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border-light);
          padding: 3rem 0;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: center;
          pointer-events: auto;
          z-index: 1000;
        }
        .navbar-header.scrolled .mega-menu {
          top: 70px;
        }
        .mega-menu-content {
          max-width: var(--max-width);
          width: 100%;
          margin: 0 auto;
          padding: 0 4rem;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
        }
        .mega-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border-right: 1px solid var(--border-light);
          padding-right: 3rem;
        }
        .mega-info h3 {
          font-size: 2.5rem;
          line-height: 1.2;
        }
        .mega-info p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .mega-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .mega-card {
          padding: 1.25rem;
          border: 1px solid transparent;
          transition: var(--transition-smooth);
        }
        .mega-card:hover {
          border-color: var(--border-light);
          background-color: var(--bg-secondary);
        }
        .mega-card h4 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          font-family: var(Times New Roman);
          font-weight: 600;
        }
        .mega-card p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .special-link-card {
          border-left: 2px solid var(--accent-gold);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .action-btn {
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 48px;
          min-height: 48px;
          transition: var(--transition-fast);
        }
        .action-btn:hover {
          color: var(--text-primary);
        }
        .menu-toggle {
          display: none;
        }
        @media (max-width: 1080px) {
          .menu-toggle {
            display: flex;
          }
        }
        .mobile-drawer {
          position: fixed;
          top: var(--header-height);
          left: 0;
          width: 100%;
          height: calc(100vh - var(--header-height));
          background-color: var(--bg-primary);
          z-index: 999;
          padding: 2rem;
          border-top: 1px solid var(--border-light);
          overflow-y: auto;
        }
        .mobile-drawer-links {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .mobile-drawer-links a {
          font-size: 1.6rem;
          font-family: var(Times New Roman);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-primary);
        }
        .chevron {
          transition: transform 0.3s ease;
        }
        .nav-item-wrapper:hover .chevron {
          transform: rotate(180deg);
        }
      `}</style>
    </>
  );
}
