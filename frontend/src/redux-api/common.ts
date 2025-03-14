import { queryStringify } from '@app/functions/query-string';
import { setHeaders } from '@app/headers';
import { type FetchArgs, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const isLocalhost = window.location.hostname === 'localhost';
const mode: RequestMode | undefined = isLocalhost ? 'cors' : undefined;

export const baseQuery = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({
      mode,
      credentials: 'include',
      paramsSerializer: queryStringify,
      prepareHeaders: setHeaders,
    })(args, api, extraOptions);

    if (typeof result.error === 'undefined') {
      return result;
    }

    const { status } = result.error;

    if (status === 401) {
      if (!isLocalhost) {
        window.location.assign('/oauth2/login');
      }

      retry.fail(result.error);
    }

    if (status === 400 || status === 403 || status === 500) {
      retry.fail(result.error);
    }

    return result;
  },
  {
    maxRetries: 3,
  },
);
