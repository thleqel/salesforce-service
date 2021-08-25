import { SfdxQueryConfig, SfdxDeleteConfig, SfdxCredential, SfdxLogoutConfig } from '../interfaces/Config';
import sfdxDelete from '../SfdxDelete';
import sfdxQuery from '../SfdxQuery';
import sfdxAuth from '../SfdxAuth';

describe('commands are constructed correctly', () => {
  it('should construct the command for jwt bearer flow using just the required parameters', () => {
    const credentials: SfdxCredential = {
      clientid: '123',
      keyfilePath: './example/server.key',
      username: 'user@example.com'
    }
    const cmd: string = sfdxAuth.constructLoginCommand(credentials, 'ex');
    expect(cmd).toBe('sfdx auth:jwt:grant -i 123 -f ./example/server.key -u user@example.com -a ex');
  });

  it('should construct the command for jwt bearer flow using optional parameters', () => {
    const credentials: SfdxCredential = {
      clientid: '123',
      keyfilePath: './example/server.key',
      username: 'user@example.com',
      url: 'https://test.salesforce.com/',
      loglevel: 'trace',
      setdefaultdevhubusername: true,
      setdefaultusername: true,
      json: true
    }
    const cmd: string = sfdxAuth.constructLoginCommand(credentials, 'ex');
    expect(cmd).toBe('sfdx auth:jwt:grant -i 123 -f ./example/server.key -u user@example.com -a ex -r https://test.salesforce.com/ --loglevel trace -d -s --json');
  });

  it('should construct the command for bulk delete using just the required parameters', () => {
    const config: SfdxDeleteConfig = {
      sobjectType: 'Account',
      csvFilePath: './example/records_to_delete.csv'
    }
    const cmd: string = sfdxDelete.constructCommand(config, 'ex');
    expect(cmd).toBe('sfdx force:data:bulk:delete -u ex -s Account -f ./example/records_to_delete.csv');
  });

  it('should construct the command for bulk delete using optional parameters', () => {
    const config: SfdxDeleteConfig = {
      sobjectType: 'Account',
      csvFilePath: './example/records_to_delete.csv',
      json: true,
      loglevel: 'trace',
      apiversion: '51.0',
      wait: '1'
    }
    const cmd: string = sfdxDelete.constructCommand(config, 'ex');
    expect(cmd).toBe('sfdx force:data:bulk:delete -u ex -s Account -f ./example/records_to_delete.csv --json --loglevel trace --apiversion 51.0 -w 1');
  });

  it('should construct the command for bulk query using just the required parameters', () => {
    const config: SfdxQueryConfig = {
      query: 'SELECT Id FROM Account'
    }
    const cmd: string = sfdxQuery.constructCommand(config, 'ex');
    expect(cmd).toBe('sfdx force:data:soql:query -u ex -q "SELECT Id FROM Account"');
  });

  it('should construct the command for bulk query using optional parameters', () => {
    const config: SfdxQueryConfig = {
      query: 'SELECT Id FROM Account',
      json: true,
      loglevel: 'trace',
      apiversion: '51.0',
      usetoolingapi: true,
      resultformat: 'csv',
      perflog: true,
      outputLocation: './example/results.csv'
    }
    const cmd: string = sfdxQuery.constructCommand(config, 'ex');
    expect(cmd).toBe('sfdx force:data:soql:query -u ex -q "SELECT Id FROM Account" --json --loglevel trace --apiversion 51.0 -t -r csv --perflog | tee ./example/results.csv');
  });

  it('should construct the command for bulk query using just the required parameters', () => {
    const config: SfdxQueryConfig = {
      query: 'SELECT Id FROM Account'
    }
    const cmd: string = sfdxQuery.constructCommand(config, 'ex');
    expect(cmd).toBe('sfdx force:data:soql:query -u ex -q "SELECT Id FROM Account"');
  });

  it('should construct the command for bulk query using optional parameters', () => {
    const config: SfdxQueryConfig = {
      query: 'SELECT Id FROM Account',
      json: true,
      loglevel: 'trace',
      apiversion: '51.0',
      usetoolingapi: true,
      resultformat: 'csv',
      perflog: true,
      outputLocation: './example/results.csv'
    }
    const cmd: string = sfdxQuery.constructCommand(config, 'ex');
    expect(cmd).toBe('sfdx force:data:soql:query -u ex -q "SELECT Id FROM Account" --json --loglevel trace --apiversion 51.0 -t -r csv --perflog | tee ./example/results.csv');
  });

  it('should construct the command to logout from an authorised org using just the required parameters', () => {
    const config: SfdxLogoutConfig = {}
    const cmd: string = sfdxAuth.constructLogoutCommand(config);
    expect(cmd).toBe('sfdx force:auth:logout');
  });

  it('should construct the command to logout from an authorised org using optional parameters', () => {
    const config: SfdxLogoutConfig = {
      json: true,
      loglevel: 'trace',
      username: 'user@email.com',
      apiversion: '51.0',
      all: true,
      noprompt: true
    }
    const cmd: string = sfdxAuth.constructLogoutCommand(config);
    expect(cmd).toBe('sfdx force:auth:logout --json --loglevel trace -u user@email.com --apiversion 51.0 -a -p');
  });
});
