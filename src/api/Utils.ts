import * as child from 'child_process';
import * as fs from 'fs';
import * as parse from 'csv-parse/lib/sync'
import * as csvWriter from 'csv-writer'

class Utils {
  execShellCommand(cmd: string) {
    return new Promise((resolve, reject) => {
      child.exec(cmd, (error: child.ExecException | null, stdout: string | Buffer, stderr: string | Buffer) => {
        if(error) {
          reject(`Command "${cmd}" failed with error "${error}"`);
        }
        resolve(stdout ? stdout : stderr);
      });
    });
  }

  readSyncCsv(file: string) {
    const text: Buffer = fs.readFileSync(file);
    return this.readSyncCsvString(text);
  }

  readSyncCsvString(text: string | Buffer) {
    return parse(text, {
      columns: true,
      trim: true
    });
  }

  async getIdQueryRecords(inputFile: string, outputFile: string) {
    const writer : any = csvWriter.createObjectCsvWriter({
      path: outputFile,
      header: [
        {id: 'Id', title: 'Id'}
      ]
    });
    const input: any = this.readSyncCsv(inputFile);
    const output: Array<object> = [];
    let i: number;
    for(i = 1; i < input.length - 1; i++) {
      output.push({Id: input[i].ID});
    }
    await writer.writeRecords(output);
    return output.length > 0;
  }
}

export default new Utils();