import express from 'express';
import { VERSION } from '../config/version';

const router = express.Router();

const HEADERS = {
  'Content-Type': 'text/event-stream',
  Connection: 'keep-alive',
  'Cache-Control': 'no-cache',
};

export const setupVersionRoute = () => {
  router.get('/version', (req, res) => {
    res.writeHead(200, HEADERS);
    res.write('retry: 0\n');
    res.write(`data: ${VERSION}\n\n`);
  });

  return router;
};
