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
        resolve(stdout ? stdout: stderr);
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

  processQueryOutput(inputFile: string) {
    const input = this.readSyncCsv(inputFile);
    return input.slice(1, input.length - 1);
  }

  async replaceKeys(map: {[key: string]: string}, input: {[key: string]: any}, outputFile?: string) {
    const output: object[] = [];
    let i: number;
    for(i = 0; i < input.length; i++) {
      const row: any = {};
      for(const [oldKey, newKey] of Object.entries(map)) {
        row[newKey] = input[i][oldKey];
      }
      output.push(row);
    }
    if(outputFile) {
      const header = Object.values(map).map((value: string) => {return {id: value, title: value}});
      const writer: any = csvWriter.createObjectCsvWriter({
        path: outputFile,
        header
      });
      await writer.writeRecords(output);
    }
    return output;
  }
}

export default new Utils();