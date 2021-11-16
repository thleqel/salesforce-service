import { SfdxCredential, SfdxDeleteConfig, SfdxLogoutConfig, SfdxQueryConfig, SfdxUpsertConfig } from './interfaces/Config';
import auth from './SfdxAuth';
import sfdxQuery from './SfdxQuery';
import sfdxDelete from './SfdxDelete';
import sfdxUpsert from './SfdxUpsert';
import Generator from './Generator';

export default class SfdxService {
  private alias: string;
  private generators: Map<string, Generator> = new Map();

  constructor(alias: string) {
    this.alias = alias;
  }

  async authorise(credentials: SfdxCredential) {
    return auth.jwtAuth(credentials, this.alias);
  }

  async logout(logoutConfig: SfdxLogoutConfig) {
    return auth.logout(logoutConfig);
  }

  async query(queryConfig: SfdxQueryConfig) {
    return sfdxQuery.query(queryConfig, this.alias);
  }

  async queryAndProcess(query: string, outputPath: string) {
    return sfdxQuery.queryAndProcess(query, outputPath, this.alias);
  }

  async delete(deleteConfig: SfdxDeleteConfig) {
    return sfdxDelete.delete(deleteConfig, this.alias);
  }

  async deleteFromQuery(query: string, deleteConfig: SfdxDeleteConfig) {
    return sfdxDelete.deleteFromQuery(query, deleteConfig, this.alias);
  }

  createNewGenerator(name: string, createRecord: () => object, fields: string[]) {
    this.generators.set(name, new Generator(createRecord, fields));
  }

  async upsert(upsertConfig: SfdxUpsertConfig) {
    return sfdxUpsert.upsert(upsertConfig, this.alias);
  }

  async generateAndUpsert(name: string, numRecords: number, upsertConfig: SfdxUpsertConfig) {
    const generator = this.generators.get(name);
    if(!generator) throw new Error(`No generator created for ${name}`);
    await generator.createRecords(numRecords, upsertConfig.csvFilePath);
    return sfdxUpsert.upsert(upsertConfig, this.alias);
  }

  getAlias() {
    return this.alias;
  }
}
