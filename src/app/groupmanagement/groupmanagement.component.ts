import {Component, OnInit} from '@angular/core';
import {debounceTime, map, switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs/index";
import {GroupmanagementserviveService} from "./groupmanagementservive.service";
import { NzMessageService } from 'ng-zorro-antd';
declare var echarts: any;
declare var $: any;
import * as GlobalUrl from '../globals'

@Component({
  selector: 'app-groupmanagement',
  templateUrl: './groupmanagement.component.html',
  styleUrls: ['./groupmanagement.component.css']
})
export class GroupmanagementComponent implements OnInit {

  constructor(private http: HttpClient, private getGroupsService: GroupmanagementserviveService,private message: NzMessageService) {
  }

  dateFormat = 'yyyy-MM-dd';
  monthFormat = 'yyyy-MM';
  tableCssIs = false
  /*默认头像*/
  default_people = '../../assets/images/default_people.png'
  radioValue = 'A';
  /*模糊查询值*/
  fuzzyQuery = ''
  /*是否在模糊查询状态下*/
  isfuzzyQuery: boolean = false
  /*修改分组开关*/
  modifythegroup: boolean = true
  /*修改标签开关*/
  Tagging: boolean = true
  /*修改资料开关*/
  modifydata: boolean = true
  /*快捷菜单开关*/
  shortcutmenu: boolean = true
  /*蒙层开关*/
  isOperating: boolean = true;
  /*单个群组id*/
  chatroomId = ''
  /*群组标签*/
  groupEditTag = []
  /*单个群组资料*/
  editGroupData = {
    "chatroomMembers": [
      {
        "chatroomMemberWxid": "",
        "city": "",
        "keyWord": "",
        "memberName": "",
        "memberRole": "",
        "memberCount": 0,
        "profilePhoto": "",
        "province": "",
        "keywords": [],
        "sex": 0
      }
    ],
    "chatroomName": "",
    "chatroomOwner": "",
    "chatroomProfilePhoto": "",
    "id": 1,
    "chatroomCount": '',
    "socialaccount": {
      "device": {
        "deviceNumber": ""
      },
      "nickName": ""
    },
    'tagss': []
  }
  allChecksMore = []
  pageIndex = 1;
  pageIndex_edit = 1;
  pageSize = 10;
  total = 1;
  total_edit = 1;
  loading = false;
  confrontation = false
  tabs = ['所有客户', '群主']
  tabswith_one_second = 0
  tabsIsClick = false
  /*全局提示*/
  errormessage=''
  createMessage(type: string): void {
    this.message.create(type, ``+this.errormessage+``);
  }
  /*table切换 getTableForMeUrl*/
  tabswith(e): void {

    this.tabsIsClick = true;
    if (e === 0) {
      this.tabswith_one_second = 0
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('page', '1')
      data.append('pageSize', '' + this.pageSize + '')
      this.getGroupsService.getCustomerdata(this.getTableUrl, data, 1, 'save', this)
    } else {
      this.tabswith_one_second = 1
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('page', '1')
      data.append('pageSize', '' + this.pageSize + '')
      this.getGroupsService.getCustomerdata(this.getTableForMeUrl, data, 1, 'save', this)

    }
  }

  /*打开修改分组*/
  modify_the_group(e, q) {
    if(e===-1&&q===-1){
      this.getAllComCheck()
      if( this.get_All_Com_Check.length<=0){
        this.errormessage='请选择需要批量分组的相关群组'
        this.createMessage('warning')
      }else {
        this.radioValue = q.toString()
        this.modifythegroup = false
        this.isOperating = false
      }
    }else {
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

  /*确认修改分组*/
  modify_the_group_sure(): void {
    let group_sure_datas = new FormData()
    group_sure_datas.append('chatroomIds', '' + JSON.stringify(this.get_All_Com_Check) + '')
    group_sure_datas.append('groupId', '' + this.radioValue + '')
    this.getGroupsService.getCustomerdata(this.getGroupsSureUrl, group_sure_datas, 6, 'save', this)
  }

  /*群组详细*/
  modify_data_open(e) {
    this.isOperating=false
    this.chatroomId = e
    let data = new FormData()
    data.append('chatroomId', '' + e + '')
    data.append('page', '1')
    this.getGroupsService.getCustomerdata(this.getGroupsedit, data, 7, 'save', this)
    this.modifydata = false
  }

  /*关闭群组详细*/
  modify_data_close() {
    this.isOperating=true
    this.tableCssIs = false
    this.modifydata = true
  }

  /*打开快捷菜单*/
  shortcut_menu_open(e) {
    this.shortcutmenu = false
  }

  /*关闭快捷菜单*/
  shortcut_menu_close() {
    this.shortcutmenu = true
  }

  searchChange$ = new BehaviorSubject('');
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

  /*获取table好友数据*/
  getTableUrl = GlobalUrl.prioductUrl + 'chatroom/getAllChatroomByAccountId'
  /*获取table我是群组的数据*/
  getTableForMeUrl = GlobalUrl.prioductUrl + 'chatroom/getChatroomByGroup'
  /*获取所有分组*/
  getGroupsUrl = GlobalUrl.prioductUrl + 'groups/getGroups'
  /*确认分组提交分组*/
  getGroupsSureUrl = GlobalUrl.prioductUrl + 'chatroom/modifyChatroomGroup'
  /*获取群组个人资料*/
  getGroupsedit = GlobalUrl.prioductUrl + 'chatroom/getChatroomMsgYesterday'

  getTags_search = GlobalUrl.prioductUrl + 'tag/getTagByName'
  getTags_new_used_DataUrl = GlobalUrl.prioductUrl + 'tag/getUpdateTag'
  /*确认提交修改标签*/
  getTags_sure = GlobalUrl.prioductUrl + 'chatroom/addChatroomTag'
  /*根据群的名称模糊查询*/
  getTags_1_FuzzyQuery = GlobalUrl.prioductUrl + 'chatroom/getAllChatroomByName'
  /*模糊查询我是群主的群*/
  getTags_2_FuzzyQuery = GlobalUrl.prioductUrl + 'chatroom/getChatroomByGroupName'
  /*获取群成员聊天走势图*/
  chat_trend = GlobalUrl.prioductUrl + 'stat/getChatroomMessageInfo'
  /*男女比例*/
  sex_ratio = GlobalUrl.prioductUrl + 'chatroom/getPercentSex'
  /*查询单个群组详细*/
  getChatroomById = GlobalUrl.prioductUrl + 'chatroom/getChatroomById'

  onSearch(value: string): void {
    this.isLoading = true;
    let data = new FormData()
    data.append('accountId', ''+this.accountId+'')
    data.append('tagName', '' + value + '')
    this.getGroupsService.getCustomerdata(this.getTags_search, data, 2, 'save', this)
  }

  table_1_data = new FormData()
  group_1_data = new FormData()
  accountId;
  ngOnInit(): void {
    this.accountId=localStorage.getItem('id')
    this.table_1_data.append('accountId', ''+this.accountId+'')
    this.table_1_data.append('page', '1')
    this.table_1_data.append('pageSize', '' + this.pageSize + '')
    this.group_1_data.append('accountId', ''+this.accountId+'')
    this.group_1_data.append('pageSize', '' + this.pageSize + '')
    this.getGroupsService.getCustomerdata(this.getTableUrl, this.table_1_data, 1, 'save', this)
    this.getGroupsService.getCustomerdata(this.getGroupsUrl, this.group_1_data, 5, 'save', this)

  }

  allChecked = false;
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

  Ownedtag = []
  newTagList = []
  useTagList = []
  tagsNumber_used = []
  tagsNumber_used_old = []
  tagsNumber_new = []
  tagsNumber_new_old = []

  /*打开修改标签*/
  tagging_open(e) {
    this.get_All_Com_Check=[]
    this.get_All_Com_Check.push(e)
    let tagesData = new FormData()
    tagesData.append('chatroomId', '' + e+ '')
    this.getGroupsService.getCustomerdata(this.getChatroomById, tagesData, 10, 'save', this)



    let tages_new_used_Data = new FormData()
    tages_new_used_Data.append('accountId', ''+this.accountId+'')
    this.getGroupsService.getCustomerdata(this.getTags_new_used_DataUrl, tages_new_used_Data, 3, 'save', this)
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
    data.append('chatroomIds', '' + JSON.stringify(this.get_All_Com_Check) + '')
    data.append('tagNames', '' + names + '')
    data.append('whetherPublic', '0')
    this.getGroupsService.getCustomerdata(this.getTags_sure, data, 4, 'save', this)

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

  chat_trend_numbers = [];
  chat_trend_trend = [];
  chat_trend_sex_ratio = [];

  /*群组资料详情与群成员切换*/
  tableswich(value: number, event): void {

    if (value === 1) {
      this.tableCssIs = false
    } else if (value === 2) {

      let data = new FormData()
      data.append('chatroomId', '' + this.chatroomId + '')
      let data1 = new FormData()
      data1.append('chatroomId', '' + this.chatroomId + '')
      data1.append('endDate', '')
      data1.append('startDate', '')
      this.getGroupsService.getCustomerdata(this.chat_trend, data, 8, 'save', this)
      this.getGroupsService.getCustomerdata(this.sex_ratio, data1, 9, 'save', this)
      this.tableCssIs = true


    }
  }

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

  /*table单选点击变化状态*/
  thisIndex(index) {
    if (this.confrontation === true) {
      this.allChecksMore[index][0].ischeck = true
    } else {
      this.allChecksMore[index][0].ischeck = false
    }
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

  /*主表格*/
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }

    if (this.isfuzzyQuery === true) {
      if (this.tabswith_one_second === 0) {
        let dataFormdata = new FormData()
        dataFormdata.append('accountId', ''+this.accountId+'')
        dataFormdata.append('message', '' + this.fuzzyQuery + '')
        dataFormdata.append('page', '' + this.pageIndex + '')
        dataFormdata.append('pageSize', '' + this.pageSize + '')
        this.getGroupsService.getCustomerdata(this.getTags_1_FuzzyQuery, dataFormdata, 1, 'save', this)
      } else {
        const getdata = new FormData()
        getdata.append('accountId', ''+this.accountId+'')
        getdata.append('message', '' + this.fuzzyQuery + '')
        getdata.append('page', '' + this.pageIndex + '')
        getdata.append('pageSize', '' + this.pageSize + '')
        this.getGroupsService.getCustomerdata(this.getTags_2_FuzzyQuery, getdata, 1, 'save', this)
      }
    } else {
      if (this.tabswith_one_second === 0) {
        let data = new FormData()
        data.append('accountId', ''+this.accountId+'')
        data.append('page', '' + this.pageIndex + '')
        data.append('pageSize', '' + this.pageSize + '')
        this.getGroupsService.getCustomerdata(this.getTableUrl, data, 1, 'save', this)
      } else {
        let data = new FormData()
        data.append('accountId', ''+this.accountId+'')
        data.append('page', '' + this.pageIndex + '')
        data.append('pageSize', '' + this.pageSize + '')
        this.getGroupsService.getCustomerdata(this.getTableForMeUrl, data, 1, 'save', this)
      }
    }
  }

  /*群组资料table*/

  searchData1_edit(reset: boolean = false): void {
    if (reset) {
      this.pageIndex_edit = 1;
    }
    let data = new FormData()
    data.append('chatroomId', '' + this.chatroomId + '')
    data.append('page', '' + this.pageIndex_edit + '')
    this.getGroupsService.getCustomerdata(this.getGroupsedit, data, 7, 'save', this)
  }

  WhetherToFuzzyQuery(e): void {
    if (e === 0) {
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('page', '' + this.pageIndex + '')
      data.append('pageSize', '' + this.pageSize + '')
      this.getGroupsService.getCustomerdata(this.getTableUrl, data, 1, 'save', this)
    } else {
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('page', '' + this.pageIndex + '')
      data.append('pageSize', '' + this.pageSize + '')
      this.getGroupsService.getCustomerdata(this.getTableForMeUrl, data, 1, 'save', this)
    }
  }

  getTableData = []
  /*群组总数*/
  chatroomTotal = ''
  /*我是群组总数*/
  roleNumber = ''
  /*所有分组*/
  getTGroupsData = []

  postOk(val, flag, distinguish) {
    if (distinguish === 1) {
      this.getTableData = val.data.chatroomList
      this.total = val.data.chatroomCount
      this.allChecksMore = []
      this.indeterminate = false;
      for (var value of  this.getTableData) {
        value.checked = false
        this.allChecksMore.push([{'ischeck': false}, {'id': value.id}])
      }
      this.allChecked = false
      this.chatroomTotal = val.data.chatroomTotal
      this.roleNumber = val.data.roleNumber
      if (this.tabsIsClick === true) {
        this.pageIndex = 1;
        this.pageSize = 10;
        this.tabsIsClick = false
        this.fuzzyQuery = ''
      } else {
        this.tabsIsClick = false
      }
    }
    else if (distinguish === 3) {

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
    else if (distinguish === 2) {
      for (let c of  val.data.likeList) {
        c.addtype = 0
      }
      this.optionList = val.data.likeList
      this.isLoading = false;
    }
    /*确认修改标签*/
    else if (distinguish === 4) {
      this.WhetherToFuzzyQuery(this.tabswith_one_second)
      this.tagging_close()
    } else if (distinguish === 5) {
      this.getTGroupsData = val.data.groupsList
    } else if (distinguish === 6) {
      this.WhetherToFuzzyQuery(this.tabswith_one_second)
      this.modify_the_group_close()
    }
    /*获取群组资料*/
    else if (distinguish === 7) {
      this.editGroupData = val.data
      this.total_edit = val.data.memberCount
      this.groupEditTag = val.data.tagss
    }
    /*群成员聊天走势图*/
    else if (distinguish === 8) {
      for (let a of val.data) {
        this.chat_trend_numbers.push(a.sumcount)
        this.chat_trend_trend.push(a.messagecount)
      }

    } else if (distinguish === 9) {
      this.chat_trend_sex_ratio = [{value: val.data.sexList[0].malePercentage, name: '男'},
        {value: val.data.sexList[0].femalePercentage, name: '女'},
        {value: val.data.sexList[0].unkonwnPercentage, name: '未知'}]
      let myEchat = echarts.init($('.modify_data_detal_con_trend')[0])
      let myEchat1 = echarts.init($('.modify_data_detal_con_cake')[0])
      let Groupmenberoption = {
        title: {
          text: '群成员数量和每日聊天走势',
          textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            fontFamily: 'Arial, Verdana, sans...',
            fontSize: 16,
            fontWeight: 'bolder'
          },
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['群成员数量', '聊天走势'],
          x: 'right',
          y: '20px'
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '群成员数量',
            type: 'line',
            data: this.chat_trend_numbers,
          },
          {
            name: '聊天走势',
            type: 'line',
            data: this.chat_trend_trend,
          }
        ]
      };
      let Groupmenberoption1 = {
        title: {
          text: '男女比例统计',
          x: 'center',
          textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            fontFamily: 'Arial, Verdana, sans...',
            fontSize: 16,
            fontWeight: 'bolder'
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['男', '女', '未知'],
          itemHeight: 10
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.chat_trend_sex_ratio,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myEchat.setOption(Groupmenberoption)
      myEchat1.setOption(Groupmenberoption1)
    }else if(distinguish === 10){
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
  if(distinguish === 7){
    this.editGroupData = {
      "chatroomMembers": [],
      "chatroomName": "",
      "chatroomOwner": "",
      "chatroomProfilePhoto": "",
      "id": 1,
      "chatroomCount": '',
      "socialaccount": {
        "device": {
          "deviceNumber": ""
        },
        "nickName": ""
      },
      'tagss': []
    }
  }
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


  /*模糊查询*/
  msgSearch()
    :
    void {

    if (this.fuzzyQuery === ''
    ) {
      this.isfuzzyQuery = false
      this.tabsIsClick = true
      if (this.tabswith_one_second === 0) {
        let data = new FormData()
        data.append('accountId', ''+this.accountId+'')
        data.append('page', '1')
        data.append('pageSize', '' + this.pageSize + '')
        this.getGroupsService.getCustomerdata(this.getTableUrl, data, 1, 'save', this)
      } else {
        let data = new FormData()
        data.append('accountId', ''+this.accountId+'')
        data.append('page', '1')
        data.append('pageSize', '' + this.pageSize + '')
        this.getGroupsService.getCustomerdata(this.getTableForMeUrl, data, 1, 'save', this)
      }
    }
    else {
      this.isfuzzyQuery = true
      if (this.tabswith_one_second === 0) {
        this.pageIndex = 1;
        let dataFormdata = new FormData()
        dataFormdata.append('accountId', ''+this.accountId+'')
        dataFormdata.append('message', '' + this.fuzzyQuery + '')
        dataFormdata.append('page', '1')
        dataFormdata.append('pageSize', '' + this.pageSize + '')
        this.getGroupsService.getCustomerdata(this.getTags_1_FuzzyQuery, dataFormdata, 1, 'save', this)
      } else {
        this.pageIndex = 1;
        const getdata = new FormData()
        getdata.append('accountId', ''+this.accountId+'')
        getdata.append('message', '' + this.fuzzyQuery + '')
        getdata.append('page', '1')
        getdata.append('pageSize', '' + this.pageSize + '')
        this.getGroupsService.getCustomerdata(this.getTags_2_FuzzyQuery, getdata, 1, 'save', this)
      }
    }

  }

  /*----------------群成员详情部分echat-------------------*/
}
