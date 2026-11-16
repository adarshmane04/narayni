import { PACKAGES } from './data.js';

export const inr = n => '₹' + Number(n).toLocaleString('en-IN');
export const dur = p => p.nights + 'N/' + (p.nights + 1) + 'D';
export const pkgById = id => PACKAGES.find(p => p.id === id);
export const fmtDate = d => d ? new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'}) : '';
export const isoIn = days => { const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString().slice(0, 10); };
export const digits = v => String(v || '').replace(/\D/g, '');

export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch (e) { return false; }
}
