import utils from "./Utils";
import { SfdxCredential } from "./interfaces/Config";

class SfdxAuth {
  async jwtAuth(credentials: SfdxCredential, alias: string) {
    const cmd : string = this.constructCommand(credentials, alias);
    return utils.execShellCommand(cmd);
  }

  constructCommand(credentials: SfdxCredential, alias: string) {
    let cmd : string = `sfdx auth:jwt:grant -i ${credentials.clientid} -f ${credentials.keyfilePath} -u ${credentials.username} -a ${alias}`;
    if (credentials.url !== undefined) {
      cmd += ` -r ${credentials.url}`;
    }
    if(credentials.loglevel !== undefined) {
      cmd += ` --loglevel ${credentials.loglevel}`;
    }
    if (credentials.setdefaultdevhubusername === true) {
      cmd += ` -d`;
    }
    if (credentials.setdefaultusername === true) {
      cmd += ` -s`;
    }
    if (credentials.json === true) {
      cmd += ` --json`;
    }
    return cmd;
  }
}

export default new SfdxAuth();