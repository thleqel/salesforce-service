import { SfdxCredential, SfdxUpsertConfig } from '../interfaces/Config';
import SfdxService from '../SfdxService';
import * as fs from 'fs';

describe('upsert records into an authorised org', () => {
  const clientid: string = '3MVG9fe4g9fhX0E6iv.SMI9JzsqhANlluz3.o.J9vqs.d3NzWdsVwEopRR2zC0yi2dMPnvXu_ZboQ4qur.gKC';
  const keyfilePath: string = process.cwd() + '/src/api/__tests__/__resources__/server.key';
  const username: string = 'isilaen+test@deloitte.com.au';
  const alias: string = 'resilient-moose-k6rn5p-dev-ed';
  const getRandomNum = () => Math.floor(Math.random() * 1000000);
  const randomNumFile = getRandomNum();
  const csvPathUpsert: string = process.cwd() + '/src/api/__tests__/__resources__/__tmp__/' + randomNumFile + '.csv';
  const csvPathQuery: string = process.cwd() + '/src/api/__tests__/__resources__/__tmp__/' + getRandomNum() + '.csv';
  const sobjectName = 'Account';
  const numRecords = 2;
  const service: SfdxService = new SfdxService(alias);
  const timeout: number = 40000;

  beforeEach(async () => {
    const credentials: SfdxCredential = {
      clientid: clientid,
      keyfilePath: keyfilePath,
      username: username
    };
    await service.authorise(credentials);
  }, timeout);

  afterEach(async () => {
    fs.unlinkSync(csvPathUpsert);
    fs.unlinkSync(csvPathQuery);
  }, timeout);

  it('should upsert records successfully', async () => {
    const upsertConfig: SfdxUpsertConfig = {
      externalid: 'Id',
      csvFilePath: csvPathUpsert,
      sobjectType: sobjectName,
      wait: '2'
    };
    const createAccount = () => {
      return {
        Name: `${randomNumFile}`
      }
    }
    service.createNewGenerator(sobjectName, createAccount, ['Name']);
    await service.generateAndUpsert(sobjectName, numRecords, upsertConfig);
    const records = await service.queryAndProcess(`SELECT Id FROM ${sobjectName} WHERE Name='${randomNumFile}'`, csvPathQuery);
    expect(records).toHaveLength(numRecords);
  }, timeout);
});
