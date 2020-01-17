// import { Component, Vue } from 'vue-property-decorator'
// import PageTemplate from '@/components/layout/PageTemplate.vue'

// interface Organization {
//   businessTypes: Array<string>
//   createDate: string
//   createUser: string
//   description: string
//   modifyDate: string
//   modifyUser: string
//   organId: number
//   organName: string
//   sysId: string
// }

// interface OrganizationLabel {
//   label: string
//   partnerCode: string
//   partnerName: string
//   value: string
// }

// @Component({
//   components: {
//     PageTemplate
//   }
// })
// export default class OrganizationManage extends Vue {
//   dialgeTitle = ''
//   formData = { keyWords: '' } as any
//   dialogShow = false
//   dialogData = {} as any
//   businessList = []
//   tableData = []
//   get tableColumns() {
//     return [
//       {
//         label: '组织机构ID',
//         prop: 'organId'
//       },
//       {
//         label: '组织机构名称',
//         prop: 'organName'
//       },
//       {
//         label: '组织机构描述',
//         prop: 'description'
//       },
//       {
//         label: '业务角色',
//         prop: 'businessTypes',
//         render: (h: any, { row }: any) => {
//           if (row.businessTypes && row.businessTypes.length) {
//             return (
//               <div>
//                 {row.businessTypes
//                   .map((type: any) =>
//                     this.businessList.find((obj: any) => obj.businessType === type)
//                   )
//                   .filter((obj: any) => obj)
//                   .map((item: any) => {
//                     return <el-tag>{item.label}</el-tag>
//                   })}
//               </div>
//             )
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
//   allCount = []

//   get dialogColumns(): Array<any> {
//     return [
//       {
//         el: 'autocomplete',
//         prop: 'organName',
//         popperClass: 'my-autocomplete',
//         fetchSuggestions: this.querySearch,
//         listeners: {
//           select: this.handleSelect
//         },
//         slots: {
//           default(h: any, { item }: any) {
//             return (
//               <div>
//                 <div class="name">{item.label}</div>
//                 <span class="addr">{item.value}</span>
//               </div>
//             )
//           }
//         },
//         label: '组织机构名称',
//         labelWidth: '130px',
//         span: 22,
//         rules: {
//           required: true,
//           message: '请输入组织机构名称',
//           trigger: 'change'
//         }
//       },
//       {
//         el: 'input',
//         prop: 'description',
//         label: '组织机构描述',
//         labelWidth: '130px',
//         span: 22,
//         rules: {
//           required: true,
//           message: '请输入组织机构描述',
//           trigger: 'blur'
//         }
//       },
//       {
//         el: 'mSelect',
//         prop: 'businessTypes',
//         span: 22,
//         label: '业务角色',
//         labelWidth: '130px',
//         multiple: true,
//         dataList: this.businessList
//       }
//     ]
//   }

//   querySearch(queryString: string, cb: any) {
//     let list = this.allCount.filter(
//       (obj: any) =>
//         obj.label.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
//         obj.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
//     )
//     cb(list)
//   }

//   handleSelect(item: OrganizationLabel) {
//     this.dialogData.description = item.label
//   }

//   getAllAccount() {
//     this.$api.getAllAccount({ callMode: 1 }).then((res: any) => {
//       this.allCount = res
//     })
//   }

//   getAllBusinessBySysId(sysId: string) {
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

//   $refs!: {
//     sform: any
//     dform: any
//   }
//   showDialog(obj?: Organization) {
//     this.$refs.sform.validate().then(() => {
//       this.dialogShow = true
//       this.dialogData = {
//         description: '',
//         organName: '',
//         sysId: this.formData.sysId || '',
//         ...(obj || {})
//       }
//       if (obj) {
//         this.dialgeTitle = '编辑组织机构'
//       } else {
//         this.dialgeTitle = '新增组织机构'
//       }
//       this.getAllAccount()
//     })
//   }

//   getTableList() {
//     this.$refs.sform.validate().then(() => {
//       this.$api.getAllOrganBySysId(this.formData).then(({ data }: any) => {
//         this.tableData = data
//       })
//     })
//   }

//   addOrEdit() {
//     this.$refs.dform.validate().then(() => {
//       this.$api.addOrganInfo(this.dialogData).then(() => {
//         this.dialogShow = false
//         this.getTableList()
//       })
//     })
//   }

//   deleteData(obj: Organization) {
//     this.$api.deleteOrganInfo({ id: obj.organId }).then(() => {
//       this.getTableList()
//     })
//   }
// }
export default {}
