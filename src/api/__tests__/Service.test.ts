import SfService from '../SfService';
import * as fs from 'fs';
import * as nock from 'nock';

describe('service testing', () => {
  beforeAll(() => {
    const sampleResponseFile = process.cwd() + '/src/api/__tests__/__resources__/soap.response.xml';
    const mockedResponse = fs.readFileSync(sampleResponseFile, 'utf-8');
    const scope = nock('https://test.salesforce.com').post('/services/Soap/u/51.0').reply(200, mockedResponse);
    nock('https://test.salesforce.com').get('/services/data/v51.0/query/?q=select%20ID%20from%20Sample').reply(200),
      'query results';
  });
  it('get session information successfully', async () => {
    const testFile = process.cwd() + '/src/api/__tests__/__resources__/test.json';
    const service = new SfService(testFile);
    const role = { username: 'sample@sample.com', password: 'abcFFF@1', token: '8175317uegjhadgqjh' };
    const sessionInfor = await service.getSessionId(role);
    expect(sessionInfor.sid).toEqual('expectedSessionId');
    expect(sessionInfor.sidClient).toEqual('0055g00000CNYcwAAH');
  });

  it('query successfully', async () => {
    const testFile = process.cwd() + '/src/api/__tests__/__resources__/test.json';
    const service = new SfService(testFile);
    await service.query('select ID from Sample');
  });
});
