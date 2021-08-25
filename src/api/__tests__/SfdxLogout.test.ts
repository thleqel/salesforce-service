import { SfdxCredential, SfdxLogoutConfig } from '../interfaces/Config';
import sfdxAuth from '../SfdxAuth';

describe('logout from an authorised org', () => {
  const clientid: string = '3MVG9fe4g9fhX0E5emxgf6351e_4U1Q6xjrxzzNKyRxX3ijrwRH5yxKLynZ8_GGEY.Jlybt.bTwzAgkYQoJXS';
  const keyfilePath: string = process.cwd() + '/src/api/__tests__/__resources__/server.key';
  const username: string = 'rinrinsilaen@gmail.com';
  const alias: string = 'private217-dev-ed';

  beforeEach(async () => {
    jest.setTimeout(20000);
    const credentials: SfdxCredential = {
      clientid: clientid,
      keyfilePath: keyfilePath,
      username: username
    };
    await sfdxAuth.jwtAuth(credentials, alias);
  });

  it('should logout successfully', async () => {
    const logoutConfig: SfdxLogoutConfig = {
      username: username,
      noprompt: true
    };
    await sfdxAuth.logout(logoutConfig);
  });
});
