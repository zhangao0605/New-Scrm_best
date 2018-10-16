import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from "../task/http-request.service";
import {GroupmanagementserviveService} from "../groupmanagement/groupmanagementservive.service";
import * as GlobalUrl from "../globals";
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-groupingmanagement',
  templateUrl: './groupingmanagement.component.html',
  styleUrls: ['./groupingmanagement.component.css']
})
export class GroupingmanagementComponent implements OnInit {
  errormessage;

  /*全局提示*/
  createMessage(type: string): void {
    this.message.create(type, `` + this.errormessage + ``);
  }

  allChecksMore = []
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  sortValue = null;
  sortKey = null;
  /*是否模糊查询*/
  IsGluestudy = false
  /*模糊查询数据绑定*/
  fuzzyQuery = ''
  /*单个分组资料*/
  SingleGroupInformation = []
  /*蒙层开关*/
  isOperating: boolean = true;
  /*单个分组群组使用分组数量*/
  grpNumber = 0
  /*单个分组好友使用分组数量*/
  cusNumber = 0
  searchGenderList: string[] = [];
  confrontation = false

  /*table模糊查询*/
  fuzzy_query_table(): void {
    if (this.fuzzyQuery === '') {
      this.pageIndex = 1;
      this.IsGluestudy = false
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '1')
      this.geData.getCustomerdata(this.getTableUrl, data, 1, 'save', this)
    } else {
      this.pageIndex = 1;
      this.IsGluestudy = true
      let dataFormdata = new FormData()
      dataFormdata.append('accountId', '' + this.accountId + '')
      dataFormdata.append('message', '' + this.fuzzyQuery + '')
      dataFormdata.append('page', '1')
      this.geData.getCustomerdata(this.glue_study_search, dataFormdata, 1, 'save', this)
    }

  }

  constructor(private randomUserService: HttpRequestService, private geData: GroupmanagementserviveService, private message: NzMessageService) {
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.dataUpdate(this.IsGluestudy)
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

  Criticism(): void {
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
    // console.log(sendOd)
    // console.log(this.allChecksMore)
  }

  thisIndex(index) {
    if (this.confrontation === true) {
      this.allChecksMore[index][0].ischeck = true
    } else {
      this.allChecksMore[index][0].ischeck = false
    }
  }

  /*获取初始化table数据*/
  getTableUrl = GlobalUrl.prioductUrl + 'groups/getAllGroups'
  /*模糊查询*/
  glue_study_search = GlobalUrl.prioductUrl + 'groups/getAllGroupsByName'
  /*根据id查询分组*/
  get_groups_byId = GlobalUrl.prioductUrl + 'groups/getGroupsById'
  /*根据id修改分组*/
  update_groups_byId = GlobalUrl.prioductUrl + 'groups/updateGroupsById'
  /*添加分组*/
  add_Groups = GlobalUrl.prioductUrl + 'groups/addGroups'
  /*批量或单个删除*/
  delete_groups_byId = GlobalUrl.prioductUrl + 'groups/deleteGroupsById'
  accountId;

  ngOnInit(): void {
    this.accountId = localStorage.getItem('id')
    let data = new FormData()
    data.append('accountId', '' + this.accountId + '')
    data.append('page', '1')
    this.geData.getCustomerdata(this.getTableUrl, data, 1, 'save', this)
  }

  modifyThePublicNumber = true
  /*单个id记录*/
  group_one_id = ''

  /*打开修改单个分组*/
  modify_the_grouping_open(e): void {
    this.isOperating = false
    this.group_one_id = e
    let data = new FormData()
    data.append('id', '' + e + '')
    this.geData.getCustomerdata(this.get_groups_byId, data, 2, 'save', this)
  }

  /*关闭修改单个分组*/
  modify_the_grouping_close(): void {
    this.isOperating = true
    this.modifyThePublicNumber = true
  }

  /*提交修改单个分组*/
  modify_the_grouping_sure(): void {
    let data = new FormData()
    data.append('id', '' + this.group_one_id + '')
    data.append('accountId', '' + this.accountId + '')
    data.append('name', '' + this.SingleGroupInformation + '')
    data.append('isPublic', '' + Number(this.editselectedValue) + '')
    this.geData.getCustomerdata(this.update_groups_byId, data, 3, 'save', this)

  }

  /*修改打的所有标签*/
  edutTagsdata;
  /*修改是否共有*/
  editselectedValue = '0'
  /*单个分组名称*/
  SingleGroupInformationName = ''
  optionList;
  TagisLoading = false


  dataUpdate(e): void {
    if (e === false) {
      this.IsGluestudy = false
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '' + this.pageIndex + '')
      this.geData.getCustomerdata(this.getTableUrl, data, 1, 'save', this)
    } else {
      this.IsGluestudy = true
      let dataFormdata = new FormData()
      dataFormdata.append('accountId', '' + this.accountId + '')
      dataFormdata.append('message', '' + this.fuzzyQuery + '')
      dataFormdata.append('page', '' + this.pageIndex + '')
      this.geData.getCustomerdata(this.glue_study_search, dataFormdata, 1, 'save', this)
    }
  }

  postOk(val, flag, distinguish) {
    if (distinguish === 1) {
      this.dataSet = val.data.groupsList
      this.loading = false;
      this.total = val.data.groupsCount;
      this.allChecksMore = []
      for (var value of  this.dataSet) {
        value.checked = false
        this.allChecksMore.push([{'ischeck': false}, {'id': value.id}])
      }
      this.indeterminate = false;
      this.allChecked = false

    }
    /*根据id查询分组*/
    else if (distinguish === 2) {
      this.SingleGroupInformation = val.data.name
      this.editselectedValue = val.data.isPublic.toString()
      this.modifyThePublicNumber = false

    } else if (distinguish === 3) {
      this.dataUpdate(this.IsGluestudy)
      this.modifyThePublicNumber = true
      this.isOperating = true
    } else if (distinguish === 4) {
      if(val.msg=='分组已经存在'){
        this.errormessage = '当前分组已存在'
        this.createMessage('warning')
      }else{
        this.dataUpdate(this.IsGluestudy)
      }
      this.isOperating = true
      this.addThePublicNumber = true
    } else if (distinguish === 5) {
      this.dataUpdate(this.IsGluestudy)
      this.isOperating = true
      this.remobeThePublicNumber = true

    }
    else if (distinguish === 7) {
      this.optionList = val.data.likeList
      this.TagisLoading = false;
    }
  }

  /*添加分组*/
  addThePublicNumber = true

  /*打开添加分组*/
  add_The_grouping(): void {
    this.isOperating = false
    this.addThePublicNumber = false
  }

  /*关闭添加分组*/
  add_the_grouping_close(): void {
    this.isOperating = true
    this.addThePublicNumber = true
  }

  /*添加的分组是否公有*/
  editselectedValue1 = '0'
  /*添加的分组名称*/
  addGroupName = ''

  /*提交添加分组*/
  add_the_grouping_sure(): void {
    if (this.addGroupName === '') {
      this.errormessage = '分组名称不能为空'
      this.createMessage('warning')
    } else {
      let dataFormdata = new FormData()
      dataFormdata.append('accountId', '' + this.accountId + '')
      dataFormdata.append('name', '' + this.addGroupName + '')
      dataFormdata.append('isPublic', '' + this.editselectedValue1 + '')
      this.geData.getCustomerdata(this.add_Groups, dataFormdata, 4, 'save', this)
      this.addThePublicNumber = true
    }

  }

  /*删除分组*/
  remobeThePublicNumber = true
  delId = 0

  /*打开删除分组*/
  grouping_remove_open(a, e, q, w): void {
    /*批量删除*/
    if (w === 0) {
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
        this.errormessage = '请选择需要进行批量删除的操作对象'
        this.createMessage('warning')
      } else {
        let data = new FormData()
        data.append('ids', '' + JSON.stringify(sendOd) + '')
        this.geData.getCustomerdata(this.delete_groups_byId, data, 4, 'save', this)
      }

    }
    /*单个删除*/
    else {
      this.isOperating = false
      this.delId = a
      this.grpNumber = q
      this.cusNumber = e
      this.remobeThePublicNumber = false
    }
  }

  /*关闭删除分组*/
  grouping_remove_close(): void {
    this.isOperating = true
    this.remobeThePublicNumber = true
  }

  /*提交删除分组*/
  grouping_remove_sure(): void {
    let data = new FormData()
    data.append('ids', '[' + this.delId + ']')
    this.geData.getCustomerdata(this.delete_groups_byId, data, 4, 'save', this)
    this.remobeThePublicNumber = true
  }

  /*标签是否共有*/
  tagIsPublic(e): void {
    let a;
    if (e === 0) {
      a = '是'
    } else {
      a = '否'
    }
    return a
  }
}
