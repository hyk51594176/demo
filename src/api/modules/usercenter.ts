import { createApi, Method } from '../ajax'
import { baseUrl } from '../../config.json'
import { Api } from './common'

export class UserCenterApi extends Api {
  /**
   * 获取所有系统
   */
  @createApi({ url: baseUrl + '/user/getAllSysParam' })
  getAllSysParam!: Method
  /**
   * 新增编辑系统
   */
  @createApi({ url: baseUrl + '/user/addSysParam' })
  addSysParam!: Method
  /**
   * 删除系统
   */
  @createApi({ url: baseUrl + '/user/deleteSysParam' })
  deleteSysParam!: Method

  /**
   * 根据系统获取所有组织机构
   */
  @createApi({ url: baseUrl + '/user/getAllOrganBySysId' })
  getAllOrganBySysId!: Method

  /**
   * 新增编辑组织机构
   */
  @createApi({ url: baseUrl + '/user/addOrganInfo' })
  addOrganInfo!: Method
  /**
   * 新增编辑组织机构
   */
  @createApi({ url: baseUrl + '/user/deleteOrganInfo' })
  deleteOrganInfo!: Method

  /**
   * 根据系统获取所有菜单
   */
  @createApi({ url: baseUrl + '/user/getAllFunctionBySysId' })
  getAllFunctionBySysId!: Method
  /**
   * 新增编辑菜单
   */
  @createApi({ url: baseUrl + '/user/addSysFunction' })
  addSysFunction!: Method
  /**
   * 删除菜单
   */
  @createApi({ url: baseUrl + '/user/deleteSysFunction' })
  deleteSysFunction!: Method

  /**
   * 根据系统获取角色
   */
  @createApi({ url: baseUrl + '/user/getAllRoleBySysId' })
  getAllRoleBySysId!: Method
  /**
   * 删除菜单
   */
  @createApi({ url: baseUrl + '/user/addSysRole' })
  addSysRole!: Method
  /**
   * 删除菜单
   */
  @createApi({ url: baseUrl + '/user/deleteSysRole' })
  deleteSysRole!: Method
  /**
   * 获取所有用户
   */
  @createApi({ url: baseUrl + '/user/getAllUserInfoList' })
  getAllUserInfoList!: Method
  /**
   * 启用禁用用户
   */
  @createApi({ url: baseUrl + '/user/modifyUserStatus' })
  modifyUserStatus!: Method
  /**
   * 添加编辑用户
   */
  @createApi({ url: baseUrl + '/user/addUserInfo' })
  addUserInfo!: Method
  /**
   * 编辑用户绑定系统
   */
  @createApi({ url: baseUrl + '/user/modifyUserBindInfo' })
  modifyUserBindInfo!: Method
  /**
   * 重置用户密码
   */
  @createApi({ url: baseUrl + '/user/resetUserPwd' })
  resetUserPwd!: Method

  /**
   * 删除用户
   */
  @createApi({ url: baseUrl + '/user/deleteUser' })
  deleteUser!: Method
  /**
   * 获取内部用户列表
   */
  @createApi({ url: baseUrl + '/user/getInnerUserList' })
  getInnerUserList!: Method
  /**
   * 获取业务角色
   */
  @createApi({ url: baseUrl + '/user/getAllBusinessBySysId' })
  getAllBusinessBySysId!: Method

  /**
   * 新政编辑业务角色
   */
  @createApi({ url: baseUrl + '/user/addSysBusiness' })
  addSysBusiness!: Method
  /**
   * 删除业务角色
   */
  @createApi({ url: baseUrl + '/user/deleteSysBusiness' })
  deleteSysBusiness!: Method
  /**
   * 获取所有客户名称
   */
  @createApi({ url: baseUrl + '/billing/common/getPartnerInfoByCallMode' }, res => {
    return res.data.map((obj: any) => ({
      label: obj.partnerName,
      value: obj.partnerCode,
      ...obj
    }))
  })
  getAllAccount!: Method
  /**
   * 开通远程桌面
   */
  @createApi({ url: baseUrl + '/user/addRemoteDesktop' })
  addRemoteDesktop!: Method
}

export default new UserCenterApi()
