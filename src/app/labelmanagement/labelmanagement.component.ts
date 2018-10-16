import {Component, OnInit} from '@angular/core';
import {LabelmanagementserviveService} from "./labelmanagementservive.service";
import * as GlobalUrl from "../globals";
import {NzMessageService} from 'ng-zorro-antd'
@Component({
  selector: 'app-labelmanagement',
  templateUrl: './labelmanagement.component.html',
  styleUrls: ['./labelmanagement.component.css']
})
export class LabelmanagementComponent implements OnInit {
  /*添加标签排序*/
  addPlanPublic = '0'
  /*蒙层开关*/
  isOperating: boolean = true;
  allChecksMore = []
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  confrontation = false
  /*新增标签名称*/
  addTagName = ''
  /*新增标签名称*/
  addTagDimension = ''
  /*新增标签描述*/
  addTagdescription = ''

  constructor(private geData: LabelmanagementserviveService, private message: NzMessageService) {
  }

  errormessage;

  /*全局提示*/
  createMessage(type: string): void {
    this.message.create(type, `` + this.errormessage + ``);
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
      this.geData.getCustomerdata(this.getAllTag, data, 1, 'save', this)
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
        this.errormessage = '请选择需要进行批量删除的操作对象'
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

  /*根据accountId查询显示标签*/
  getAllTag = GlobalUrl.prioductUrl + 'tag/getAllTag'
  /*模糊查询标签*/
  getTagByName = GlobalUrl.prioductUrl + 'tag/getAllTagByLike'
  /*添加标签*/
  addTag = GlobalUrl.prioductUrl + 'tag/addTag'
  /*根据id删除标签*/
  deleteTagById = GlobalUrl.prioductUrl + 'tag/deleteTagById'
  accountId;
  ngOnInit(): void {
    this.accountId=localStorage.getItem('id')
    let data = new FormData()
    data.append('accountId', ''+this.accountId+'')
    data.append('page', '1')
    this.geData.getCustomerdata(this.getAllTag, data, 1, 'save', this)
  }

  labelManagementAddPlan = true

  /*打开添加标签*/
  Addplan_open(): void {
    this.isOperating = false
    this.labelManagementAddPlan = false
  }

  /*关闭添加标签*/
  Addplan_close(): void {
    this.labelManagementAddPlan = true
    this.isOperating = true
  }

  /*提交添加标签*/
  Addplan_sure(): void {
    if (this.addTagName === '') {
      this.errormessage = '标签名称为必填项'
      this.createMessage('warning')
    } else {
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('description', '' + this.addTagdescription + '')
      data.append('dimension', '' + this.addTagDimension + '')
      data.append('tagName', '' + this.addTagName + '')
      data.append('isPublic', '' + this.addPlanPublic + '')
      this.geData.getCustomerdata(this.addTag, data, 2, 'save', this)
    }
  }

  postOk(val, flag, distinguish) {
    /*获取table数据*/
    if (distinguish === 1) {
      this.dataSet = val.data.tagList
      this.loading = false;
      this.total = val.data.tagCount;
      this.allChecksMore = []
      for (let value of  this.dataSet) {
        value.checked = false
        this.allChecksMore.push([{'ischeck': false}, {'id': value.id}])
      }
      this.indeterminate = false;
      this.allChecked = false

    } else if (distinguish === 2) {
      this.addTagdescription = ''
      this.addTagDimension = ''
      this.addTagName = ''
      this.addPlanPublic = '0'
      this.labelManagementAddPlan = true
      this.isOperating = true
      this.searchData(false)
    } else if (distinguish === 3) {
      this.searchData(false)
    }
  }

  /*是否公有*/
  whetherPublic(e) {
    let a = ''
    if (e === 0) {
      a = '是'
    } else {
      a = '否'
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
      this.geData.getCustomerdata(this.getAllTag, data, 1, 'save', this)
    } else {
      this.isfuzzyquery = true;
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('message', '' + this.fuzzyQuery + '')
      data.append('page', '1')
      this.geData.getCustomerdata(this.getTagByName, data, 1, 'save', this)
    }


  }
}
