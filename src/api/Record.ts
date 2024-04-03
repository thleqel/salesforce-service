import axios, { type AxiosRequestConfig } from 'axios'
import { type SfConfig } from './interfaces/Config'

class Records {
  async getRecord (recordId: string, config: SfConfig): Promise<any> {
    const conf: AxiosRequestConfig = {
      baseURL: config.urls.baseUrl,
      url: `${config.paths.data}/ui-api/records/${recordId}?layoutTypes=full`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${process.env.SESSION_ID}`,
        'Content-Type': 'application/json'
      }
    }
    return await axios.request(conf)
  }

  async createRecord (object: string, objectFields: JSON, config: SfConfig): Promise<any> {
    const body = {
      allowSaveOnDuplicate: false,
      apiName: object,
      fields: objectFields
    }

    const conf: AxiosRequestConfig = {
      baseURL: config.urls.baseUrl,
      url: `${config.paths.data}/ui-api/records`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${process.env.SESSION_ID}`,
        'Content-Type': 'application/json'
      },
      data: body
    }

    return await axios.request(conf)
  }

  async updateRecord (recordId: string, objectFields: JSON, config: SfConfig): Promise<any> {
    const body = {
      allowSaveOnDuplicate: false,
      fields: objectFields
    }

    const conf: AxiosRequestConfig = {
      baseURL: config.urls.baseUrl,
      url: `${config.paths.data}/ui-api/records/${recordId}`,
      method: 'patch',
      headers: {
        Authorization: `Bearer ${process.env.SESSION_ID}`,
        'Content-Type': 'application/json'
      },
      data: body
    }

    return await axios.request(conf)
  }

  async deleteRecord (recordId: string, config: SfConfig): Promise<any> {
    const conf: AxiosRequestConfig = {
      baseURL: config.urls.baseUrl,
      url: `${config.paths.data}/ui-api/records/${recordId}`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${process.env.SESSION_ID}`
      }
    }

    return await axios.request(conf)
  }
}

export default new Records()
