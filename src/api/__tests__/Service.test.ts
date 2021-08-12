import SfService from '../SfService';
import * as fs from 'fs';
import axios from 'axios';

jest.mock('axios');
describe('service testing', () => {
  it('test login', async () => {
    const mockedResponse = fs.readFileSync(process.cwd() + '/src/api/__tests__/__resources__/soap.response.xml', {
      encoding: 'utf-8',
    });
    // @ts-ignore
    axios.get.mockResolvedValue({ a: 1 });
    const service = new SfService(process.cwd() + '/src/api/__tests__/__resources__/test.json');
    let res = await service.login({ username: 'sample@sample.com', password: 'abcFFF@1', token: '8175317uegjhadgqjh' });
  });
});
jest.resetAllMocks();
