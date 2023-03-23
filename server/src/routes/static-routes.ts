import { Router, static as expressStatic } from 'express';
import { frontendDistDirectoryPath } from '@app/config/config';

const router = Router();

export const setupStaticRoutes = () => {
  router.get('/', (req, res) => {
    res.status(200).sendFile('index.html', { root: frontendDistDirectoryPath });
  });

  router.use(expressStatic(frontendDistDirectoryPath, { index: false }));

  router.get('*', (req, res) => {
    res.status(200).sendFile('index.html', { root: frontendDistDirectoryPath });
  });

  return router;
};
