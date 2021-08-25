export interface SfConfig {
  urls: SfUrl;
  paths: SfPath;
}

export interface SfObject {
  object: object;
}

export interface SfUser {
  user: SfCredential;
}

export interface SfCredential {
  username: string;
  password: string;
  token?: string;
}

export interface SfdxLogoutConfig {
  json?: boolean;
  loglevel?: string;
  username?: string;
  apiversion?: string;
  all?: boolean;
  noprompt?: boolean;
}

export interface SfdxCredential {
  clientid: string;
  keyfilePath: string;
  username: string;
  url?: string;
  json?: boolean;
  loglevel?: string;
  setdefaultdevhubusername?: boolean;
  setdefaultusername?: boolean;
}

export interface SfdxQueryConfig {
  query: string;
  json?: boolean;
  loglevel?: string;
  apiversion?: string;
  usetoolingapi?: boolean;
  resultformat?: string;
  perflog?: boolean;
  outputLocation?: string;
}

export interface SfdxDeleteConfig {
  csvFilePath: string;
  sobjectType: string;
  json?: boolean;
  loglevel?: string;
  apiversion?: string;
  wait?: string;
}

interface SfUrl {
  baseUrl: string;
  domain?: string;
}

interface SfPath {
  soap: string;
  data: string;
  query: string;
}
