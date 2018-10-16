import {Component, OnInit} from '@angular/core';
import {TaskchedulerserviceService} from "./taskchedulerservice.service";
import * as GlobalUrl from "../globals";
import {NzMessageService} from 'ng-zorro-antd'

@Component({
  selector: 'app-taskscheduler',
  templateUrl: './taskscheduler.component.html',
  styleUrls: ['./taskscheduler.component.css']
})
export class TaskschedulerComponent implements OnInit {
  /*蒙层开关*/
  isOperating: boolean = true;
  isOperating1: boolean = true;
  alltaskLength = 0
  nowtaskLength = 0
  failtaskLength = 0
  taskTemplatefaildetail = true
  tabs = ['所有任务', '正在执行', '等待执行', '执行完成', '执行失败',]
  laertTitle = ''
  selectedValue1 = '模板1'
  taskTemplateAddPlan: boolean = true
  selectedValue2 = '0'
  allChecksMore = []
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  tableDat = [];
  loading = true;
  sortValue = null;
  sortKey = null;
  searchGenderList: string[] = [];
  confrontation = false
  taskTemplatedetail = true

  constructor(private getCustomers: TaskchedulerserviceService, private message: NzMessageService) {
  }

  errormessage;

  /*全局提示*/
  createMessage(type: string): void {
    this.message.create(type, `` + this.errormessage + ``);
  }

  /*获取所有任务数据*/
  getAllTaskplan = GlobalUrl.prioductUrl + 'taskplan/getAllTaskplan'
  /*根据id查询任务计划详情*/
  getTaskplanDetailById = GlobalUrl.prioductUrl + 'taskplan/getTaskplanDetailById'
  /*根据id查询任务计划*/
  getTaskplanById = GlobalUrl.prioductUrl + 'taskplan/getTaskplanById'
  /*查询任务模板做任务计划的选择框*/
  getAllTasktemplateChoose = GlobalUrl.prioductUrl + 'tasktemplate/getAllTasktemplateChoose'
  /*添加任务计划*/
  addTaskplan = GlobalUrl.prioductUrl + 'taskplan/addTaskplan'
  /*根据id修改任务计划*/
  updateTaskplanById = GlobalUrl.prioductUrl + 'taskplan/updateTaskplanById'
  /*根据id删除任务计划*/
  deleteTaskplanById = GlobalUrl.prioductUrl + 'taskplan/deleteTaskplanById'
  /*根据accountId、任务名称，运行任务模糊查询所有任务管理*/
  getAllTaskplanByName = GlobalUrl.prioductUrl + 'taskplan/getAllTaskplanByName'
  /*查看任务模板中的单个任务详情*/
  getTaskById = GlobalUrl.prioductUrl + 'task/getTaskDetailById'
  table_index = 0;

  /*table切换*/
  nztableswith(e): void {
    this.fuzzyQuery === ''
    this.table_index = e
    this.pageIndex = 1
    if (e === 0) {
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '1')
      data.append('taskStatus', '')
      this.getCustomers.getCustomerdata(this.getAllTaskplan, data, 1, 'save', this)
    } else if (e === 1) {
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '1')
      data.append('taskStatus', '1')
      this.getCustomers.getCustomerdata(this.getAllTaskplan, data, 1, 'save', this)
    } else if (e === 2) {
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '1')
      data.append('taskStatus', '0')
      this.getCustomers.getCustomerdata(this.getAllTaskplan, data, 1, 'save', this)
    } else if (e === 3) {
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '1')
      data.append('taskStatus', '2')
      this.getCustomers.getCustomerdata(this.getAllTaskplan, data, 1, 'save', this)
    } else if (e === 4) {
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '1')
      data.append('taskStatus', '3')
      this.getCustomers.getCustomerdata(this.getAllTaskplan, data, 1, 'save', this)
    }
  }

  editpage(e): void {
    if (e === 0) {
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '' + this.pageIndex + '')
      data.append('taskStatus', '')
      this.getCustomers.getCustomerdata(this.getAllTaskplan, data, 1, 'save', this)
    } else if (e === 1) {
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '' + this.pageIndex + '')
      data.append('taskStatus', '1')
      this.getCustomers.getCustomerdata(this.getAllTaskplan, data, 1, 'save', this)
    } else if (e === 2) {
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '' + this.pageIndex + '')
      data.append('taskStatus', '0')
      this.getCustomers.getCustomerdata(this.getAllTaskplan, data, 1, 'save', this)
    } else if (e === 3) {
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '' + this.pageIndex + '')
      data.append('taskStatus', '2')
      this.getCustomers.getCustomerdata(this.getAllTaskplan, data, 1, 'save', this)
    } else if (e === 4) {
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '' + this.pageIndex + '')
      data.append('taskStatus', '3')
      this.getCustomers.getCustomerdata(this.getAllTaskplan, data, 1, 'save', this)
    }
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.editpage(this.table_index)
    this.loading = true;
  }

  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  indeterminate = false;

  /*全选*/
  checkAll(value: boolean): void {
    this.tableDat.forEach(data => data.checked = value);
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

  /*table选框刷新*/
  refreshStatus(event): void {
    this.confrontation = event
    const allChecked = this.tableDat.every(value => value.checked === true);
    const allUnChecked = this.tableDat.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.tableDat.some(value => value.checked);
    this.checkedNumber = this.tableDat.filter(value => value.checked).length;
  }

  /*批量删除*/
  delOnePlanId;
  cusNumber: string = ''

  Criticism(e, q): void {
    let sendOd = []
    if (e === -1) {

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
        this.getCustomers.getCustomerdata(this.deleteTaskplanById, data, 9, 'save', this)
      }

    } else {
      this.delOnePlanId = e
      if (q === 0) {
        this.cusNumber = '任务还未执行'
      } else if (q === 1) {
        this.cusNumber = '任务正在执行'
      } else if (q === 2) {
        this.cusNumber = '任务已执行完成'
      } else if (q === 3) {
        this.cusNumber = '任务执行失败'
      } else if (q === 4) {
        this.cusNumber = '任务执行异常'
      }
      this.remobeThePublicNumber = false
      this.isOperating = false
    }
  }

  /*删除分组*/
  remobeThePublicNumber = true

  grouping_remove_sure() {
    let data = new FormData()
    data.append('ids', '[' + this.delOnePlanId + ']')
    this.getCustomers.getCustomerdata(this.deleteTaskplanById, data, 9, 'save', this)
  }

  grouping_remove_close() {
    this.remobeThePublicNumber = true
    this.isOperating = true
  }

  thisIndex(index) {
    // console.log(this.confrontation)
    if (this.confrontation === true) {
      this.allChecksMore[index][0].ischeck = true
    } else {
      this.allChecksMore[index][0].ischeck = false
    }
  }

  addOrEdit = 0;
  addOrEditId = ''

  /*打开添加模板*/
  Addplan_open(e, q): void {
    this.choosetimestart2 = ''
    this.choosetimestart1 = ''
    this.addOrEditId = e
    if (q === 0) {
      this.selecttempIsDis = false
      this.addOrEdit = 0
      this.laertTitle = '添加计划'
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      this.getCustomers.getCustomerdata(this.getAllTasktemplateChoose, data, 4, 'save', this)
    } else {
      this.laertTitle = '修改计划'
      this.addOrEdit = 1
      this.selecttempIsDis = true
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      this.getCustomers.getCustomerdata(this.getAllTasktemplateChoose, data, 6, 'save', this)

    }

  }

  selecttempIsDis = false

  /*关闭添加模板*/
  Addplan_close(): void {
    this.taskTemplateAddPlan = true
    this.starttime = new Date()
    this.endttime = new Date()
    this.selectedValue2 = '0'
    this.selectedValue1 = ''
    this.isOperating = true
    // this. dateMode=[ new Date(), new Date() ]
  }

  /*提交增加模板或修改模板*/
  Addplan_sure(): void {
    /*添加计划*/
    if (this.addOrEdit === 0) {

      let data = new FormData()
      // console.log(this.choosetimestart2);
      // console.log(this.choosetimestart1);
      // this.timeConversion(new Date(result[1]), 'yyyy-MM-dd HH:mm')
      data.append('accountId', '' + this.accountId + '')
      data.append('endTime', '' + this.timeConversion(this.choosetimestart2, 'yyyy-MM-dd HH:mm:ss') + '')
      data.append('startTime', '' + this.timeConversion(this.choosetimestart1, 'yyyy-MM-dd HH:mm:ss') + '')
      data.append('taskPriority', '' + this.selectedValue2 + '')
      data.append('tasktemplateId', '' + this.selectedValue1 + '')
      this.getCustomers.getCustomerdata(this.addTaskplan, data, 5, 'save', this)
    }
    /*修改计划*/
    else {
      let data = new FormData()
      data.append('id', '' + this.addOrEditId + '')
      data.append('endTime', '' + this.timeConversion(this.choosetimestart2, 'yyyy-MM-dd HH:mm:ss') + '')
      data.append('startTime', '' + this.timeConversion(this.choosetimestart1, 'yyyy-MM-dd HH:mm:ss') + '')
      data.append('taskPriority', '' + this.selectedValue2 + '')
      this.getCustomers.getCustomerdata(this.updateTaskplanById, data, 8, 'save', this)
    }

  }

  accountId;

  ngOnInit(): void {
    let data = new FormData()
    this.accountId = localStorage.getItem('id')
    data.append('accountId', '' + this.accountId + '')
    data.append('page', '')
    data.append('taskStatus', '')
    this.getCustomers.getCustomerdata(this.getAllTaskplan, data, 1, 'save', this)
  }

  tasktemplateData = {
    "remark": '',
    "taskCount": '',
    "tasklist": [],
    "templateName": ''
  }
  choosetemplate = [];
  starttime = new Date()
  endttime = new Date()
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


  postOk(val, flag, distinguish) {
    if (distinguish === 1) {
      this.tableDat = val.data.taskPlanList
      this.alltaskLength = val.data.taskPlanCount
      this.nowtaskLength = val.data.runTaskCount
      this.failtaskLength = val.data.failedCount
      this.total = val.data.taskPlanCount
      this.allChecksMore = []
      for (var value of  this.tableDat) {
        value.checked = false
        this.allChecksMore.push([{'ischeck': false}, {'id': value.id}])
      }
      this.loading = false;
      this.indeterminate = false;
      this.allChecked = false
    }
    /*任务详情,模板详情*/
    else if (distinguish === 3) {
      if (this.temOrplan === 0) {
        this.isOperating1 = false
        this.Plandetails = false
        this.Multiple_task_processing(val)
      } else {
        this.tasktemplateData = val.data.tasktemplate
        this.taskTemplatedetail = false;
        this.isOperating = false
      }

      // this.tasktemplateData=val.data.taskMessage
      // this.taskTemplatedetail=false;
      // console.log(JSON.parse(val.data.taskMessage))

    }
    /*添加计划查询所有模板*/
    else if (distinguish === 4) {
      this.isOperating = false
      this.choosetemplate = val.data.tasktemplateList
      this.taskTemplateAddPlan = false
      this.selectedValue1 = this.choosetemplate[0].id
    }
    else if (distinguish === 5) {
      this.Addplan_close()
      this.editpage(this.table_index)
      this.isOperating = true
    }
    else if (distinguish === 6) {
      this.isOperating = false
      let data = new FormData()
      data.append('id', '' + this.addOrEditId + '')
      this.getCustomers.getCustomerdata(this.getTaskplanById, data, 7, 'save', this)
      this.choosetemplate = val.data.tasktemplateList
    }
    /*修改任务计划前查询*/
    else if (distinguish === 7) {
      this.selectedValue1 = val.data.tasktemplateId
      this.selectedValue2 = val.data.taskPriority.toString()
      this.starttime = val.data.startTimeString
      this.endttime = val.data.endTimeString
      this.taskTemplateAddPlan = false
    }
    /*修改任务成功*/
    else if (distinguish === 8) {
      this.Addplan_close()
      this.editpage(this.table_index)
      this.isOperating = true
    }
    /*删除操作*/
    else if (distinguish === 9) {
      this.grouping_remove_close()
      this.editpage(this.table_index)
      this.isOperating = true
    }
    /*任务模板中单个任务计划详情*/
    else if (distinguish === 10) {
      this.isOperating1 = false
      this.Plandetails = false
      this.Multiple_task_processing(val)
    }
  }

  timeConversion(time, format) {
    let t = new Date(time);
    let tf = function (i) {
      return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
        case 'MM':
          return tf(t.getMonth() + 1);
        case 'mm':
          return tf(t.getMinutes());
        case 'dd':
          return tf(t.getDate());
        case 'HH':
          return tf(t.getHours());
        case 'ss':
          return tf(t.getSeconds());

      }
    })
  }

  choosetimestart1;
  choosetimestart2;
  // choosetimeend1 = new Date
  // choosetimeend2 = new Date
  //
  onChange(result: Date[]): void {
    this.choosetimestart1 = result
    // this.timeConversion(new Date(result[0]), 'yyyy-MM-dd HH:mm')
    // this.timeConversion(new Date(result[1]), 'yyyy-MM-dd HH:mm')
    // if (e === 0) {
    //   this.choosetimestart1 = new Date(result[0])
    //   this.choosetimestart2 = new Date(result[1])
    // } else {
    //   this.choosetimeend1 = new Date(result[0])
    //   this.choosetimeend2 = new Date(result[1])
    // }
    // console.log(this.choosetimestart1)
    // console.log(this.choosetimestart2)
    // console.log(this.choosetimeend1)
    // console.log(this.choosetimeend2)
  }

  onChange1(result: Date[]): void {
    this.choosetimestart2 = result
  }

  // onOk(result: Date): void {
  //
  // }
  //
  // onOk1(result: Date): void {
  //   this.choosetimestart2 = result
  // }

  taskNameColor(e) {
    let a = ''
    if (e === 1) {
      a = 'color1_1'
    } else {
      a = 'color1_2'
    }
    return a
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

  taskStatusName(e) {
    let a = ''
    if (e === 1) {
      a = '正在执行'
    } else if (e === 3) {
      a = '执行失败'
    } else if (e === 0) {
      a = '等待执行'
    } else if (e === 2) {
      a = '执行完成'
    } else if (e === 4) {
      a = '执行异常'
    }
    return a
  }

  dateMode = [,]

  taskRank(e) {
    let a = '';
    if (e === 0) {
      a = '普通'
    } else {
      a = '紧急'
    }
    return a
  }

  seeFail(e) {
    let a = '';
    if (e === 3) {
      a = 'seeFail'
    } else {
      a = 'seeunFail'
    }
    return a
  }

  /*关闭失败详情模板*/
  taskTemplatefaildetail_close(): void {
    this.taskTemplatefaildetail = true
  }

  /*打开失败详情模板*/
  faildetail_open(e, q): void {
    if (q === 3) {
      this.taskTemplatefaildetail = false
    } else {

    }
  }

  temOrplan = 0

  /*查看任务或模板详细*/
  taskNameseedetail(e, q): void {
    this.temOrplan = q
    let data = new FormData()
    data.append('id', '' + e + '')
    this.getCustomers.getCustomerdata(this.getTaskplanDetailById, data, 3, 'save', this)

  }

  taskNameseedetail1(e): void {
    let data = new FormData()
    data.append('id', '' + e + '')
    this.getCustomers.getCustomerdata(this.getTaskById, data, 10, 'save', this)
  }

  /*关闭模板详情*/
  taskTemplatedetail_close(): void {
    this.taskTemplatedetail = true;
    this.isOperating = true
  }

  /*关闭单个计划详情*/
  Plandetails_close(): void {
    this.Plandetails = true;
    this.isOperating1 = true
  }

  /*模糊查询数据绑定*/
  fuzzyQuery = ''

  /*table模糊查询*/
  isfuzzyquery = false;

  /*模糊查询*/
  fuzzy_query_table(): void {
    if (this.fuzzyQuery === '') {
      this.nztableswith(this.table_index)
    } else {
      this.pageIndex = 1
      this.isfuzzyquery = true
      let data = new FormData()
      let status;
      if (this.table_index === 0) {
        status = ''
      } else if (this.table_index === 1) {
        status = 1
      } else if (this.table_index === 2) {
        status = 0
      } else if (this.table_index === 3) {
        status = 2
      } else if (this.table_index === 4) {
        status = 3
      }
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '1')
      data.append('message', '' + this.fuzzyQuery + '')
      data.append('taskStatus', '' + status + '')
      this.getCustomers.getCustomerdata(this.getAllTaskplanByName, data, 1, 'save', this)
    }
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
