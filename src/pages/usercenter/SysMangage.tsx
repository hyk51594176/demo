// import { Component, Vue } from 'vue-property-decorator'
// import PageTemplate from '@/components/layout/PageTemplate.vue'

// interface System {
//   createDate: string
//   createUser: string
//   modifyDate: string
//   modifyUser: string
//   owners: Array<number>
//   sysId: string
//   sysPath: string
//   systemName: string
//   systemType: string
// }

// @Component({
//   components: {
//     PageTemplate
//   }
// })
// export default class SysMangage extends Vue {
//   dialgeTitle: string = ''
//   formData = {
//     keyWords: ''
//   }
//   dialogShow = false
//   dialogData = {} as any
//   formColumns = [
//     {
//       el: 'input',
//       label: '关键字搜索',
//       prop: 'keyWords'
//     },
//     {
//       prop: 'btn'
//     }
//   ]
//   tableData = []
//   tableColumns = [
//     {
//       label: '系统ID',
//       prop: 'sysId'
//     },
//     {
//       label: '系统名称',
//       prop: 'systemName'
//     },
//     {
//       label: '系统类型',
//       sortable: true,
//       prop: 'systemType',
//       format(obj: any) {
//         enum systemType {
//           INNER = '1',
//           OUTER = '2'
//         }
//         return obj.systemType === systemType.INNER
//           ? '内部系统'
//           : obj.systemType === systemType.OUTER
//           ? '外部系统'
//           : '暂无分类'
//       }
//     },
//     {
//       label: '系统路径',
//       prop: 'sysPath'
//     },
//     {
//       label: '创建时间',
//       prop: 'createDate'
//     },
//     {
//       label: '创建人',
//       sortable: true,
//       prop: 'createUser'
//     },
//     {
//       label: '修改时间',
//       prop: 'modifyDate'
//     },
//     {
//       label: '修改人',
//       sortable: true,
//       prop: 'modifyUser'
//     },
//     {
//       label: '操作',
//       prop: 'btn',
//       width: 150,
//       fixed: 'right'
//     }
//   ]

//   get dialogColumns(): Array<any> {
//     return [
//       {
//         el: 'input',
//         prop: 'systemName',
//         label: '系统名称',
//         disabled: this.dialogData.sysId !== undefined,
//         rules: {
//           required: true,
//           message: '请输入系统名称',
//           trigger: 'blur'
//         }
//       },
//       {
//         el: 'mSelect',
//         prop: 'systemType',
//         label: '系统类型',
//         dataList: [
//           {
//             label: '内部系统',
//             value: '1'
//           },
//           {
//             label: '外部系统',
//             value: '2'
//           }
//         ],
//         rules: {
//           required: true,
//           message: '请选择系统类型',
//           trigger: 'change'
//         }
//       },
//       {
//         label: '系统路径',
//         prop: 'sysPath',
//         el: 'input',
//         rules: {
//           required: true,
//           message: '请输入系统路径',
//           trigger: 'blur'
//         }
//       },
//       {
//         el: 'select',
//         prop: 'owners',
//         label: '维护人员',
//         multiple: true,
//         getList: this.$api.getInnerUserList,
//         valueKey: {
//           label: 'userName',
//           value: 'userId'
//         },
//         rules: {
//           required: true,
//           message: '请选择系统维护人员',
//           trigger: 'change'
//         }
//       }
//     ]
//   }

//   created() {
//     this.getTableList()
//   }

//   showDialog(obj?: System) {
//     this.dialogShow = true
//     this.dialogData = { ...(obj || {}) }
//     if (obj) {
//       this.dialgeTitle = '编辑系统'
//     } else {
//       this.dialgeTitle = '新增系统'
//     }
//   }

//   getTableList() {
//     this.$api.getAllSysParam(this.formData).then(({ data }: any) => {
//       this.tableData = data.sysParamInfos
//     })
//   }

//   $refs!: {
//     dform: any
//   }
//   addOrEdit() {
//     this.$refs.dform.validate().then(() => {
//       this.$api.addSysParam(this.dialogData).then(() => {
//         this.dialogShow = false
//         this.getTableList()
//       })
//     })
//   }

//   deleteData(obj: System) {
//     this.$api.deleteSysParam({ id: obj.sysId }).then(() => {
//       this.getTableList()
//     })
//   }
// }
export default {}
