// import { Vue, Component } from 'vue-property-decorator'
// import PageTemplate from '@/components/layout/PageTemplate.vue'
// import { PageInfo } from '../../types'

// @Component({
//   components: {
//     PageTemplate
//   }
// })
// export default class UserManage extends Vue {
//   dialgeTitle = ''
//   editSysObj = {} as any
//   formData = {
//     keyWords: ''
//   }
//   pageInfo = {
//     pageSize: 15,
//     pageNum: 1,
//     total: 0
//   }
//   sysShow = false
//   dialogShow = false
//   selectList = []
//   sysList = [] as any // 当前登录用户所有拥有的系统权限
//   dialogData = {
//     sysInfos: []
//   } as any
//   tableData = []
//   get tableColumns() {
//     return [
//       {
//         label: '用户名',
//         prop: 'userName'
//       },
//       {
//         label: '真实姓名',
//         prop: 'realName'
//       },
//       {
//         label: '手机号',
//         prop: 'telephone'
//       },
//       {
//         label: '邮箱',
//         prop: 'email'
//       },
//       {
//         label: '用户类型',
//         sortable: true,
//         width: 100,
//         prop: 'userType',
//         format(row: any) {
//           return row.userType === '2' ? '外部用户' : '内部用户'
//         }
//       },
//       {
//         label: '系统平台',
//         prop: 'sysInfos',
//         align: 'left',
//         headerAlign: 'center',
//         width: 150,
//         render(h: any, { row }: any) {
//           return (
//             <div>
//               {row.sysInfos.map((obj: any) => {
//                 return (
//                   <el-tag key={obj.sysName} disable-transitions={true} type="success">
//                     {obj.sysName}
//                   </el-tag>
//                 )
//               })}
//             </div>
//           )
//         }
//       },
//       {
//         label: '状态',
//         sortable: true,
//         prop: 'state',
//         format(row: any) {
//           return row.state === 1 ? '启用' : '禁用'
//         }
//       },
//       {
//         label: '创建时间',
//         prop: 'createDate',
//         width: 100
//       },
//       {
//         width: 100,
//         sortable: true,
//         label: '创建人',
//         prop: 'createUser'
//       },
//       {
//         label: '修改时间',
//         prop: 'modifyDate',
//         width: 100
//       },
//       {
//         width: 100,
//         sortable: true,
//         label: '修改人',
//         prop: 'modifyUser'
//       },
//       {
//         label: '操作',
//         prop: 'btn',
//         headerAlign: 'center',
//         align: 'left',
//         fixed: 'right',
//         width: 80
//       }
//     ]
//   }
//   formColumns = [
//     {
//       el: 'select',
//       prop: 'sysId',
//       label: '所属系统',
//       getList: this.getAllSysParam,
//       valueKey: {
//         value: 'sysId',
//         label: 'systemName'
//       },
//       span: 6
//     },
//     {
//       label: '用户类型',
//       prop: 'userType',
//       el: 'mSelect',
//       span: 6,
//       dataList: [
//         {
//           label: '内部用户',
//           value: 1
//         },
//         {
//           label: '外部用户',
//           value: 2
//         }
//       ]
//     },
//     {
//       el: 'input',
//       label: '关键字搜索',
//       prop: 'keyWords',
//       span: 6
//     },
//     {
//       span: 6,
//       prop: 'btn'
//     }
//   ]
//   sysDialogShow = false
//   get dialogTableColumns() {
//     return [
//       {
//         label: '是否启用',
//         prop: 'checked',
//         width: 80,
//         format(row: any) {
//           return row.checked ? '已启用' : '未启用'
//         }
//       },
//       {
//         label: '系统名称',
//         prop: 'sysName',
//         width: 120
//       },
//       {
//         label: '组织机构',
//         prop: 'organInfos',
//         minWidth: 200,
//         render(h: any, { row }: any) {
//           return (
//             <div>
//               {row.organInfos.map((obj: any) => {
//                 return (
//                   <el-tag key={obj.organName} type="success">
//                     {obj.description || obj.organName}
//                   </el-tag>
//                 )
//               })}
//             </div>
//           )
//         }
//       },
//       {
//         label: '角色',
//         prop: 'roleInfos',
//         multiple: true,
//         minWidth: 200,
//         render(h: any, { row }: any) {
//           return (
//             <div>
//               {row.roleInfos.map((obj: any) => {
//                 return (
//                   <el-tag key={obj.sysName} type="success">
//                     {obj.roleName}
//                   </el-tag>
//                 )
//               })}
//             </div>
//           )
//         }
//       },
//       { label: '操作', prop: 'btns' }
//     ]
//   }

//   created() {
//     this.getTableList(true)
//   }

//   get dialogColumns() {
//     return [
//       {
//         label: '用户类型',
//         prop: 'userType',
//         el: 'mSelect',
//         disabled: !!this.dialogData.userId,
//         dataList: [
//           {
//             label: '内部用户',
//             value: '1'
//           },
//           {
//             label: '外部用户',
//             value: '2'
//           }
//         ],
//         rules: {
//           required: true,
//           message: '请选择用户类型',
//           trigger: 'change'
//         },
//         span: 22
//       },
//       {
//         label: '用户名',
//         prop: 'userName',
//         span: 22,
//         el: 'input',
//         disabled: !!this.dialogData.userId,
//         rules: {
//           required: true,
//           message: '请输入用户名',
//           trigger: 'blur'
//         }
//       },
//       {
//         label: '真实姓名',
//         prop: 'realName',
//         span: 22,
//         el: 'input',
//         rules: {
//           required: true,
//           message: '请输入真实姓名',
//           trigger: 'blur'
//         }
//       },
//       {
//         label: '手机号',
//         prop: 'telephone',
//         span: 22,
//         el: 'input'
//       },
//       ...(this.dialogData.userType === '2'
//         ? [
//             {
//               label: '邮箱',
//               prop: 'email',
//               span: 22,
//               el: 'input'
//             }
//           ]
//         : [])
//     ]
//   }

//   get sysColumns() {
//     return [
//       {
//         label: '是否启用',
//         prop: 'checked',
//         el: 'checkbox'
//       },
//       ...this.getOtherColumns()
//     ]
//   }

//   deleteUser(obj: any) {
//     this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
//       confirmButtonText: '确定',
//       cancelButtonText: '取消',
//       type: 'warning'
//     }).then(() => {
//       this.$api
//         .deleteUser(
//           {
//             userName: obj.userName,
//             uId: obj.userId,
//             userType: obj.userType
//           },
//           '删除成功'
//         )
//         .then(() => {
//           this.getTableList()
//         })
//     })
//   }

//   getOtherColumns() {
//     if (this.editSysObj.checked) {
//       return [
//         {
//           label: '组织机构',
//           el: 'mSelect',
//           prop: 'organIds',
//           multiple: true,
//           getList: (params: any) => this.$api.getAllOrganBySysId(params),
//           valueKey: {
//             label: 'description',
//             value: 'organId'
//           },
//           span: 22,
//           params: {
//             sysId: 'sysId'
//           },
//           listeners: {
//             currentObj: (data: any) => {
//               this.editSysObj.organInfos = data
//               if (
//                 data &&
//                 data.length &&
//                 !data.some((obj: any) => !obj.businessTypes || obj.businessTypes.length === 0)
//               ) {
//                 this.editSysObj.businessTypes = Array.from(
//                   new Set(
//                     data
//                       .map((obj: any) => obj.businessTypes)
//                       .reduce((x: any, y: any) => [...x, ...y], [])
//                   )
//                 )
//               } else {
//                 this.editSysObj.businessTypes = []
//               }
//             }
//           }
//         },
//         {
//           label: '角色',
//           prop: 'roleIds',
//           multiple: true,
//           span: 22,
//           el: 'mSelect',
//           getList: (params: any) =>
//             this.$api.getAllRoleBySysId(params).then(({ data }: any) => data.roleInfos),
//           listeners: {
//             currentObj: (data: any) => {
//               this.editSysObj.roleInfos = data
//             }
//           },
//           rules: {
//             required: true,
//             message: '请选择角色',
//             trigger: 'change',
//             type: 'array'
//           },
//           valueKey: {
//             label: 'roleName',
//             value: 'roleId'
//           },
//           params: {
//             sysId: 'sysId',
//             businessTypes: 'businessTypes'
//           }
//         }
//       ]
//     }
//     return []
//   }

//   editSys(obj: any) {
//     this.editSysObj = {
//       ...obj,
//       businessTypes: obj.businessTypes || [],
//       roleInfos: obj.roleInfos.map((r: any) => ({ ...r }))
//     }
//     this.sysDialogShow = true
//   }

//   getAllSysParam() {
//     return this.$api.getAllSysParam().then(({ data }: any) => {
//       this.sysList = data.sysParamInfos
//       return { data: data.sysParamInfos }
//     })
//   }

//   enabledSys(row: any) {
//     interface DataValue {
//       sysId: number
//       sysName: string
//       checked: boolean
//       organInfos: Array<any>
//       roleInfos: Array<any>
//       systemType: any
//       organIds?: Array<any>
//       roleIds?: Array<any>
//     }

//     this.sysShow = true
//     this.dialogData = {
//       ...row,
//       sysInfos: this.sysList
//         .map((obj: any) => {
//           const data: DataValue = {
//             sysId: obj.sysId,
//             sysName: obj.systemName,
//             checked: false,
//             organInfos: [],
//             roleInfos: [],
//             systemType: obj.systemType
//           }
//           const item = row.sysInfos.find((item: any) => item.sysId === obj.sysId)
//           if (item) {
//             data.checked = true
//             data.roleInfos = item.roleInfos
//             data.organInfos = item.organInfos || []
//             data.organIds = (item.organInfos || []).map((r: any) => r.organId)
//             data.roleIds = item.roleInfos.map((r: any) => r.roleId)
//           }
//           return data
//         })
//         .filter((obj: any) => obj.systemType === row.userType)
//     }
//   }

//   showDialog(row: any) {
//     this.dialogShow = true
//     this.dialogData = {
//       ...(row || {})
//     }
//     this.dialgeTitle = row ? '编辑用户' : '新增用户'
//   }

//   pageChange(pageInfo: PageInfo) {
//     this.pageInfo = pageInfo
//     this.getTableList(true)
//   }

//   clearTableData() {
//     this.tableData = []
//     this.pageInfo = {
//       pageSize: 15,
//       pageNum: 1,
//       total: 0
//     }
//   }

//   getTableList(type?: boolean) {
//     if (!type) {
//       this.pageInfo = {
//         pageSize: 15,
//         pageNum: 1,
//         total: 0
//       }
//     }
//     this.tableData = []
//     this.$api
//       .getAllUserInfoList({ ...this.formData, pageInfo: this.pageInfo })
//       .then(({ data, pageInfo }: any) => {
//         this.tableData = data
//         this.pageInfo = pageInfo
//       })
//       .catch(this.clearTableData)
//   }

//   modifyUserStatus(row: any) {
//     const state = row.state === 1 ? 2 : 1
//     this.$api
//       .modifyUserStatus({
//         uId: row.userId,
//         state
//       })
//       .then(() => {
//         row.state = state
//       })
//   }

//   $refs!: {
//     dform: any
//     sysform: any
//   }
//   addOrEdit() {
//     this.$refs.dform.validate().then(() => {
//       const params = {
//         ...this.dialogData,
//         uId: this.dialogData.userId
//       }
//       // if (!params.uId) {
//       //   params.sysInfos = this.dialogData.sysInfos.filter(obj => obj.checked).map(obj => {
//       //     const data = { ...obj, roleInfos: obj.roleInfos.map(roleId => ({ roleId })) }
//       //     delete data.roleIds
//       //     delete data.checked
//       //     return data
//       //   })
//       // }
//       delete params.userId
//       this.$api.addUserInfo(params, '操作成功').then(() => {
//         this.dialogShow = false
//         this.getTableList()
//       })
//     })
//   }

//   modifyUserBindInfo() {
//     this.$refs.sysform.validate().then(() => {
//       const params = {
//         sysInfo: {
//           sysId: this.editSysObj.sysId,
//           organId: this.editSysObj.organId,
//           roleInfos: this.editSysObj.roleInfos,
//           organInfos: this.editSysObj.organInfos
//         },
//         uId: this.dialogData.userId,
//         userName: this.dialogData.userName,
//         checked: this.editSysObj.checked
//       }
//       this.$api.modifyUserBindInfo(params).then(() => {
//         this.dialogData.sysInfos = this.dialogData.sysInfos.map((obj: any) => {
//           if (obj.sysId === this.editSysObj.sysId) {
//             return {
//               ...this.editSysObj,
//               organId: this.editSysObj.checked ? this.editSysObj.organId : null,
//               organName: this.editSysObj.checked ? this.editSysObj.organName : null,
//               roleInfos: this.editSysObj.checked ? this.editSysObj.roleInfos : []
//             }
//           }
//           return obj
//         })
//         this.sysDialogShow = false
//         this.getTableList()
//       })
//     })
//   }

//   resetPass(row: any) {
//     this.$api.resetUserPwd(
//       {
//         uId: row.userId,
//         userType: row.userType
//       },
//       '重置密码成功'
//     )
//   }

//   addRemoteDesktop(user: any) {
//     this.$api.addRemoteDesktop({ uId: user.userId }, '操作成功').then(this.getTableList)
//   }
// }
export default {}
