import { APPLICATION_NAME } from './config';
import { serverConfig } from './server-config';

export const getEnvironmentName = <T>(local: T, development: T, production: T): T => {
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

export const environmentName = getEnvironmentName('local', 'development', 'production');

export const applicationDomain: string = getEnvironmentName(
  `http://localhost:${serverConfig.port}`,
  `https://${APPLICATION_NAME}.dev.nav.no`,
  `https://${APPLICATION_NAME}.intern.nav.no`
);
