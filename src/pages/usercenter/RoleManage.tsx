// import { Component, Vue } from 'vue-property-decorator'
// import PageTemplate from '@/components/layout/PageTemplate.vue'

// interface Role {
//   createDate: string
//   createUser: string
//   description: string
//   menuButtons: Array<any>
//   modifyDate: string
//   modifyUser: string
//   roleId: number
//   roleName: string
// }

// @Component({
//   components: {
//     PageTemplate
//   }
// })
// export default class RoleManage extends Vue {
//   dialgeTitle = ''
//   formData = {
//     keyWords: ''
//   } as any
//   dialogShow = false
//   dialogData = {
//     menuIds: []
//   } as any
//   menus = [] as any
//   defaultProps = {
//     children: 'childMenuInfos',
//     label: 'menuName'
//   }
//   tableData = []
//   get tableColumns() {
//     return [
//       {
//         label: '角色ID',
//         prop: 'roleId'
//       },
//       {
//         label: '角色名称',
//         prop: 'roleName'
//       },
//       {
//         label: '角色描述',
//         prop: 'description'
//       },
//       {
//         label: '业务角色',
//         prop: 'businessType',
//         render: (h: any, { row }: any) => {
//           if (row.businessType) {
//             let obj: any = this.businessList.find(
//               (obj: any) => obj.businessType === row.businessType
//             )
//             return obj ? <el-tag>{obj.label}</el-tag> : null
//           }
//         }
//       },
//       {
//         label: '创建时间',
//         prop: 'createDate'
//       },
//       {
//         label: '创建人',
//         sortable: true,
//         prop: 'createUser'
//       },
//       {
//         label: '修改时间',
//         prop: 'modifyDate'
//       },
//       {
//         label: '修改人',
//         sortable: true,
//         prop: 'modifyUser'
//       },
//       {
//         label: '操作',
//         prop: 'btn',
//         width: 150,
//         fixed: 'right'
//       }
//     ]
//   }
//   formColumns = [
//     {
//       el: 'mSelect',
//       prop: 'sysId',
//       label: '所属系统',
//       getList: () =>
//         this.$api.getAllSysParam().then(({ data }: any) => ({ data: data.sysParamInfos })),
//       valueKey: {
//         value: 'sysId',
//         label: 'systemName'
//       },
//       rules: {
//         required: true,
//         message: '请选择所属系统',
//         trigger: 'change'
//       },
//       span: 9,
//       listeners: {
//         change: this.getAllBusinessBySysId
//       }
//     },
//     {
//       el: 'input',
//       label: '关键字搜索',
//       prop: 'keyWords',
//       span: 9
//     },
//     {
//       span: 6,
//       prop: 'btn'
//     }
//   ]
//   businessList = []

//   get dialogColumns() {
//     return [
//       {
//         el: 'input',
//         prop: 'roleName',
//         label: '角色名称',
//         labelWidth: '130px',
//         rules: {
//           required: true,
//           message: '请输入角色名称',
//           trigger: 'blur'
//         }
//       },
//       {
//         el: 'input',
//         prop: 'description',
//         label: '角色描述',
//         labelWidth: '130px',
//         rules: {
//           required: true,
//           message: '请输入角色描述',
//           trigger: 'blur'
//         }
//       },
//       {
//         el: 'mSelect',
//         prop: 'businessType',
//         label: '业务角色',
//         labelWidth: '130px',
//         dataList: this.businessList
//       },
//       {
//         label: '菜单权限',
//         prop: 'menuIds',
//         span: 22
//       }
//     ]
//   }

//   getAllBusinessBySysId(sysId: number) {
//     this.businessList = []
//     this.tableData = []
//     if (!sysId) return
//     this.getTableList()
//     this.$api.getAllBusinessBySysId({ sysId }).then((res: any) => {
//       this.businessList = (res.data || []).map((obj: any) => ({
//         ...obj,
//         label: obj.businessName,
//         value: obj.businessType
//       }))
//     })
//   }

//   showDialog(obj?: Role) {
//     this.$refs.sform.validate().then(() => {
//       this.dialogShow = true
//       this.dialogData = {
//         menuIds: [],
//         menuButtons: [],
//         sysId: this.formData.sysId || '',
//         ...(obj || {})
//       }
//       if (obj) {
//         this.dialgeTitle = '编辑角色'
//       } else {
//         this.dialgeTitle = '新增角色'
//       }
//       this.getAllFunctionBySysId()
//     })
//   }

//   setBtnList(obj: any, menuName: string) {
//     if (!obj.btnList) {
//       obj.btnList = [{ label: '基础权限', value: '基础权限' }]
//     }
//     obj.btnList.push({
//       label: menuName,
//       value: menuName
//     })
//   }

//   formatTreeData(arr: Array<any>, list: Array<any> = [], level: number = 0) {
//     // 先拿出数组第一个
//     const firstObj = arr[0]
//     // 如果没有父级直接放入数组
//     if (!firstObj.parentId) {
//       list.push(firstObj)
//       if (firstObj.isRoute === '0') {
//         this.dialogData.menuButtons = this.dialogData.menuButtons.filter(
//           (item: any) => item.menuId !== firstObj.menuId
//         )
//       }
//     } else {
//       firstObj.buttonView = (
//         this.dialogData.menuButtons.find((o: any) => o.menuId === firstObj.menuId) || {
//           buttonView: []
//         }
//       ).buttonView
//     }
//     // 过滤数组
//     if (firstObj.menuType === 4) {
//       const parentMenu = arr.find((p: any) => p.menuId === firstObj.parentId)
//       this.setBtnList(parentMenu, firstObj.menuName)
//       arr.shift()
//     } else {
//       arr = arr.filter((item, index) => {
//         // 第一个过滤掉
//         if (Number(item.isRoute) === 1) {
//           item.buttonView = (
//             this.dialogData.menuButtons.find((obj: any) => obj.menuId === item.menuId) || {
//               buttonView: []
//             }
//           ).buttonView
//         }
//         if (index === 0) return false
//         // 如果当前对象为 firstObj 的叶子 节点
//         if (item.menuType === 4) {
//           if (item.parentId === firstObj.menuId) {
//             this.setBtnList(firstObj, item.menuName)
//           } else {
//             const parentMenu = arr.find(p => p.menuId === item.parentId)
//             this.setBtnList(parentMenu, item.menuName)
//           }
//           return false
//         } else {
//           if (item.parentId === firstObj.menuId)
//             (firstObj.childMenuInfos || (firstObj.childMenuInfos = [])).push(item)
//           // 如果当前对象为 firstObj 的父节点
//           if (item.menuId === firstObj.parentId)
//             (item.childMenuInfos || (item.childMenuInfos = [])).push(firstObj)
//           return item.parentId !== firstObj.menuId
//         }
//       })
//     }
//     //  判断是否数组还有值 有值就执行递归
//     if (arr.length) this.formatTreeData(arr, list, level + 1)
//     return list
//   }

//   getAllFunctionBySysId() {
//     this.$api.getAllFunctionBySysId({ sysId: this.formData.sysId }).then(({ data }: any) => {
//       this.menus = this.formatTreeData(data.menuInfos)
//       this.dialogData.menuIds = this.dialogData.menuButtons.map((m: any) => m.menuId)
//     })
//   }

//   $refs!: {
//     sform: any
//     dform: any
//     tree: any
//   }
//   getTableList() {
//     this.$refs.sform.validate().then(() => {
//       this.$api.getAllRoleBySysId(this.formData).then(({ data }: any) => {
//         this.tableData = data.roleInfos
//       })
//     })
//   }
//   addOrEdit() {
//     this.$refs.dform.validate().then(() => {
//       const params = {
//         ...this.dialogData,
//         menuButtons: [
//           ...this.$refs.tree.getHalfCheckedNodes().map((obj: any) => ({ menuId: obj.menuId })),
//           ...this.$refs.tree
//             .getCheckedNodes()
//             .map((obj: any) => ({ menuId: obj.menuId, buttonView: obj.buttonView }))
//         ]
//       }
//       delete params.menuIds
//       this.$api.addSysRole(params).then(() => {
//         this.dialogShow = false
//         this.getTableList()
//       })
//     })
//   }
//   deleteData(obj: Role) {
//     this.$api.deleteSysRole({ id: obj.roleId }).then(() => {
//       this.getTableList()
//     })
//   }
// }
export default {}
