import ajax, { createApi, Method } from '../ajax'
import { baseUrl, fileUrl } from '../../config.json'
import store from '../../store'
export class Api {
  /**
   * ajax方法
   */
  request = ajax

  /**
   * 获取 文件路径
   */
  getFileBaseUrl() {
    let url = '/cloud/download'
    const { baseUrl } = store.getState()
    if (process.env.NODE_ENV !== 'production') {
      return baseUrl
    } else {
      return fileUrl + url
    }
  }
  /**
   * 登录
   */
  @createApi({ url: baseUrl + '/user/login' })
  login!: Method

  /**
   * 初始化滑块验证
   */
  @createApi({ url: baseUrl + '/user/initSlider' })
  initSlider!: Method
  /**
   * 滑块验证
   */
  @createApi({ url: baseUrl + '/user/checkSlider' })
  checkSlider!: Method
  /**
   * 登出接口
   */
  @createApi({ url: baseUrl + '/user/logout' })
  logout!: Method
  /**
   * 根绝userId获取用户信息
   */
  @createApi({ url: baseUrl + '/user/getUserInfoByUserId' })
  getUserNameByUserId!: Method
  /**
   * 获取操作权限类型
   */
  @createApi({ url: baseUrl + '/user/getAllSysButton' })
  getAllSysButton!: Method
  /**
   * 获取用户菜单
   */
  @createApi({ url: baseUrl + '/user/menuListForWisfin' })
  menuListForWisfin!: Method
  /**
   * 修改用户密码
   */
  @createApi({ url: baseUrl + '/user/modifyUserPwd' })
  modifyUserPwd!: Method

  /**
   * 修改远程桌面密码
   */
  @createApi({ url: baseUrl + '/user/modifyRemoteDesktopPwd' })
  modifyRemoteDesktopPwd!: Method

  /**
   * 下载文件
   */
  @createApi({
    url: fileUrl + '/cloud/download',
    responseType: 'blob',
    transformRequest({ fileName, displayName }) {
      const data = new FormData()
      data.append('fileName', fileName)
      data.append('displayName', displayName || fileName)
      data.append('appType', 'web')
      return data
    },
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  downloadFile!: Method<{
    fileName: string
    onProgress?: (progressEvent: any) => void
    displayName?: string
  }>
  condition = [
    {
      label: '>',
      value: '>'
    },
    {
      label: '>=',
      value: '>='
    },
    {
      label: '=',
      value: '='
    },
    {
      label: '!=',
      value: '!='
    },
    {
      label: '<',
      value: '<'
    },
    {
      label: '<=',
      value: '<='
    },
    {
      label: '模糊匹配',
      value: 'like'
    },
    {
      label: '包含',
      value: 'in'
    },
    {
      label: '不包含',
      value: 'not in'
    }
  ]
  relations = [
    { label: '并且', value: 'and' },
    { label: '或者', value: 'or' }
  ]
  /**
   * 生成报表
   */
  @createApi({ url: baseUrl + '/develop/queryTableData' })
  queryTableData!: Method
  /**
   * 根据id查询报表配置信息
   */
  @createApi({ url: baseUrl + '/develop/queryReportConfigDetail' })
  queryReportConfigDetail!: Method

  /**
   * 根据id查询报表配置信息
   */
  @createApi({ url: baseUrl + '/develop/getReportIdsByMenuId' })
  getReportIdsByMenuId!: Method

  /**
   * 生成验证token
   */
  @createApi({ url: baseUrl + '/user/genReqToken' })
  genReqToken!: Method

  /**
   * 上传文件
   */
  @createApi({
    url: fileUrl + '/cloud/upload',
    transformRequest({ fileItem }) {
      const formData = new FormData()
      formData.append('fileItem', fileItem)
      formData.append('appType', 'web')
      return formData
    },
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  uploadFile!: Method<{
    fileItem: File
    onProgress?: (progressEvent: any) => void
  }>
  // 获取文件流
  @createApi({
    url: fileUrl + '/cloud/download',
    responseType: 'blob',
    custom: true,
    transformRequest({ fileName }) {
      const data = new FormData()
      data.append('fileName', fileName)
      data.append('appType', 'web')
      return data
    },
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  getStraem!: Method<{
    fileName: string
  }>
}

export default new Api()
