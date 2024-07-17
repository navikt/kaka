import fs from 'fs';
import { Request, Response, Router, static as expressStatic } from 'express';
import { VERSION, frontendDistDirectoryPath } from '@app/config/config';
import { ENVIRONMENT } from '@app/config/env';

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
