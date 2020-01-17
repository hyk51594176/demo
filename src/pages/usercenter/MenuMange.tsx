// interface ButtonView {
//   parentId: number
//   sysId: number
//   menuName: string
//   menuUrl: string
//   isRoute: string
//   menuSort: number
//   menuId: null | number
//   menuType: number
//   isEdit: boolean
// }

// interface BtnColumns {
//   prop: string
//   el: string | null
// }

// @Component({
//   components: {
//     PageTemplate
//   }
// })
// export default class MenuMange extends Vue {
//   btnAuthShow = false
//   buttonView: Array<ButtonView> = []
//   btnObj = {} as any
//   dialgeTitle = ''
//   formData = {
//     keyWords: ''
//   } as any
//   dialogShow = false
//   selectList = []
//   dialogData = {
//     sysId: null,
//     url: {}
//   } as any
//   paramsColumns = [
//     {
//       label: 'api类别',
//       prop: 'key',
//       width: 80
//     },
//     {
//       label: 'api请求地址',
//       prop: 'value',
//       align: 'left',
//       headerAlign: 'center'
//     }
//   ]
//   tableData = []
//   get tableColumns(): Array<any> {
//     return [
//       {
//         label: '菜单名称',
//         prop: 'menuName',
//         width: 140,
//         showOverflowTooltip: true,
//         align: 'left'
//       },
//       {
//         label: '菜单索引',
//         prop: 'menuSort',
//         width: 70
//       },
//       {
//         label: '菜单图标',
//         prop: 'icon',
//         width: 70,
//         showOverflowTooltip: true
//       },

//       {
//         label: '是否路由',
//         prop: 'isRoute',
//         width: 70,
//         format(obj: any) {
//           return obj.isRoute === '0' ? '否' : '是'
//         }
//       },
//       {
//         label: '菜单类型',
//         prop: 'menuType',
//         width: 70,
//         format(obj: any) {
//           switch (obj.menuType) {
//             case 1:
//               return '父级菜单'
//             case 2:
//               return '叶子菜单'
//             case 3:
//               return '接口'
//             case 4:
//               return '按钮'
//             default:
//               return obj.menuType
//           }
//         }
//       },
//       {
//         label: '菜单路径',
//         prop: 'menuUrl',
//         showOverflowTooltip: true
//       },
//       {
//         label: '组件路径',
//         prop: 'component',
//         showOverflowTooltip: true
//       },
//       {
//         label: '操作权限',
//         prop: 'buttonView',
//         align: 'left',
//         render(h: any, { row }: any) {
//           if (row.buttonView && row.buttonView.length) {
//             return (
//               <div>
//                 {row.buttonView.map((obj: any) => (
//                   <el-tag disableTransitions={true}>{obj.menuName}</el-tag>
//                 ))}
//               </div>
//             )
//           }
//         }
//       },
//       {
//         label: '修改时间',
//         prop: 'modifyDate',
//         width: 90
//       },
//       {
//         label: '修改人',
//         width: 80,
//         prop: 'modifyUser'
//       },
//       {
//         label: '操作',
//         prop: 'btn',
//         width: 170
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
//       span: 9
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
//   get btnColumns() {
//     return [
//       {
//         label: '按钮名称',
//         prop: 'menuName'
//       },
//       {
//         label: 'api接口',
//         prop: 'menuUrl'
//       },
//       {
//         prop: 'btn',
//         label: '操作',
//         width: 90,
//         render: (h: any, scope: any) => {
//           return (
//             <div>
//               <el-button type="text" onClick={this.delBtn.bind(this, scope)}>
//                 {scope.row.isEdit ? '取消' : '删除'}{' '}
//               </el-button>{' '}
//               &nbsp;
//               <el-button type="text" onClick={this.addOrEditBtn.bind(this, scope.row)}>
//                 {scope.row.isEdit ? '保存' : '编辑'}
//               </el-button>
//             </div>
//           )
//         }
//       }
//     ]
//   }
//   isRest = false
//   get dialogColumns() {
//     return [
//       {
//         el: 'input',
//         prop: 'menuName',
//         label: '菜单名称',
//         rules: {
//           required: true,
//           message: '请输入菜单名称',
//           trigger: 'blur'
//         }
//       },
//       {
//         el: 'input',
//         prop: 'icon',
//         label: '菜单图标'
//       },
//       {
//         label: '菜单类型',
//         prop: 'menuType',
//         el: 'mSelect',
//         dataList: [
//           {
//             label: '父级菜单',
//             value: 1
//           },
//           {
//             label: '叶子菜单',
//             value: 2
//           }
//         ],
//         disabled: !!this.dialogData.menuId,
//         rules: {
//           required: true,
//           message: '请选择菜单类型',
//           trigger: 'change'
//         }
//       },
//       {
//         el: 'input-number',
//         min: 0,
//         prop: 'menuSort',
//         label: '菜单索引',
//         controlsPosition: 'right',
//         rules: {
//           required: true,
//           message: '请输入菜单索引',
//           trigger: 'change',
//           type: 'number'
//         }
//       },
//       ...(this.dialogData.menuType === 2
//         ? [
//             {
//               el: 'mSelect',
//               prop: 'parentId',
//               label: '父级菜单',
//               getList: this.getList,
//               valueKey: {
//                 label: 'menuName',
//                 value: 'menuId'
//               },
//               params: {
//                 sysId: 'sysId',
//                 type: 'menuType'
//               },
//               rules: {
//                 required: true,
//                 message: '请输选择父菜单',
//                 trigger: 'change'
//               }
//             }
//           ]
//         : []),
//       {
//         label: '是否路由',
//         prop: 'isRoute',
//         el: 'checkbox',
//         trueLabel: '1',
//         falseLabel: '0'
//       },
//       ...(this.dialogData.isRoute === '1'
//         ? [
//             {
//               el: 'input',
//               prop: 'component',
//               label: '组件路径',
//               rules: {
//                 required: true,
//                 message: '请输入组件路径',
//                 trigger: 'blur'
//               }
//             },
//             {
//               el: 'input',
//               prop: 'menuUrl',
//               label: 'url地址',
//               rules: {
//                 required: true,
//                 trigger: 'blur',
//                 validator(rule: any, value: any, callback: any) {
//                   if (!value) {
//                     callback(new Error('请输入url地址'))
//                   } else if (value.endsWith('/prototype/')) {
//                     callback(new Error('请补全url地址'))
//                   } else {
//                     callback()
//                   }
//                 }
//               }
//             }
//           ]
//         : [])
//     ]
//   }

//   @Watch('btnAuthShow')
//   watchBtnAuthShow(val: any): void {
//     if (!val && this.isRest) {
//       this.getTableList()
//     }
//   }

//   @Watch('dialogData.isRoute')
//   watchIsRoute(val: any): void {
//     if (val === '1' && this.dialogData.sysId === '835765924' && !this.dialogData.menuId) {
//       this.dialogData.component = 'demo/index'
//       this.dialogData.menuUrl = `/prototype/`
//     }
//   }

//   addOrEditBtn(row: any): any {
//     if (row.isEdit) {
//       if (!row.menuName) return this.$message.error('请输入按钮名称')
//       this.$api.addSysFunction(row).then((res: any) => {
//         row.isEdit = false
//         row.menuId = res.data.functionId
//         this.isRest = true
//       })
//     } else {
//       row.isEdit = true
//     }
//   }

//   getBtnColumns(type: string, isEdit: boolean): BtnColumns {
//     if (type === 'menuUrl') {
//       return {
//         prop: 'menuUrl',
//         el: isEdit ? 'input' : null
//       }
//     } else {
//       return {
//         prop: 'menuName',
//         el: isEdit ? 'input' : null
//       }
//     }
//   }

//   $refs!: {
//     sform: any
//     dform: any
//   }
//   addChild(obj: ButtonView) {
//     this.$refs.sform.validate().then(() => {
//       this.dialgeTitle = '新增菜单'
//       this.dialogShow = true
//       this.dialogData = {
//         isRoute: '1',
//         menuType: 2,
//         sysId: this.formData.sysId,
//         parentId: obj.menuId,
//         component: this.formData.sysId === '835765924' ? 'demo/index' : '',
//         menuUrl: this.formData.sysId === '835765924' ? '/prototype/' : ''
//       }
//     })
//   }

//   showDialog(obj: ButtonView = {} as ButtonView) {
//     this.$refs.sform.validate().then(() => {
//       this.dialogShow = true
//       this.dialogData = {
//         isRoute: '0',
//         sysId: this.formData.sysId,
//         ...obj
//       }

//       if (obj.menuId) {
//         this.dialgeTitle = '编辑菜单'
//       } else {
//         this.dialgeTitle = '新增菜单'
//       }
//     })
//   }

//   formatTreeData(arr: Array<any>, list: Array<any> = []) {
//     const obj = arr[0]
//     if (!obj) return []
//     if (!obj.parentId) list.push(obj)
//     if (obj.menuType === 4) {
//       const parentMenu = arr.find(p => p.menuId === obj.parentId)
//       ;(parentMenu.buttonView || (parentMenu.buttonView = [])).push(obj)
//       arr.shift()
//     } else {
//       arr = arr.filter((item, index) => {
//         if (index === 0) return false
//         if (item.menuType === 4) {
//           if (item.parentId === obj.menuId) (obj.buttonView || (obj.buttonView = [])).push(item)
//           else {
//             const parentMenu = arr.find(p => p.menuId === item.parentId)
//             if (parentMenu) {
//               ;(parentMenu.buttonView || (parentMenu.buttonView = [])).push(item)
//             }
//           }
//           return false
//         } else {
//           if (item.parentId === obj.menuId) (obj.children || (obj.children = [])).push(item)
//           if (item.menuId === obj.parentId) (item.children || (item.children = [])).push(obj)
//           return item.parentId !== obj.menuId
//         }
//       })
//     }
//     if (arr.length) this.formatTreeData(arr, list)
//     return list
//   }

//   getTableList() {
//     this.$refs.sform.validate().then(() => {
//       this.getList(this.formData).then((res: any) => {
//         this.isRest && (this.isRest = false)
//         this.tableData = this.formData.keyWords ? res.data : this.formatTreeData(res.data)
//       })
//     })
//   }

//   getList(params: any) {
//     if (!params.sysId) return Promise.resolve({ data: [] })
//     return this.$api.getAllFunctionBySysId(params).then(({ data }: any) => {
//       const obj = { data: data.menuInfos }
//       if (params.type === 2) {
//         obj.data = obj.data.filter((item: any) => item.menuType === 1)
//       }
//       return obj
//     })
//   }

//   addOrEdit() {
//     this.$refs.dform.validate().then(() => {
//       const params = {
//         ...this.dialogData
//       }
//       if (params.isRoute === '0') {
//         params.menuUrl = '#'
//         params.component = null
//       }
//       if (!params.parentId) params.parentId = 0
//       this.$api.addSysFunction(params).then(() => {
//         this.dialogShow = false
//         this.getTableList()
//       })
//     })
//   }

//   deleteData(obj: any) {
//     if (obj.children && obj.children.length) {
//       let str = obj.children.map((item: any) => '【' + item.menuName + '】').join('、')
//       let msg = `【${obj.menuName}】下存在叶子菜单 ${str}, 不能删除,请先删除叶子菜单!`
//       this.$alert(msg, '提示', { type: 'warning' })
//       return Promise.reject(new Error(msg))
//     }
//     if (obj.buttonView && obj.buttonView.length) {
//       let str = obj.buttonView.map((item: any) => '【' + item.menuName + '】').join('、')
//       let msg = `【${obj.menuName}】下存在操作权限 ${str}, 不能删除`
//       this.$alert(msg, '提示', { type: 'warning' })
//       return Promise.reject(new Error(msg))
//     }
//     return this.$api.deleteSysFunction({ id: obj.menuId }).then(() => {
//       this.getTableList()
//     })
//   }

//   btnAuth(obj: any) {
//     this.btnAuthShow = true
//     this.btnObj = obj
//     this.buttonView = (obj.buttonView || []).map((b: any) => ({ ...b, isEdit: false }))
//   }

//   addBtn() {
//     this.buttonView.push({
//       parentId: this.btnObj.menuId,
//       sysId: this.btnObj.sysId,
//       menuName: '',
//       menuUrl: '',
//       isRoute: '0',
//       menuSort: this.buttonView.length,
//       menuId: null,
//       menuType: 4,
//       isEdit: true
//     })
//   }

//   delBtn({ row, $index }: any) {
//     if (row.isEdit) {
//       row.isEdit = false
//       return
//     }
//     if (row.menuId) {
//       this.deleteData(row).then(() => {
//         this.buttonView.splice($index, 1)
//       })
//     } else {
//       this.buttonView.splice($index, 1)
//     }
//   }
// }
export default {}
