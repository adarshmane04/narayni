import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the built site work on GitHub Pages, Netlify or any static host.
export default defineConfig({ plugins: [react()], base: './' });
