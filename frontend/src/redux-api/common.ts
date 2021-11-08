import { FetchArgs, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const isLocalhost = window.location.hostname === 'localhost';
export const baseUrl = isLocalhost ? 'https://kaka.dev.nav.no/' : '/';
const mode: RequestMode | undefined = isLocalhost ? 'cors' : undefined;

export const baseQuery = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: `${baseUrl}api/kaka-api`,
      mode,
      credentials: 'include',
    })(args, api, extraOptions);

    if (typeof result.error === 'undefined') {
      return result;
    }

    const { status } = result.error;

    if (status === 401 || status === 403) {
      window.location.reload();
      retry.fail(result.error);
    }

    if (status === 400) {
      retry.fail(result.error);
    }

    return result;
  },
  {
    maxRetries: 3,
  }
);
