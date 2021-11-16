import { SfdxDeleteConfig, SfdxQueryConfig, SfdxUpsertConfig } from "./interfaces/Config";
import utils from "./Utils";

class SfdxUpsert {
  async upsert(upsertConfig: SfdxUpsertConfig, alias: string) {
    const cmd: string = this.constructCommand(upsertConfig, alias);
    return utils.execShellCommand(cmd);
  }

  constructCommand(upsertConfig: SfdxUpsertConfig, alias: string) {
    let cmd: string = `sfdx force:data:bulk:upsert -u ${alias} -s ${upsertConfig.sobjectType} -f ${upsertConfig.csvFilePath} -i ${upsertConfig.externalid}`;
    if (upsertConfig.json === true) {
      cmd += ` --json`;
    }
    if(upsertConfig.loglevel !== undefined) {
      cmd += ` --loglevel ${upsertConfig.loglevel}`;
    }
    if (upsertConfig.apiversion !== undefined) {
      cmd += ` --apiversion ${upsertConfig.apiversion}`;
    }
    if (upsertConfig.wait !== undefined) {
      cmd += ` -w ${upsertConfig.wait}`;
    }
    if (upsertConfig.serial === true) {
      cmd += ` --serial`;
    }
    return cmd;
  }
}

export default new SfdxUpsert();