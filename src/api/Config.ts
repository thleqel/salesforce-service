import * as fs from 'fs';

export default class Config {
  private config: JSON;
  constructor(configFile: string) {
    const content = fs.readFileSync(configFile, 'utf-8');
    this.config = JSON.parse(content);
  }

  getConfig() {
    return this.config;
  }
}
