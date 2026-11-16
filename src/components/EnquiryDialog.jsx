import React, { useEffect, useRef, useState } from 'react';
import { PACKAGES, CONFIG } from '../data.js';
import { inr, dur, pkgById, fmtDate, copyText, digits } from '../utils.js';

export default function EnquiryDialog({ init, onClose, toast }) {
  const ref = useRef(null);
  const msgRef = useRef(null);
  const [f, setF] = useState({
    pkg: pkgById(init.pkgId) ? init.pkgId : 'custom',
    trav: init.trav || 2, date: init.date || '', name: '', phone: '', notes: '',
  });
  const [msg, setMsg] = useState(null);
  const set = k => e => setF(s => ({ ...s, [k]: e.target.value }));

  useEffect(() => {
    const d = ref.current;
    try { d.showModal(); } catch (e) { d.setAttribute('open', ''); }
  }, []);

  const submit = e => {
    e.preventDefault();
    const p = pkgById(f.pkg);
    const n = Math.max(1, Number(f.trav) || 1);
    setMsg([
      'Hello ' + CONFIG.agency + ', I would like to enquire about ' + (p ? p.name + ' (' + dur(p) + ')' : 'a custom trip') + '.',
      'Travellers: ' + n,
      p ? 'Approx. package cost: ' + inr(p.price * n) + ' (from ' + inr(p.price) + ' per person, final quote to be confirmed)' : null,
      f.date ? 'Travel date: ' + fmtDate(f.date) : null,
      'Name: ' + f.name.trim(),
      'Phone: ' + f.phone.trim(),
      f.notes.trim() ? 'Notes: ' + f.notes.trim() : null,
    ].filter(Boolean).join('\n'));
  };

  const copy = async () => {
    if (await copyText(msg)) { toast('Copied'); return; }
    msgRef.current?.focus(); msgRef.current?.select(); toast('Select the text and copy it');
  };

  const wa = digits(CONFIG.whatsapp);

  return (
    <dialog ref={ref} aria-labelledby="enq-title" onClose={onClose}
      onClick={e => { if (e.target === ref.current) ref.current.close(); }}>
      <div className="dlg">
        <div className="dlg-head">
          <h2 id="enq-title" style={{ fontSize: '1.4rem' }}>Send an enquiry</h2>
          <button className="x" type="button" aria-label="Close" onClick={() => ref.current.close()}>&times;</button>
        </div>

        {!msg ? (
          <form className="stack" onSubmit={submit}>
            <div className="row2">
              <div className="field"><label htmlFor="en-name">Your name</label><input id="en-name" autoComplete="name" required value={f.name} onChange={set('name')} /></div>
              <div className="field"><label htmlFor="en-phone">Phone</label><input id="en-phone" type="tel" autoComplete="tel" required value={f.phone} onChange={set('phone')} /></div>
            </div>
            <div className="field">
              <label htmlFor="en-pkg">Destination</label>
              <select id="en-pkg" value={f.pkg} onChange={set('pkg')}>
                <option value="custom">Custom trip</option>
                {PACKAGES.map(p => <option key={p.id} value={p.id}>{p.name} ({dur(p)})</option>)}
              </select>
            </div>
            <div className="row2">
              <div className="field"><label htmlFor="en-trav">Travellers</label><input id="en-trav" type="number" min="1" max="60" required value={f.trav} onChange={set('trav')} /></div>
              <div className="field"><label htmlFor="en-date">Travel date</label><input id="en-date" type="date" value={f.date} onChange={set('date')} /></div>
            </div>
            <div className="field"><label htmlFor="en-notes">Notes</label><textarea id="en-notes" placeholder="Budget, hotel type, pickup city, anything else" value={f.notes} onChange={set('notes')} /></div>
            <button className="btn" type="submit">Prepare my message</button>
          </form>
        ) : (
          <div className="stack">
            <p>Your message is ready. Send it to us and we will reply with an itinerary and a quote.</p>
            <textarea ref={msgRef} className="msgbox" readOnly rows={8} aria-label="Enquiry message" value={msg} />
            <div className="hero-cta">
              {wa && <a className="btn sun" target="_blank" rel="noopener noreferrer" href={'https://wa.me/' + wa + '?text=' + encodeURIComponent(msg)}>Send on WhatsApp</a>}
              <button className="btn ghost" type="button" onClick={copy}>Copy message</button>
            </div>
            <p className="hint">{wa ? 'Opening WhatsApp does not send anything until you press send there.' : 'Copy this message and send it to us at ' + CONFIG.phone + '.'}</p>
          </div>
        )}
      </div>
    </dialog>
  );
}
