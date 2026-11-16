# Narayani Travel Agency Website (React)

A travel agency website built with React and Vite. It has tour packages with search, budget filter and sorting, an interactive India map, an enquiry form that builds a ready-to-send message, reviews, an FAQ, a staff login and a client dashboard.

## Run it on your computer

You need Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the address it prints, usually http://localhost:5173.

## Build for publishing

```bash
npm run build
```

This creates a `dist` folder. Upload the contents of `dist` to any static host (Netlify, Vercel, GitHub Pages or your hosting plan).

### GitHub Pages (automatic)

1. Push this project to your GitHub repository on the `main` branch.
2. In the repository, open Settings, then Pages, and set Source to **GitHub Actions**.
3. Every push to `main` now builds and publishes the site. The workflow is in `.github/workflows/deploy.yml`.

## Project structure

| Path | Purpose |
| --- | --- |
| `src/data.js` | All your content: agency details, packages, reviews, FAQ, steps |
| `src/App.jsx` | Page routing, enquiry dialog state, toast messages |
| `src/components/Header.jsx` | Top bar and mobile menu |
| `src/components/Home.jsx` | Hero, highlights, map section, travellers, how it works, reviews, FAQ, contact, footer |
| `src/components/Packages.jsx` | Package cards with category filter, search, budget and sorting |
| `src/components/IndiaMap.jsx` | Interactive map and trip panel |
| `src/components/EnquiryDialog.jsx` | Enquiry form and message builder |
| `src/components/Login.jsx` | Staff sign-in |
| `src/components/Dashboard.jsx` | Client list, status, search, upcoming trips |
| `src/components/Fab.jsx` | Floating WhatsApp and Call buttons |
| `src/styles.css` | All styling, with light and dark mode |

## Make it yours

Open `src/data.js`.

### CONFIG

```js
export const CONFIG = {
  agency: 'Narayani Travel Agency',
  phone: '+91 98XXX XXXXX',
  whatsapp: '',            // digits with country code, for example 919812345678
  email: 'hello@narayani-travels.example',
  address: 'Office address, City, State, PIN',
  hours: 'Mon to Sat, 10 am to 7 pm',
  staffUser: 'admin',
  staffPass: 'narayani123',
  reviewsAreSamples: true  // set to false after you add real reviews
};
```

Replace the phone, email and address with real details. Fill in `whatsapp` to show the WhatsApp buttons.

### PACKAGES

Each package is one object:

```js
{id:'goa', name:'Goa Beach Break', cat:'beach', nights:3, price:14500,
 place:'Goa', lon:73.95, lat:15.45, lab:'l', best:'Nov to Feb', gq:'Goa, India',
 hl:['North and South Goa beaches','Old Goa churches','Sunset river cruise']}
```

| Field | Meaning |
| --- | --- |
| `id` | Short unique name, no spaces |
| `name` | Package title |
| `cat` | `hills`, `beach`, `heritage` or `pilgrim` |
| `nights` | Number of nights (days are nights + 1) |
| `price` | Price per person in rupees |
| `place` | Label shown next to the map pin |
| `lon`, `lat` | Position of the pin on the map |
| `lab` | `'l'` puts the pin label on the left, `'r'` on the right |
| `best` | Best months to travel |
| `gq` | Text used for the Google Maps link |
| `hl` | Three highlights shown on the card |

Add an object, and a new package card and map pin appear.

### REVIEWS, FAQS, GROUPS, STEPS

These lists are in the same file. Replace the three sample reviews with real feedback (with the traveller's permission), then set `reviewsAreSamples` to `false`. Edit `FAQS` so the answers match your real cancellation and payment terms.

## Staff login and client data

- Default sign-in is `admin` / `narayani123`. Change both in `CONFIG`.
- The login only locks the dashboard screen. Anyone can read the password in the site's code, so it is not real security.
- Clients are saved in the browser (local storage). Data stays on that one computer, clearing browser data erases it, and other staff cannot see it.
- For shared data and real logins you need a small backend with a database. Ask Claude to add one.

## Limits to know about

- Enquiries are not stored or emailed. Visitors send them through WhatsApp or by copying the message.
- Map pins use a simplified India outline, so positions are approximate.
- The sample packages, prices, reviews and contact details must be replaced before you publish.
