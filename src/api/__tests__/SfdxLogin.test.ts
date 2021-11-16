import { SfdxCredential } from '../interfaces/Config';
import SfdxService from '../SfdxService';

describe('authorise an org using the JWT bearer flow', () => {
  it('should authorise an org successfully', async () => {
    const credentials: SfdxCredential = {
      clientid: '3MVG9fe4g9fhX0E6iv.SMI9JzsqhANlluz3.o.J9vqs.d3NzWdsVwEopRR2zC0yi2dMPnvXu_ZboQ4qur.gKC',
      keyfilePath: process.cwd() + '/src/api/__tests__/__resources__/server.key',
      username: 'isilaen+test@deloitte.com.au'
    };
    const service: SfdxService = new SfdxService('resilient-moose-k6rn5p-dev-ed');
    await service.authorise(credentials);
  }, 20000);
});
