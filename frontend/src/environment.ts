enum EnvString {
  PROD = 'production',
  DEV = 'development',
  LOCAL = 'local',
}

interface EnvironmentVariables {
  readonly environment: EnvString;
  readonly version: string;
  readonly isProduction: boolean;
  readonly isDevelopment: boolean;
  readonly isLocal: boolean;
  readonly isDeployed: boolean;
}

class Environment implements EnvironmentVariables {
  public readonly environment: EnvString;
  public readonly version: string;
  public readonly isProduction: boolean;
  public readonly isDevelopment: boolean;
  public readonly isLocal: boolean;
  public readonly isDeployed: boolean;

  constructor() {
    const { environment, version, isProduction, isDevelopment, isLocal, isDeployed } = this.init();
    this.environment = environment;
    this.version = version;
    this.isProduction = isProduction;
    this.isDevelopment = isDevelopment;
    this.isLocal = isLocal;
    this.isDeployed = isDeployed;
  }

  private init(): EnvironmentVariables {
    const environment = this.getEnvironment();
    const version = __APP_VERSION__;
    const isProduction = environment === EnvString.PROD;
    const isDevelopment = environment === EnvString.DEV;
    const isLocal = environment === EnvString.LOCAL;
    const isDeployed = !isLocal;

    return { environment, version, isProduction, isDevelopment, isLocal, isDeployed };
  }

  private getEnvironment(): EnvString {
    const env = document.documentElement.getAttribute('data-environment');

    if (env === EnvString.PROD || env === EnvString.DEV || env === EnvString.LOCAL) {
      return env;
    }

    return EnvString.LOCAL;
  }
}

export const ENVIRONMENT = new Environment();
