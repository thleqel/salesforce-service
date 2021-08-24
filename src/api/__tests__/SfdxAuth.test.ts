import { SfdxCredential } from '../interfaces/Config';
import sfdxAuth from '../SfdxAuth';

describe('authorise an org using the JWT bearer flow', () => {
  it('should construct the command for jwt bearer flow using just the required parameters', () => {
    const credentials : SfdxCredential = {
      clientid: '123',
      keyfilePath: './example/server.key',
      username: 'user@example.com'
    }
    const cmd : string = sfdxAuth.constructCommand(credentials, 'ex');
    expect(cmd).toBe('sfdx auth:jwt:grant -i 123 -f ./example/server.key -u user@example.com -a ex');
  });

  it('should construct the command for jwt bearer flow using optional parameters', () => {
    const credentials : SfdxCredential = {
      clientid: '123',
      keyfilePath: './example/server.key',
      username: 'user@example.com',
      url: 'https://test.salesforce.com/',
      loglevel: 'trace',
      setdefaultdevhubusername: true,
      setdefaultusername: true,
      json: true
    }
    const cmd : string = sfdxAuth.constructCommand(credentials, 'ex');
    expect(cmd).toBe('sfdx auth:jwt:grant -i 123 -f ./example/server.key -u user@example.com -a ex -r https://test.salesforce.com/ --loglevel trace -d -s --json');
  });
});
