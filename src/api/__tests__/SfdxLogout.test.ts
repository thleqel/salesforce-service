import { SfdxCredential, SfdxLogoutConfig } from '../interfaces/Config';
import SfdxService from '../SfdxService';

describe('logout from an authorised org', () => {
  const clientid: string = '3MVG9fe4g9fhX0E6iv.SMI9JzsqhANlluz3.o.J9vqs.d3NzWdsVwEopRR2zC0yi2dMPnvXu_ZboQ4qur.gKC';
  const keyfilePath: string = process.cwd() + '/src/api/__tests__/__resources__/server.key';
  const username: string = 'isilaen+test@deloitte.com.au';
  const alias: string = 'resilient-moose-k6rn5p-dev-ed';
  const service: SfdxService = new SfdxService(alias);
  const timeout: number = 20000;

  beforeEach(async () => {
    const credentials: SfdxCredential = {
      clientid: clientid,
      keyfilePath: keyfilePath,
      username: username
    };
    await service.authorise(credentials);
  }, timeout);

  it('should logout successfully', async () => {
    const logoutConfig: SfdxLogoutConfig = {
      username: username,
      noprompt: true
    };
    await service.logout(logoutConfig);
  }, timeout);
});
