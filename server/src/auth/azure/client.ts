import { Issuer } from 'openid-client';
import { azureClientMetadata, client_jwks, discovery_url } from '../../config/azure-config';
import { getLogger } from '../../logger';

const log = getLogger('auth');

export const getAzureClient = async () => {
  try {
    const azureIssuer = await Issuer.discover(discovery_url);
    return new azureIssuer.Client(azureClientMetadata, client_jwks);
  } catch (error) {
    log.error({ msg: `Failed to discover Azure AD OpenID issuer.`, error });

    throw error;
  }
};
