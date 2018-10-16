import {Component, Injectable, OnInit} from '@angular/core';
import {TasktemplateserveService} from "./tasktemplateserve.service";
import {NzMessageService} from 'ng-zorro-antd'
import * as GlobalUrl from "../globals";

@Component({
  selector: 'app-tasktemplate',
  templateUrl: './tasktemplate.component.html',
  styleUrls: ['./tasktemplate.component.css']
})

export class TasktemplateComponent implements OnInit {
  /*蒙层开关*/
  isOperating: boolean = true;
  isOperating1: boolean = true;
  /*删除分组*/
  remobeThePublicNumber = true
  taskTemplatedetail = true
  tabs = ['所有任务', '立即执行', '失败']
  allChecksMore = []
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  sortValue = null;
  sortKey = null;
  searchGenderList: string[] = [];
  confrontation = false
  tabrecording = 0
  /*模糊查询数据绑定*/
  fuzzyQuery = ''

  constructor(private geData: TasktemplateserveService, private message: NzMessageService) {
  }
  taskStatusColor(e) {
    let a = ''
    if (e === 1) {
      a = 'color1'
    } else if (e === 3) {
      a = 'color2'
    } else if (e === 0) {
      a = 'color3'
    } else if (e === 2) {
      a = 'color4'
    } else if (e === 4) {
      a = 'color5'
    }
    return a
  }
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    if (this.isfuzzyquery === false) {
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('page', '' + this.pageIndex + '')
      this.geData.getCustomerdata(this.getAllTask, data, 1, 'save', this)
    } else {
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('page', '' + this.pageIndex + '')
      data.append('message', '' + this.fuzzyQuery + '')
      this.geData.getCustomerdata(this.getAllTaskManageByName, data, 1, 'save', this)
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

  delThisId;

  delThis(e): void {
    this.isOperating = false
    this.remobeThePublicNumber = false
    this.delThisId = e
    // if (e != -1) {
    //   let data = new FormData()
    //   data.append('id', '' + e + '')
    //   this.geData.getCustomerdata(this.deleteTaskById, data, 3, 'save', this)
    // } else {
    //   let sendOd = []
    //   if (this.allChecked === true) {
    //     for (var value of  this.allChecksMore) {
    //       sendOd.push(value[1].id)
    //     }
    //   } else {
    //     for (var value of  this.allChecksMore) {
    //       if (value[0].ischeck === true) {
    //         sendOd.push(value[1].id)
    //       }
    //     }
    //   }
    //   let data = new FormData()
    //   data.append('ids', '' + JSON.stringify(sendOd) + '')
    //   this.geData.getCustomerdata(this.deleteTaskById, data, 3, 'save', this)
    // }

  }

  grouping_remove_sure() {
    let data = new FormData()
    data.append('id', '' + this.delThisId + '')
    data.append('accountId', ''+this.accountId+'')
    this.geData.getCustomerdata(this.deleteTasktemplateById, data, 3, 'save', this)
  }

  grouping_remove_close() {
    this.remobeThePublicNumber = true
    this.isOperating = true
  }

  thisIndex(index) {
    if (this.confrontation === true) {
      this.allChecksMore[index][0].ischeck = true
    } else {
      this.allChecksMore[index][0].ischeck = false
    }
  }

  /*根据accountId查询所有任务模板*/
  getAllTask = GlobalUrl.prioductUrl + 'tasktemplate/getAllTasktemplate'
  /*根据accountId，名称模糊查询所有任务管理*/
  getAllTaskManageByName = GlobalUrl.prioductUrl + 'tasktemplate/getAllTasktemplateByName'
  /*根据id删除任务模板*/
  deleteTasktemplateById = GlobalUrl.prioductUrl + 'tasktemplate/deleteTasktemplateById'
  /*根据accountid、id查询详情*/
  getTasktemplateDetail = GlobalUrl.prioductUrl + 'tasktemplate/getTasktemplateDetail'
  /*根据accountId查询所有任务管理*/
  getAllTask1 = GlobalUrl.prioductUrl + 'task/getAllTask'
  /*根据accountId查询已选择的任务*/
  getAllTasktemplateByParentId = GlobalUrl.prioductUrl + 'tasktemplate/getAllTasktemplateByParentId'
  /*选择任务管理加入接口*/
  addTasktemplateByParentId = GlobalUrl.prioductUrl + 'tasktemplate/addTasktemplateByParentId'
  /*根据accountId，taskId删除已选择的任务*/
  deleteTaskByTaskId = GlobalUrl.prioductUrl + 'tasktemplate/deleteTaskByTaskId'
  /*根据id查询任务模板*/
  getTasktemplateById = GlobalUrl.prioductUrl + 'tasktemplate/getTasktemplateById'
  /*根据id修改任务模板*/
  updateTasktemplateById = GlobalUrl.prioductUrl + 'tasktemplate/updateTasktemplateById'
  /*添加任务模板*/
  addTasktemplate = GlobalUrl.prioductUrl + 'tasktemplate/addTasktemplate'
  /*查看任务模板中的单个任务详情*/
  getTaskById = GlobalUrl.prioductUrl + 'task/getTaskDetailById'
  accountId;

  Plandetails = true
  Plandetails_1
  Plandetails_2
  Plandetails_3
  Plandetails_4
  Plandetails_5
  Plandetails_6
  Plandetails_7
  Plandetails_8
  Plandetails_9
  Plandetails_10
  Plandetails_11
  Plandetails_12

  /*title相关*/
  Plandetext_3 = '社交号'
  Plandetext_4 = '话术'
  Plandetext_5 = '查看次数'
  Plandetext_8 = '执行时间'
  Plandetext_9 = '执行时间'
  Plandetext_7 = '执行时间'
  Plandetext_10 = '执行时间'
  Plandetext_12 = '备注'

  /*是否显示相关*/
  Plandeshow_4 = false
  Plandeshow_5 = false
  Plandeshow_7 = false
  Plandeshow_8 = false
  ngOnInit(): void {
    this.accountId=localStorage.getItem('id')
    let data = new FormData()
    data.append('accountId', ''+this.accountId+'')
    data.append('page', '1')
    this.geData.getCustomerdata(this.getAllTask, data, 1, 'save', this)
  }

  postOk(val, flag, distinguish) {
    if (distinguish === 1) {
      this.dataSet = val.data.tasktemplateList
      this.loading = false;
      this.total = val.data.tasktemplateCount;
      this.allChecksMore = []
      for (let value of  this.dataSet) {
        value.checked = false
        this.allChecksMore.push([{'ischeck': false}, {'id': value.id}])
      }
      this.indeterminate = false;
      this.allChecked = false

    } else if (distinguish === 2) {
      this.dataSet = val.data.taskList
      this.loading = false;
      this.total = val.data.taskCount;
      this.allChecksMore = []
      for (let value of  this.dataSet) {
        value.checked = false
        this.allChecksMore.push([{'ischeck': false}, {'id': value.id}])
      }
      this.fuzzyQuery = ''
      this.indeterminate = false;
      this.allChecked = false
    } else if (distinguish === 3) {
      this.grouping_remove_close()
      this.searchData(false)
    } else if (distinguish === 4) {
      this.tasktemplateData = val.data.tasktemplate
      this.taskTemplatedetail = false;
      this.isOperating = false
    } else if (distinguish === 5) {
      this.allChosseTasks = val.data.taskList
    } else if (distinguish === 6) {
      this.ChosseTasks = val.data.taskList
    } else if (distinguish === 7) {
      let data1 = new FormData()
      data1.append('page', '-1')
      data1.append('accountId', ''+this.accountId+'')
      data1.append('id', '' + this.choosetemplateId + '')
      this.geData.getCustomerdata(this.getAllTasktemplateByParentId, data1, 6, 'save', this)
    } else if (distinguish === 8) {
      this.isOperating=false
      this.editTask = false
      this.editTaskName = val.data.templateName
      this.editTaskRemarks = val.data.remark
    } else if (distinguish === 9) {
      this.editTask_close()
      this.searchData(false)
    }
    /*任务模板中单个任务计划详情*/
    else if (distinguish === 10) {
      this.isOperating1 = false
      this.Plandetails = false
      this.Multiple_task_processing(val)
    }
  }

  postOk_other(val, flag, distinguish) {
    if (distinguish === 7) {
      this.errormessage = '当前任务管理已经存在'
      this.createMessage('error')
    }
  }

  /*任务 等级*/
  taskRank(w): void {
    let a;
    if (w === 0) {
      a = '普通'
    } else {
      a = '优先'
    }
    return a
  }

  /*任务 类型*/
  taskType(w): void {
    let a;
    if (w === 0) {
      a = '创建'
    } else {
      a = '系统'
    }
    return a
  }

  /*任务 类型*/
  taskStatus(w): void {
    let a;
    if (w === 0) {
      a = '未开始'
    } else if (w === 1) {
      a = '运行中'
    } else if (w === 2) {
      a = '成功'
    } else if (w === 3) {
      a = '失败'
    }
    return a
  }

  time_cut(e) {
    let a = ''
    a = e.slice(0, 10)
    return a
  }

  /*table模糊查询*/
  isfuzzyquery = false;

  /*模糊查询*/
  fuzzy_query_table(): void {

    if (this.fuzzyQuery === '') {
      this.pageIndex = 1
      this.isfuzzyquery = false;
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('page', '1')
      this.geData.getCustomerdata(this.getAllTask, data, 1, 'save', this)

    } else {
      this.pageIndex = 1
      this.isfuzzyquery = true;
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('page', '1')
      data.append('message', '' + this.fuzzyQuery + '')
      this.geData.getCustomerdata(this.getAllTaskManageByName, data, 1, 'save', this)
    }


  }

  taskNameColor(e) {
    let a = ''
    if (e === 1) {
      a = 'color1_1'
    } else {
      a = 'color1_2'
    }
    return a
  }

  tasktemplateData = {
    "remark": '',
    "taskCount": '',
    "tasklist": [],
    "templateName": ''
  }

  /*关闭模板详情*/
  taskTemplatedetail_close(): void {
    this.taskTemplatedetail = true;
    this.isOperating = true
  }

  /*查看任务或模板详细*/
  taskNameseedetail(e, q): void {
    let data = new FormData()
    data.append('id', '' + e + '')
    data.append('page', '')
    data.append('accountId', ''+this.accountId+'')
    this.geData.getCustomerdata(this.getTasktemplateDetail, data, 4, 'save', this)
  }

  chooseTask: boolean = true
  allChosseTasks;
  ChosseTasks;
  choosetemplateId;

  /*打开选择任务*/
  Choosetel_open(e): void {
    this.choosetemplateId = e
    this.chooseTask = false
    this.isOperating = false
    let data = new FormData()
    data.append('page', '-1')
    data.append('accountId', ''+this.accountId+'')
    this.geData.getCustomerdata(this.getAllTask1, data, 5, 'save', this)
    let data1 = new FormData()
    data1.append('page', '-1')
    data1.append('accountId', ''+this.accountId+'')
    data1.append('id', '' + e + '')
    this.geData.getCustomerdata(this.getAllTasktemplateByParentId, data1, 6, 'save', this)
  }

  /*关闭选择任务*/
  Choosetel_close(): void {
    this.chooseTask = true
    this.isOperating = true
  }

  // /*提交选择任务*/
  // Choosetel_sure(): void {
  //   // this.chooseTask = true
  // }

  /*选择任务左边添加到右边*/
  choose_join(e): void {
    let data1 = new FormData()
    data1.append('id', '' + this.choosetemplateId + '')
    data1.append('taskId', '' + e + '')
    data1.append('accountId', ''+this.accountId+'')
    this.geData.getCustomerdata(this.addTasktemplateByParentId, data1, 7, 'save', this)
  }

  /*选择任务右边删除 */
  choose_del(e): void {
    let data1 = new FormData()
    data1.append('accountId', ''+this.accountId+'')
    data1.append('taskId', '' + e + '')
    this.geData.getCustomerdata(this.deleteTaskByTaskId, data1, 7, 'save', this)
  }

  errormessage;

  /*全局提示*/
  createMessage(type: string): void {
    this.message.create(type, `` + this.errormessage + ``);
  }

  editTask: boolean = true
  editTaskName = ''
  editTaskRemarks = ''
  editTaskId;

  /*打开修改/添加任务模板*/
  editTaskfunc(e): void {
    this.editTaskId = e
    if (e === 1) {
      this.editTask = false
      this.isOperating=false
    } else {
      let data = new FormData()
      data.append('id', '' + e + '')
      this.geData.getCustomerdata(this.getTasktemplateById, data, 8, 'save', this)
    }
  }

  /*关闭修改/添加任务模板*/
  editTask_close() {
    this.isOperating=true
    this.editTask = true
    this.editTaskName = ''
    this.editTaskRemarks = ''
  }

  /*提交修改/添加任务模板*/
  editTask_sure() {
    // updateTasktemplateById
    if(this.editTaskId===-1){
      let data = new FormData()
      data.append('accountId', ''+this.accountId+'')
      data.append('remark', '' + this.editTaskRemarks + '')
      data.append('templateName', '' + this.editTaskName + '')
      this.geData.getCustomerdata(this.addTasktemplate, data, 9, 'save', this)
    }else {
      let data = new FormData()
      data.append('id', '' + this.editTaskId + '')
      data.append('remark', '' + this.editTaskRemarks + '')
      data.append('templateName', '' + this.editTaskName + '')
      this.geData.getCustomerdata(this.updateTasktemplateById, data, 9, 'save', this)
    }

  }



  /*查看任务详细*/
  taskNameseedetail1(e): void {
    let data = new FormData()
    data.append('id', '' + e + '')
    this.geData.getCustomerdata(this.getTaskById, data, 10, 'save', this)
  }

  /*关闭单个计划详情*/
  Plandetails_close(): void {
    this.Plandetails = true;
    this.isOperating1 = true
  }
  /*多种任务处理*/
  Multiple_task_processing(val) {
    /*任务相关信息*/
    let taskMessage = JSON.parse(val.data.taskPlan.taskMessage)
    console.log(taskMessage)
    /*查看未读消息、查看通讯录、查看订阅号、查看相册、查看腾讯新闻、查看图文链接*/
    if (val.data.taskPlan.taskType == 16 || val.data.taskPlan.taskType == 18 || val.data.taskPlan.taskType == 19 || val.data.taskPlan.taskType == 21 || val.data.taskPlan.taskType == 22 || val.data.taskPlan.taskType == 23) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = val.data.taskPlan.socialaccount.nickName
      this.Plandetails_3 = val.data.taskPlan.createTime
      this.Plandetails_4 = ''
      this.Plandetext_4 = ''
      this.Plandetext_3 = '创建时间'
      this.Plandetext_5 = '查看次数'
      this.Plandetext_8 = '任务类型'
      this.Plandetext_9 = '开始时间'
      this.Plandetext_7 = '时间间隔'
      this.Plandetext_10 = '结束时间'
      this.Plandetext_12 = '备注'
      this.Plandetails_5 = taskMessage.number + ' 次'
      this.Plandetails_6 = taskMessage.choose.timeOut
      this.Plandetails_7 = taskMessage.choose.startInterval + ' s'
      if (taskMessage.timeTypeList.dateType === 0) {
        this.Plandetails_8 = '定时任务'
      } else if (taskMessage.timeTypeList.dateType === 1) {
        this.Plandetails_8 = '周期任务'
      } else {
        this.Plandetails_8 = '单次立即执行任务'
      }
      this.Plandetails_9 = taskMessage.timeTypeList[0].dateList[0].startDate
      this.Plandetails_10 = taskMessage.timeTypeList[0].dateList[0].endDate
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandetails_12 = val.data.taskPlan.remark
      this.Plandeshow_4 = true
      this.Plandeshow_5 = false
      this.Plandeshow_7 = false
      this.Plandeshow_8 = false
    }
    /*查看钱包--消息体*/
    else if (val.data.taskPlan.taskType == 20) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = val.data.taskPlan.socialaccount.nickName
      this.Plandetails_3 = val.data.taskPlan.createTime
      this.Plandetails_4 = ''
      this.Plandetext_4 = ''
      this.Plandetext_3 = '创建时间'
      this.Plandetext_7 = '时间间隔'
      this.Plandetext_5 = '查看用时'
      this.Plandetext_8 = '任务类型'
      this.Plandetext_9 = '开始时间'
      this.Plandetext_10 = '结束时间'
      this.Plandetext_12 = '备注'
      this.Plandetails_5 = taskMessage.time + ' s'
      this.Plandetails_6 = taskMessage.choose.timeOut
      this.Plandetails_7 = taskMessage.choose.startInterval + ' s'
      if (taskMessage.timeTypeList.dateType === 0) {
        this.Plandetails_8 = '定时任务'
      } else if (taskMessage.timeTypeList.dateType === 1) {
        this.Plandetails_8 = '周期任务'
      } else {
        this.Plandetails_8 = '单次立即执行任务'
      }
      this.Plandetails_9 = taskMessage.timeTypeList[0].dateList[0].startDate
      this.Plandetails_10 = taskMessage.timeTypeList[0].dateList[0].endDate
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandetails_12 = val.data.taskPlan.remark
      this.Plandeshow_4 = true
      this.Plandeshow_5 = false
      this.Plandeshow_7 = false
      this.Plandeshow_8 = false
    }
    /*清理僵尸粉*/
    else if (val.data.taskPlan.taskType == 24) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = val.data.taskPlan.socialaccount.nickName
      this.Plandetails_3 = val.data.taskPlan.createTime
      this.Plandetails_4 = taskMessage.message
      this.Plandetext_4 = '话术用语'
      this.Plandetext_3 = '创建时间'
      this.Plandetext_5 = '是否发送消息'
      this.Plandetext_8 = '任务类型'
      this.Plandetext_9 = '开始时间'
      this.Plandetext_7 = '时间间隔'
      this.Plandetext_10 = '结束时间'
      this.Plandetext_12 = '备注'
      if (taskMessage.way === 0) {
        this.Plandetails_5 = '否'
      } else {
        this.Plandetails_5 = '是'
      }
      this.Plandetails_6 = taskMessage.choose.timeOut
      this.Plandetails_7 = taskMessage.choose.startInterval + ' s'
      if (taskMessage.timeTypeList.dateType === 0) {
        this.Plandetails_8 = '定时任务'
      } else if (taskMessage.timeTypeList.dateType === 1) {
        this.Plandetails_8 = '周期任务'
      } else {
        this.Plandetails_8 = '单次立即执行任务'
      }
      this.Plandetails_9 = taskMessage.timeTypeList[0].dateList[0].startDate
      this.Plandetails_10 = taskMessage.timeTypeList[0].dateList[0].endDate
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandetails_12 = val.data.taskPlan.remark
      this.Plandeshow_4 = false
      this.Plandeshow_5 = false
      this.Plandeshow_7 = false
      this.Plandeshow_8 = false
    }
    /*升级插件*/
    else if (val.data.taskPlan.taskType == 25) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = val.data.taskPlan.socialaccount.nickName
      this.Plandetails_3 = val.data.taskPlan.createTime
      this.Plandetails_4 = ''
      this.Plandetext_4 = ''
      this.Plandetext_3 = '创建时间'
      this.Plandetext_5 = '是否发送消息'
      this.Plandetext_7 = '时间间隔'
      this.Plandetext_8 = '任务类型'
      this.Plandetext_9 = '开始时间间隔'
      this.Plandetext_10 = '结束时间间隔'
      this.Plandetext_12 = '备注'
      this.Plandetails_5 = ''
      this.Plandetails_6 = taskMessage.choose.timeOut
      this.Plandetails_7 = taskMessage.choose.startInterval + ' s'
      this.Plandetails_8 = ''
      this.Plandetails_9 = taskMessage.choose.startInterval + ' s'
      this.Plandetails_10 = taskMessage.choose.endInterval + ' s'
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandetails_12 = val.data.taskPlan.remark
      this.Plandeshow_4 = true
      this.Plandeshow_5 = true
      this.Plandeshow_7 = true
      this.Plandeshow_8 = true
    }
    /*安装APK,扫码进群*/
    else if (val.data.taskPlan.taskType == 26 || val.data.taskPlan.taskType == 15 || val.data.taskPlan.taskType == 14) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = val.data.taskPlan.socialaccount.nickName
      this.Plandetails_3 = val.data.taskPlan.createTime

      if (val.data.taskPlan.taskType == 26) {
        this.Plandetext_4 = 'apk路径'
        this.Plandetails_4 = taskMessage.rootpath
      } else if (val.data.taskPlan.taskType == 15) {
        this.Plandetext_4 = '二维码路径'
        this.Plandetails_4 = taskMessage.dirname
      } else {
        this.Plandetext_4 = '公众号名称'
        this.Plandetails_4 = taskMessage.publicNumberList
      }
      this.Plandetext_3 = '创建时间'
      this.Plandetext_5 = '是否发送消息'
      this.Plandetext_8 = '任务类型'
      this.Plandetext_7 = '时间间隔'
      this.Plandetext_9 = '开始时间间隔'
      this.Plandetext_10 = '结束时间间隔'
      this.Plandetext_12 = '备注'
      this.Plandetails_5 = ''
      this.Plandetails_6 = taskMessage.choose.timeOut
      this.Plandetails_7 = taskMessage.choose.startInterval + ' s'
      this.Plandetails_8 = ''
      this.Plandetails_9 = taskMessage.choose.startInterval + ' s'
      this.Plandetails_10 = taskMessage.choose.endInterval + ' s'
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandetails_12 = val.data.taskPlan.remark
      this.Plandeshow_4 = false
      this.Plandeshow_5 = true
      this.Plandeshow_7 = true
      this.Plandeshow_8 = true
    }
    /*精准加人、通讯录加人*/
    else if (val.data.taskPlan.taskType == 0 || val.data.taskPlan.taskType == 3) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = val.data.taskPlan.socialaccount.nickName
      this.Plandetails_3 = val.data.taskPlan.createTime
      this.Plandetails_4 = taskMessage.ChooseTarget.contactList[0].scriptName
      this.Plandetext_4 = '目标话术'
      this.Plandetext_3 = '创建时间'
      this.Plandetext_5 = '查看次数'
      this.Plandetext_8 = '任务类型'
      this.Plandetext_7 = '时间间隔'
      this.Plandetext_9 = '开始时间间隔'
      this.Plandetext_10 = '结束时间间隔'
      this.Plandetext_12 = '添加目标'
      this.Plandetails_5 = taskMessage.number + ' 次'
      this.Plandetails_6 = taskMessage.choose.timeOut
      this.Plandetails_7 = taskMessage.choose.startInterval + ' s'
      if (taskMessage.timeTypeList.dateType === 0) {
        this.Plandetails_8 = '定时任务'
      } else if (taskMessage.timeTypeList.dateType === 1) {
        this.Plandetails_8 = '周期任务'
      } else {
        this.Plandetails_8 = '单次立即执行任务'
      }
      this.Plandetails_9 = taskMessage.choose.startInterval + ' s'
      this.Plandetails_10 = taskMessage.choose.endInterval + ' s'
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandetails_12 = taskMessage.ChooseTarget.contactList[0].wechatName
      this.Plandeshow_4 = false
      this.Plandeshow_5 = true
      this.Plandeshow_7 = true
      this.Plandeshow_8 = false
    }
    /*附近的人*/
    else if (val.data.taskPlan.taskType == 6) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = val.data.taskPlan.socialaccount.nickName
      this.Plandetails_3 = val.data.taskPlan.createTime
      this.Plandetails_4 = ''
      this.Plandetext_4 = ''
      this.Plandetext_3 = '创建时间'
      this.Plandetext_5 = '加人数量'
      this.Plandetext_8 = '任务类型'
      this.Plandetext_9 = '开始时间间隔'
      this.Plandetext_10 = '结束时间间隔'
      this.Plandetext_12 = '备注'
      this.Plandetext_7 = '加人范围'
      this.Plandetails_5 = taskMessage.joinNumber + ' 人'
      this.Plandetails_6 = taskMessage.choose.timeOut
      this.Plandetails_7 = taskMessage.range + ' 米'
      if (taskMessage.timeTypeList.dateType === 0) {
        this.Plandetails_8 = '定时任务'
      } else if (taskMessage.timeTypeList.dateType === 1) {
        this.Plandetails_8 = '周期任务'
      } else {
        this.Plandetails_8 = '单次立即执行任务'
      }
      this.Plandetails_9 = taskMessage.choose.startInterval + ' s'
      this.Plandetails_10 = taskMessage.choose.endInterval + ' s'
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandetails_12 = val.data.taskPlan.remark
      this.Plandeshow_4 = true
      this.Plandeshow_5 = false
      this.Plandeshow_7 = false
      this.Plandeshow_8 = false
    }
    /*接受好友请求*/
    else if (val.data.taskPlan.taskType == 7) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = val.data.taskPlan.socialaccount.nickName
      this.Plandetails_3 = val.data.taskPlan.createTime
      this.Plandetails_4 = ''
      this.Plandetext_4 = ''
      this.Plandetext_3 = '创建时间'
      this.Plandetext_5 = '加人数量'
      this.Plandetext_8 = '任务类型'
      this.Plandetext_9 = '开始时间间隔'
      this.Plandetext_10 = '结束时间间隔'
      this.Plandetext_12 = '备注'
      this.Plandetext_7 = '加人范围'
      this.Plandetails_5 = taskMessage.joinNumber + ' 人'
      this.Plandetails_6 = taskMessage.choose.timeOut
      this.Plandetails_7 = taskMessage.range + ' 米'
      if (taskMessage.timeTypeList.dateType === 0) {
        this.Plandetails_8 = '定时任务'
      } else if (taskMessage.timeTypeList.dateType === 1) {
        this.Plandetails_8 = '周期任务'
      } else {
        this.Plandetails_8 = '单次立即执行任务'
      }
      this.Plandetails_9 = taskMessage.choose.startInterval + ' s'
      this.Plandetails_10 = taskMessage.choose.endInterval + ' s'
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandetails_12 = val.data.taskPlan.remark
      this.Plandeshow_4 = true
      this.Plandeshow_5 = true
      this.Plandeshow_7 = true
      this.Plandeshow_8 = false
    }
    /*查看朋友圈*/
    else if (val.data.taskPlan.taskType == 17) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = val.data.taskPlan.socialaccount.nickName
      this.Plandetails_3 = val.data.taskPlan.createTime
      if (taskMessage.moment == 0) {
        this.Plandetails_8 = '查看最近朋友圈'
        this.Plandetails_4 = taskMessage.chooseTarget.name
      } else {
        this.Plandetails_8 = '查看指定好友最近朋友圈'
        this.Plandetails_4 = taskMessage.chooseTarget.name
      }

      this.Plandetext_4 = '查看对象'
      this.Plandetext_3 = '创建时间'
      this.Plandetext_5 = '查看用时'
      this.Plandetext_8 = '任务类型'
      this.Plandetext_9 = '开始时间间隔'
      this.Plandetext_10 = '结束时间间隔'
      this.Plandetext_12 = '备注'
      this.Plandetext_7 = ''
      this.Plandetails_5 = taskMessage.time + ' s'
      this.Plandetails_6 = taskMessage.choose.timeOut
      this.Plandetails_7 = ''
      this.Plandetails_9 = taskMessage.choose.startInterval + ' s'
      this.Plandetails_10 = taskMessage.choose.endInterval + ' s'
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandetails_12 = val.data.taskPlan.remark
      this.Plandeshow_4 = false
      this.Plandeshow_5 = true
      this.Plandeshow_7 = true
      this.Plandeshow_8 = false
    }
    /*入群加人*/
    else if (val.data.taskPlan.taskType == 4) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = val.data.taskPlan.socialaccount.nickName
      this.Plandetails_3 = val.data.taskPlan.createTime
      this.Plandetails_8 = '查看指定好友最近朋友圈'
      this.Plandetails_4 = taskMessage.chooseTarget.name
      this.Plandetext_4 = '入群目标'
      this.Plandetext_3 = '创建时间'
      this.Plandetext_5 = '入群数量'
      this.Plandetext_8 = ''
      this.Plandetext_9 = '开始时间间隔'
      this.Plandetext_10 = '结束时间间隔'
      this.Plandetext_12 = '备注'
      this.Plandetext_7 = ''
      this.Plandetails_5 = taskMessage.chooseTarget.contactList.length+' 个'
      this.Plandetails_6 = taskMessage.choose.timeOut
      this.Plandetails_7 = ''
      this.Plandetails_9 = taskMessage.choose.startInterval + ' s'
      this.Plandetails_10 = taskMessage.choose.endInterval + ' s'
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandetails_12 = val.data.taskPlan.remark
      this.Plandeshow_4 = false
      this.Plandeshow_5 = false
      this.Plandeshow_7 = true
      this.Plandeshow_8 = true
    }
    /*拉群的人,踢出群的人,退群的人*/
    else if (val.data.taskPlan.taskType == 13 || val.data.taskPlan.taskType == 29 || val.data.taskPlan.taskType == 28) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = val.data.taskPlan.socialaccount.nickName
      this.Plandetails_3 = val.data.taskPlan.createTime
      this.Plandetails_8 = '查看指定好友最近朋友圈'
      this.Plandetails_4 = taskMessage.ChooseTarget.name
      this.Plandetext_4 = '操作对象'
      this.Plandetext_3 = '创建时间'
      this.Plandetext_5 = '群操作'
      this.Plandetext_8 = ''
      this.Plandetext_9 = '开始时间间隔'
      this.Plandetext_10 = '结束时间间隔'
      this.Plandetext_12 = '备注'
      this.Plandetext_7 = ''
      if (taskMessage.type === 0) {
        this.Plandetails_5 = '拉好友入群'
      } else if (taskMessage.type === 1) {
        this.Plandetails_5 = '踢出群成员'
      } else {
        this.Plandetails_5 = '退出群组'
      }
      this.Plandetails_6 = taskMessage.choose.timeOut
      this.Plandetails_7 = ''
      this.Plandetails_9 = taskMessage.choose.startInterval + ' s'
      this.Plandetails_10 = taskMessage.choose.endInterval + ' s'
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandetails_12 = val.data.taskPlan.remark
      this.Plandeshow_4 = false
      this.Plandeshow_5 = false
      this.Plandeshow_7 = true
      this.Plandeshow_8 = true
    }
    /*朋友圈点赞*/
    else if (val.data.taskPlan.taskType == 12) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = val.data.taskPlan.socialaccount.nickName
      this.Plandetails_3 = val.data.taskPlan.createTime
      this.Plandetails_12 = '任务类型'
      if (taskMessage.timeTypeList.dateType === 0) {
        this.Plandetails_12 = '定时任务'
      } else if (taskMessage.timeTypeList.dateType === 1) {
        this.Plandetails_12 = '周期任务'
      } else {
        this.Plandetails_12 = '单次立即执行任务'
      }
      if (taskMessage.isAll === 0) {
        this.Plandetails_5 = '查看全部朋友圈'
        this.Plandeshow_8 = false
        this.Plandetails_8 = taskMessage.chooseTarget.name
        this.Plandetext_8 = '查看对象'
        this.Plandetext_4 = ''
        this.Plandeshow_4 = true
        this.Plandetails_4 = ''
      } else {
        this.Plandetails_5 = '查看指定好友朋友圈'
        this.Plandeshow_8 = true
        this.Plandetails_8 = ''
        this.Plandetext_8 = ''
        this.Plandetext_4 = '查看对象'
        this.Plandeshow_4 = false
        this.Plandetails_4 = taskMessage.chooseTarget.name
      }
      this.Plandetext_3 = '创建时间'
      this.Plandetext_5 = '查看范围'
      this.Plandetext_9 = '开始时间间隔'
      this.Plandetext_10 = '结束时间间隔'
      this.Plandetext_7 = '点赞数量'
      this.Plandetails_6 = taskMessage.choose.timeOut
      this.Plandetails_7 = taskMessage.number
      this.Plandetails_9 = taskMessage.choose.startInterval + ' s'
      this.Plandetails_10 = taskMessage.choose.endInterval + ' s'
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandeshow_7 = false
      this.Plandeshow_5 = false
    }
    /*转发朋友圈*/
    else if (val.data.taskPlan.taskType == 11) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = val.data.taskPlan.socialaccount.nickName
      this.Plandetails_3 = val.data.taskPlan.createTime

      this.Plandetext_4 = '转发对象'
      this.Plandetext_3 = '创建时间'
      this.Plandetext_5 = '转发方式'

      this.Plandetext_9 = '开始时间间隔'
      this.Plandetext_10 = '结束时间间隔'
      this.Plandetext_12 = '备注'

      if (taskMessage.isOrder === 0) {
        this.Plandetails_5 = '按关键字转发'
        this.Plandetails_4 = taskMessage.ChooseTarget.name
        this.Plandetext_7 = '关键字'
        this.Plandetails_7 = taskMessage.keyWord
        this.Plandetext_8 = ''
        this.Plandetails_8 = ''
        this.Plandeshow_8 = true
      } else {
        this.Plandetails_5 = '按顺序转发'
        this.Plandetails_4 = taskMessage.ChooseTarget.name
        this.Plandetext_7 = '指定朋友圈'
        this.Plandetails_7 = '第 ' + taskMessage.number + ' 条'
        this.Plandetext_8 = ''
        this.Plandetails_8 = ''
        this.Plandeshow_8 = true
      }
      this.Plandetails_6 = taskMessage.choose.timeOut
      this.Plandetails_9 = taskMessage.choose.startInterval + ' s'
      this.Plandetails_10 = taskMessage.choose.endInterval + ' s'
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandetails_12 = val.data.taskPlan.remark
      this.Plandeshow_4 = false
      this.Plandeshow_5 = false
      this.Plandeshow_7 = false

    }
    /*发送朋友圈*/
    else if (val.data.taskPlan.taskType == 10) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = '全局任务'
      this.Plandetails_3 = val.data.taskPlan.createTime

      this.Plandetext_4 = '执行对象'
      this.Plandetext_3 = '创建时间'
      this.Plandetext_5 = '发送条数'

      this.Plandetext_9 = '开始时间间隔'
      this.Plandetext_10 = '结束时间间隔'
      this.Plandetext_12 = '备注'
      this.Plandetext_7 = '任务类型'
      this.Plandetails_4 = taskMessage.socialName
      this.Plandetails_5 = taskMessage.chooseWechat.momentList.length + ' 条'
      this.Plandetext_8 = '开始结束时间'
      this.Plandetails_8 = taskMessage.timeTypeList[0].dateList[0].startDate + ' - ' + taskMessage.timeTypeList[0].dateList[0].endDate
      this.Plandeshow_8 = false
      if (taskMessage.timeTypeList[0].dateType === 0) {
        this.Plandetails_7 = '定时任务'
      } else if (taskMessage.timeTypeList[0].dateType === 1) {
        this.Plandetails_7 = '周期任务'
      } else {
        this.Plandetails_7 = '单次立即执行任务'
      }
      this.Plandetails_6 = taskMessage.choose.timeOut
      this.Plandetails_9 = taskMessage.choose.startInterval + ' s'
      this.Plandetails_10 = taskMessage.choose.endInterval + ' s'
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandetails_12 = val.data.taskPlan.remark
      this.Plandeshow_4 = false
      this.Plandeshow_5 = false
      this.Plandeshow_7 = false

    }
    /*发送链接，群发文字图片*/
    else if (val.data.taskPlan.taskType == 9 || val.data.taskPlan.taskType == 8) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = '全局任务'
      this.Plandetails_3 = val.data.taskPlan.createTime

      this.Plandetext_4 = '执行对象'
      this.Plandetext_3 = '创建时间'
      if (val.data.taskPlan.taskType == 9) {
        this.Plandetext_5 = '链接条数'
      } else {
        this.Plandetext_5 = '图文条数'
      }
      this.Plandetext_9 = '开始时间间隔'
      this.Plandetext_10 = '结束时间间隔'
      this.Plandetext_12 = '备注'
      this.Plandetext_7 = '任务类型'
      this.Plandetails_4 = taskMessage.combineName
      this.Plandetails_5 = taskMessage.chooseTarget.chatroomList.length + taskMessage.chooseTarget.friendList.length + ' 条'
      this.Plandetext_8 = '开始结束时间'
      this.Plandetails_8 = taskMessage.timeTypeList[0].dateList[0].startDate + ' - ' + taskMessage.timeTypeList[0].dateList[0].endDate
      this.Plandeshow_8 = false
      if (taskMessage.timeTypeList[0].dateType === 0) {
        this.Plandetails_7 = '定时任务'
      } else if (taskMessage.timeTypeList[0].dateType === 1) {
        this.Plandetails_7 = '周期任务'
      } else {
        this.Plandetails_7 = '单次立即执行任务'
      }
      this.Plandetails_6 = taskMessage.choose.timeOut
      this.Plandetails_9 = taskMessage.choose.startInterval + ' s'
      this.Plandetails_10 = taskMessage.choose.endInterval + ' s'
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandetails_12 = val.data.taskPlan.remark
      this.Plandeshow_4 = false
      this.Plandeshow_5 = false
      this.Plandeshow_7 = false

    }
    /*位置穿越*/
    else if (val.data.taskPlan.taskType == 5) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = val.data.taskPlan.socialaccount.nickName
      this.Plandetails_3 = val.data.taskPlan.createTime

      this.Plandetext_4 = ''
      this.Plandetext_3 = '创建时间'
      this.Plandetext_5 = '穿越位置'

      this.Plandetext_9 = '开始时间间隔'
      this.Plandetext_10 = '结束时间间隔'
      this.Plandetext_12 = '备注'
      this.Plandetext_7 = ''
      this.Plandetails_4 = ''
      this.Plandetails_5 = taskMessage.location
      this.Plandetext_8 = '任务类型'
      this.Plandetails_7 = ''
      if (taskMessage.timeTypeList[0].dateType === 0) {
        this.Plandetails_8 = '定时任务'
      } else if (taskMessage.timeTypeList[0].dateType === 1) {
        this.Plandetails_8 = '周期任务'
      } else {
        this.Plandetails_8 = '单次立即执行任务'
      }
      this.Plandetails_6 = 0
      this.Plandetails_9 = taskMessage.choose.startInterval + ' s'
      this.Plandetails_10 = taskMessage.choose.endInterval + ' s'
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandetails_12 = val.data.taskPlan.remark
      this.Plandeshow_4 = true
      this.Plandeshow_5 = false
      this.Plandeshow_7 = true
      this.Plandeshow_8 = false
    }
    /*导入通讯录*/
    else if (val.data.taskPlan.taskType == 2) {
      this.Plandetails_1 = val.data.taskPlan.taskName
      this.Plandetails_2 = val.data.taskPlan.socialaccount.nickName
      this.Plandetails_3 = val.data.taskPlan.createTime

      this.Plandetext_4 = ''
      this.Plandetext_3 = '创建时间'
      this.Plandetext_5 = '穿越位置'

      this.Plandetext_9 = '开始时间间隔'
      this.Plandetext_10 = '结束时间间隔'
      this.Plandetext_12 = '备注'
      this.Plandetext_7 = ''
      this.Plandetails_4 = ''
      this.Plandetails_5 = taskMessage.location
      this.Plandetext_8 = '任务类型'
      this.Plandetails_7 = ''
      if (taskMessage.timeTypeList[0].dateType === 0) {
        this.Plandetails_8 = '定时任务'
      } else if (taskMessage.timeTypeList[0].dateType === 1) {
        this.Plandetails_8 = '周期任务'
      } else {
        this.Plandetails_8 = '单次立即执行任务'
      }
      this.Plandetails_6 = 0
      this.Plandetails_9 = taskMessage.choose.startInterval + ' s'
      this.Plandetails_10 = taskMessage.choose.endInterval + ' s'
      this.Plandetails_11 = val.data.taskPlan.taskPriority
      this.Plandetails_12 = val.data.taskPlan.remark
      this.Plandeshow_4 = true
      this.Plandeshow_5 = false
      this.Plandeshow_7 = true
      this.Plandeshow_8 = false
    }
  }
}
