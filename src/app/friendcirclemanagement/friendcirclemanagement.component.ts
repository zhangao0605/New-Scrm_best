import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {HttpRequestService} from "../task/http-request.service";
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {FriendcirclemanagementserviceService} from "./friendcirclemanagementservice.service";
import * as GlobalUrl from "../globals";

declare var $: any

@Component({
  selector: 'app-friendcirclemanagement',
  templateUrl: './friendcirclemanagement.component.html',
  styleUrls: ['./friendcirclemanagement.component.css']
})
export class FriendcirclemanagementComponent implements OnInit {
  default_people = '../../assets/images/default_people.png'
  allChecksMore = []
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  isLoading = false;
  /*添加朋友圈内容*/
  addCon = ''
  confrontation = false

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

  constructor(private getCustomers: FriendcirclemanagementserviceService, private message: NzMessageService) {
  }

  errormessage;

  /*全局提示*/
  createMessage(type: string): void {
    this.message.create(type, `` + this.errormessage + ``);
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
    console.log(sendOd)
    console.log(this.allChecksMore)
  }

  thisIndex(index) {
    if (this.confrontation === true) {
      this.allChecksMore[index][0].ischeck = true
    } else {
      this.allChecksMore[index][0].ischeck = false
    }
  }

  /*根据accountId查询所有朋友圈*/
  getAllCirclefriend = GlobalUrl.prioductUrl + 'moment/getAllMoment'
  /*根据accountId，内容，标签模糊查询朋友圈*/
  getAllCirclefriendByLike = GlobalUrl.prioductUrl + 'moment/getAllMomentByLike'
  /*发送图片返回路径*/
  getimgUrl = GlobalUrl.prioductUrl + 'moment/test1'
  /*添加朋友圈*/
  addCirclefriend1 = GlobalUrl.prioductUrl + 'moment/addMoment'
  /*根据id查询朋友圈*/
  getCirclefriendById = GlobalUrl.prioductUrl + 'moment/getMomentById'
  /*根据id修改朋友圈*/
  modifyCirclefriendById = GlobalUrl.prioductUrl + 'moment/modifyMomentById'
  /*根据id修改朋友圈*/
  deleteCircleById = GlobalUrl.prioductUrl + 'moment/deleteMomentById'
  /*模糊查询标签*/
  getTags_search = GlobalUrl.prioductUrl + 'tag/getTagByName'
  /*确认上传标签*/
  getTags_sure = GlobalUrl.prioductUrl + 'moment/addMomentTagsByList'
  /*常用标签*/
  getTags_new_used_DataUrl = GlobalUrl.prioductUrl + 'tag/getUpdateTag'
  accountId;

  ngOnInit(): void {
    this.accountId = localStorage.getItem('id')
    let data = new FormData()
    data.append('accountId', '' + this.accountId + '')
    data.append('page', '1')
    this.getCustomers.getData(this.getAllCirclefriend, data, 1, 'save', this)

  }

  /*查看详情*/
  friendScircleDetal = true

  /*查看详情打开*/
  friends_circle_detal_open(e) {
    this.isOperating = false
    let data = new FormData()
    data.append('id', '' + e + '')
    this.getCustomers.getData(this.getCirclefriendById, data, 11, 'save', this)

  }

  /*查看详情关闭*/
  friends_circle_close() {
    this.isOperating = true
    this.friendScircleDetal = true
  }

  /*查看详情提交*/
  friends_circle_sure() {
    this.isOperating = true
    this.friendScircleDetal = true
  }

  modifyCircle = true
  modifyId;

  /*打开资料修改*/
  modify_circle_open(e) {
    this.isOperating = false
    this.modifyId = e
    let data = new FormData()
    data.append('id', '' + e + '')
    this.getCustomers.getData(this.getCirclefriendById, data, 3, 'save', this)
  }

  /*关闭资料修改*/
  modify_circle_close() {
    this.isOperating = true
    this.modifyCircle = true
  }

  previewImage = '';
  previewVisible = false;
  previewImage1 = '';
  previewVisible1 = false;
  /*修改朋友圈*/
  previewImageList = [];
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }
  /*添加朋友圈*/
  handlePreview1 = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }
  /*添加朋友圈*/
  beforeUpload1 = (file: UploadFile): boolean => {
    const isxls1 = file.type === "image/jpeg";
    const isxls2 = file.type === "image/png";
    const isxls3 = file.type === "image/jpg";

    if (isxls1 || isxls2 || isxls3) {
      return true
    } else {
      return false
    }
  }
  /*修改朋友圈*/
  beforeUpload = (file: UploadFile): boolean => {
    const isxls1 = file.type === "image/jpeg";
    const isxls2 = file.type === "image/png";
    const isxls3 = file.type === "image/jpg";

    if (isxls1 || isxls2 || isxls3) {
      $('.ant-upload-list-item-uploading-text').css('display', 'none').html('')
      return true
    } else {
      return false
    }

  }
  /*修改朋友圈*/
  RemoveUpload1 = (file: UploadFile): boolean => {
    for (let a = 0; a < this.previewImageList.length; a++) {
      if (this.previewImageList[a].uid === file.uid) {
        this.previewImageList.splice(a, 1)
      }
    }
    return true
  }

  selectedValue1 = '0'
  /*添加朋友圈的是否共有*/
  selectedValue2 = '0'
  addCircle = true

  add_circle_open() {
    this.isOperating = false
    this.addCircle = false
  }

  /*关闭添加朋友圈*/
  add_circle_close() {
    this.isOperating = true
    this.addCircle = true
    this.addCon = ''
    this.selectedValue2 = '0'
    this.previewImageList = []
  }

  /*提交添加朋友圈*/
  add_circle_sure() {
    console.log(this.previewImageList)
    if (this.addCon === '' && this.previewImageList.length ===0) {
      this.errormessage = '朋友圈内容不能为空请输入'
      this.createMessage('warning')
    } else {
      this.addCircle = true
      const getdata = new FormData()
      this.previewImageList.forEach((file: any, index) => {
        if (index === 0) {
          getdata.append('file', file.originFileObj);
        } else {
          getdata.append('file' + index + '', file.originFileObj);
        }
      });
      getdata.append('accountId', '' + this.accountId + '')
      getdata.append('contentOfMoment', '' + this.addCon + '')
      getdata.append('isPublic', '' + this.selectedValue2 + '')
      this.getCustomers.getData(this.addCirclefriend1, getdata, 2, 'save', this)
    }
  }

  /*提交修改朋友圈*/
  modify_circle_sure() {
    const data = new FormData()
    let a1 = -1;
    let a2 = -1;
    let imgPath = [];
    this.fileList.forEach((file) => {
      if (file.originFileObj === '') {
        a2++
        imgPath.push(file.url)
      } else {
        a1++
        if (a1 === 0) {
          data.append('file', file.originFileObj)
        } else {
          data.append('file' + a1 + '', file.originFileObj)
        }
      }
    })
    if (a1 === -1) {
      data.append('file', '')
      data.append('whether', '1')
    } else {
      data.append('whether', '0')
    }
    data.append('imagePath', '' + JSON.stringify(imgPath) + '')
    data.append('contentOfMoment', '' + this.editCon + '')
    data.append('isPublic', '' + this.selectedValue2 + '')
    data.append('id', '' + this.modifyId + '')
    data.append('accountId', '' + this.accountId + '')

    this.getCustomers.getData(this.modifyCirclefriendById, data, 4, 'save', this)

  }

  /*添加朋友圈选择标签*/
  // randomUserUrl = 'https://api.randomuser.me/?results=5';
  // searchChange$ = new BehaviorSubject('');
  // optionList = [];
  // selectedUser;
  // isLoading = false;
  optionList = []
  TagisLoading = false;
  editCon = ''
  editTime = ''
  editTag = ''

  fileList = [{
    uid: '$1',
    name: 'xxx.png',
    status: 'done',
    url: '',
    originFileObj: ''
  }];
  seeDital = {
    "accountId": -1,
    "contentOfMoment": " ",
    "createTime": " ",
    "id": -1,
    "imagePath": "",
    "imagepaths": [],
    "isPublic": 0,
    "resourceId": 0,
    "tags": " ",
    "tagss": []
  }

  postOk(val, flag, distinguish) {
    /*获取table数据*/
    if (distinguish === 1) {
      this.dataSet = val.data.MomentList
      this.isLoading = false;
      this.total = val.data.MomentCount;
      this.allChecksMore = []
      for (let value of  this.dataSet) {
        value.checked = false
        this.allChecksMore.push([{'ischeck': false}, {'id': value.id}])
      }
      this.indeterminate = false;
      this.allChecked = false
    }
    /*添加朋友圈*/
    else if (distinguish === 2) {
      this.addCon = ''
      this.selectedValue1 = '0'
      this.previewImageList = []
      this.add_circle_close()
      this.searchData(false)
      this.isOperating = true
    }
    /*修改朋友圈打开获取资料*/
    else if (distinguish === 3) {
      this.fileList = []
      val.data.imagepaths.forEach((file: any, index) => {
        this.fileList.push({
          uid: '$' + index,
          name: 'xxx.png',
          status: 'done',
          url: file.imagpath,
          originFileObj: ''
        })
      });
      this.editCon = val.data.contentOfMoment
      this.selectedValue2 = val.data.isPublic.toString()
      this.editTime = val.data.createTime
      this.editTag = val.data.tags
      this.modifyCircle = false

    }
    /*修改单条朋友圈*/
    else if (distinguish === 4) {
      this.fileList = []
      this.editCon = ''
      this.selectedValue2 = '0'
      this.modifyId = ''
      this.searchData(false)
      this.modifyCircle = true
      this.isOperating = true
    } else if (distinguish === 5) {
      this.searchData(false)
    } else if (distinguish === 6) {
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
    else if (distinguish === 7) {
      this.optionList = val.data.likeList
      this.TagisLoading = false;
    }
    /*确认修改标签*/
    else if (distinguish === 8) {
      this.searchData(false)
      this.tagging_public_close()
    } else if (distinguish === 9) {
      for (let c of  val.data.likeList) {
        c.addtype = 0
      }
      this.optionList = val.data.likeList
      this.isLoading = false;
    } else if (distinguish === 10) {
      for (let a = 0; a < val.data.tagss.length; a++) {
        val.data.tagss[a].checked = true
        val.data.tagss[a].Tagindex = a
        val.data.tagss[a].id = '$' + a
        val.data.tagss[a].addtype = -1
        val.data.tagss[a].tagName = val.data.tagss[a].tags
        this.Ownedtag.push(val.data.tagss[a])
      }
    } else if (distinguish === 11) {
      this.seeDital = val.data

      this.friendScircleDetal = false
    }
  }

  /*模糊查询值*/
  fuzzyQuery = ''
  /*是否在模糊查询状态下*/
  isfuzzyQuery: boolean = true

  /*模糊搜索*/
  fuzzy_query_table(): void {
    if (this.fuzzyQuery === '') {
      this.pageIndex = 1;
      this.isfuzzyQuery = true
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '1')
      this.getCustomers.getData(this.getAllCirclefriend, data, 1, 'save', this)
    } else {
      this.pageIndex = 1;
      this.isfuzzyQuery = false
      const getdata = new FormData()
      getdata.append('accountId', '' + this.accountId + '')
      getdata.append('message', '' + this.fuzzyQuery + '')
      getdata.append('page', '1')
      this.getCustomers.getData(this.getAllCirclefriendByLike, getdata, 1, 'save', this)
    }
  }

  /*主表格分页切换数据*/
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.isLoading = true;
    if (this.isfuzzyQuery === true) {
      let dataFormdata = new FormData()
      dataFormdata.append('accountId', '' + this.accountId + '')
      dataFormdata.append('page', '' + this.pageIndex + '')
      this.getCustomers.getData(this.getAllCirclefriend, dataFormdata, 1, 'save', this)
    } else {
      const getdata = new FormData()
      getdata.append('accountId', '' + this.accountId + '')
      getdata.append('message', '' + this.fuzzyQuery + '')
      getdata.append('page', '' + this.pageIndex + '')
      this.getCustomers.getData(this.getAllCirclefriendByLike, getdata, 1, 'save', this)
    }
  }

  sliceTime(e) {
    let a = ''
    a = e.slice(0, 10)

    return a
  }

  /*删除朋友圈单个或群体删除*/
  delThis(e): void {
    if (e != -1) {
      let data = new FormData()
      data.append('ids', '[' + e + ']')
      this.getCustomers.getData(this.deleteCircleById, data, 5, 'save', this)
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
      if (sendOd.length <= 0) {
        this.errormessage = '请选择需要进行批量删除的操作对象'
        this.createMessage('warning')
      } else {
        let data = new FormData()
        data.append('ids', '' + JSON.stringify(sendOd) + '')
        this.getCustomers.getData(this.deleteCircleById, data, 5, 'save', this)
      }

    }

  }


  /*最新标签选中触发事件*/
  newTagIsDel = false
  usedTagIsDel = false
  tagsNumber_used_old1 = []
  tagsNumber_new_old1 = []
  selectedUser;
  tagsNumber_used = []
  tagsNumber_used_old = []
  tagsNumber_new = []
  tagsNumber_new_old = []
  useTagList = []
  newTagList = []
  Ownedtag = []
  /*蒙层开关*/
  isOperating: boolean = true;
  /*修改标签开关*/
  taggingPublic: boolean = true

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
    data.append('accountId', '' + this.accountId + '')
    data.append('tagName', '' + value + '')
    this.getCustomers.getData(this.getTags_search, data, 9, 'save', this)
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

  /*打开修改标签*/
  tagidss;

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
      data.append('momentIds', '' + JSON.stringify(this.tagidss) + '')
    } else {
      data.append('momentIds', '[' + this.tagidss + ']')
    }
    data.append('tagNames', '' + names + '')
    this.getCustomers.getData(this.getTags_sure, data, 8, 'save', this)

  }

  Istagidss: boolean = false

  /*打开修改标签*/
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
        this.errormessage = '请选择需要进行批量打标签的操作对象'
        this.createMessage('warning')
      } else {
        this.tagidss = sendOd
        let tages_new_used_Data = new FormData()
        tages_new_used_Data.append('accountId', '' + this.accountId + '')
        this.getCustomers.getData(this.getTags_new_used_DataUrl, tages_new_used_Data, 6, 'save', this)
        this.taggingPublic = false
        this.isOperating = false
      }

    } else {
      this.Istagidss = false
      this.tagidss = e
      let data = new FormData()
      data.append('id', '' + e + '')
      this.getCustomers.getData(this.getCirclefriendById, data, 10, 'save', this)
      let tages_new_used_Data = new FormData()
      tages_new_used_Data.append('accountId', '' + this.accountId + '')
      this.getCustomers.getData(this.getTags_new_used_DataUrl, tages_new_used_Data, 6, 'save', this)
      this.taggingPublic = false
      this.isOperating = false
    }

  }
}
