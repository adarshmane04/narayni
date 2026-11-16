import React, { useState } from 'react';

const LINKS = [['packages', 'Packages'], ['map', 'Map'], ['how', 'How it works'], ['reviews', 'Reviews'], ['faq', 'FAQ'], ['contact', 'Contact']];

export default function Header({ staff, onEnquire }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="bar">
      <div className="wrap bar-in">
        <a className="brand" href="#home" aria-label="Narayani Travel Agency, home">
          <svg className="mark" viewBox="0 0 40 40" aria-hidden="true">
            <rect width="40" height="40" rx="9" />
            <path d="M11 29V11l18 18V11" fill="none" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="31" cy="9" r="3.2" />
          </svg>
          <span><b>Narayani</b><small>Travel Agency</small></span>
        </a>
        <nav aria-label="Sections" id="main-nav" className={open ? 'open' : ''}>
          {LINKS.map(([id, label]) => <a key={id} href={'#' + id} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
        <div className="bar-cta">
          <a className="btn small ghost" href={staff ? '#dashboard' : '#login'}>{staff ? 'Dashboard' : 'Staff login'}</a>
          <button className="btn small" type="button" onClick={onEnquire}>Enquire</button>
          <button className="menu-btn" type="button" aria-label="Open menu" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(o => !o)}>&#9776;</button>
        </div>
      </div>
    </header>
  );
}
