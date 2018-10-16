import {Component, OnInit} from '@angular/core';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {DomSanitizer} from '@angular/platform-browser'
import {MaterialmanagementserviveService} from "./materialmanagementservive.service";
import * as GlobalUrl from "../globals";

@Component({
  selector: 'app-materialmanagement',
  templateUrl: './materialmanagement.component.html',
  styleUrls: ['./materialmanagement.component.css']
})
export class MaterialmanagementComponent implements OnInit {
  default_people = '../../assets/images/default_people.png'
  /*图片素材*/
  Picturematerial: boolean = true;
  /*添加图片素材开关*/
  imageAddPlan: boolean = true
  /*图文素材*/
  Linkingmaterial: boolean = false;
  /*添加图文素材开关*/
  graphicAddPlan: boolean = true
  /*话术素材*/
  Speechmaterial: boolean = false;
  /*添加话术素材开关*/
  speechAddPlan: boolean = true
  /*图片素材title*/
  imageAddPlanTitle: string = '上传图片素材'
  graphicAddPlanTitle: string = '上传图文素材'
  speechAddPlanTitle: string = '上传话术素材'
  tabs = ['图片素材', '链接素材', '话术素材']
  pageIndex = 1;
  currentInterface = 0
  /*判断是修改图片素材还是添加*/
  isAddImg = false
  /*判断是修改图文链接还是添加*/
  isAddLink = false
  /*判断是修改话术还是添加*/
  isAddSpeech = false
  /*图文素材标题*/
  text_link_title = ''
  /*图文素材URL*/
  text_link_URL = ''
  /*图文素材内容*/
  text_link_con = ''
  text_link_value = '0'
  /*图文话术标题*/
  speech_title = ''
  /*图文话术内容*/
  speech_con = ''
  speech_value = '0'

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

  Thatpart = 0
  EtN = '添加图片素材'

  nztableswith(i) {
    this.Thatpart = i
    this.pageIndex = 1
    if (i === 0) {
      this.EtN = '上传图片素材'
      this.Picturematerial = true;
      this.Linkingmaterial = false;
      this.Speechmaterial = false;
      this.currentInterface = 0
      this.pageIndex = 1
      this.isfuzzyquery = false;
      this.fuzzyQuery = '';
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '1')
      this.getdata.getCustomerdata(this.getAllPicture, data, 1, 'save', this)

    } else if (i === 1) {
      this.EtN = '上传图文素材'
      this.Picturematerial = false;
      this.Linkingmaterial = true;
      this.Speechmaterial = false;
      this.currentInterface = 1

      this.isfuzzyquery = false;
      this.fuzzyQuery = '';
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '1')
      this.getdata.getCustomerdata(this.getAllImgandlink, data, 6, 'save', this)
    } else if (i === 2) {
      this.EtN = '上传话术素材'
      this.Picturematerial = false;
      this.Linkingmaterial = false;
      this.Speechmaterial = true;
      this.currentInterface = 2

      this.isfuzzyquery = false;
      this.fuzzyQuery = '';
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('page', '1')
      this.getdata.getCustomerdata(this.getAllScript, data, 7, 'save', this)
    }

  }

  /*获取table图片数据*/
  getAllPicture = GlobalUrl.prioductUrl + 'picture/getAllPicture'
  /*根据accountId查询显示所有话术素材*/
  getAllScript = GlobalUrl.prioductUrl + 'script/getAllScript'
  /*根据accountId查询显示所有链接素材*/
  getAllImgandlink = GlobalUrl.prioductUrl + 'link/getAllLink'
  /*查询各种素材的数量*/
  getCountByThree = GlobalUrl.prioductUrl + 'picture/getCountByThree'
  getTags_imgUrl = GlobalUrl.prioductUrl + 'circlefriend/test1'
  /*模糊查询标签名称*/
  getTags_search = GlobalUrl.prioductUrl + 'tag/getTagByName'
  /*获取常用与最新标签*/
  getTags_new_used_DataUrl = GlobalUrl.prioductUrl + 'tag/getUpdateTag'
  /*标签确认上传*/
  getTags_sure = GlobalUrl.prioductUrl + 'contact/addContactTag'
  /*根据accountId，主题，标签模糊查询显示图片素材*/
  getAllPictureByLike = GlobalUrl.prioductUrl + 'picture/getAllPictureByLike'
  /*根据accountId，主题，标签模糊查询链接素材*/
  getAllImgandlinkByLike = GlobalUrl.prioductUrl + 'link/getAllLinkByLike'
  /*根据accountId话术类型，标签模糊查询话术素材*/
  getAllScriptByLike = GlobalUrl.prioductUrl + 'script/getAllScriptByLike'
  /*给图片素材打标签*/
  addPictureTags = GlobalUrl.prioductUrl + 'picture/addPictureTagsByList'
  /*给链接素材打标签*/
  addImgandlinkTags = GlobalUrl.prioductUrl + 'link/addLinkTagsByList'
  /*给话术素材打标签*/
  addScriptTag = GlobalUrl.prioductUrl + 'script/addScriptTagsByList'
  /*根据id查询图片素材*/
  getPictureById = GlobalUrl.prioductUrl + 'picture/getPictureById'
  /*根据id查询链接素材*/
  getImgamdlinkById = GlobalUrl.prioductUrl + 'link/getLinkById'
  /*根据id查询话术素材*/
  getScriptById = GlobalUrl.prioductUrl + 'script/getScriptById'
  /*发送图片返回路径*/
  getimgUrl = GlobalUrl.prioductUrl + 'moment/test1'
  /*添加图片素材*/
  addPicture = GlobalUrl.prioductUrl + 'picture/addPicture'
  /*根据id修改图片素材*/
  updatePictureById = GlobalUrl.prioductUrl + 'picture/updatePictureById'
  /*添加链接素材*/
  addImgandlink = GlobalUrl.prioductUrl + 'link/addLink'
  /*根据id修改链接素材*/
  updateImgandlink = GlobalUrl.prioductUrl + 'link/updateLinkById'
  /*添加话术素材*/
  addScript = GlobalUrl.prioductUrl + 'script/addScript'
  /*根据id修改话术素材*/
  updateScriptById = GlobalUrl.prioductUrl + 'script/updateScriptById'
  /*根据id删除图片素材（批量或单个）*/
  deletePictureById = GlobalUrl.prioductUrl + 'picture/deletePictureById'
  /*根据id删除链接素材（批量或单个）*/
  deleteImgandlinkById = GlobalUrl.prioductUrl + 'link/deleteLinkById'
  /*根据id删除话术素材（批量或单个删除）*/
  deleteScriptById = GlobalUrl.prioductUrl + 'script/deleteScriptById'
  accountId;

  ngOnInit() {
    this.accountId = localStorage.getItem('id')
    let data = new FormData()
    data.append('accountId', '' + this.accountId + '')
    data.append('page', '1')
    this.getdata.getCustomerdata(this.getAllPicture, data, 1, 'save', this)
    let data1 = new FormData()
    data1.append('accountId', '' + this.accountId + '')
    this.getdata.getCustomerdata(this.getCountByThree, data1, 5, 'save', this)
  }

  errormessage;

  /*全局提示*/
  createMessage(type: string): void {
    this.message.create(type, `` + this.errormessage + ``);
  }

  fileList1 = []
  fileList_image = []
  previewImage = '';
  previewVisible = false;
  previewImageList = [];
  previewImage1 = ''
  loading = false
  /*添加图片素材主题*/
  image_title = ''
  /*添加图片素材描述*/
  image_picdesc = ''
  /*当前图片素材是否公有*/
  imageaddPlanIspublic = '0'
  previewVisible1 = false;

  constructor(private getdata: MaterialmanagementserviveService, private message: NzMessageService) {
  }

  handlePreview1 = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }
  handlePreview_image = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  imgUrl;

  /*新增图片*/
  beforeUpload_image = (file: UploadFile): boolean => {
    const isxls1 = file.type === "image/jpeg";
    const isxls2 = file.type === "image/png";
    const isxls3 = file.type === "image/jpg";

    if (isxls1 || isxls2 || isxls3) {
      return true
    } else {
      return false
    }
  }
  /*删除单张图文链接相片*/
  RemoveUpload1 = (file: UploadFile): boolean => {
    this.fileList1 = [];
    return true
  }
  /*删除单张相片*/
  RemoveUpload_image = (file: UploadFile): boolean => {
    this.previewImageList = [];
    return true
  }

  /*打开上传图片素材*/
  image_addPlan_open() {
    this.isOperating = false
    if (this.currentInterface === 0) {
      this.image_title = ''
      this.image_picdesc = ''
      this.imageaddPlanIspublic = '0'
      this.fileList_image = []
      this.imageAddPlanTitle = '上传图片素材'
      this.isAddImg = true
      this.imageAddPlan = false
    } else if (this.currentInterface === 1) {
      this.isAddLink = true
      this.graphicAddPlan = false
      this.graphicAddPlanTitle = '上传图文素材'
    } else if (this.currentInterface === 2) {
      this.isAddSpeech = true
      this.speechAddPlanTitle = '上传话术素材'
      this.speechAddPlan = false
    }
  }

  /*关闭上传图片素材*/
  image_addPlan_close() {
    this.isOperating = true
    this.image_title = ''
    this.image_picdesc = ''
    this.imageaddPlanIspublic = '0'
    this.fileList_image = []
    this.imageAddPlan = true
  }

  /*提交上传图片素材*/
  image_addPlan_sure() {
    if (this.isAddImg === true) {
      let data = new FormData()
      this.fileList_image.forEach((file) => {
        data.append('file', file.originFileObj)
      })
      data.append('accountId', '' + this.accountId + '')
      data.append('picdesc', '' + this.image_picdesc + '')
      data.append('title', '' + this.image_title + '')
      data.append('isPublic', '' + this.imageaddPlanIspublic + '')
      this.getdata.getCustomerdata(this.addPicture, data, 10, 'save', this)
    } else {
      let data = new FormData()
      if (this.fileList_image[0].uid === -1) {
        data.append('file', '')
        data.append('imagePath', '' + this.fileList_image[0].url + '')
      } else {
        this.fileList_image.forEach((file) => {
          data.append('file', file.originFileObj)
        })
        data.append('imagePath', '')
      }
      data.append('id', '' + this.edimgId + '')
      data.append('picdesc', '' + this.image_picdesc + '')
      data.append('title', '' + this.image_title + '')
      data.append('isPublic', '' + this.imageaddPlanIspublic + '')
      this.getdata.getCustomerdata(this.updatePictureById, data, 14, 'save', this)
    }
  }

  /*关闭上传图文素材*/
  graphic_addPlan_close() {
    this.isOperating = true
    this.fileList1 = [];
    this.graphicAddPlan = true
    this.text_link_title = ''
    this.text_link_URL = ''
    this.text_link_con = ''
    this.text_link_value = '0'
  }

  /*提交上传图文素材*/
  graphic_addPlan_sure() {
    if (this.isAddLink) {
      let data = new FormData()
      this.fileList1.forEach((file) => {
        data.append('file', file.originFileObj)
      })
      data.append('accountId', '' + this.accountId + '')
      data.append('description', '' + this.text_link_con + '')
      data.append('title', '' + this.text_link_title + '')
      data.append('url', '' + this.text_link_URL + '')
      data.append('isPublic', '' + this.text_link_value + '')
      this.getdata.getCustomerdata(this.addImgandlink, data, 151, 'save', this)
    } else {
      let data = new FormData()
      if (this.fileList1[0].uid === -1) {
        data.append('file', '')
        data.append('imagePath', '' + this.fileList1[0].url + '')
      } else {
        this.fileList1.forEach((file) => {
          data.append('file', file.originFileObj)
        })
        data.append('imagePath', '')
      }
      data.append('description', '' + this.text_link_con + '')
      data.append('title', '' + this.text_link_title + '')
      data.append('url', '' + this.text_link_URL + '')
      data.append('isPublic', '' + this.text_link_value + '')
      data.append('id', '' + this.edlinkId + '')
      data.append('accountId', '' + this.accountId + '')
      this.getdata.getCustomerdata(this.updateImgandlink, data, 15, 'save', this)
    }

  }

  /*关闭上传话术素材*/
  speech_addPlan_close() {
    this.isOperating = true
    this.speech_title = ''
    this.speech_con = ''
    this.speech_value = '0'
    this.speechAddPlan = true
  }

  /*提交上传话术素材*/
  speech_addPlan_sure() {
    if (this.isAddSpeech) {
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('content', '' + this.speech_con + '')
      data.append('title', '' + this.speech_title + '')
      data.append('isPublic', '' + this.speech_value + '')
      this.getdata.getCustomerdata(this.addScript, data, 161, 'save', this)
    } else {
      let data = new FormData()
      data.append('id', '' + this.edlspeech + '')
      data.append('content', '' + this.speech_con + '')
      data.append('title', '' + this.speech_title + '')
      data.append('isPublic', '' + this.speech_value + '')
      this.getdata.getCustomerdata(this.updateScriptById, data, 16, 'save', this)
    }


  }

  edimgId = ''
  edlinkId = ''
  edlspeech = ''

  /*打开修改图片素材*/
  open_image_addPlan(e) {
    this.isOperating = false
    this.edimgId = e
    this.isAddImg = false
    this.Query_details(e)
    this.imageAddPlanTitle = '修改图片素材'
    this.imageAddPlan = false
  }

  /*打开修改图文素材*/
  open_graphic_addPlan(e) {
    this.isOperating = false
    this.text_link_title = ''
    this.text_link_URL = ''
    this.text_link_con = ''
    this.text_link_value = '0'


    this.edlinkId = e
    this.isAddLink = false
    this.Query_details(e)
    this.graphicAddPlanTitle = '修改图文素材'
    this.graphicAddPlan = false

  }

  /*打开修改话术素材*/
  open_speech_addPlan(e) {
    this.isOperating = false
    this.speech_title = ''
    this.speech_con = ''
    this.speech_value = '0'
    this.isAddSpeech = false
    this.edlspeech = e
    this.Query_details(e)
    this.speechAddPlanTitle = '修改话术素材'
    this.speechAddPlan = false

  }

  allChecksMore = []
  /*打标签虚拟数组*/
  useTagList = []
  newTagList = []
  /*蒙层开关*/
  isOperating: boolean = true;
  /*修改标签开关*/
  taggingPublic: boolean = true
  /*table是否全选*/
  allChecked = false;
  Ownedtag = []
  /*获得所有选中的用户ID*/
  get_All_Com_Check = []


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

  /*搜索关键字标签*/
  onSearch(value: string): void {
    this.isLoading = true;
    let data = new FormData()
    data.append('accountId', '' + this.accountId + '')
    data.append('tagName', '' + value + '')
    this.getdata.getCustomerdata(this.getTags_search, data, 3, 'save', this)
  }

  /*添加选中标签内容*/
  tagging_public_clean_selectedUser() {
    for (let a of this.selectedUser) {
      this.optionList[a].addType = 0
      this.Ownedtag.unshift(this.optionList[a])
    }
    this.selectedUser = []
  }

  /*虚拟标签数组*/
  optionList = [];
  selectedUser;
  isLoading = false;
  tagsNumber_used = []
  tagsNumber_used_old = []
  tagsNumber_new = []
  tagsNumber_new_old = []
  /*记录打标签的ID*/
  isTagingId;
  Istagidss: boolean = false

  /*打开修改标签*/
  tagging_public_open(e) {
    if (e === -1) {
      this.getAllComCheck()
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
      this.isTagingId = sendOd
      if (sendOd.length <= 0) {
        this.errormessage = '请选择需要进行批量打标签的操作对象'
        this.createMessage('warning')
      } else {
        let tages_new_used_Data = new FormData()
        tages_new_used_Data.append('accountId', '' + this.accountId + '')
        this.getdata.getCustomerdata(this.getTags_new_used_DataUrl, tages_new_used_Data, 2, 'save', this)
        this.taggingPublic = false
        this.isOperating = false
      }

    } else {
      this.Istagidss = false
      if (this.Thatpart === 0) {
        let data = new FormData()
        data.append('id', '' + e + '')
        this.getdata.getCustomerdata(this.getPictureById, data, 9, 'save', this)
      } else if (this.Thatpart === 1) {
        let data = new FormData()
        data.append('id', '' + e + '')
        this.getdata.getCustomerdata(this.getImgamdlinkById, data, 9, 'save', this)
      } else {
        let data = new FormData()
        data.append('id', '' + e + '')
        this.getdata.getCustomerdata(this.getScriptById, data, 9, 'save', this)
      }
      this.isTagingId = e
      this.taggingPublic = false
      this.isOperating = false
    }

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
    let names = []
    for (let a of this.Ownedtag) {
      names.push(a.tagName)
    }
    if (this.Thatpart === 0) {
      if (this.Istagidss === true) {
        data.append('pictureIds', '' + JSON.stringify(this.isTagingId) + '')
      } else {
        data.append('pictureIds', '[' + this.isTagingId + ']')
      }
      data.append('tagNames', '' + names + '')
      this.getdata.getCustomerdata(this.addPictureTags, data, 8, 'save', this)
    } else if (this.Thatpart === 1) {
      if (this.Istagidss === true) {
        data.append('imgIds', '' + JSON.stringify(this.isTagingId) + '')
      } else {
        data.append('imgIds', '[' + this.isTagingId + ']')
      }
      data.append('tagNames', '' + names + '')
      this.getdata.getCustomerdata(this.addImgandlinkTags, data, 8, 'save', this)
    } else {
      if (this.Istagidss === true) {
        data.append('scriptIds', '' + JSON.stringify(this.isTagingId) + '')
      } else {
        data.append('scriptIds', '[' + this.isTagingId + ']')
      }
      data.append('tagNames', '' + names + '')
      this.getdata.getCustomerdata(this.addScriptTag, data, 8, 'save', this)
    }

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

  /*标签信息库删除后触发事件*/
  tagging_public_afterClose(): void {
    console.log('after tag closed');
  }

  total = 1;
  dataSet = [];
  dataSet1 = [];
  dataSet2 = [];
  indeterminate = false;
  scriptCount = 0
  pictureCounts = 0
  imgandlinkCount = 0

  postOk(val, flag, distinguish) {
    /*获取图片table数据*/
    if (distinguish === 1) {
      this.dataSet1 = [];
      this.dataSet2 = [];
      this.dataSet = val.data.pictureList
      this.loading = false;
      this.total = val.data.pictureCount;
      this.allChecksMore = []
      for (let value of  this.dataSet) {
        value.checked = false
        this.allChecksMore.push([{'ischeck': false}, {'id': value.id}])
      }
      this.indeterminate = false;
      this.allChecked = false
    } else if (distinguish === 2) {

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
    else if (distinguish === 3) {
      for (let c of  val.data.likeList) {
        c.addtype = 0
      }
      this.optionList = val.data.likeList
      this.isLoading = false;
    }
    /*确认修改标签*/
    else if (distinguish === 4) {
      this.tagging_public_close()
    }
    /*查询各种素材的数量*/
    else if (distinguish === 5) {
      this.scriptCount = val.data.scriptCount
      this.pictureCounts = val.data.pictureCount
      this.imgandlinkCount = val.data.imgandlinkCount
    }
    /*获取图文链接table数据*/
    else if (distinguish === 6) {
      this.dataSet = []
      this.dataSet2 = []
      this.dataSet1 = val.data.linkList
      this.loading = false;
      this.total = val.data.linkCount;
      this.allChecksMore = []
      for (let value of  this.dataSet1) {
        value.checked = false
        this.allChecksMore.push([{'ischeck': false}, {'id': value.id}])
      }
      this.indeterminate = false;
      this.allChecked = false
    }
    /*获取话术table数据*/
    else if (distinguish === 7) {
      this.dataSet = []
      this.dataSet1 = []
      this.dataSet2 = val.data.scriptList
      this.loading = false;
      this.total = val.data.scriptCount;
      this.allChecksMore = []
      for (let value of  this.dataSet2) {
        value.checked = false
        this.allChecksMore.push([{'ischeck': false}, {'id': value.id}])
      }
      this.indeterminate = false;
      this.allChecked = false
    }
    /*打标签操作*/
    else if (distinguish === 8) {
      this.tagging_public_close()
      this.searchData(false)
    } else if (distinguish === 9) {
      for (let a = 0; a < val.data.tagss.length; a++) {
        val.data.tagss[a].checked = true
        val.data.tagss[a].Tagindex = a
        val.data.tagss[a].id = '$' + a
        val.data.tagss[a].addtype = -1
        val.data.tagss[a].tagName = val.data.tagss[a].tags
        this.Ownedtag.push(val.data.tagss[a])
      }
      let tages_new_used_Data = new FormData()
      tages_new_used_Data.append('accountId', '' + this.accountId + '')
      this.getdata.getCustomerdata(this.getTags_new_used_DataUrl, tages_new_used_Data, 2, 'save', this)
    }
    /*添加图片素材*/
    else if (distinguish === 10) {
      this.searchData(false)
      this.image_addPlan_close()
      let data1 = new FormData()
      data1.append('accountId', '' + this.accountId + '')
      this.getdata.getCustomerdata(this.getCountByThree, data1, 5, 'save', this)
    }
    /*获取图片详细资料*/
    else if (distinguish === 11) {
      this.queryDetails = val.datas
      this.image_title = val.data.title
      this.image_picdesc = val.data.picdesc
      this.imageaddPlanIspublic = val.data.isPublic.toString()
      this.fileList_image.push({
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: val.data.imagePath,
      })
    }
    /*获取图文详细资料*/
    else if (distinguish === 12) {
      this.text_link_title = val.data.title
      this.text_link_URL = val.data.url
      this.text_link_con = val.data.description
      this.text_link_value = val.data.isPublic.toString()
      this.fileList1.push({
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: val.data.imgPath,
      })
    }
    /*获取话术详细资料*/
    else if (distinguish === 13) {
      this.speech_title = val.data.title
      this.speech_con = val.data.content
      this.speech_value = val.data.isPublic.toString()
    } else if (distinguish === 14) {
      this.edimgId = ''
      this.image_addPlan_close()
      this.searchData(false)
    } else if (distinguish === 15) {
      this.searchData(false)
      this.graphic_addPlan_close()

    } else if (distinguish === 151) {
      let data1 = new FormData()
      data1.append('accountId', '' + this.accountId + '')
      this.getdata.getCustomerdata(this.getCountByThree, data1, 5, 'save', this)
      this.searchData(false)
      this.graphic_addPlan_close()

    } else if (distinguish === 16) {
      this.searchData(false)
      this.speech_addPlan_close()
    } else if (distinguish === 161) {
      this.searchData(false)
      this.speech_addPlan_close()
      let data1 = new FormData()
      data1.append('accountId', '' + this.accountId + '')
      this.getdata.getCustomerdata(this.getCountByThree, data1, 5, 'save', this)
    } else if (distinguish === 17) {
      let data1 = new FormData()
      data1.append('accountId', '' + this.accountId + '')
      this.getdata.getCustomerdata(this.getCountByThree, data1, 5, 'save', this)
      this.searchData(false)
    }

  }


  /*模糊查询数据绑定*/
  fuzzyQuery = ''

  /*table模糊查询*/
  isfuzzyquery = false;

  /*模糊查询*/


  fuzzy_query_table(): void {
    if (this.Thatpart === 0) {
      if (this.fuzzyQuery === '') {
        this.pageIndex = 1
        this.isfuzzyquery = false;
        let data = new FormData()
        data.append('accountId', '' + this.accountId + '')
        data.append('page', '1')
        this.getdata.getCustomerdata(this.getAllPicture, data, 1, 'save', this)
      } else {
        this.pageIndex = 1
        this.isfuzzyquery = true
        let data = new FormData()
        data.append('accountId', '' + this.accountId + '')
        data.append('page', '1')
        data.append('message', '' + this.fuzzyQuery + '')
        this.getdata.getCustomerdata(this.getAllPictureByLike, data, 1, 'save', this)
      }
    } else if (this.Thatpart === 1) {
      if (this.fuzzyQuery === '') {
        this.pageIndex = 1
        this.isfuzzyquery = false;
        let data = new FormData()
        data.append('accountId', '' + this.accountId + '')
        data.append('page', '1')
        this.getdata.getCustomerdata(this.getAllImgandlink, data, 6, 'save', this)
      } else {
        this.pageIndex = 1
        this.isfuzzyquery = true
        let data = new FormData()
        data.append('accountId', '' + this.accountId + '')
        data.append('page', '1')
        data.append('message', '' + this.fuzzyQuery + '')
        this.getdata.getCustomerdata(this.getAllImgandlinkByLike, data, 6, 'save', this)
      }
    } else if (this.Thatpart === 2) {
      if (this.fuzzyQuery === '') {
        this.pageIndex = 1
        this.isfuzzyquery = false;
        let data = new FormData()
        data.append('accountId', '' + this.accountId + '')
        data.append('page', '1')
        this.getdata.getCustomerdata(this.getAllScript, data, 7, 'save', this)
      } else {
        this.pageIndex = 1
        this.isfuzzyquery = true
        let data = new FormData()
        data.append('accountId', '' + this.accountId + '')
        data.append('page', '1')
        data.append('message', '' + this.fuzzyQuery + '')
        this.getdata.getCustomerdata(this.getAllScriptByLike, data, 7, 'save', this)
      }
    }
  }

  /*table分页*/
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    if (this.Thatpart === 0) {
      if (this.fuzzyQuery === '') {
        let data = new FormData()
        data.append('accountId', '' + this.accountId + '')
        data.append('page', '' + this.pageIndex + '')
        this.getdata.getCustomerdata(this.getAllPicture, data, 1, 'save', this)
      } else {
        let data = new FormData()
        data.append('accountId', '' + this.accountId + '')
        data.append('page', '' + this.pageIndex + '')
        data.append('message', '' + this.fuzzyQuery + '')
        this.getdata.getCustomerdata(this.getAllPictureByLike, data, 1, 'save', this)
      }
    } else if (this.Thatpart === 1) {
      if (this.fuzzyQuery === '') {
        let data = new FormData()
        data.append('accountId', '' + this.accountId + '')
        data.append('page', '' + this.pageIndex + '')
        this.getdata.getCustomerdata(this.getAllImgandlink, data, 6, 'save', this)
      } else {
        let data = new FormData()
        data.append('accountId', '' + this.accountId + '')
        data.append('page', '' + this.pageIndex + '')
        data.append('message', '' + this.fuzzyQuery + '')
        this.getdata.getCustomerdata(this.getAllImgandlinkByLike, data, 6, 'save', this)
      }
    } else if (this.Thatpart === 2) {
      if (this.fuzzyQuery === '') {
        let data = new FormData()
        data.append('accountId', '' + this.accountId + '')
        data.append('page', '' + this.pageIndex + '')
        this.getdata.getCustomerdata(this.getAllScript, data, 7, 'save', this)
      } else {
        let data = new FormData()
        data.append('accountId', '' + this.accountId + '')
        data.append('page', '' + this.pageIndex + '')
        data.append('message', '' + this.fuzzyQuery + '')
        this.getdata.getCustomerdata(this.getAllScriptByLike, data, 7, 'save', this)
      }
    }
  }

  queryDetails = ''

  /*提供查询信息*/
  Query_details(e): void {
    if (this.Thatpart === 0) {
      let data = new FormData()
      data.append('id', '' + e + '')
      this.getdata.getCustomerdata(this.getPictureById, data, 11, 'save', this)
    } else if (this.Thatpart === 1) {
      let data = new FormData()
      data.append('id', '' + e + '')
      this.getdata.getCustomerdata(this.getImgamdlinkById, data, 12, 'save', this)
    } else {
      let data = new FormData()
      data.append('id', '' + e + '')
      this.getdata.getCustomerdata(this.getScriptById, data, 13, 'save', this)
    }
  }

  delThis(e): void {
    console.log(e)
    if (e != -1) {
      let data = new FormData()
      data.append('ids', '[' + e + ']')
      if (this.Thatpart === 0) {
        this.getdata.getCustomerdata(this.deletePictureById, data, 17, 'save', this)
      } else if (this.Thatpart === 1) {
        this.getdata.getCustomerdata(this.deleteImgandlinkById, data, 17, 'save', this)
      } else {
        this.getdata.getCustomerdata(this.deleteScriptById, data, 17, 'save', this)
      }
    } else {
      let sendOd = []
      if (this.allChecked === true) {
        for (let value of  this.allChecksMore) {
          sendOd.push(value[1].id)
        }
      } else {
        for (let value of  this.allChecksMore) {
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
        if (this.Thatpart === 0) {
          this.getdata.getCustomerdata(this.deletePictureById, data, 17, 'save', this)
        } else if (this.Thatpart === 1) {
          this.getdata.getCustomerdata(this.deleteImgandlinkById, data, 17, 'save', this)
        } else {
          this.getdata.getCustomerdata(this.deleteScriptById, data, 17, 'save', this)
        }
      }

    }

  }

  checkAll(value: boolean): void {
    this.dataSet.forEach(data => data.checked = value);
    this.refreshStatus(event);
    if (this.allChecked === true) {
      for (let value1 of  this.allChecksMore) {
        value1[0].ischeck = true
      }
    } else {
      for (let value1 of  this.allChecksMore) {
        value1[0].ischeck = false
      }
    }
  }

  checkAll2(value: boolean): void {
    this.dataSet2.forEach(data => data.checked = value);
    this.refreshStatus2(event);
    if (this.allChecked === true) {
      for (let value1 of  this.allChecksMore) {
        value1[0].ischeck = true
      }
    } else {
      for (let value1 of  this.allChecksMore) {
        value1[0].ischeck = false
      }
    }
  }

  checkAll1(value: boolean): void {
    this.dataSet1.forEach(data => data.checked = value);
    this.refreshStatus1(event);
    if (this.allChecked === true) {
      for (let value1 of  this.allChecksMore) {
        value1[0].ischeck = true
      }
    } else {
      for (let value1 of  this.allChecksMore) {
        value1[0].ischeck = false
      }
    }
  }

  confrontation = false
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

  refreshStatus1(event): void {
    this.confrontation = event
    const allChecked = this.dataSet1.every(value => value.checked === true);
    const allUnChecked = this.dataSet1.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.dataSet1.some(value => value.checked);
    this.checkedNumber = this.dataSet1.filter(value => value.checked).length;
  }

  refreshStatus2(event): void {
    this.confrontation = event
    const allChecked = this.dataSet2.every(value => value.checked === true);
    const allUnChecked = this.dataSet2.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.dataSet2.some(value => value.checked);
    this.checkedNumber = this.dataSet2.filter(value => value.checked).length;
  }

  thisIndex(index): void {
    if (this.confrontation === true) {
      this.allChecksMore[index][0].ischeck = true
    } else {
      this.allChecksMore[index][0].ischeck = false
    }
  }
}
