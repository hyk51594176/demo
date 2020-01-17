// import { Component, Vue } from 'vue-property-decorator'
// import PageTemplate from '@/components/layout/PageTemplate.vue'

// interface BusinessRole {
//   businessName: string
//   businessType: string
//   createDate: string
//   createUser: string
//   description: string
//   id: number
//   modifyDate: string
//   modifyUser: string
//   sysId: string
// }

// @Component({
//   components: {
//     PageTemplate
//   }
// })
// export default class BusinessRoles extends Vue {
//   dialgeTitle = ''
//   formData = {
//     keyWords: ''
//   } as any
//   dialogShow = false
//   dialogData = {} as any
//   tableData = []
//   tableColumns = [
//     {
//       label: '业务角色类型',
//       prop: 'businessType'
//     },
//     {
//       label: '业务角色名称',
//       prop: 'businessName'
//     },
//     {
//       label: '业务角色描述',
//       prop: 'description'
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
//   formColumns = [
//     {
//       el: 'mSelect',
//       prop: 'sysId',
//       label: '所属系统',
//       getList: () => this.$api.getAllSysParam().then(({ data }: any) => ({ data: data.sysParamInfos })),
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

//   get dialogColumns() {
//     return [
//       {
//         el: 'input',
//         prop: 'businessName',
//         label: '业务角色名称',
//         labelWidth: '130px',
//         span: 22,
//         rules: {
//           required: true,
//           message: '请输入业务角色名称',
//           trigger: 'blur'
//         }
//       },
//       {
//         el: 'input',
//         prop: 'description',
//         label: '业务角色描述',
//         span: 22,
//         labelWidth: '130px',
//         rules: {
//           required: true,
//           message: '请输入业务角色类型',
//           trigger: 'blur'
//         }
//       },
//       {
//         el: 'input',
//         prop: 'businessType',
//         span: 22,
//         disabled: this.dialogData.id !== undefined && this.dialogData.id !== null && this.dialogData.id !== '',
//         label: '业务角色类型',
//         labelWidth: '130px',
//         rules: {
//           required: true,
//           message: '请输入业务角色类型',
//           trigger: 'blur'
//         }
//       }
//     ]
//   }

//   $refs!: {
//     sform: any
//     dform: any
//   }
//   showDialog(obj?: BusinessRole) {
//     this.$refs.sform.validate().then(() => {
//       this.dialogShow = true
//       this.dialogData = {
//         sysId: this.formData.sysId || '',
//         ...(obj || {})
//       }
//       if (obj) {
//         this.dialgeTitle = '编辑业务角色'
//       } else {
//         this.dialgeTitle = '新增业务角色'
//       }
//     })
//   }

//   getTableList() {
//     if (this.dialogData) this.dialogShow = false
//     this.$refs.sform.validate().then(() => {
//       this.$api.getAllBusinessBySysId(this.formData).then(({ data }: any) => {
//         this.tableData = data
//       })
//     })
//   }

//   addOrEdit() {
//     this.$refs.dform.validate().then(() => {
//       this.$api.addSysBusiness(this.dialogData, '添加成功').then(this.getTableList)
//     })
//   }

//   deleteData(obj: any) {
//     this.$api.deleteSysBusiness(obj, '删除成功').then(this.getTableList)
//   }
// }

export default {}
