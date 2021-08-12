import Config from './Config';
import { SfConfig, SfCredential } from './interfaces/SfConfig';
import login from './Login';

export default class SfService {
  private config: any;

  constructor(configFile: string) {
    this.config = new Config(configFile).getConfig();
  }

  async login(role: SfCredential) {
    if (
      this.config === undefined ||
      this.config.urls === undefined ||
      this.config.urls.testUrl === undefined ||
      this.config.urls.baseUrl === undefined ||
      this.config.urls.domain === undefined ||
      this.config.paths === undefined ||
      this.config.paths.soap === undefined ||
      this.config.paths.data === undefined ||
      this.config.paths.query === undefined
    )
      throw new Error('There was a problem with configuration!');
    const sfConfig: SfConfig = { urls: this.config.urls, paths: this.config.paths };
    return login.soapLogin(role, sfConfig);
  }
}
