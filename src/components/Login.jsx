import React, { useState } from 'react';
import { CONFIG } from '../data.js';

export default function Login({ onSuccess }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');

  const submit = e => {
    e.preventDefault();
    if (u.trim() === CONFIG.staffUser && p === CONFIG.staffPass) { setErr(''); onSuccess(); }
    else setErr('Username or password is not correct.');
  };

  return (
    <main>
      <div className="wrap login">
        <form className="login-card" onSubmit={submit} autoComplete="on">
          <div>
            <span className="eyebrow">Staff only</span>
            <h2 style={{ marginTop: 6 }}>Sign in</h2>
          </div>
          <div className="field"><label htmlFor="u">Username</label><input id="u" name="username" autoComplete="username" required value={u} onChange={e => setU(e.target.value)} /></div>
          <div className="field"><label htmlFor="p">Password</label><input id="p" name="password" type="password" autoComplete="current-password" required value={p} onChange={e => setP(e.target.value)} /></div>
          <div className="err" role="alert">{err}</div>
          <button className="btn" type="submit">Sign in</button>
          <p className="hint">Demo sign-in: <b>admin</b> / <b>narayani123</b>. Change both in <code>src/data.js</code>. <a href="#home">Back to website</a></p>
        </form>
      </div>
    </main>
  );
}
