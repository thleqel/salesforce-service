import { SfdxCredential } from '../interfaces/Config';
import sfdxAuth from '../SfdxAuth';

describe('authorise an org using the JWT bearer flow', () => {
  it('should authorise an org successfully', async () => {
    jest.setTimeout(10000);
    const credentials: SfdxCredential = {
      clientid: '3MVG9fe4g9fhX0E5emxgf6351e_4U1Q6xjrxzzNKyRxX3ijrwRH5yxKLynZ8_GGEY.Jlybt.bTwzAgkYQoJXS',
      keyfilePath: process.cwd() + '/src/api/__tests__/__resources__/server.key',
      username: 'rinrinsilaen@gmail.com'
    }
    await sfdxAuth.jwtAuth(credentials, 'private217-dev-ed');
  });
});
