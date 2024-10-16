import type http from 'node:http';
import type { Socket } from 'node:net';
import { getAzureADClient } from '@app/auth/get-auth-client';
import { getOnBehalfOfAccessToken } from '@app/auth/on-behalf-of';
import { API_CLIENT_IDS } from '@app/config/config';
import { getLogger } from '@app/logger';
import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const log = getLogger('proxy');

export const setupProxy = async () => {
  const authClient = await getAzureADClient();
  const router = Router();

  for (const appName of API_CLIENT_IDS) {
    const route = `/api/${appName}`;

    router.use(route, async (req, _, next) => {
      const authHeader = req.header('Authorization');

      if (typeof authHeader === 'string') {
        try {
          const obo_access_token = await getOnBehalfOfAccessToken(authClient, authHeader, appName);
          req.headers.authorization = `Bearer ${obo_access_token}`;
          req.headers['azure-ad-token'] = authHeader;
        } catch (error) {
          log.warn({ msg: 'Failed to prepare request with OBO token.', error, data: { route } });
        }
      }

      next();
    });

    router.use(
      route,
      createProxyMiddleware({
        target: `http://${appName}`,
        pathRewrite: {
          [`^/api/${appName}`]: '',
        },
        on: {
          error: (error, req, res) => {
            if (!isServerResponse(res)) {
              log.error({
                msg: 'Response is not a ServerResponse.',
                error,
                data: { appName, url: req.url, method: req.method },
              });

              return;
            }

            if (res.headersSent) {
              log.error({
                msg: 'Headers already sent.',
                error,
                data: {
                  appName,
                  statusCode: res.statusCode,
                  url: req.url,
                  method: req.method,
                },
              });

              return;
            }

            res.writeHead(500, { 'Content-Type': 'application/json' });
            const body = JSON.stringify({ error: `Failed to connect to API. Reason: ${error.message}` });
            res.end(body);
            log.error({
              msg: 'Failed to connect to API.',
              error,
              data: { appName, url: req.url, method: req.method },
            });
          },
        },
        changeOrigin: true,
      }),
    );
  }

  return router;
};

const isServerResponse = (
  res: http.ServerResponse<http.IncomingMessage> | Socket,
): res is http.ServerResponse<http.IncomingMessage> =>
  'headersSent' in res &&
  typeof res.headersSent === 'boolean' &&
  'writeHead' in res &&
  typeof res.writeHead === 'function' &&
  'end' in res &&
  typeof res.end === 'function';
