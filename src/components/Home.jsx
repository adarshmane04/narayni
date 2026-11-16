import React, { useState } from 'react';
import { PACKAGES, CONFIG, GROUPS, SERVICES, STEPS, REVIEWS, FAQS } from '../data.js';
import Packages from './Packages.jsx';
import IndiaMap from './IndiaMap.jsx';
import { copyText } from '../utils.js';

function Hero({ onEnquire }) {
  const [dest, setDest] = useState('custom');
  const [trav, setTrav] = useState(2);
  const [date, setDate] = useState('');
  return (
    <div className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Tours across India</span>
          <h1>Hotels, transport and guides, handled from first call to return.</h1>
          <p className="lead">Narayani Travel Agency plans trips for families, groups and pilgrim parties. Pick a ready package or ask us to build one around your dates and budget.</p>
          <div className="hero-cta">
            <a className="btn sun" href="#packages">Browse packages</a>
            <button className="btn ghost" type="button" onClick={() => onEnquire('custom')}>Ask for a custom trip</button>
          </div>
        </div>
        <form className="plan" onSubmit={e => { e.preventDefault(); onEnquire(dest, { trav, date }); }}>
          <h2>Plan a trip</h2>
          <p className="muted">Choose where and when. You get a message ready to send us.</p>
          <div className="field">
            <label htmlFor="q-dest">Destination</label>
            <select id="q-dest" value={dest} onChange={e => setDest(e.target.value)}>
              <option value="custom">Custom trip</option>
              {PACKAGES.map(p => <option key={p.id} value={p.id}>{p.name} ({p.nights}N/{p.nights + 1}D)</option>)}
            </select>
          </div>
          <div className="row2">
            <div className="field"><label htmlFor="q-trav">Travellers</label><input id="q-trav" type="number" min="1" max="60" value={trav} onChange={e => setTrav(e.target.value)} /></div>
            <div className="field"><label htmlFor="q-date">Travel date</label><input id="q-date" type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
          </div>
          <button className="btn" type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
}

function Trust() {
  const n = PACKAGES.map(p => p.nights);
  const tiles = [
    [PACKAGES.length, 'Ready tour packages'],
    [new Set(PACKAGES.map(p => p.cat)).size, 'Trip styles'],
    [Math.min(...n) + 'N to ' + Math.max(...n) + 'N', 'Trip lengths'],
    ['1 call', 'Hotels, cars and guides'],
  ];
  return (
    <div className="trust" aria-label="Agency highlights">
      <div className="wrap trust-grid">
        {tiles.map(([b, s]) => <div key={s}><b>{b}</b><span>{s}</span></div>)}
      </div>
    </div>
  );
}

function Contact({ toast }) {
  const items = [['Phone', CONFIG.phone], ['Email', CONFIG.email], ['Office', CONFIG.address], ['Hours', CONFIG.hours]];
  return (
    <section id="contact">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Contact</span>
          <h2>Talk to the team</h2>
          <p className="muted">Tap a value to select it, or use Copy.</p>
        </div>
        <div className="contact-grid">
          {items.map(([label, val]) => (
            <div className="cbox" key={label}>
              <span className="eyebrow">{label}</span>
              <span className="val">{val}</span>
              <button className="btn small ghost" type="button" style={{ alignSelf: 'flex-start' }}
                onClick={async () => toast((await copyText(val)) ? 'Copied' : 'Select the text and copy it')}>Copy</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TINT = { background: 'color-mix(in srgb,var(--brand) 5%,var(--bg))' };

export default function Home({ onEnquire, selPin, setSelPin, onShowMap, toast }) {
  const [demo, setDemo] = useState(true);
  return (
    <main>
      {demo && (
        <div className="demo">
          <div className="wrap">
            <span>Sample content: packages, prices, reviews and contact details are placeholders. Edit <code>src/data.js</code> to make them yours.</span>
            <button type="button" onClick={() => setDemo(false)}>Dismiss</button>
          </div>
        </div>
      )}
      <Hero onEnquire={onEnquire} />
      <Trust />
      <Packages onEnquire={onEnquire} onShowMap={onShowMap} />

      <section id="map" style={TINT}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Where we go</span>
            <h2>Every destination on one map</h2>
            <p className="muted">Select a pin to see the trip, the best months to travel, and a link to open the place in Google Maps.</p>
          </div>
          <IndiaMap selPin={selPin} setSelPin={setSelPin} onEnquire={onEnquire} />
        </div>
      </section>

      <section id="travellers">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Who we travel with</span>
            <h2>Trips built around the group, not the brochure</h2>
          </div>
          <div className="groups">
            {GROUPS.map(([h, p]) => <div className="group" key={h}><h3>{h}</h3><p>{p}</p></div>)}
          </div>
          <div className="services" aria-label="Services">{SERVICES.map(s => <span key={s}>{s}</span>)}</div>
        </div>
      </section>

      <section id="how" style={TINT}>
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">How it works</span><h2>From enquiry to departure in four steps</h2></div>
          <div className="steps">{STEPS.map(([h, p]) => <div className="step" key={h}><h3>{h}</h3><p>{p}</p></div>)}</div>
        </div>
      </section>

      <section id="reviews">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Reviews</span>
            <h2>What travellers say</h2>
            {CONFIG.reviewsAreSamples && <p className="muted">These are sample reviews. Replace them in <code>src/data.js</code> with real feedback from your travellers.</p>}
          </div>
          <div className="reviews">
            {REVIEWS.map(r => (
              <figure className="review" key={r.name}>
                <div className="stars" aria-label={r.stars + ' out of 5 stars'}>{'★'.repeat(r.stars) + '☆'.repeat(5 - r.stars)}</div>
                <blockquote>{r.text}</blockquote>
                <figcaption>{r.name}{r.trip ? ' · ' + r.trip : ''}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" style={TINT}>
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">FAQ</span><h2>Questions people ask before booking</h2></div>
          <div className="faq">{FAQS.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </div>
      </section>

      <Contact toast={toast} />

      <footer>
        <div className="wrap foot-grid">
          <span>&copy; {new Date().getFullYear()} {CONFIG.agency}. All rights reserved.</span>
          <nav aria-label="Footer"><a href="#packages">Packages</a><a href="#faq">FAQ</a><a href="#contact">Contact</a><a href="#login">Staff login</a></nav>
        </div>
      </footer>
    </main>
  );
}
