import axios, { AxiosRequestConfig } from 'axios';
import * as fs from 'fs';
import { SfConfig, SfCredential } from './interfaces/Config';

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
    return `<?xml version="1.0" encoding="utf-8" ?>
    <env:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">
      <env:Body>
        <n1:login xmlns:n1="urn:partner.soap.sforce.com">
          <n1:username></n1:username>
          <n1:password></n1:password>
        </n1:login>
      </env:Body>
    </env:Envelope>`;
  }
}

export default new SoapLogin();
