import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CustomermanagementService} from "./customermanagement.service";
import {NzMessageService} from 'ng-zorro-antd'
import * as GlobalUrl from '../globals'
import {NavbarServiceService} from "../navbar/navbar-service.service";

@Component({
  selector: 'app-customermanagement',
  templateUrl: './customermanagement.component.html',
  styleUrls: ['./customermanagement.component.css']
})
export class CustomermanagementComponent implements OnInit {
  dateFormat = 'yyyy-MM-dd';
  monthFormat = 'yyyy-MM';
  selectedValue = '-1'
  selectedValue1 = '-1'
  /*默认头像*/
  isFss: boolean = false
  /*客户总数*/
  allcustomerss = ''
  /*男性人数*/
  malePercentage = ''
  /*女性人数*/
  femalePercentage = ''
  default_people = '../../assets/images/default_people.png'
  /*模糊查询值*/
  fuzzyQuery = ''
  /*是否在模糊查询状态下*/
  isfuzzyQuery: boolean = true
  /*蒙层开关*/
  isOperating: boolean = true;
  /*修改分组开关*/
  modifythegroup: boolean = true
  /*修改标签开关*/
  Tagging: boolean = true
  /*修改资料开关*/
  modifydata: boolean = true
  /*快捷菜单开关*/
  shortcutmenu: boolean = true
  allChecksMore = []
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  // dataSet = [];
  loading = false;
  sortValue = null;
  sortKey = null;
  searchGenderList: string[] = [];
  confrontation = false
  tabs = ['所有客户']

  /*table模糊查询*/
  fuzzy_query_table(): void {
    if (this.fuzzyQuery === '') {
      this.pageIndex = 1;
      this.isfuzzyQuery = true
      let dataFormdata = new FormData()
      dataFormdata.append('accountId', ''+this.accountId+'')
      dataFormdata.append('page', '1')
      dataFormdata.append('groupId', '')
      dataFormdata.append('pageSize', '' + this.pageSize + '')
      this.getCustomers.getCustomerdata(this.getTableUrl, dataFormdata, 2, 'save', this)
    } else {
      this.pageIndex = 1;
      this.isfuzzyQuery = false
      const getdata = new FormData()
      getdata.append('accountId', ''+this.accountId+'')
      if (this.selectedValue1 === '-1') {
        getdata.append('groupIds', '[]')
      } else {
        getdata.append('groupIds', '[' + this.selectedValue1 + ']')
      }
      getdata.append('message', '' + this.fuzzyQuery + '')
      getdata.append('page', '1')
      getdata.append('pageSize', '' + this.pageSize + '')
      if (this.selectedValue === '-1') {
        getdata.append('weChatIds', '')
      } else {
        getdata.append('weChatIds', '' + this.selectedValue + '')
      }
      this.getCustomers.getCustomerdata(this.getFuzzyQueryData, getdata, 2, 'save', this)
    }
  }

  /*打开快捷菜单*/
  shortcut_menu_open(e) {
    this.isOperating = false
    this.shortcutmenu = false
  }

  /*关闭快捷菜单*/
  shortcut_menu_close() {
    this.isOperating = true
    this.shortcutmenu = true
  }

  optionList = [];
  selectedUser;
  isLoading = false;

  /*添加选中标签内容*/
  clean_selectedUser() {
    for (let a of this.selectedUser) {
      this.Ownedtag.unshift(this.optionList[a])
    }
    this.selectedUser = []
  }

  /*搜索后打标签*/
  onSearch(value: string): void {
    this.isLoading = true;
    let data = new FormData()
    data.append('accountId', ''+this.accountId+'')
    data.append('tagName', '' + value + '')
    this.getCustomers.getCustomerdata(this.getTags_search, data, 7, 'save', this)

  }

  constructor(private http: HttpClient, private getCustomers: CustomermanagementService, private message: NzMessageService, private getCustomerID: NavbarServiceService) {
  }

  table_1_data = new FormData()
  group_1_data = new FormData()
  getTableData = []
  getTGroupsData = []
  /*获取table好友数据*/
  getTableUrl = GlobalUrl.prioductUrl + 'friend/getAllFriendByAccountId'
  /*获取模糊查询数据*/
  getFuzzyQueryData = GlobalUrl.prioductUrl + 'friend/getAllFriendByName'
  /*根据accountId查询社交号（该社交号下有好友）*/
  getAllWeChat = GlobalUrl.prioductUrl + 'socialaccount/getAllWeChat'
  /*同步客户微信号*/
  addWechatFromSocialaccount = GlobalUrl.prioductUrl + 'wechat/addWechatFromSocialaccount'
  /*获取所有分组*/
  getGroupsUrl = GlobalUrl.prioductUrl + 'groups/getGroups'
  getGroupsSureUrl = GlobalUrl.prioductUrl + 'friend/modifyFriendGroup'
  getTagsDataUrl = GlobalUrl.prioductUrl + 'friend/getContactById'
  getTags_new_used_DataUrl = GlobalUrl.prioductUrl + 'tag/getUpdateTag'
  getTags_search = GlobalUrl.prioductUrl + 'tag/getTagByName'
  getTags_sure = GlobalUrl.prioductUrl + 'friend/addFriendTag'
  getPersonalinformationsUrl = GlobalUrl.prioductUrl + 'friend/getFriendById'
  getPersonalinformationsSure = GlobalUrl.prioductUrl + 'friend/modifyFriendById'
  getContactById = GlobalUrl.prioductUrl + 'friend/getFriendById'

  accountId;

  ngOnInit(): void {
    this.accountId = localStorage.getItem('id')
    this.table_1_data.append('accountId', ''+this.accountId+'')
    this.table_1_data.append('page', '1')
    this.table_1_data.append('groupId', '')
    this.group_1_data.append('accountId', ''+this.accountId+'')
    this.group_1_data.append('pageSize', '' + this.pageSize + '')
    let data = new FormData()
    data.append('accountId', ''+this.accountId+'')
    this.getCustomers.getCustomerdata(this.getTableUrl, this.table_1_data, 2, 'save', this)
    this.getCustomers.getCustomerdata(this.getGroupsUrl, this.group_1_data, 3, 'save', this)
    this.getCustomers.getCustomerdata(this.getAllWeChat, data, 12, 'save', this)

  }

  Ownedtag = []
  newTagList = []
  useTagList = []
  weChats = []
  modify_data_detal_sex = 0
  modify_data_detal_income = 0
  modify_data_detal_marriage = 0
  modify_data_textarea = ''
  modify_data_noteName = ''
  modify_data_phone = ''
  modify_data_birthTimeString = ''
  modify_data_contactNumber = ''
  modify_data_qq = ''
  modify_data_personNumber = ''
  modify_data_province = ''
  modify_data_city = ''
  modify_data_realName = ''
  modify_data_profilePhoto = ''
  modify_data_nickName = ''
  modify_data_nickName_socialaccount_nickName = ''
  modify_data_nickName_socialaccount_deviceNumber = ''
  modify_data_lastChatTime = ''
  modify_data_chatroomName = ''
  modify_data_post_id = ''
  modify_data_tagss = []

  // appdata=new Date()

  postOk(val, flag, distinguish) {
    if (distinguish === 1) {
      this.getTableData = val.data.friendList
      this.total = val.data.contactCount
      this.allChecksMore = []
      for (var value of  this.getTableData) {
        value.checked = false
        this.allChecksMore.push([{'ischeck': false}, {'id': value.id}])
      }
      this.indeterminate = false;
      this.allChecked = false
      this.allcustomerss = val.data.friendTotal
      this.malePercentage = val.data.Percentsex[0].malePercentage
      this.femalePercentage = val.data.Percentsex[0].femalePercentage
    } else if (distinguish === 2) {
      this.loading = false;
      this.indeterminate = false;
      this.total = val.data.contactCount
      this.getTableData = val.data.friendList
      this.allChecksMore = []
      for (var value of  this.getTableData) {
        value.checked = false
        this.allChecksMore.push([{'ischeck': false}, {'id': value.id}])
      }
      this.allChecked = false
      this.allcustomerss = val.data.friendTotal
      this.malePercentage = val.data.Percentsex[0].malePercentage
      this.femalePercentage = val.data.Percentsex[0].femalePercentage
    } else if (distinguish === 3) {
      this.getTGroupsData = val.data.groupsList
    } else if (distinguish === 4) {
      this.WhetherToFuzzyQuery(this.isfuzzyQuery)
      this.modify_the_group_close()
    } else if (distinguish === 5) {
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
    } else if (distinguish === 6) {

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
      this.WhetherToFuzzyQuery(this.isfuzzyQuery)
      this.tagging_close()
    }
    /*打开修改个人资料*/
    else if (distinguish === 9) {
      this.modify_data_detal_sex = val.data.friend.sex
      this.modify_data_detal_income = val.data.friend.incomeLevel
      this.modify_data_detal_marriage = val.data.friend.isMarried
      this.modify_data_textarea = val.data.friend.description
      this.modify_data_noteName = val.data.friend.remark
      this.modify_data_phone = val.data.friend.phone
      this.modify_data_birthTimeString = val.data.friend.birthTimeString
      this.modify_data_contactNumber = val.data.friend.contactNumber
      this.modify_data_qq = val.data.friend.qq
      this.modify_data_personNumber = val.data.friend.familyMember
      this.modify_data_province = val.data.friend.province
      this.modify_data_city = val.data.friend.city
      this.modify_data_realName = val.data.friend.realName
      this.modify_data_profilePhoto = val.data.friend.profilePhoto
      this.modify_data_nickName = val.data.friend.nickName
      this.modify_data_tagss = val.data.friend.tagss
      this.modify_data_lastChatTime = val.data.friend.lastChatTime
      this.modify_data_post_id = val.data.friend.id
      this.modify_data_chatroomName = val.data.friend.chatroomList[0].chatroomName
      this.modify_data_nickName_socialaccount_nickName = val.data.friend.socialaccount.nickName
      this.modify_data_nickName_socialaccount_deviceNumber = val.data.friend.socialaccount.device.deviceNumber
      this.isOperating = false
      this.modifydata = false
    }
    /*确认修改资料*/
    else if (distinguish === 10) {
      this.modify_data_detal_sex = 0
      this.modify_data_detal_income = 0
      this.modify_data_detal_marriage = 0
      this.modify_data_textarea = ''
      this.modify_data_noteName = ''
      this.modify_data_phone = ''
      this.modify_data_birthTimeString = ''
      this.modify_data_contactNumber = ''
      this.modify_data_qq = ''
      this.modify_data_personNumber = ''
      this.modify_data_province = ''
      this.modify_data_city = ''
      this.modify_data_realName = ''
      this.modify_data_profilePhoto = ''
      this.modify_data_nickName = ''
      this.modify_data_nickName_socialaccount_nickName = ''
      this.modify_data_nickName_socialaccount_deviceNumber = ''
      this.modify_data_lastChatTime = ''
      this.modify_data_chatroomName = ''
      this.modify_data_post_id = ''
      this.modify_data_tagss = []
      const getModifyFriend = new FormData()
      getModifyFriend.append('accountId', ''+this.accountId+'')
      getModifyFriend.append('page', '' + this.pageIndex + '')
      getModifyFriend.append('groupId', '')
      this.WhetherToFuzzyQuery(this.isfuzzyQuery)
      this.modify_data_close()
    }
    else if (distinguish == 11) {
      for (let a = 0; a < val.data.contact.tagss.length; a++) {
        val.data.contact.tagss[a].checked = true
        val.data.contact.tagss[a].Tagindex = a
        val.data.contact.tagss[a].id = '$' + a
        val.data.contact.tagss[a].addtype = -1
        val.data.contact.tagss[a].tagName = val.data.contact.tagss[a].tags
        this.Ownedtag.push(val.data.contact.tagss[a])
      }
    } else if (distinguish === 12) {
      this.weChats = val.data.weChats
    } else if (distinguish === 13) {
      this.createMessages = '资源已同步'
      this.createMessage('success')
      this.WhetherToFuzzyQuery(this.isfuzzyQuery)
    }
  }


  postOk_other(val, flag, distinguish) {
    if (distinguish === 13) {
      this.createMessages = '资源同步失败'
      this.createMessage('error')
    }
  }

  createMessages = ''

  /*提示消息*/
  createMessage(type: string): void {
    this.message.create(type, `` + this.createMessages + ``);
  }

  /*分组名称id一一对应*/
  group_id_correspond(e) {
    let a = ''
    for (let i of  this.getTGroupsData) {
      if (e == i.id) {
        a = i.name
        break;
      } else {
        a = ''
      }
    }
    return a
  }

  /*分辨男女未知*/
  sex_id_correspond(e) {
    let a = ''
    if (e == 2) {
      a = '女'

    } else if (e == 1) {
      a = '男'
    } else {
      a = '未知'
    }
    return a
  }

  postErr(val, flag, distinguish) {
    // this.reqsuccess = false;
    // this.reqsuccessMsg = val['msg'];
  }

  tagsNumber_used = []
  tagsNumber_used_old = []
  tagsNumber_new = []
  tagsNumber_new_old = []

  /*打开修改标签*/
  tagging_open(e) {
    this.get_All_Com_Check.push(e)
    let tagesData = new FormData()
    tagesData.append('accountId', ''+this.accountId+'')
    tagesData.append('contactId', '' + e + '')
    this.getCustomers.getCustomerdata(this.getContactById, tagesData, 11, 'save', this)
    let tages_new_used_Data = new FormData()
    tages_new_used_Data.append('accountId', ''+this.accountId+'')
    this.getCustomers.getCustomerdata(this.getTags_new_used_DataUrl, tages_new_used_Data, 5, 'save', this)
    this.Tagging = false
    this.isOperating = false
  }

  newTagIsDel = false
  usedTagIsDel = false
  tagsNumber_used_old1 = []
  tagsNumber_new_old1 = []

  /*最新标签选中触发事件*/
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
  tagging_true(): void {
    let data = new FormData()
    let ids = []
    let names = []
    for (let a of this.Ownedtag) {
      names.push(a.tagName)
    }
    data.append('accountId', ''+this.accountId+'')
    data.append('contactIds', '' + JSON.stringify(this.get_All_Com_Check) + '')
    data.append('tagNames', '' + names + '')
    data.append('whetherPublic', '0')
    this.getCustomers.getCustomerdata(this.getTags_sure, data, 8, 'save', this)

  }

  /*关闭修改标签*/
  tagging_close() {
    this.isOperating = true
    this.Tagging = true
    this.Ownedtag = []
    this.tagsNumber_used_old = []
    this.tagsNumber_new_old = []
    this.tagsNumber_used_old1 = []
    this.tagsNumber_new_old1 = []
    this.newTagIsDel = true
    this.usedTagIsDel = true
  }

  /*标签信息库删除操作*/
  onClose(e: MouseEvent, q, w, r): void {
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

  afterClose(): void {
  }

  /*主表格分页切换数据*/
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    if (this.isfuzzyQuery === true) {
      let dataFormdata = new FormData()
      dataFormdata.append('accountId', ''+this.accountId+'')
      dataFormdata.append('page', '' + this.pageIndex + '')
      dataFormdata.append('groupId', '')
      dataFormdata.append('pageSize', '' + this.pageSize + '')
      this.getCustomers.getCustomerdata(this.getTableUrl, dataFormdata, 2, 'save', this)
    } else {
      const getdata = new FormData()
      getdata.append('accountId', ''+this.accountId+'')
      if (this.selectedValue1 === '-1') {
        getdata.append('groupIds', '[]')
      } else {
        getdata.append('groupIds', '[' + this.selectedValue1 + ']')
      }
      getdata.append('message', '' + this.fuzzyQuery + '')
      getdata.append('page', '' + this.pageIndex + '')
      getdata.append('pageSize', '' + this.pageSize + '')
      if (this.selectedValue === '-1') {
        getdata.append('weChatIds', '')
      } else {
        getdata.append('weChatIds', '' + this.selectedValue + '')
      }
      this.getCustomers.getCustomerdata(this.getFuzzyQueryData, getdata, 2, 'save', this)
    }
  }

  WhetherToFuzzyQuery(e: boolean): void {
    if (e === true) {
      let dataFormdata = new FormData()
      dataFormdata.append('accountId', ''+this.accountId+'')
      dataFormdata.append('page', '' + this.pageIndex + '')
      dataFormdata.append('groupId', '')
      dataFormdata.append('pageSize', '' + this.pageSize + '')
      this.getCustomers.getCustomerdata(this.getTableUrl, dataFormdata, 2, 'save', this)
    } else {
      const getdata = new FormData()
      getdata.append('accountId', ''+this.accountId+'')
      if (this.selectedValue1 === '-1') {
        getdata.append('groupIds', '')
      } else {
        getdata.append('groupIds', '' + this.selectedValue1 + '')
      }
      getdata.append('message', '' + this.fuzzyQuery + '')
      getdata.append('page', '' + this.pageIndex + '')
      getdata.append('pageSize', '' + this.pageSize + '')
      if (this.selectedValue === '-1') {
        getdata.append('weChatIds', '')
      } else {
        getdata.append('weChatIds', '' + this.selectedValue + '')
      }
      this.getCustomers.getCustomerdata(this.getFuzzyQueryData, getdata, 2, 'save', this)
    }
  }

  /*table选择框相关操作*/

  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  indeterminate = false;

  /*table全选*/
  checkAll(value: boolean): void {
    this.getTableData.forEach(data => data.checked = value);
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

  radioValue = '';

  /*打开修改分组*/
  modify_the_group(e, q) {
    if (e === -1 && q === -1) {
      this.getAllComCheck()
      if (this.get_All_Com_Check.length <= 0) {
        this.createMessages = '请选择需要进行批量分组的操作对象'
        this.createMessage('warning')
      } else {
        this.radioValue = q.toString()
        this.modifythegroup = false
        this.isOperating = false
      }
    } else {
      this.get_All_Com_Check = []
      this.get_All_Com_Check.push(e)
      this.radioValue = q.toString()
      this.modifythegroup = false
      this.isOperating = false
    }

  }

  /*关闭修改分组*/
  modify_the_group_close() {
    this.isOperating = true
    this.modifythegroup = true
  }

  /*移动分组选择后确认*/


  /*获得所有选中的用户ID*/
  get_All_Com_Check = []

  /*获取所有选中操作用户*/
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

  /*确认修改分组*/
  modify_the_group_sure(): void {
    let group_sure_datas = new FormData()
    group_sure_datas.append('contactIds', '' + JSON.stringify(this.get_All_Com_Check) + '')
    group_sure_datas.append('groupId', '' + this.radioValue + '')
    this.getCustomers.getCustomerdata(this.getGroupsSureUrl, group_sure_datas, 4, 'save', this)


  }


  /*table选择框点击改变状态执行*/
  refreshStatus(event): void {
    this.confrontation = event
    const allChecked = this.getTableData.every(value => value.checked === true);
    const allUnChecked = this.getTableData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.getTableData.some(value => value.checked);
    this.checkedNumber = this.getTableData.filter(value => value.checked).length;
  }

  /*table单选点击变化状态*/
  thisIndex(index) {
    if (this.confrontation === true) {
      this.allChecksMore[index][0].ischeck = true
    } else {
      this.allChecksMore[index][0].ischeck = false
    }
  }

  /*打开修改资料*/
  modify_data_open(e): void {
    let data = new FormData()
    data.append('accountId', ''+this.accountId+'')
    data.append('contactId', '' + e + '')
    this.getCustomers.getCustomerdata(this.getPersonalinformationsUrl, data, 9, 'save', this)
  }

  /*确认修改资料*/
  modify_data_sure(): void {
    let data = new FormData()
    data.append('birthTimeString', '' + this.modify_data_birthTimeString + '')
    data.append('city', '' + this.modify_data_city + '')
    data.append('contactNumber', '' + this.modify_data_contactNumber + '')
    data.append('description', '' + this.modify_data_textarea + '')
    data.append('id', '' + this.modify_data_post_id + '')
    data.append('incomeLevel', '' + this.modify_data_detal_income + '')
    data.append('isMarried', '' + this.modify_data_detal_marriage + '')
    data.append('remark', '' + this.modify_data_noteName + '')
    data.append('familyMember', '' + this.modify_data_personNumber + '')
    data.append('phone', '' + this.modify_data_phone + '')
    data.append('province', '' + this.modify_data_province + '')
    data.append('qq', '' + this.modify_data_qq + '')
    data.append('realName', '' + this.modify_data_realName + '')
    data.append('sex', '' + this.modify_data_detal_sex + '')
    this.getCustomers.getCustomerdata(this.getPersonalinformationsSure, data, 10, 'save', this)
  }

  /*关闭修改资料*/
  modify_data_close(): void {
    this.isOperating = true
    this.modifydata = true
  }

  /*同步资源*/
  synchronization(): void {
    //addWechatFromSocialaccount
    let data = new FormData()
    data.append('accountId', ''+this.accountId+'')
    this.getCustomers.getCustomerdata(this.addWechatFromSocialaccount, data, 13, 'save', this)
  }

  /*批量分组*/
  batchGrouping(): void {

  }

  /*分组进行搜索*/
  groupchange(): void {
    this.pageIndex = 1;
    this.isfuzzyQuery = false
    const getdata = new FormData()
    getdata.append('accountId', ''+this.accountId+'')
    if (this.selectedValue1 === '-1') {
      getdata.append('groupIds', '[]')
    } else {
      getdata.append('groupIds', '[' + this.selectedValue1 + ']')
    }
    getdata.append('message', '' + this.fuzzyQuery + '')
    getdata.append('page', '1')
    getdata.append('pageSize', '' + this.pageSize + '')
    if (this.selectedValue === '-1') {
      getdata.append('weChatIds', '')
    } else {
      getdata.append('weChatIds', '' + this.selectedValue + '')
    }
    this.getCustomers.getCustomerdata(this.getFuzzyQueryData, getdata, 2, 'save', this)
  }

  /*社交号搜索*/
  ownerchange(): void {
    this.pageIndex = 1;
    this.isfuzzyQuery = false
    const getdata = new FormData()
    getdata.append('accountId', ''+this.accountId+'')
    if (this.selectedValue1 === '-1') {
      getdata.append('groupIds', '[]')
    } else {
      getdata.append('groupIds', '[' + this.selectedValue1 + ']')
    }
    getdata.append('message', '' + this.fuzzyQuery + '')
    getdata.append('page', '1')
    getdata.append('pageSize', '' + this.pageSize + '')
    if (this.selectedValue === '-1') {
      getdata.append('weChatIds', '')
    } else {
      getdata.append('weChatIds', '' + this.selectedValue + '')
    }
    this.getCustomers.getCustomerdata(this.getFuzzyQueryData, getdata, 2, 'save', this)
  }
}
