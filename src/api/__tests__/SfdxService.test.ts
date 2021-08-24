import { SfdxQueryConfig, SfdxDeleteConfig } from '../interfaces/Config';
import sfdxDelete from '../SfdxDelete';
import sfdxQuery from '../SfdxQuery';

describe('bulk query and delete records in salesforce', () => {
  it('should construct the command for bulk delete using just the required parameters', () => {
    const config : SfdxDeleteConfig = {
      sobjectType: 'Account',
      csvFilePath: './example/records_to_delete.csv'
    }
    const cmd : string = sfdxDelete.constructCommand(config, 'ex');
    expect(cmd).toBe('sfdx force:data:bulk:delete -u ex -s Account -f ./example/records_to_delete.csv');
  });

  it('should construct the command for bulk delete using optional parameters', () => {
    const config : SfdxDeleteConfig = {
      sobjectType: 'Account',
      csvFilePath: './example/records_to_delete.csv',
      json: true,
      loglevel: 'trace',
      apiversion: '51.0',
      wait: '1'
    }
    const cmd : string = sfdxDelete.constructCommand(config, 'ex');
    expect(cmd).toBe('sfdx force:data:bulk:delete -u ex -s Account -f ./example/records_to_delete.csv --json --loglevel trace --apiversion 51.0 -w 1');
  });

  it('should construct the command for bulk query using just the required parameters', () => {
    const config : SfdxQueryConfig = {
      query: 'SELECT Id FROM Account'
    }
    const cmd : string = sfdxQuery.constructCommand(config, 'ex');
    expect(cmd).toBe('sfdx force:data:soql:query -u ex -q "SELECT Id FROM Account"');
  });

  it('should construct the command for bulk query using optional parameters', () => {
    const config : SfdxQueryConfig = {
      query: 'SELECT Id FROM Account',
      json: true,
      loglevel: 'trace',
      apiversion: '51.0',
      usetoolingapi: true,
      resultformat: 'csv',
      perflog: true,
      outputLocation: './example/results.csv'
    }
    const cmd : string = sfdxQuery.constructCommand(config, 'ex');
    expect(cmd).toBe('sfdx force:data:soql:query -u ex -q "SELECT Id FROM Account" --json --loglevel trace --apiversion 51.0 -t -r csv --perflog | tee ./example/results.csv');
  });
});
