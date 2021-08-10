import * as fs from 'fs';
import { parseStringPromise } from 'xml2js';

class SoapLogin {
  async login(role: { username: string; password: string; token?: string; }) {
    let envelope = await this.constructEnvelope(role)
  }

  async constructEnvelope(role: { username: string; password: string; token?: string}) {
    if (role.username == '' || role.password == '') {
      throw new Error('Missing login details!')
    }
    let abstractEnvelope = await this.loadEnvelop();
    abstractEnvelope['env:Envelope']['env:Body'][0]['n1:login'][0]['n1:username'] = role.username
    if (role.token != undefined) {
      abstractEnvelope['env:Envelope']['env:Body'][0]['n1:login'][0]['n1:password'] = `${role.password}${role.token}`
    } else {
      abstractEnvelope['env:Envelope']['env:Body'][0]['n1:login'][0]['n1:password'] = role.password
    }
    return abstractEnvelope;
  }

  loadEnvelop() {
    let envelop = fs.readFileSync(process.cwd() + '/src/api/resources/login-env.xml');
    return parseStringPromise(envelop);
  }


}

export default new SoapLogin();
