import Config from './Config';
import { SfConfig, SfCredential } from './interfaces/Config';
import login from './SoapLogin';
import { parseStringPromise } from 'xml2js';
import axios, { AxiosRequestConfig } from 'axios';
import record from './Record';
import executeAnonymous from './ExecuteAnonymous';

export default class SfService {
  private sfConfig: SfConfig;

  constructor(opts: any) {
    const config: any = new Config(opts.configFile).getConfig();
    if (
      config === undefined ||
      config.urls === undefined ||
      config.urls.testUrl === undefined ||
      config.urls.baseUrl === undefined ||
      config.urls.domain === undefined ||
      config.paths === undefined ||
      config.paths.soap === undefined ||
      config.paths.data === undefined ||
      config.paths.query === undefined
    )
      throw new Error('There was a problem with configuration!');
    this.sfConfig = { urls: config.urls, paths: config.paths };
  }

  private async login(role: SfCredential) {
    return login.soapLogin(role, this.sfConfig);
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
      baseURL: this.sfConfig.urls.baseUrl,
      url: `${this.sfConfig.paths.query}${soqlQuery}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${process.env.SESSION_ID}`,
        'Content-Type': 'application/json',
      },
    };
    return axios.request(conf);
  }

  async getRecord(recordId: string) {
    return record.getRecord(recordId, this.sfConfig);
  }

  async createRecord(object: string, objectFields: JSON) {
    return record.createRecord(object, objectFields, this.sfConfig);
  }

  async updateRecord(recordId: string, objectFields: JSON) {
    return record.updateRecord(recordId, objectFields, this.sfConfig);
  }

  async deleteRecord(recordId: string) {
    return record.deleteRecord(recordId, this.sfConfig);
  }

  async executeAnonymousScript(script: string) {
    return executeAnonymous.executeAnonymous(script, this.sfConfig);
  }
}
