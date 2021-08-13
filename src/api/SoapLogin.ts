import axios, { AxiosRequestConfig } from 'axios';
import * as fs from 'fs';
import { SfConfig, SfCredential } from './interfaces/SfConfig';

class SoapLogin {
  async soapLogin(role: SfCredential, config: SfConfig) {
    const envelope = await this.constructEnvelope(role);
    const conf: AxiosRequestConfig = {
      baseURL: config.urls.baseUrl,
      url: config.paths.soap,
      method: 'post',
      headers: {
        'Content-Type': 'text/xml',
        SOAPAction: 'login',
        'Accept-Encoding': 'gzip, deflate, br',
      },
      data: envelope,
    };
    return axios.request(conf);
  }

  async constructEnvelope(role: SfCredential) {
    if (role.username === '' || role.password === '') {
      throw new Error('Missing login details!');
    }
    let abstractEnvelope: string = this.loadEnvelop();
    abstractEnvelope = abstractEnvelope.replace(
      '<n1:username></n1:username>',
      `<n1:username>${role.username}</n1:username>`,
    );
    if (role.token !== undefined) {
      abstractEnvelope = abstractEnvelope.replace(
        '<n1:password></n1:password>',
        `<n1:password>${role.password}${role.token}</n1:password>`,
      );
    } else {
      abstractEnvelope = abstractEnvelope.replace(
        '<n1:password></n1:password>',
        `<n1:password>${role.password}</n1:password>`,
      );
    }
    return abstractEnvelope;
  }

  loadEnvelop() {
    return fs.readFileSync(process.cwd() + '/src/api/resources/login-env.xml', { encoding: 'utf-8' });
  }
}

export default new SoapLogin();
