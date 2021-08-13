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

interface SfUrl {
  baseUrl: string;
  domain?: string;
}

interface SfPath {
  soap: string;
  data: string;
  query: string;
}
