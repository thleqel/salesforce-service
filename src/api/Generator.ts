import * as csvWriter from 'csv-writer'

export default class Generator {
  private createRecord: () => object;
  private header: any = [];

  constructor(createRecord: () => object, fields: string[]) {
    this.createRecord = createRecord;
    for(const field of fields) {
      this.header.push({id: field, title: field});
    }
  }

  private async save(records: any, outputFilePath: string) {
    const writer = csvWriter.createObjectCsvWriter({
      path: outputFilePath,
      header: this.header
    });
    await writer.writeRecords(records);
  }

  async createRecords(numRecords: number, outputFilePath: string) {
    const records: any = [];
    let i: number;
    for(i = 0; i < numRecords; i++) {
      records.push(this.createRecord());
    }
    await this.save(records, outputFilePath);
  }

}
