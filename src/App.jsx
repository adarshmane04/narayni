import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PACKAGES } from './data.js';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import EnquiryDialog from './components/EnquiryDialog.jsx';
import Fab from './components/Fab.jsx';

const readHash = () => decodeURIComponent((window.location.hash || '').slice(1));

function readStaff() {
  try { return sessionStorage.getItem('ntl_staff') === '1'; } catch (e) { return false; }
}

export default function App() {
  const [hash, setHash] = useState(readHash());
  const [staff, setStaffState] = useState(readStaff());
  const [enq, setEnq] = useState(null);            // {pkgId, trav, date} or null
  const [selPin, setSelPin] = useState(PACKAGES[0].id);
  const [toast, setToast] = useState('');
  const toastTimer = useRef();

  const showToast = useCallback(msg => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 3200);
  }, []);

  const setStaff = v => {
    setStaffState(v);
    try { v ? sessionStorage.setItem('ntl_staff', '1') : sessionStorage.removeItem('ntl_staff'); } catch (e) {}
  };

  useEffect(() => {
    const onHash = () => setHash(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const view = (hash === 'login' || hash === 'dashboard') ? (staff ? 'dash' : 'login') : 'home';

  useEffect(() => {
    document.body.classList.toggle('in-app', view !== 'home');
    if (view !== 'home') { window.scrollTo(0, 0); return; }
    const t = hash ? document.getElementById(hash) : null;
    if (t) t.scrollIntoView(); else window.scrollTo(0, 0);
  }, [hash, view]);

  const openEnquiry = (pkgId = 'custom', opts = {}) => setEnq({ pkgId, ...opts, k: Date.now() });
  const goMap = id => { setSelPin(id); document.getElementById('map')?.scrollIntoView(); };
  const go = h => { window.location.hash = h; };

  return (
    <>
      <Header staff={staff} onEnquire={() => openEnquiry('custom')} />
      {view === 'home' && <Home onEnquire={openEnquiry} selPin={selPin} setSelPin={setSelPin} onShowMap={goMap} toast={showToast} />}
      {view === 'login' && <Login onSuccess={() => { setStaff(true); go('dashboard'); }} />}
      {view === 'dash' && <Dashboard onLogout={() => { setStaff(false); go('home'); }} toast={showToast} />}
      {enq && <EnquiryDialog key={enq.k} init={enq} onClose={() => setEnq(null)} toast={showToast} />}
      {view === 'home' && <Fab />}
      {toast && <div id="toast" role="status" aria-live="polite">{toast}</div>}
    </>
  );
}
