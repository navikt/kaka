import { serverConfig } from './server-config';

export const getEnvironmentVersion = <T>(local: T, development: T, production: T): T => {
  if (isDeployedToDev) {
    return development;
  }
  if (isDeployedToProd) {
    return production;
  }
  return local;
};

export const isDeployedToDev = serverConfig.cluster === 'dev-gcp';
export const isDeployedToProd = serverConfig.cluster === 'prod-gcp';
export const isDeployed = isDeployedToDev || isDeployedToProd;

export const environmentName = getEnvironmentVersion('local', 'development', 'production');

export const applicationDomain: string = getEnvironmentVersion(
  `http://localhost:${serverConfig.port}`,
  'https://kaka.dev.nav.no',
  'https://kaka.intern.nav.no'
);
