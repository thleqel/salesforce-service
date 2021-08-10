import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as fs from 'fs';
import { parseStringPromise } from 'xml2js';

interface SfCredential {
  username: string;
  password: string;
  token?: string;
}

class SoapLogin {
  async login(role: SfCredential) {
    const envelope = await this.constructEnvelope(role);
    const conf: AxiosRequestConfig = {
      baseURL: 'https://test.salesforce.com/services',
      url: '/Soap/u/51.0',
      method: 'post',
      headers: {
        'Content-Type': 'text/xml',
        SOAPAction: 'login',
        'Accept-Encoding': 'gzip, deflate, br',
      },
      data: envelope,
    };
    const res: AxiosResponse = await axios.request(conf);
    return res;
  }

  async constructEnvelope(role: SfCredential) {
    if (role.username === '' || role.password === '') {
      throw new Error('Missing login details!');
    }
    const abstractEnvelope = await this.loadEnvelop();
    abstractEnvelope['env:Envelope']['env:Body'][0]['n1:login'][0]['n1:username'] = role.username;
    if (role.token !== undefined) {
      abstractEnvelope['env:Envelope']['env:Body'][0]['n1:login'][0]['n1:password'] = `${role.password}${role.token}`;
    } else {
      abstractEnvelope['env:Envelope']['env:Body'][0]['n1:login'][0]['n1:password'] = role.password;
    }
    return abstractEnvelope;
  }

  loadEnvelop() {
    const envelop = fs.readFileSync(process.cwd() + '/src/api/resources/login-env.xml');
    return parseStringPromise(envelop);
  }
}

export default new SoapLogin();
