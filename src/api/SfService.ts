import Config from './Config';
import { SfConfig, SfCredential } from './interfaces/SfConfig';
import login from './Login';
import { parseStringPromise } from 'xml2js';
import axios, { AxiosRequestConfig } from 'axios';

export default class SfService {
  private config: any;

  constructor(configFile: string) {
    this.config = new Config(configFile).getConfig();
  }

  private async login(role: SfCredential) {
    if (
      this.config === undefined ||
      this.config.urls === undefined ||
      this.config.urls.testUrl === undefined ||
      this.config.urls.baseUrl === undefined ||
      this.config.urls.domain === undefined ||
      this.config.paths === undefined ||
      this.config.paths.soap === undefined ||
      this.config.paths.data === undefined ||
      this.config.paths.query === undefined
    )
      throw new Error('There was a problem with configuration!');
    const sfConfig: SfConfig = { urls: this.config.urls, paths: this.config.paths };
    return login.soapLogin(role, sfConfig);
  }

  async getSessionId(role: SfCredential) {
    const response = await this.login(role);
    const xmlData = await parseStringPromise(response.data);
    process.env.SESSION_ID = xmlData['soapenv:Envelope']['soapenv:Body'][0].loginResponse[0].result[0].sessionId[0];
    process.env.SID_CLIENT_ID = xmlData['soapenv:Envelope']['soapenv:Body'][0].loginResponse[0].result[0].userId[0];
    return {
      sid: process.env.SESSION_ID,
      sidClient: process.env.SID_CLIENT_ID,
    };
  }

  async query(soqlQuery: string) {
    const conf: AxiosRequestConfig = {
      baseURL: this.config.urls.baseUrl,
      url: `${this.config.paths.query}${soqlQuery}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${process.env.SESSION_ID}`,
        'Content-Type': 'application/json',
      },
    };
    return axios.request(conf);
  }
}
