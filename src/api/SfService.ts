import Config from './Config'
import { type SfConfig, type SfCredential } from './interfaces/Config'
import login from './SoapLogin'
import { parseStringPromise } from 'xml2js'
import axios, { type AxiosRequestConfig } from 'axios'
import record from './Record'
import executeAnonymous from './ExecuteAnonymous'

export default class SfService {
  private readonly sfConfig: SfConfig

  constructor (opts: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const config: any = new Config(opts.configFile).getConfig()
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
    ) { throw new Error('There was a problem with configuration!') }
    this.sfConfig = { urls: config.urls, paths: config.paths }
  }

  private async login (role: SfCredential): Promise<any> {
    return await login.soapLogin(role, this.sfConfig)
  }

  async getSessionId (role: SfCredential): Promise<any> {
    const response = await this.login(role)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const xmlData = await parseStringPromise(response.data)
    process.env.SESSION_ID = xmlData['soapenv:Envelope']['soapenv:Body'][0].loginResponse[0].result[0].sessionId[0]
    process.env.SID_CLIENT_ID = xmlData['soapenv:Envelope']['soapenv:Body'][0].loginResponse[0].result[0].userId[0]
    return {
      sid: process.env.SESSION_ID,
      sidClient: process.env.SID_CLIENT_ID
    }
  }

  async query (soqlQuery: string): Promise<any> {
    const conf: AxiosRequestConfig = {
      baseURL: this.sfConfig.urls.baseUrl,
      url: `${this.sfConfig.paths.query}${soqlQuery}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${process.env.SESSION_ID}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.request(conf)
  }

  async getRecord (recordId: string): Promise<any> {
    return await record.getRecord(recordId, this.sfConfig)
  }

  async createRecord (object: string, objectFields: JSON): Promise<any> {
    return await record.createRecord(object, objectFields, this.sfConfig)
  }

  async updateRecord (recordId: string, objectFields: JSON): Promise<any> {
    return await record.updateRecord(recordId, objectFields, this.sfConfig)
  }

  async deleteRecord (recordId: string): Promise<any> {
    return await record.deleteRecord(recordId, this.sfConfig)
  }

  async executeAnonymousScript (script: string): Promise<any> {
    return await executeAnonymous.executeAnonymous(script, this.sfConfig)
  }
}
