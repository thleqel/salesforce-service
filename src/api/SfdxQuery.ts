import { SfdxQueryConfig } from "./interfaces/Config";
import utils from "./Utils";

class SfdxQuery {
  async query(queryConfig: SfdxQueryConfig, alias: string) {
    const cmd: string = this.constructCommand(queryConfig, alias);
    return utils.execShellCommand(cmd);
  }

  constructCommand(queryConfig: SfdxQueryConfig, alias: string) {
    let cmd: string = `sfdx force:data:soql:query -u ${alias} -q "${queryConfig.query}"`;
    if (queryConfig.json === true) {
      cmd += ` --json`;
    }
    if(queryConfig.loglevel !== undefined) {
      cmd += ` --loglevel ${queryConfig.loglevel}`;
    }
    if (queryConfig.apiversion !== undefined) {
      cmd += ` --apiversion ${queryConfig.apiversion}`;
    }
    if (queryConfig.usetoolingapi === true) {
      cmd += ` -t`;
    }
    if (queryConfig.resultformat !== undefined) {
      cmd += ` -r ${queryConfig.resultformat}`;
    }
    if (queryConfig.perflog === true) {
      cmd += ` --perflog`;
    }
    if (queryConfig.outputLocation !== undefined) {
      cmd += ` | tee ${queryConfig.outputLocation}`;
    }
    return cmd;
  }
}

export default new SfdxQuery();