import {Component, OnInit} from '@angular/core';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {filter} from 'rxjs/operators';
import {AddressbookmanagementserviveService} from "./addressbookmanagementservive.service";
import * as GlobalUrl from "../globals";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'app-addressbookmanagement',
  templateUrl: './addressbookmanagement.component.html',
  styleUrls: ['./addressbookmanagement.component.css']
})
export class AddressbookmanagementComponent implements OnInit {
  radioValue = 'A';
  /*修改分组开关*/
  modifythegroup: boolean = true
  allChecksMore = []
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = false;
  sortValue = null;
  sortKey = null;
  searchGenderList: string[] = [];
  confrontation = false
  tabs = ['所有客户', '好友', 'VIP']
  /*模糊查询值*/
  fuzzyQuery = ''
  /*是否在模糊查询状态下*/
  isfuzzyQuery: boolean = true

  /*打开修改分组*/
  modify_the_group(e) {
    console.log(e)
    this.modifythegroup = false
  }

  /*关闭修改分组*/
  modify_the_group_close() {
    this.modifythegroup = true
  }
  accountId;
  ngOnInit() {
    this.accountId=localStorage.getItem('id')
    let data = new FormData()
    data.append('accountId', ''+this.accountId+'')
    data.append('page', '1')
    this.getCustomers.getCustomerdata(this.getAllCommunication, data, 1, 'save', this)
  }


  /*导入通讯录*/
  uploading = false;
  addressbookupList: UploadFile[] = [];
  addressBookUploadIs = true
  addressBookUploadFile = new FormData()

  /*打开通讯录上传*/
  addressBookUpload(): void {
    this.addressBookUploadIs = false
    this.addressbookupList = [];
    this.IsSuc = true
    this.isShowSuc = true
    this.isShowSText = ''
    this.isOperating = false
  }

  /*关闭通讯录上传*/
  address_book_management_upload_close(): void {
    this.addressBookUploadIs = true
    this.addressbookupList = [];
    this.IsSuc = true
    this.isShowSuc = true
    this.isShowSText = ''
    this.isOperating = true
  }

  constructor(private getCustomers: AddressbookmanagementserviveService, private msg: NzMessageService) {
  }
  /*全局提示*/
  errormessage;
  createMessage(type: string): void {
    this.msg.create(type, `` + this.errormessage + ``);
  }
  /*导入通讯录文件*/
  beforeUpload = (file: UploadFile): boolean => {
    const isxls = file.type === "application/vnd.ms-excel";
    const isxlsx = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (isxls || isxlsx) {
      this.addressbookupList.push(file)
      this.IsSuc = true
      this.isShowSuc = true
      this.isShowSText = ''
    } else {

    }
    return false;
  }
  IsSuc = true
  isShowSuc = true
  isShowSText: string = ' 文件上传成功'

  /*提交通讯录上传*/
  address_book_management_upload_sure(): void {
    const formData = new FormData();
    this.addressbookupList.forEach((file: any) => {
      formData.append('file', file);
    });
    formData.append('accountId', ''+this.accountId+'')
    this.getCustomers.getCustomerdata(this.addCommunication, formData, 2, 'save', this)
    this.uploading = true;
  }


  useTagList = []
  newTagList = []
  /*蒙层开关*/
  isOperating: boolean = true;
  /*修改标签开关*/
  taggingPublic: boolean = true
  allChecked = false;
  Ownedtag = []
  /*获得所有选中的用户ID*/
  get_All_Com_Check = []
  /*获取所有选中操作用户*/
  getTags_search = GlobalUrl.prioductUrl + 'tag/getTagByName'
  getTags_new_used_DataUrl = GlobalUrl.prioductUrl + 'tag/getUpdateTag'
  /*标签确认上传*/
  getTags_sure = GlobalUrl.prioductUrl + 'contact/addContactTagsByList'
  /*根据accountId查询显示通讯录*/
  getAllCommunication = GlobalUrl.prioductUrl + 'contact/getAllContact'
  /*根据accountId，模糊查询显示通讯录*/
  getAllCommunicationByName = GlobalUrl.prioductUrl + 'contact/getAllContactByName'
  /*导入通讯录*/
  addCommunication = GlobalUrl.prioductUrl + 'contact/addContact'
  /*根据id删除通讯录（批量或单个）*/
  deleteCommunicationById = GlobalUrl.prioductUrl + 'contact/deleteContactById'
  /*根据id查询通讯录）*/
  getCommunicationById = GlobalUrl.prioductUrl + 'contact/getContactById'

  getAllComCheck(): void {
    let sendOd: number[] = []
    if (this.allChecked === true) {
      for (var value of  this.allChecksMore) {
        sendOd.push(value[1].id)
      }
    } else {
      for (var value of  this.allChecksMore) {
        if (value[0].ischeck === true) {
          sendOd.push(value[1].id)
        }
      }
    }
    this.get_All_Com_Check = sendOd
  }

  onSearch(value: string): void {
    this.isLoading = true;
    let data = new FormData()
    data.append('accountId', ''+this.accountId+'')
    data.append('tagName', '' + value + '')
    this.getCustomers.getCustomerdata(this.getTags_search, data, 7, 'save', this)
  }

  /*添加选中标签内容*/
  tagging_public_clean_selectedUser() {
    for (let a of this.selectedUser) {
      this.Ownedtag.unshift(this.optionList[a])
    }
    this.selectedUser = []
    console.log(this.Ownedtag)
  }

  optionList = [];
  selectedUser;
  isLoading = false;
  tagsNumber_used = []
  tagsNumber_used_old = []
  tagsNumber_new = []
  tagsNumber_new_old = []

  /*打开修改标签*/
  tagidss;
  Istagidss: boolean = false

  tagging_public_open(e) {
    if (e === -1) {
      this.Istagidss = true
      let sendOd = []
      if (this.allChecked === true) {
        for (var value of  this.allChecksMore) {
          sendOd.push(value[1].id)
        }
      } else {
        for (var value of  this.allChecksMore) {
          if (value[0].ischeck === true) {
            sendOd.push(value[1].id)
          }
        }
      }
      this.tagidss = sendOd
      if(this.tagidss.length<=0){
        this.errormessage='请选择需要批量打标签的操作对象'
        this.createMessage('warning')
      }else{
        let tages_new_used_Data = new FormData()
        tages_new_used_Data.append('accountId', ''+this.accountId+'')
        this.getCustomers.getCustomerdata(this.getTags_new_used_DataUrl, tages_new_used_Data, 5, 'save', this)
        this.taggingPublic = false
        this.isOperating = false
      }

    } else {
      this.Istagidss = false
      this.tagidss = e
      let data = new FormData()
      data.append('id', '' + e + '')
      this.getCustomers.getCustomerdata(this.getCommunicationById, data, 9, 'save', this)
      let tages_new_used_Data = new FormData()
      tages_new_used_Data.append('accountId', ''+this.accountId+'')
      this.getCustomers.getCustomerdata(this.getTags_new_used_DataUrl, tages_new_used_Data, 5, 'save', this)
      this.taggingPublic = false
      this.isOperating = false
    }
  }

  /*最新标签选中触发事件*/
  newTagIsDel = false
  usedTagIsDel = false
  tagsNumber_used_old1 = []
  tagsNumber_new_old1 = []

  newTag_con_change(value: string[]): void {
    if (this.newTagIsDel === true) {
      this.tagsNumber_new_old = this.tagsNumber_new_old1
      this.newTagIsDel = false
      this.tagsNumber_new_old1 = []

    } else {

    }
    this.tagsNumber_new = value
    const result = [];//返回的数组
    if (this.tagsNumber_new.length > this.tagsNumber_new_old.length) {
      this.tagsNumber_new.forEach(oldItem => {
        if (!this.tagsNumber_new_old.find((newItem) => {
          return oldItem === newItem;
        })) {

          result.push(oldItem);
        }
      })
      this.newTagList[result[0]].addType = 1
      this.Ownedtag.unshift(this.newTagList[result[0]])
    } else {
      this.tagsNumber_new_old.forEach(oldItem => {
        if (!this.tagsNumber_new.find((newItem) => {
          return newItem === oldItem;
        })) {
          result.push(oldItem);
        }
      })

      for (let a = 0; a < this.Ownedtag.length; a++) {
        if (this.newTagList[result[0]] === this.Ownedtag[a]) {
          this.Ownedtag.splice(a, 1)
        }
      }
    }
    this.tagsNumber_new_old = this.tagsNumber_new

  }

  /*常用标签选中触发事件*/
  usedTag_con_change(value: string[]): void {
    if (this.usedTagIsDel === true) {
      this.tagsNumber_used_old = this.tagsNumber_used_old1
      this.usedTagIsDel = false
      this.tagsNumber_used_old1 = []
    } else {
    }
    this.tagsNumber_used = value
    const result = [];//返回的数组
    if (this.tagsNumber_used.length > this.tagsNumber_used_old.length) {
      this.tagsNumber_used.forEach(oldItem => {
        if (!this.tagsNumber_used_old.find((newItem) => {
          return oldItem === newItem;
        })) {
          result.push(oldItem);
        }
      })
      this.newTagList[result[0]].addType = 2
      this.Ownedtag.unshift(this.useTagList[result[0]])
    } else {
      this.tagsNumber_used_old.forEach(oldItem => {
        if (!this.tagsNumber_used.find((newItem) => {
          return newItem === oldItem;
        })) {
          result.push(oldItem);
        }
      })
      for (let a = 0; a < this.Ownedtag.length; a++) {
        if (this.useTagList[result[0]] === this.Ownedtag[a]) {
          this.Ownedtag.splice(a, 1)
        }
      }
    }
    this.tagsNumber_used_old = this.tagsNumber_used
  }

  /*确认标签后上传*/
  tagging_public_true(): void {
    let data = new FormData()
    let ids = []
    let names = []
    for (let a of this.Ownedtag) {
      ids.push(a.id)
      names.push(a.tagName)
    }
    if (this.Istagidss === true) {
      data.append('commIds', '' + JSON.stringify(this.tagidss) + '')
    } else {
      data.append('commIds', '[' + this.tagidss + ']')
    }

    data.append('tagNames', '' + names + '')
    this.getCustomers.getCustomerdata(this.getTags_sure, data, 8, 'save', this)

  }

  /*关闭修改标签*/
  tagging_public_close() {
    this.Istagidss = false
    this.isOperating = true
    this.taggingPublic = true
    this.Ownedtag = []
    this.tagsNumber_used_old = []
    this.tagsNumber_new_old = []
    this.tagsNumber_used_old1 = []
    this.tagsNumber_new_old1 = []
    this.newTagIsDel = true
    this.usedTagIsDel = true
  }

  /*标签信息库删除操作*/
  tagging_public_onClose(e: MouseEvent, q, w, r): void {
    console.log(r)
    if (w === 0) {

    } else if (w === 1) {
      this.newTagIsDel = true
      for (let a = 0; a < this.newTagList.length; a++) {
        if (q === this.newTagList[a].id) {
          this.newTagList[a].checked = false
        }
      }
      this.tagsNumber_new_old1 = this.tagsNumber_new_old
      for (let a = 0; a < this.tagsNumber_new_old1.length; a++) {
        if (r.toString() === this.tagsNumber_new_old1[a]) {
          this.tagsNumber_new_old1.splice(a, 1)
        }
        console.log(this.tagsNumber_new_old1)
      }
    } else if (w === 2) {
      this.usedTagIsDel = true
      for (let a = 0; a < this.useTagList.length; a++) {
        if (q === this.useTagList[a].id) {
          this.useTagList[a].checked = false
        }
      }
      this.tagsNumber_used_old1 = this.tagsNumber_used_old
      for (let a = 0; a < this.tagsNumber_used_old1.length; a++) {
        if (r.toString() === this.tagsNumber_used_old1[a]) {
          this.tagsNumber_used_old1.splice(a, 1)
        }
      }
    } else if (w === -1) {
      for (let a = 0; a < this.Ownedtag.length; a++) {
        if (q === this.Ownedtag[a].id) {
          this.Ownedtag.splice(a, 1)
        }
      }
    }


  }

  tagging_public_afterClose(): void {
    console.log('after tag closed');
  }

  indeterminate = false

  postOk(val, flag, distinguish) {
    /*获取table数据*/
    if (distinguish === 1) {
      this.dataSet = val.data.contactList
      this.isLoading = false;
      this.total = val.data.contactCount;
      this.allChecksMore = []
      for (var value of  this.dataSet) {
        value.checked = false
        this.allChecksMore.push([{'ischeck': false}, {'id': value.id}])
      }
      this.indeterminate = false;
      this.allChecked = false
    } else if (distinguish === 2) {
      this.isShowSuc = false
      this.IsSuc = true
      this.isShowSText = ' 文件上传成功'
      this.uploading = false;
      this.addressbookupList = [];
      this.searchData(false)
    }
    /*删除后进行操作*/
    else if (distinguish === 3) {
      this.searchData(false)
    }
    /*打标签相关*/
    else if (distinguish === 5) {
      for (let a = 0; a < val.data.newList.length; a++) {
        val.data.newList[a].checked = false
        val.data.newList[a].Tagindex = a
        val.data.newList[a].addtype = 1
      }

      for (let a = 0; a < val.data.useList.length; a++) {
        val.data.useList[a].checked = false
        val.data.useList[a].Tagindex = a
        val.data.useList[a].addtype = 2
      }
      this.useTagList = val.data.useList
      this.newTagList = val.data.newList
    }
    /*模糊查询标签*/
    else if (distinguish === 7) {
      for (let c of  val.data.likeList) {
        c.addtype = 0
      }
      this.optionList = val.data.likeList
      this.isLoading = false;
    }
    /*确认修改标签*/
    else if (distinguish === 8) {
      if (this.fuzzyQuery === '') {
        let dataFormdata = new FormData()
        dataFormdata.append('accountId', ''+this.accountId+'')
        dataFormdata.append('page', '' + this.pageIndex + '')
        this.getCustomers.getCustomerdata(this.getAllCommunication, dataFormdata, 1, 'save', this)
      } else {
        const getdata = new FormData()
        getdata.append('accountId', ''+this.accountId+'')
        getdata.append('message', '' + this.fuzzyQuery + '')
        getdata.append('page', '' + this.pageIndex + '')
        this.getCustomers.getCustomerdata(this.getAllCommunicationByName, getdata, 1, 'save', this)
      }
      this.tagging_public_close()
    }
    else if (distinguish === 9) {
      for (let a = 0; a < val.data.tagss.length; a++) {
        val.data.tagss[a].checked = true
        val.data.tagss[a].Tagindex = a
        val.data.tagss[a].id = '$' + a
        val.data.tagss[a].addtype = -1
        val.data.tagss[a].tagName = val.data.tagss[a].tags
        this.Ownedtag.push(val.data.tagss[a])
      }
    }
  }

  postErr(val, flag, distinguish) {
    console.log(val)
    if (distinguish === 2) {
      if (val === '') {
        this.isShowSText = '导入文件内容已存在'
      } else {
        this.isShowSText = '导入文件内容格式错误'
      }
      this.isShowSuc = false
      this.IsSuc = false
      this.uploading = false;
    }
  }

  /*是否为好友*/
  IsFriend(e) {
    let a = ''
    if (e === 0) {
      a = '不是'
    } else {
      a = '是'
    }
    return a
  }

  /*是否公有*/
  IsPublic(e) {
    let a = ''
    if (e === 0) {
      a = '是'
    } else {
      a = '否'
    }
    return a
  }

  /*有效性*/
  Iseffectiveness(e) {
    let a = ''
    if (e === 0) {
      a = '不存在'
    } else {
      a = '有效'
    }
    return a
  }

  /*主表格分页切换数据*/
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.isLoading = true;
    if (this.isfuzzyQuery === true) {
      let dataFormdata = new FormData()
      dataFormdata.append('accountId', ''+this.accountId+'')
      dataFormdata.append('page', '' + this.pageIndex + '')
      this.getCustomers.getCustomerdata(this.getAllCommunication, dataFormdata, 1, 'save', this)
    } else {
      const getdata = new FormData()
      getdata.append('accountId', ''+this.accountId+'')
      getdata.append('message', '' + this.fuzzyQuery + '')
      getdata.append('page', '' + this.pageIndex + '')
      this.getCustomers.getCustomerdata(this.getAllCommunicationByName, getdata, 1, 'save', this)
    }
  }

  /*模糊搜索*/
  fuzzy_query_table(): void {
    if (this.fuzzyQuery === '') {
      this.pageIndex = 1;
      this.isfuzzyQuery = true
      let dataFormdata = new FormData()
      dataFormdata.append('accountId', ''+this.accountId+'')
      dataFormdata.append('page', '1')
      this.getCustomers.getCustomerdata(this.getAllCommunication, dataFormdata, 1, 'save', this)
    } else {
      this.pageIndex = 1;
      this.isfuzzyQuery = false
      const getdata = new FormData()
      getdata.append('accountId', ''+this.accountId+'')
      getdata.append('message', '' + this.fuzzyQuery + '')
      getdata.append('page', '1')
      this.getCustomers.getCustomerdata(this.getAllCommunicationByName, getdata, 1, 'save', this)
    }
  }

  disabledButton = true;
  checkedNumber = 0;

  refreshStatus(event): void {
    this.confrontation = event
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.dataSet.some(value => value.checked);
    this.checkedNumber = this.dataSet.filter(value => value.checked).length;
  }


  thisIndex(index) {
    if (this.confrontation === true) {
      this.allChecksMore[index][0].ischeck = true
    } else {
      this.allChecksMore[index][0].ischeck = false
    }
  }

  checkAll(value: boolean): void {
    this.dataSet.forEach(data => data.checked = value);
    this.refreshStatus(event);
    if (this.allChecked === true) {
      for (var value1 of  this.allChecksMore) {
        value1[0].ischeck = true
      }
    } else {
      for (var value1 of  this.allChecksMore) {
        value1[0].ischeck = false
      }
    }
  }

  /*删除通讯录单个或群体删除*/
  delThis(e): void {
    if (e != -1) {
      let data = new FormData()
      data.append('ids', '[' + e + ']')
      this.getCustomers.getCustomerdata(this.deleteCommunicationById, data, 3, 'save', this)
    } else {
      let sendOd = []
      if (this.allChecked === true) {
        for (var value of  this.allChecksMore) {
          sendOd.push(value[1].id)
        }
      } else {
        for (var value of  this.allChecksMore) {
          if (value[0].ischeck === true) {
            sendOd.push(value[1].id)
          }
        }
      }
      if(sendOd.length<=0){
        this.errormessage='请选择需要进行批量删除的操作对象'
        this.createMessage('warning')
      }else {

        let data = new FormData()
        data.append('ids', '' + JSON.stringify(sendOd) + '')
        this.getCustomers.getCustomerdata(this.deleteCommunicationById, data, 3, 'save', this)
      }

    }

  }
}
