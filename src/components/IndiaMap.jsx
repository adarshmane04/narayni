import React from 'react';
import { PACKAGES, CATS, OUTLINE } from '../data.js';
import { inr, dur, pkgById } from '../utils.js';

const PX = 17.7, PY = 19;
const proj = (lon, lat) => [(lon - 68) * PX, (37.5 - lat) * PY];
const f1 = n => n.toFixed(1);

export default function IndiaMap({ selPin, setSelPin, onEnquire }) {
  const points = OUTLINE.map(([lo, la]) => proj(lo, la).map(f1).join(',')).join(' ');
  const a = proj(92.85, 12.3), a2 = proj(92.75, 10.5);
  const sel = pkgById(selPin) || PACKAGES[0];

  return (
    <div className="map-grid">
      <div className="map-box">
        <svg className="india" viewBox="0 0 540 610" role="group" aria-label="Map of India with our destinations">
          {[10, 20, 30].map(la => { const y = proj(68, la)[1]; return (
            <g key={la}><line className="grat" x1="0" x2="540" y1={y} y2={y} /><text className="gl" x="4" y={y - 4}>{la}°N</text></g>); })}
          {[70, 80, 90].map(lo => { const x = proj(lo, 0)[0]; return (
            <g key={lo}><line className="grat" x1={x} x2={x} y1="0" y2="610" /><text className="gl" x={x + 4} y="604">{lo}°E</text></g>); })}
          <polygon className="land" points={points} />
          <ellipse className="land" cx={f1(a[0])} cy={f1(a[1])} rx="3" ry="21" transform={`rotate(-6 ${f1(a[0])} ${f1(a[1])})`} />
          <ellipse className="land" cx={f1(a2[0])} cy={f1(a2[1])} rx="2.5" ry="10" />
          <text className="sea" x="22" y="440">Arabian Sea</text>
          <text className="sea" x="300" y="420">Bay of Bengal</text>
          {PACKAGES.map(p => {
            const [x, y] = proj(p.lon, p.lat), left = p.lab === 'l';
            return (
              <g key={p.id} className={'pin' + (p.id === selPin ? ' on' : '')} tabIndex={0} role="button"
                aria-label={`${p.place}, ${dur(p)}, from ${inr(p.price)}`}
                onClick={() => setSelPin(p.id)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelPin(p.id); } }}>
                <circle className="hit" cx={x} cy={y} r="18" />
                <circle className="dot" cx={x} cy={y} r="7" />
                <text x={x + (left ? -12 : 12)} y={y + 4} textAnchor={left ? 'end' : 'start'}>{p.place}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div>
        <div className="panel" aria-live="polite" style={{ '--tone': `var(--t-${sel.cat})` }}>
          <span className="tag">{CATS[sel.cat]}</span>
          <h3>{sel.name}</h3>
          <dl className="meta" style={{ margin: 0 }}>
            <div><dt>Duration</dt><dd>{dur(sel)}</dd></div>
            <div><dt>From</dt><dd>{inr(sel.price)}</dd></div>
            <div><dt>Best months</dt><dd>{sel.best}</dd></div>
          </dl>
          <ul>{sel.hl.map(h => <li key={h}>{h}</li>)}</ul>
          <div className="pkg-actions">
            <button className="btn" type="button" onClick={() => onEnquire(sel.id)}>Enquire about this trip</button>
            <a className="btn ghost" target="_blank" rel="noopener noreferrer"
              href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(sel.gq)}>Open in Google Maps</a>
          </div>
        </div>
        <div className="pinlist" style={{ marginTop: 14 }}>
          {PACKAGES.map(p => (
            <button key={p.id} className="chip" type="button" aria-pressed={p.id === selPin} onClick={() => setSelPin(p.id)}>{p.place}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
