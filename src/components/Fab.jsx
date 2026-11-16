import React from 'react';
import { CONFIG } from '../data.js';

export default function Fab() {
  const wa = CONFIG.whatsapp;
  const tel = CONFIG.phone.replace(/[^\d+]/g, '');
  const callHref = /\d{8,}/.test(tel) ? 'tel:' + tel : '#contact';
  return (
    <div className="fab">
      {wa && (
        <a className="wa" target="_blank" rel="noopener noreferrer"
          href={'https://wa.me/' + wa.replace(/\D/g, '') + '?text=' + encodeURIComponent('Hello ' + CONFIG.agency + ', I would like to plan a trip.')}>WhatsApp us</a>
      )}
      <a className="call" href={callHref}>Call us</a>
    </div>
  );
}
