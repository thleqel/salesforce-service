import { SfdxDeleteConfig, SfdxQueryConfig } from "./interfaces/Config";
import utils from "./Utils";
import sfdxQuery from "./SfdxQuery";

class SfdxDelete {
  async delete(deleteConfig: SfdxDeleteConfig, alias: string) {
    const cmd: string = this.constructCommand(deleteConfig, alias);
    return utils.execShellCommand(cmd);
  }

  async deleteFromQuery(query: string, deleteConfig: SfdxDeleteConfig, alias: string) {
    const queryConfig: SfdxQueryConfig = {
      query: query,
      outputLocation: deleteConfig.csvFilePath
    }
    await sfdxQuery.query(queryConfig, alias);
    if(await utils.getIdQueryRecords(deleteConfig.csvFilePath, deleteConfig.csvFilePath)) {
      await this.delete(deleteConfig, alias);
    }
  }

  constructCommand(deleteConfig: SfdxDeleteConfig, alias: string) {
    let cmd: string = `sfdx force:data:bulk:delete -u ${alias} -s ${deleteConfig.sobjectType} -f ${deleteConfig.csvFilePath}`;
    if (deleteConfig.json === true) {
      cmd += ` --json`;
    }
    if(deleteConfig.loglevel !== undefined) {
      cmd += ` --loglevel ${deleteConfig.loglevel}`;
    }
    if (deleteConfig.apiversion !== undefined) {
      cmd += ` --apiversion ${deleteConfig.apiversion}`;
    }
    if (deleteConfig.wait !== undefined) {
      cmd += ` -w ${deleteConfig.wait}`;
    }
    return cmd;
  }
}

export default new SfdxDelete();