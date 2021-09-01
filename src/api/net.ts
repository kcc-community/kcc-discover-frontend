import Axios, { HttpResponse } from './axios'

export class ApiService {
  /**
   * @description get pair list
   * @return {HttpResponse} result
   */
  static pairList(): Promise<any> {
    return Axios({
      method: 'get',
      url: '/pair/list',
    })
  }

  static inWhiteList(address: string): Promise<HttpResponse<any>> {
    return Axios({
      method: 'get',
      url: '/white/in',
      params: {
        addr: address,
      },
    })
  }
}
