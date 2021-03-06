import { Handler } from 'express';
import { Client } from 'openid-client';
import { loginRedirect } from './login-redirect';
import { generateSessionIdAndSignature, getSessionIdAndSignature, setSessionCookie } from './session-utils';
import { getAccessTokenWithRefresh } from './tokens';

export const authMiddleware =
  (authClient: Client): Handler =>
  async (req, res, next) => {
    const session = getSessionIdAndSignature(req);
    if (session === null) {
      const [sessionId, signature] = generateSessionIdAndSignature();
      setSessionCookie(res, sessionId, signature);
      loginRedirect(authClient, sessionId, res, req.originalUrl);
      return;
    }

    const [sessionId, signature] = session;

    setSessionCookie(res, sessionId, signature); // Refresh the current session cookie on every request.

    try {
      // Misuse the Authorization header to not query Redis twice for the same data for the same request.
      const internalAccessToken = req.headers['Authorization'];
      const access_token =
        typeof internalAccessToken === 'string'
          ? internalAccessToken
          : await getAccessTokenWithRefresh(authClient, sessionId);
      req.headers['Authorization'] = access_token;
      next();
    } catch (error) {
      if (error instanceof Error || typeof error === 'string') {
        console.warn('Auth middleware:', error);
      }
      loginRedirect(authClient, sessionId, res, req.originalUrl);
      return;
    }
  };
