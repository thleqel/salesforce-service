import { SfdxCredential, SfdxDeleteConfig, SfdxQueryConfig } from './interfaces/Config';
import auth from './SfdxAuth';
import sfdxQuery from './SfdxQuery';
import sfdxDelete from './SfdxDelete';

export default class SfdxService {
  private alias: string;

  constructor(alias: string) {
    this.alias = alias;
  }

  async authorise(credentials: SfdxCredential) {
    return auth.jwtAuth(credentials, this.alias);
  }

  async query(queryConfig: SfdxQueryConfig) {
    return sfdxQuery.query(queryConfig, this.alias);
  }

  async delete(deleteConfig: SfdxDeleteConfig) {
    return sfdxDelete.delete(deleteConfig, this.alias);
  }

  async deleteFromQuery(query: string, deleteConfig: SfdxDeleteConfig) {
    return sfdxDelete.deleteFromQuery(query, deleteConfig, this.alias);
  }

  getAlias() {
    return this.alias;
  }
}
