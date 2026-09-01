/**
 * Base URL for the backend API. Empty string keeps requests relative (same-origin
 * deploys, e.g. Vercel). Set VITE_API_URL when the frontend is hosted separately
 * from the API (e.g. static build on cPanel, API on Vercel/Railway/etc.).
 */
export const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const apiUrl = (path: string) => `${API_BASE_URL}${path}`;
