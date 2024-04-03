import axios, { type AxiosRequestConfig } from 'axios'
import { type SfConfig } from './interfaces/Config'

class ExecuteAnonymous {
  async executeAnonymous (script: string, config: SfConfig): Promise<any> {
    const envelope = this.constructEnvelope(script)
    const soapPath = config.paths.soap
    const soapServicePath = soapPath.replace('services/Soap/u/', 'services/Soap/s/')
    const conf: AxiosRequestConfig = {
      baseURL: config.urls.baseUrl,
      url: soapServicePath,
      method: 'post',
      headers: {
        'Content-Type': 'text/xml',
        SOAPAction: 'blank',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      data: envelope
    }
    return await axios.request(conf)
  }

  constructEnvelope (script: string): string {
    let abstractEnvelope: string = this.loadEnvelop()
    abstractEnvelope = abstractEnvelope.replace(
      '<apex:sessionId></apex:sessionId>',
      `<apex:sessionId>${process.env.SESSION_ID}</apex:sessionId>`
    )

    abstractEnvelope = abstractEnvelope.replace('<apex:String></apex:String>', `<apex:String>${script}</apex:String>`)
    return abstractEnvelope
  }

  loadEnvelop (): string {
    return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:apex="http://soap.sforce.com/2006/08/apex">
    <soapenv:Header>
        <apex:DebuggingHeader>
            <apex:categories>
                <apex:category>Apex_code</apex:category>
                <apex:level>ERROR</apex:level>
            </apex:categories>
            <apex:debugLevel>NONE</apex:debugLevel>
        </apex:DebuggingHeader>
        <apex:SessionHeader>
            <apex:sessionId></apex:sessionId>
        </apex:SessionHeader>
    </soapenv:Header>
    <soapenv:Body>
        <apex:executeAnonymous>
            <apex:String></apex:String>
        </apex:executeAnonymous>
    </soapenv:Body>
    </soapenv:Envelope>`
  }
}

export default new ExecuteAnonymous()
