import SfService from '../SfService';
import * as fs from 'fs';
import * as nock from 'nock';

describe('service testing', () => {
  const testFile = process.cwd() + '/src/api/__tests__/__resources__/test.json';
  const sampleResponseFile = process.cwd() + '/src/api/__tests__/__resources__/soap.response.xml';
  const service = new SfService({ configFile: testFile });
  const mockedResponse = fs.readFileSync(sampleResponseFile, 'utf-8');
  const testUrl = 'https://test.salesforce.com';

  beforeAll(() => {
    nock(testUrl).post('/services/Soap/u/51.0').reply(200, mockedResponse);
    nock(testUrl)
      .get(/\/services\/data\/v51.0\/query\/\?q\=(.*)/)
      .reply(200, 'query results');
    nock(testUrl)
      .get(/\/services\/data\/v51.0\/ui-api\/records\/(.*)/)
      .reply(200, 'got record');
    nock(testUrl)
      .post(/\/services\/data\/v51.0\/ui-api\/records/)
      .reply(200, 'created record');
    nock(testUrl)
      .patch(/\/services\/data\/v51.0\/ui-api\/records\/(.*)/)
      .reply(200, 'updated record');
    nock(testUrl)
      .delete(/\/services\/data\/v51.0\/ui-api\/records\/(.*)/)
      .reply(200, 'deleted record');
  });
  it('get session information successfully', async () => {
    const role = { username: 'sample@sample.com', password: 'abcFFF@1', token: '8175317uegjhadgqjh' };
    const sessionInfor = await service.getSessionId(role);
    expect(sessionInfor.sid).toEqual('expectedSessionId');
    expect(sessionInfor.sidClient).toEqual('0055g00000CNYcwAAH');
  });

  it('query successfully', async () => {
    const response = await service.query('select ID from Sample');
    expect(response.data).toEqual('query results');
  });

  it('get record successfully', async () => {
    const response = await service.getRecord('123');
    expect(response.data).toEqual('got record');
  });

  it('create record successfully', async () => {
    const data: JSON = JSON.parse('{"field1": "value1"}');
    const response = await service.createRecord('name', data);
    expect(response.data).toEqual('created record');
  });

  it('update record successfully', async () => {
    const data: JSON = JSON.parse('{"field1": "value1"}');
    const response = await service.updateRecord('123', data);
    expect(response.data).toEqual('updated record');
  });

  it('delete record successfully', async () => {
    const response = await service.deleteRecord('123');
    expect(response.data).toEqual('deleted record');
  });
});
