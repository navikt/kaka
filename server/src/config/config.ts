import path from 'node:path';
import { isLocal } from '@app/config/env';
import { requiredEnvString } from '@app/config/env-var';

const KAKA_API = 'kaka-api';
export const KLAGE_KODEVERK_API = 'klage-kodeverk-api';
export const API_CLIENT_IDS = [KAKA_API, KLAGE_KODEVERK_API];

const cwd = process.cwd(); // This will be the server folder, as long as the paths in the NPM scripts are not changed.
const serverDirectoryPath = cwd;
const frontendDirectoryPath = path.resolve(serverDirectoryPath, '../frontend');
export const frontendDistDirectoryPath = path.resolve(frontendDirectoryPath, './dist');

const defaultValue = isLocal ? 'local' : undefined;

export const PROXY_VERSION = requiredEnvString('VERSION', defaultValue);
export const NAIS_CLUSTER_NAME = requiredEnvString('NAIS_CLUSTER_NAME', defaultValue);
export const START_TIME = Date.now();
