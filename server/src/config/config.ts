import path from 'path';
import { JWK } from 'jose';
import { requiredEnvJson, requiredEnvString, requiredEnvUrl } from './env-var';

const getEnvironmentVersion = <T>(local: T, development: T, production: T): T => {
  if (IS_DEVELOPMENT) {
    return development;
  }

  if (IS_PRODUCTION) {
    return production;
  }

  return local;
};

export const slack = {
  url: requiredEnvUrl('SLACK_URL'),
  channel: '#klage-notifications',
  messagePrefix: 'KAKA frontend NodeJS - ',
};

export const API_CLIENT_IDS = ['kaka-api', 'klage-kodeverk-api'];

const cwd = process.cwd(); // This will be the server folder, as long as the paths in the NPM scripts are not changed.
const serverDirectoryPath = cwd;
const frontendDirectoryPath = path.resolve(serverDirectoryPath, '../frontend');
export const frontendDistDirectoryPath = path.resolve(frontendDirectoryPath, './dist');

export const AZURE_APP_CLIENT_ID = requiredEnvString('AZURE_APP_CLIENT_ID');
export const AZURE_APP_WELL_KNOWN_URL = requiredEnvUrl('AZURE_APP_WELL_KNOWN_URL');
export const AZURE_APP_JWK = requiredEnvJson<JWK>('AZURE_APP_JWK');
export const VERSION = requiredEnvString('VERSION');
export const PORT = requiredEnvString('PORT', '8080');
export const NAIS_CLUSTER_NAME = requiredEnvString('NAIS_CLUSTER_NAME');
export const IS_PRODUCTION = NAIS_CLUSTER_NAME === 'prod-gcp';
const IS_DEVELOPMENT = NAIS_CLUSTER_NAME === 'dev-gcp';
export const IS_DEPLOYED = IS_PRODUCTION || IS_DEVELOPMENT;

export const ENVIRONMENT_NAME = getEnvironmentVersion('local', 'development', 'production');
export const APPLICATION_DOMAIN: string = getEnvironmentVersion(
  `http://localhost:${PORT}`,
  'https://kaka.dev.nav.no',
  'https://kaka.intern.nav.no'
);
