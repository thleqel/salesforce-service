import soapLogin from '../Login';
jest.mock('axios');

describe('login using soap api', () => {
  test('it should assign credential successfully', async () => {
    let envelope = await soapLogin.constructEnvelope({ username: 'abc', password: 'easy' });
    expect(envelope['env:Envelope']['env:Body'][0]['n1:login'][0]['n1:username']).toBe('abc');
    expect(envelope['env:Envelope']['env:Body'][0]['n1:login'][0]['n1:password']).toBe('easy');
  });

  test('it should combine token if token exists successfully', async () => {
    let envelope = await soapLogin.constructEnvelope({ username: 'abc', password: 'easy', token: 'sampleToken' });
    expect(envelope['env:Envelope']['env:Body'][0]['n1:login'][0]['n1:username']).toBe('abc');
    expect(envelope['env:Envelope']['env:Body'][0]['n1:login'][0]['n1:password']).toBe('easysampleToken');
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

  test('it should call login soap api successfully', async () => {
    await soapLogin.login({ username: 'abc', password: 'easy' });
  });
});

jest.resetAllMocks();
