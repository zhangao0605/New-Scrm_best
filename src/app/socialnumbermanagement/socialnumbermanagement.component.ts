import {Component, OnInit} from '@angular/core';
import * as GlobalUrl from "../globals";
import {SocialnumberservicemanagementService} from "./socialnumberservicemanagement.service";
import {NzMessageService} from 'ng-zorro-antd'

@Component({
  selector: 'app-socialnumbermanagement',
  templateUrl: './socialnumbermanagement.component.html',
  styleUrls: ['./socialnumbermanagement.component.css']
})
export class SocialnumbermanagementComponent implements OnInit {
  /*添加标签排序*/
  addPlanPublic = '0'
  /*修改标签开关*/
  taggingPublic: boolean = true
  /*蒙层开关*/
  isOperating: boolean = true;
  allChecksMore = []
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  confrontation = false

  constructor(private geData: SocialnumberservicemanagementService, private message: NzMessageService) {
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    if (this.fuzzyQuery === '') {
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('page', '' + this.pageIndex + '')
      this.geData.getCustomerdata(this.getAllSocialaccount, data, 1, 'save', this)
    } else {
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('message', '' + this.fuzzyQuery + '')
      data.append('page', '' + this.pageIndex + '')
      this.geData.getCustomerdata(this.getTagByName, data, 1, 'save', this)
    }
  }

  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  indeterminate = false;

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

  refreshStatus(event): void {
    this.confrontation = event
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.dataSet.some(value => value.checked);
    this.checkedNumber = this.dataSet.filter(value => value.checked).length;
  }

  delThis(e): void {
    if (e != -1) {
      let data = new FormData()
      data.append('ids', '[' + e + ']')
      this.geData.getCustomerdata(this.deleteTagById, data, 3, 'save', this)
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
        this.errormessage='请选择需要批量删除的社交号'
        this.createMessage('warning')
      }else {
        let data = new FormData()
        data.append('ids', '' + JSON.stringify(sendOd) + '')
        this.geData.getCustomerdata(this.deleteTagById, data, 3, 'save', this)
      }

    }
  }

  thisIndex(index) {
    if (this.confrontation === true) {
      this.allChecksMore[index][0].ischeck = true
    } else {
      this.allChecksMore[index][0].ischeck = false
    }
  }

  /*根据accountId查询显示社交号*/
  getAllSocialaccount = GlobalUrl.prioductUrl + 'wechat/getAllWechat'
  /*模糊查询标签*/
  getTagByName = GlobalUrl.prioductUrl + 'wechat/getAllWechatByName'
  /*批量或单个删除*/
  deleteTagById = GlobalUrl.prioductUrl + 'wechat/deleteWechatById'
  /*模糊查询标签*/
  getTags_search = GlobalUrl.prioductUrl + 'tag/getTagByName'
  /*确认上传标签*/
  getTags_sure = GlobalUrl.prioductUrl + 'wechat/addWechatTagsByList'
  /*根据accountId模糊查询社交号*/
  getAllWechatByName = GlobalUrl.prioductUrl + 'wechat/getAllWechatByName'
  /*常用标签*/
  getTags_new_used_DataUrl = GlobalUrl.prioductUrl + 'tag/getUpdateTag'
  /*查询的单个详细*/
  getWechatById = GlobalUrl.prioductUrl + 'wechat/getWechatById'
  /*同步客户微信号*/
  addWechatFromSocialaccount = GlobalUrl.prioductUrl + 'wechat/addWechatFromSocialaccount'
  /*同步通讯录资源*/
  addWechatFromComm = GlobalUrl.prioductUrl + 'wechat/addWechatFromComm'
  accountId;
  ngOnInit(): void {
    this.accountId=localStorage.getItem('id')
    let data = new FormData()
    data.append('accountId', ''+this.accountId+'')
    data.append('page', '1')
    this.geData.getCustomerdata(this.getAllSocialaccount, data, 1, 'save', this)
  }

  postOk(val, flag, distinguish) {
    /*获取table数据*/
    if (distinguish === 1) {
      this.dataSet = val.data.wechatList
      this.loading = false;
      this.total = val.data.wechatCount;
      this.allChecksMore = []
      for (let value of  this.dataSet) {
        value.checked = false
        this.allChecksMore.push([{'ischeck': false}, {'id': value.id}])
      }
      this.indeterminate = false;
      this.allChecked = false

    } else if (distinguish === 3) {
      this.searchData(false)
    }
    /*查询原有标签*/
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
    else if (distinguish === 6) {
      for (let c of  val.data.likeList) {
        c.addtype = 0
      }
      this.optionList = val.data.likeList
      this.isLoading = false;
    }/*确认修改标签*/
    else if (distinguish === 8) {
      if (this.fuzzyQuery === '') {
        let data = new FormData()
        data.append('accountId', ''+this.accountId+'')
        data.append('page', '' + this.pageIndex + '')
        this.geData.getCustomerdata(this.getAllSocialaccount, data, 1, 'save', this)
      } else {
        let data = new FormData()
        data.append('accountId', ''+this.accountId+'')
        data.append('page', '' + this.pageIndex + '')
        data.append('message', '' + this.fuzzyQuery + '')
        this.geData.getCustomerdata(this.getAllWechatByName, data, 1, 'save', this)
      }
      this.tagging_public_close()
    } else if (distinguish === 9) {
      for (let a = 0; a < val.data.tagss.length; a++) {
        val.data.tagss[a].checked = true
        val.data.tagss[a].Tagindex = a
        val.data.tagss[a].id = '$' + a
        val.data.tagss[a].addtype = -1
        val.data.tagss[a].tagName = val.data.tagss[a].tags
        this.Ownedtag.push(val.data.tagss[a])
      }
    }
    else if (distinguish === 10) {
      this.errormessage = '已同步客户端微信'
      this.createMessage('success')
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('page', '1')
      this.geData.getCustomerdata(this.getAllSocialaccount, data, 1, 'save', this)
    } else if (distinguish === 11) {
      this.errormessage = '已同步通讯录资源'
      this.createMessage('success')
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('page', '1')
      this.geData.getCustomerdata(this.getAllSocialaccount, data, 1, 'save', this)
    }
  }

  postOk_other(val, flag, distinguish) {
    if (distinguish === 10) {
      this.errormessage = '同步客户端微信失败'
      this.createMessage('error')
    } else if (distinguish === 11) {
      this.errormessage = '同步通讯录资源失败'
      this.createMessage('error')
    }
  }

  /*是否公有效*/
  effectiveness(e) {
    let a = ''
    if (e == 0) {
      a = ''
    } else if (e == 1) {
      a = '有效'
    } else if (e == 2) {
      a = '不存在'
    }
    return a
  }

  /*是否公有*/
  whetherPublic(w): void {
    let a;
    if (w === 0) {
      a = '是'
    } else {
      a = '否'
    }
    return a
  }

  /*显示微信号或手机号*/
  socialNumber(w, e): void {
    let a;
    if (w === '' || w === undefined || w === null) {
      a = e
    } else {
      a = w
    }
    return a
  }

  /*显示微信号或手机号颜色*/
  socialNumbercolor(w, e): void {
    let a;
    if (w === '' || w === undefined || w === null) {
      a = 'showColor1'
    } else {
      a = 'showColor'
    }
    return a
  }

  /*模糊查询数据绑定*/
  fuzzyQuery = ''
  /*table模糊查询*/
  isfuzzyquery = false;

  /*模糊查询标签*/
  fuzzy_query_table(): void {
    if (this.fuzzyQuery === '') {
      this.pageIndex = 1
      this.isfuzzyquery = false;
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('page', '1')
      this.geData.getCustomerdata(this.getAllSocialaccount, data, 1, 'save', this)
    } else {
      this.pageIndex = 1
      this.isfuzzyquery = true;
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('message', '' + this.fuzzyQuery + '')
      data.append('page', '1')
      this.geData.getCustomerdata(this.getTagByName, data, 1, 'save', this)
    }


  }


  tagsNumber_used = []
  tagsNumber_used_old = []
  tagsNumber_new = []
  tagsNumber_new_old = []
  useTagList = []
  newTagList = []
  Ownedtag = []
  selectedUser;
  newTagIsDel = false
  usedTagIsDel = false
  tagsNumber_used_old1 = []
  tagsNumber_new_old1 = []
  optionList;
  isLoading = false;

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

  /*添加选中标签内容*/
  tagging_public_clean_selectedUser() {
    for (let a of this.selectedUser) {
      this.Ownedtag.unshift(this.optionList[a])
    }
    this.selectedUser = []
    console.log(this.Ownedtag)
  }

  onSearch(value: string): void {
    this.isLoading = true;
    let data = new FormData()
    data.append('accountId', ''+this.accountId+'')
    data.append('tagName', '' + value + '')
    this.geData.getCustomerdata(this.getTags_search, data, 6, 'save', this)
  }

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

  /*标签信息库删除操作*/
  tagging_public_onClose(e: MouseEvent, q, w, r): void {
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

  /*打开修改标签*/
  tagidss;

  /*确认标签后上传*/
  tagging_public_true(): void {
    let data = new FormData()
    let ids = []
    let names = []
    console.log(this.Ownedtag)
    for (let a of this.Ownedtag) {
      ids.push(a.id)
      names.push(a.tagName)
    }
    if (this.Istagidss === true) {
      data.append('weChatIds', '' + JSON.stringify(this.tagidss) + '')
    } else {
      data.append('weChatIds', '[' + this.tagidss + ']')
    }
    data.append('tagNames', '' + names + '')
    this.geData.getCustomerdata(this.getTags_sure, data, 8, 'save', this)

  }

  Istagidss: boolean = false
  /*打开修改标签*/
  modPubId = ''

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
      if (sendOd.length <= 0) {
        this.errormessage = '请选择批量打标签对应社交号'
        this.createMessage('warning')
      } else {
        this.tagidss = sendOd
        let tages_new_used_Data = new FormData()
        tages_new_used_Data.append('accountId', ''+this.accountId+'')
        this.geData.getCustomerdata(this.getTags_new_used_DataUrl, tages_new_used_Data, 5, 'save', this)
        this.taggingPublic = false
        this.isOperating = false
      }
    } else {
      this.Istagidss = false
      this.tagidss = e
      this.modPubId = e
      let data = new FormData()
      data.append('id', '' + e + '')
      this.geData.getCustomerdata(this.getWechatById, data, 9, 'save', this)
      let tages_new_used_Data = new FormData()
      tages_new_used_Data.append('accountId', ''+this.accountId+'')
      this.geData.getCustomerdata(this.getTags_new_used_DataUrl, tages_new_used_Data, 5, 'save', this)
      this.taggingPublic = false
      this.isOperating = false
    }


  }

  /*同步微信*/
  synchronizeWeChat(): void {
    let data = new FormData()
    data.append('accountId', ''+this.accountId+'')
    this.geData.getCustomerdata(this.addWechatFromSocialaccount, data, 10, 'save', this)
  }

  /*同步通讯录*/
  syncContacts(): void {
    let data = new FormData()
    data.append('accountId', ''+this.accountId+'')
    this.geData.getCustomerdata(this.addWechatFromComm, data, 11, 'save', this)
  }

  errormessage;

  /*全局提示*/
  createMessage(type: string): void {
    this.message.create(type, `` + this.errormessage + ``);
  }
}







