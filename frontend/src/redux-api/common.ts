import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const isLocalhost = window.location.hostname === 'localhost';
export const baseUrl = isLocalhost ? 'https://kaka.dev.nav.no/' : '/';
const mode: RequestMode | undefined = isLocalhost ? 'cors' : undefined;

export const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: `${baseUrl}api/kaka-api`,
    mode,
    credentials: 'include',
  }),
  {
    maxRetries: 3,
  }
);
