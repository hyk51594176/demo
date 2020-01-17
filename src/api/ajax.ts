import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'
import store from '../store'
import { message, Modal } from 'antd'

let isRest = false
const instance = axios.create({
  withCredentials: true,
  timeout: 60000
})
instance.interceptors.request.use(config => {
  const { systemInfo, baseUrl } = store.getState()
  const data = {
    systemId: systemInfo && systemInfo.systemId,
    appType: 'web'
  }
  if (!config.data) config.data = {}
  if (config.method === 'get' || config.method === 'delete') {
    config.params = config.data
    Object.assign(config.params, data)
  } else {
    Object.assign(config.data, data)
  }
  if (process.env.NODE_ENV !== 'production') {
    config.baseURL = baseUrl
  }
  if (!config.closeLoading) config.hideLoading = showLoading(Symbol('request'))
  return config
})
instance.interceptors.response.use(
  response => {
    const { config } = response
    const res = response.data || {}
    if (config.hideLoading) config.hideLoading()
    if (config.custom) {
      return res
    } else if (config.responseType === 'blob') {
      if (!(res instanceof Blob)) {
        message.error(res.desc || '系统异常')
        return Promise.reject(res.desc)
      }
      const fileName = config.data.get('displayName')
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(res, fileName)
      } else if ('download' in document.createElement('a')) {
        // 非IE下载
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(res)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
      } else {
        // IE10+下载
        window.open(URL.createObjectURL(res))
      }
      return null
    } else {
      if (String(res.code) === '200') {
        const { stateCode = {} } = res.data
        if (String(stateCode.code) === '200') {
          if (config.showMsg) {
            let msg = typeof config.showMsg === 'string' ? config.showMsg : stateCode.desc
            msg && message.success(msg)
          }
          delete res.data.stateCode
          return res.data
        } else {
          if (String(stateCode.code) !== '405') {
            message.error(config.errorMsg || stateCode.desc || res.desc || '系统异常')
          }
          return Promise.reject(res)
        }
      } else {
        if (String(res.code) === '503' && !isRest) {
          isRest = true
          Modal.confirm({
            title: '确定登出',
            content: 'token失效，可以取消继续留在该页面，或者重新登录',
            okText: '重新登录',
            cancelText: '取消',
            onOk() {
              isRest = false
              store.dispatch({ type: 'logout' })
            },
            onCancel() {
              isRest = false
            },
            type: 'warning'
          })
          return Promise.reject(res)
        } else message.error(config.errorMsg || res.desc || res.reason_desc || '系统异常')
        return Promise.reject(res)
      }
    }
  },
  error => {
    if (error.config && error.config.hideLoading) error.config.hideLoading()
    message.error(error.message)
    return Promise.reject(error)
  }
)

let arr: Array<symbol> = []
function isShowLoading() {
  setTimeout(() => {
    const { loading } = store.getState()
    let flag = arr.length > 0
    flag !== loading && store.dispatch({ type: 'LOADING', payload: { loading: flag } })
  }, 300)
}
function showLoading(symbolId: symbol) {
  arr.push(symbolId)
  isShowLoading()
  return function() {
    arr.splice(arr.indexOf(symbolId), 1)
    isShowLoading()
  }
}

interface Request {
  (config: AxiosRequestConfig): AxiosPromise
}
export interface Method<T = any, R = any> {
  (data?: T, showMsg?: boolean | string, errMsg?: boolean | string): Promise<R>
}

interface FormatData<T = any> {
  (res: T, data: any): T
}

export function createApi(args: AxiosRequestConfig, format?: FormatData, request: Request = instance): PropertyDecorator {
  return function(target, name) {
    const oldValue = target.constructor.prototype[name]
    target.constructor.prototype[name] = async function(data: any = {}, showMsg?: boolean | string, errorMsg?: boolean | string) {
      const { onProgress } = data
      const res = await request({
        method: 'post',
        ...args,
        data,
        onUploadProgress: onProgress,
        onDownloadProgress: onProgress,
        showMsg: showMsg !== undefined ? showMsg : args.showMsg,
        errorMsg: errorMsg !== undefined ? errorMsg : args.errorMsg
      })
      if (format) {
        return format.call(this, res, data)
      }
      return typeof oldValue === 'function' ? oldValue.call(this, res, data) : res
    }
    return target
  }
}

export function createCustormApi(fn: Request) {
  return (args: AxiosRequestConfig, format?: FormatData) => createApi(args, format, fn)
}

export default instance
