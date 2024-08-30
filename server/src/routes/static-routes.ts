import fs from 'node:fs';
import { VERSION, frontendDistDirectoryPath } from '@app/config/config';
import { ENVIRONMENT } from '@app/config/env';
import { type Request, type Response, Router, static as expressStatic } from 'express';

const router = Router();

const indexFile = fs
  .readFileSync(`${frontendDistDirectoryPath}/index.html`, 'utf8')
  .replace('{{ENVIRONMENT}}', ENVIRONMENT)
  .replace('{{VERSION}}', VERSION);

const sendIndexFile = (_: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(indexFile);
};

export const setupStaticRoutes = () => {
  router.get('/', sendIndexFile);

  router.use(expressStatic(frontendDistDirectoryPath, { index: false }));

  router.get('*', sendIndexFile);

  return router;
};
