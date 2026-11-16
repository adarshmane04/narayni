import React, { useEffect, useMemo, useState } from 'react';
import { PACKAGES, STATUSES } from '../data.js';
import { pkgById, fmtDate, isoIn } from '../utils.js';

const LS_KEY = 'ntl_clients_v1';
const load = () => { try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch (e) { return []; } };

function DeleteButton({ onConfirm }) {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 3000);
    return () => clearTimeout(t);
  }, [armed]);
  return <button className="link" type="button" onClick={() => (armed ? onConfirm() : setArmed(true))}>{armed ? 'Confirm delete' : 'Delete'}</button>;
}

const EMPTY = { name: '', phone: '', pkg: 'custom', travellers: 2, date: '', status: 'Enquiry' };

export default function Dashboard({ onLogout }) {
  const [clients, setClients] = useState(load);
  const [q, setQ] = useState('');
  const [fs, setFs] = useState('all');
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(EMPTY);

  useEffect(() => { try { localStorage.setItem(LS_KEY, JSON.stringify(clients)); } catch (e) {} }, [clients]);

  const pkgName = c => (pkgById(c.pkg) ? pkgById(c.pkg).name : 'Custom trip');

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return clients.filter(c =>
      (fs === 'all' || c.status === fs) &&
      (!term || (String(c.name || '') + ' ' + String(c.phone || '') + ' ' + pkgName(c)).toLowerCase().includes(term)));
  }, [clients, q, fs]);

  const stats = useMemo(() => {
    const booked = clients.filter(c => ['Confirmed', 'Paid', 'Completed'].includes(c.status));
    return [
      [clients.length, 'Clients on file'],
      [clients.filter(c => c.status === 'Enquiry').length, 'Open enquiries'],
      [clients.filter(c => c.status === 'Confirmed' || c.status === 'Paid').length, 'Trips confirmed'],
      [booked.reduce((s, c) => s + (Number(c.travellers) || 0), 0), 'Travellers booked'],
    ];
  }, [clients]);

  const upcoming = useMemo(() => {
    const today = isoIn(0);
    return clients.filter(c => c.date && c.date >= today && c.status !== 'Cancelled' && c.status !== 'Completed')
      .sort((a, b) => (a.date < b.date ? -1 : 1)).slice(0, 6);
  }, [clients]);

  const newId = () => 'l' + Date.now() + Math.random().toString(36).slice(2, 6);
  const addClient = c => setClients(list => [{ ...c, id: newId(), createdAt: Date.now() }, ...list]);
  const setStatus = (id, status) => setClients(list => list.map(c => (c.id === id ? { ...c, status } : c)));
  const remove = id => setClients(list => list.filter(c => c.id !== id));
  const addSamples = () => {
    const rows = [
      { name: 'Rohan Deshmukh', phone: '98XXXXXXXX', pkg: 'goa', travellers: 4, date: isoIn(12), status: 'Confirmed', sample: true },
      { name: 'Sneha Kulkarni', phone: '97XXXXXXXX', pkg: 'manali', travellers: 2, date: isoIn(30), status: 'Paid', sample: true },
      { name: 'Patil family', phone: '99XXXXXXXX', pkg: 'shirdi', travellers: 6, date: isoIn(45), status: 'Enquiry', sample: true },
    ];
    setClients(list => [...rows.map(r => ({ ...r, id: newId(), createdAt: Date.now() })), ...list]);
  };
  const removeSamples = () => setClients(list => list.filter(c => !c.sample));

  const submit = e => {
    e.preventDefault();
    addClient({ ...form, name: form.name.trim(), phone: form.phone.trim(), travellers: Math.max(1, Number(form.travellers) || 1) });
    setForm(EMPTY); setAdding(false);
  };
  const setF = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <main>
      <div className="wrap dash">
        <div className="dash-head">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span className="eyebrow">Staff dashboard</span>
            <h2>Clients and bookings</h2>
            <div><span className="pillmode" data-mode="local">This device only</span></div>
            <p className="hint" style={{ maxWidth: '56ch' }}>Clients are saved in this browser only. Clearing browser data erases them, and other staff cannot see them. To share data between staff you need a small backend with a database.</p>
          </div>
          <button className="btn ghost" type="button" onClick={onLogout}>Sign out</button>
        </div>

        <div className="stats">
          {stats.map(([n, label]) => <div className="stat" key={label}><b>{n}</b><span>{label}</span></div>)}
        </div>

        <div className="dash-cols">
          <div>
            <div className="toolbar">
              <div className="field"><label htmlFor="f-q">Search</label><input id="f-q" type="search" placeholder="Name, phone or package" value={q} onChange={e => setQ(e.target.value)} /></div>
              <div className="field" style={{ flex: '0 1 170px' }}><label htmlFor="f-s">Status</label>
                <select id="f-s" value={fs} onChange={e => setFs(e.target.value)}>
                  <option value="all">All statuses</option>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select></div>
              <button className="btn" type="button" aria-expanded={adding} onClick={() => setAdding(a => !a)}>Add client</button>
            </div>

            {adding && (
              <form className="addpanel" onSubmit={submit}>
                <div className="addgrid">
                  <div className="field"><label htmlFor="c-name">Client name</label><input id="c-name" required autoFocus value={form.name} onChange={setF('name')} /></div>
                  <div className="field"><label htmlFor="c-phone">Phone</label><input id="c-phone" inputMode="tel" required value={form.phone} onChange={setF('phone')} /></div>
                  <div className="field"><label htmlFor="c-pkg">Package</label>
                    <select id="c-pkg" value={form.pkg} onChange={setF('pkg')}>
                      <option value="custom">Custom trip</option>
                      {PACKAGES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select></div>
                  <div className="field"><label htmlFor="c-trav">Travellers</label><input id="c-trav" type="number" min="1" max="60" required value={form.travellers} onChange={setF('travellers')} /></div>
                  <div className="field"><label htmlFor="c-date">Travel date</label><input id="c-date" type="date" value={form.date} onChange={setF('date')} /></div>
                  <div className="field"><label htmlFor="c-status">Status</label>
                    <select id="c-status" value={form.status} onChange={setF('status')}>{STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                </div>
                <button className="btn" type="submit">Save client</button>
              </form>
            )}

            <div className="tablewrap">
              <table>
                <thead><tr><th>Client</th><th>Phone</th><th>Package</th><th className="num">Travellers</th><th>Travel date</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {visible.map(c => {
                    const status = STATUSES.includes(c.status) ? c.status : 'Enquiry';
                    return (
                      <tr key={c.id}>
                        <td><b>{c.name || 'Unnamed'}</b>{c.sample && <span className="sample">Sample</span>}</td>
                        <td>{c.phone}</td>
                        <td>{pkgName(c)}</td>
                        <td className="num">{Number(c.travellers) || 0}</td>
                        <td>{c.date ? fmtDate(c.date) : 'Not set'}</td>
                        <td>
                          <select className={'pill s-' + status} aria-label={'Status for ' + (c.name || 'client')} value={status} onChange={e => setStatus(c.id, e.target.value)}>
                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td><DeleteButton onConfirm={() => remove(c.id)} /></td>
                      </tr>
                    );
                  })}
                  {clients.some(c => c.sample) && (
                    <tr><td colSpan={7}><button className="link" type="button" style={{ color: 'var(--muted)' }} onClick={removeSamples}>Remove all sample rows</button></td></tr>
                  )}
                </tbody>
              </table>
              {visible.length === 0 && (
                <div className="empty">
                  {clients.length === 0 ? (
                    <>
                      <p>No clients yet. Add your first client, or load three sample rows to see how this works.</p>
                      <button className="btn ghost" type="button" onClick={addSamples}>Add sample clients</button>
                    </>
                  ) : <p>No clients match this search.</p>}
                </div>
              )}
            </div>
          </div>

          <aside className="upcoming" aria-label="Upcoming trips">
            <h3>Upcoming trips</h3>
            <div>
              {upcoming.length === 0 && <p className="muted">No dated trips yet. Add a travel date to a client and it shows here.</p>}
              {upcoming.map(c => (
                <div className="up-row" key={c.id}>
                  <b>{c.name || 'Unnamed'}</b>
                  <small>{pkgName(c)} · {Number(c.travellers) || 0} travellers</small>
                  <small>{fmtDate(c.date)}</small>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
