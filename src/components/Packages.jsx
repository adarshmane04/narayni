import React, { useMemo, useState } from 'react';
import { PACKAGES, CATS } from '../data.js';
import { inr, dur } from '../utils.js';

const SORTS = {
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'nights-asc': (a, b) => a.nights - b.nights,
  'nights-desc': (a, b) => b.nights - a.nights,
};

export default function Packages({ onEnquire, onShowMap }) {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('default');
  const [budget, setBudget] = useState(0);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const out = PACKAGES.filter(p =>
      (cat === 'all' || p.cat === cat) &&
      (!budget || p.price <= budget) &&
      (!term || (p.name + ' ' + p.place + ' ' + p.hl.join(' ')).toLowerCase().includes(term)));
    return SORTS[sort] ? out.slice().sort(SORTS[sort]) : out;
  }, [cat, q, sort, budget]);

  return (
    <section id="packages">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Packages</span>
          <h2>Nine trips we run most often</h2>
          <p className="muted">Prices are per person on twin sharing, with hotels, local transport and a guide where the route needs one. Dates are flexible for groups.</p>
        </div>

        <div className="chips" role="group" aria-label="Filter packages">
          {[['all', 'All'], ...Object.entries(CATS)].map(([k, label]) => (
            <button key={k} className="chip" type="button" aria-pressed={cat === k} onClick={() => setCat(k)}>{label}</button>
          ))}
        </div>

        <div className="tools">
          <div className="field"><label htmlFor="pk-q">Search destination</label>
            <input id="pk-q" type="search" placeholder="Goa, Manali, pilgrimage..." value={q} onChange={e => setQ(e.target.value)} /></div>
          <div className="field sm"><label htmlFor="pk-sort">Sort by</label>
            <select id="pk-sort" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="default">Our picks</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="nights-asc">Shortest trip first</option>
              <option value="nights-desc">Longest trip first</option>
            </select></div>
          <div className="field sm"><label htmlFor="pk-budget">Budget per person</label>
            <select id="pk-budget" value={budget} onChange={e => setBudget(Number(e.target.value))}>
              <option value={0}>Any budget</option>
              <option value={15000}>Up to ₹15,000</option>
              <option value={25000}>Up to ₹25,000</option>
              <option value={35000}>Up to ₹35,000</option>
            </select></div>
        </div>
        <p className="pkg-count" aria-live="polite">{list.length} {list.length === 1 ? 'package' : 'packages'} shown</p>

        <div className="grid">
          {list.length === 0 && (
            <div className="empty" style={{ gridColumn: '1/-1' }}>
              <p>No package matches these filters. We can still plan a custom trip for you.</p>
              <button className="btn" type="button" onClick={() => onEnquire('custom')}>Ask for a custom trip</button>
            </div>
          )}
          {list.map(p => (
            <article className="pkg" key={p.id}>
              <div className="pkg-top" style={{ '--tone': `var(--t-${p.cat})` }}>
                <span className="pkg-cat">{CATS[p.cat]}</span>
                <span className="pkg-dur">{dur(p)}</span>
              </div>
              <div className="pkg-body">
                <h3>{p.name}</h3>
                <p className="muted" style={{ fontSize: '.88rem' }}>Best months: {p.best}</p>
                <ul>{p.hl.map(h => <li key={h}>{h}</li>)}</ul>
                <div className="pkg-foot">
                  <div className="price"><span className="from">from</span><strong>{inr(p.price)}</strong><span className="per"> per person</span></div>
                  <div className="pkg-actions">
                    <button className="btn small" type="button" onClick={() => onEnquire(p.id)}>Enquire</button>
                    <button className="btn small ghost" type="button" onClick={() => onShowMap(p.id)}>Show on map</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
