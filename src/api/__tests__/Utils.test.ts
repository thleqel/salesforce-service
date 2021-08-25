import utils from '../Utils';
import * as fs from 'fs';

describe('ensure helper functions work as expected', () => {
  it('should read a csv file and return a list of json objects', () => {
    const expected: any = [
      {
        First_Name__c: 'Mable',
        Last_Name__c: 'Dare',
        Name: 'Mable Dare',
        Date_of_Birth__c: '1991-01-01',
        Email__c: 'Nathan.Mosciski15@yahoo.com',
        Gender__c: 'Other'
      },
      {
        First_Name__c: 'Laurie',
        Last_Name__c: 'Hauck',
        Name: 'Laurie Hauck',
        Date_of_Birth__c: '1992-01-01',
        Email__c: 'Jacques90@hotmail.com',
        Gender__c: 'Unknown'
      }
    ]
    const res: any = utils.readSyncCsv(process.cwd() + '/src/api/__tests__/__resources__/test-read-sync.csv');
    expect(res.length).toEqual(expected.length);
    var i: number;
    for(i = 0; i < expected.length; i++) {
      var key: any;
      for(key in expected[i]) {
        expect(res[i][key]).toBe(expected[i][key]);
      }
      expect(Object.keys(res[i]).length).toEqual(Object.keys(expected[i]).length);
    }
  });

  it('should process a csv file containing record IDs', async () => {
    const res: boolean = await utils.getIdQueryRecords(process.cwd() + '/src/api/__tests__/__resources__/id-query-input.csv', process.cwd() + '/src/api/__tests__/__resources__/id-query-output.csv');
    expect(res).toBe(true);
    const outputCsv: Buffer = fs.readFileSync(process.cwd() + '/src/api/__tests__/__resources__/id-query-output.csv');
    const expectedCsv: Buffer = fs.readFileSync(process.cwd() + '/src/api/__tests__/__resources__/id-query-expected-output.csv');
    expect(Buffer.compare(outputCsv, expectedCsv)).toEqual(0);
  });

  it('should process a csv file containing no record IDs', async () => {
    const res: boolean = await utils.getIdQueryRecords(process.cwd() + '/src/api/__tests__/__resources__/id-query-input-empty.csv', process.cwd() + '/src/api/__tests__/__resources__/id-query-output-empty.csv');
    expect(res).toBe(false);
    const outputCsv: Buffer = fs.readFileSync(process.cwd() + '/src/api/__tests__/__resources__/id-query-output-empty.csv');
    const expectedCsv: Buffer = fs.readFileSync(process.cwd() + '/src/api/__tests__/__resources__/id-query-expected-output-empty.csv');
    expect(Buffer.compare(outputCsv, expectedCsv)).toEqual(0);
  });

  it('should execute a system shell command successfully', async () => {
    await utils.execShellCommand(`echo Hello World! | tee ${process.cwd() + '/src/api/__tests__/__resources__/shell-command.txt'}`);
    const ouputText: Buffer = fs.readFileSync(process.cwd() + '/src/api/__tests__/__resources__/shell-command.txt');
    const expectedText: Buffer = fs.readFileSync(process.cwd() + '/src/api/__tests__/__resources__/shell-command-expected.txt');
    expect(Buffer.compare(ouputText, expectedText)).toEqual(0);
  });

  it('should reject if the system shell command is not found', async () => {
    expect(async () => {
      await utils.execShellCommand('ridiculous_command');
    }).rejects.toBe(`Command "ridiculous_command" failed with error "Error: Command failed: ridiculous_command\n/bin/sh: ridiculous_command: command not found\n"`);
  });
});
