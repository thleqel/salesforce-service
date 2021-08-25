import utils from "./Utils";
import { SfdxCredential, SfdxLogoutConfig } from "./interfaces/Config";

class SfdxAuth {
  async jwtAuth(credentials: SfdxCredential, alias: string) {
    const cmd: string = this.constructLoginCommand(credentials, alias);
    return utils.execShellCommand(cmd);
  }

  async logout(logoutConfig: SfdxLogoutConfig) {
    const cmd: string = this.constructLogoutCommand(logoutConfig);
    return utils.execShellCommand(cmd);
  }

  constructLogoutCommand(logoutConfig: SfdxLogoutConfig) {
    let cmd: string = `sfdx force:auth:logout`;
    if (logoutConfig.json === true) {
      cmd += ` --json`;
    }
    if (logoutConfig.loglevel !== undefined) {
      cmd += ` --loglevel ${logoutConfig.loglevel}`;
    }
    if (logoutConfig.username !== undefined) {
      cmd += ` -u ${logoutConfig.username}`;
    }
    if (logoutConfig.apiversion !== undefined) {
      cmd += ` --apiversion ${logoutConfig.apiversion}`;
    }
    if (logoutConfig.all === true) {
      cmd += ` -a`;
    }
    if (logoutConfig.noprompt === true) {
      cmd += ` -p`;
    }
    return cmd;
  }

  constructLoginCommand(credentials: SfdxCredential, alias: string) {
    let cmd: string = `sfdx auth:jwt:grant -i ${credentials.clientid} -f ${credentials.keyfilePath} -u ${credentials.username} -a ${alias}`;
    if (credentials.url !== undefined) {
      cmd += ` -r ${credentials.url}`;
    }
    if (credentials.loglevel !== undefined) {
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