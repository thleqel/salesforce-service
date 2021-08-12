import SfService from '../SfService';
import * as fs from 'fs';
import * as nock from 'nock';

describe('service testing', () => {
  it('test login', async () => {
    const mockedResponse = fs.readFileSync(process.cwd() + '/src/api/__tests__/__resources__/soap.response.xml', {
      encoding: 'utf-8',
    });
    const scope = nock('https://test.salesforce.com').post('/services/Soap/u/51.0').reply(200, mockedResponse);

    const service = new SfService(process.cwd() + '/src/api/__tests__/__resources__/test.json');
    let res = await service.login({ username: 'sample@sample.com', password: 'abcFFF@1', token: '8175317uegjhadgqjh' });
    expect(res.status).toEqual(200);
  });
});
