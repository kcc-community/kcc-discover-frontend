import Axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'
import { message } from 'antd'
import i18next from 'i18next'

export interface HttpResponse<T> {
  status: number
  statusText: string
  data: {
    code: number
    msg: string
    data: T
  }
}

/**
 * get status code
 * @param {AxiosResponse} response Axios  response object
 */
const getErrorCode2text = (response: AxiosResponse): string => {
  /** http status code */
  const code = response.status
  /** notice text */
  let message = 'Request error'
  switch (code) {
    case 400:
      message = 'Request error'
      break
    case 401:
      message = 'Unauthorized'
      break
    case 403:
      message = 'Access denied'
      break
    case 404:
      message = 'Resource not found'
      break
    case 408:
      message = 'Request timeout'
      break
    case 500:
      message = 'Internal server error'
      break
    case 501:
      message = 'Service not implemented'
      break
    case 502:
      message = 'Gateway error'
      break
    case 503:
      message = 'Service is not available'
      break
    case 504:
      message = 'Gateway timeout'
      break
    case 505:
      message = 'HTTP version is not supported'
      break
    default:
      message = 'Unknown error'
  }
  return message
}

/**
 * @returns  {AxiosResponse} result
 * @tutorial see more:https://github.com/onlyling/some-demo/tree/master/typescript-width-Axios
 * @example
 * service.get<{data: string; code: number}>('/test').then(({data}) => { console.log(data.code) })
 */
const service = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
})

/**
 * @description INTERCEPTORS
 * @returns {AxiosRequestConfig} config
 */
service.interceptors.request.use(async (config: AxiosRequestConfig) => {
  /*  config.headers['User-Account'] = userAccount
    config.headers.Authorization = 'Basic ZmViczoxMjM0NTY=' */

  return config
})

/**
 * @description INTERCEPTORS
 * @returns {}
 */
service.interceptors.response.use(
  /** 请求有响应 */
  async (response: AxiosResponse) => {
    if (response.status === 200) {
      if (response.data.code === 500) {
        message.error(response.data.msg)
      }
      return Promise.resolve(response)
    } else {
      const __text = getErrorCode2text(response)
      message.error(i18next.t(__text))
      return Promise.reject(new Error(__text))
    }
  },
  /** no response */
  (error: AxiosError) => {
    let __emsg: string = error.message || ''

    if (error?.message) {
      __emsg = error.message
    }

    if (error?.response) {
      console.log(error?.response)
      __emsg = error.response.data.message ?? error.response?.data
    }
    // timeout
    if (__emsg?.indexOf('timeout') >= 0) {
      __emsg = ''
    }
    __emsg && message.error(i18next.t(__emsg))
    return Promise.reject(new Error(__emsg))
  }
)

const handleResposne = (res, resolve, reject, params) => {
  if ((res.code && res.code === '0') || (res.msg && res.msg === 'SUCCESS')) {
      if (params && params.original) {
          resolve(res)
          return
      }
      resolve(res.content || res.data)
  } else {
      if (res.responseCode === '401') {
          window.location.href = '#/login'
      }
      if (res.responseCode) {
          reject({code: res.responseCode, message: res.responseMsg})
      } else {
          reject(res.error)
      }
  }
}

const handleError = (err, reject) => {
  console.log(err)
  reject({code: 'NET_ERROR', message: 'Network Error'})
}


export const get = (url, params?) => new Promise((resolve, reject) => {
  if (params) {
      const paramsArray: any[] = [];
      Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
      if (paramsArray.length > 0) {
          if (url.search(/\?/) === -1) {
              url += `?${paramsArray.join('&')}`;
          } else {
              url += `&${paramsArray.join('&')}`;
          }
      }
  }
  service(url, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN',
          // 'Authorization': token || '',
      },
  })
      .then(response => response.data)
      .then(res => handleResposne(res, resolve, reject, params))
      .catch(err => handleError(err, reject));
})

export const post = (url, jsonData) => new Promise((resolve, reject) => {
  service(url, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN',
      },
      data: jsonData,
  })
      .then(response => response.data)
      .then(res => handleResposne(res, resolve, reject, jsonData))
      .catch(err => handleError(err, reject));
})

export const form = (url, formData) => new Promise((resolve, reject) => {
  service(url, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Accept-Language': 'zh-CN',
      },
      data: formData,
  })
      .then(response => response.data)
      .then(res => handleResposne(res, resolve, reject, formData))
      .catch(err => handleError(err, reject));
})

export default service
