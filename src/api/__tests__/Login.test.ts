import soapLogin from '../SoapLogin';
import { parseStringPromise } from 'xml2js';

describe('login using soap api', () => {
  test('it should assign credential successfully', async () => {
    let envelope: any = await soapLogin.constructEnvelope({ username: 'abc', password: 'easy' });
    envelope = await parseStringPromise(envelope);
    expect(envelope['env:Envelope']['env:Body'][0]['n1:login'][0]['n1:username'][0]).toBe('abc');
    expect(envelope['env:Envelope']['env:Body'][0]['n1:login'][0]['n1:password'][0]).toBe('easy');
  });

  test('it should combine token if token exists successfully', async () => {
    let envelope: any = await soapLogin.constructEnvelope({ username: 'abc', password: 'easy', token: 'sampleToken' });
    envelope = await parseStringPromise(envelope);
    expect(envelope['env:Envelope']['env:Body'][0]['n1:login'][0]['n1:username'][0]).toBe('abc');
    expect(envelope['env:Envelope']['env:Body'][0]['n1:login'][0]['n1:password'][0]).toBe('easysampleToken');
  });

  test('it should raise exception if username is empty', async () => {
    expect(async () => {
      await soapLogin.constructEnvelope({ username: '', password: 'easy' });
    }).rejects.toThrow(Error);
  });

  test('it should raise exception if password is empty', async () => {
    expect(async () => {
      await soapLogin.constructEnvelope({ username: 'abc', password: '' });
    }).rejects.toThrow(Error);
  });
});
