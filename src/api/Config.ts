import * as fs from 'fs'

export default class Config {
  private readonly config: JSON
  constructor (configuration: string | JSON) {
    if (typeof configuration === 'string') {
      const content = fs.readFileSync(configuration, 'utf-8')
      this.config = JSON.parse(content)
    } else {
      this.config = configuration
    }
  }

  getConfig (): JSON {
    return this.config
  }
}
