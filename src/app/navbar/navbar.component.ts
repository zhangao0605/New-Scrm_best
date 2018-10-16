import {Component, OnInit} from '@angular/core';
import * as GlobalUrl from "../globals";
import {UploadFile, NzMessageService} from "ng-zorro-antd";
import {NavbarServiceService} from "./navbar-service.service";
import {LoginServiceService} from "../login/login-service.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  /*发送图片返回路径*/
  getimgUrl = GlobalUrl.prioductUrl + 'moment/test1'

  constructor(private NavbarServiceService: NavbarServiceService, private message: NzMessageService, private isUse: LoginServiceService, private route: Router, private http: HttpClient) {
  }

  errormessage;

  /*全局提示*/
  createMessage(type: string): void {
    this.message.create(type, `` + this.errormessage + ``);
  }

  private accountId = 123
  /*原密码*/
  oldpassword = ''
  /*新密码*/
  newpassword = ''
  /*确认密码*/
  surepassword = ''
  editdata_hidden: boolean = true
  editpassword_hidden: boolean = true
  data_name = ''
  data_tel = ''
  data_email = ''
  data_wx = ''
  isOperating = true
  /*查询用户个人信息*/
  getAllAnnouncemntByStatu = GlobalUrl.prioductUrl + 'account/getAccountById'
  /*根据id修改当前登录用户自己的个人信息*/
  updateAccountByAccountId = GlobalUrl.prioductUrl + 'account/updateAccountByAccountId'
  /*根据id修改当前登录用户自己的个密码*/
  modifyPassword = GlobalUrl.prioductUrl + 'account/modifyPassword'
  /*session*/
  isExistSession = GlobalUrl.prioductUrl + 'account/isExistSession'
  /*注销服务*/
  loginout = GlobalUrl.prioductUrl + 'account/loginout'
  /*人员权限验证*/
  getPermission = GlobalUrl.prioductUrl + 'account/getPermission'

  getInfo() {
    let data = new FormData()
    let id = localStorage.getItem('id')
    if (id === '' || id === null || id === undefined) {

    } else {
      data.append('id', '' + id + '')
      this.NavbarServiceService.getCustomerdata(this.getAllAnnouncemntByStatu, data, 1, 'save', this)
    }
  }

  ngOnInit() {
    this.http.post(this.isExistSession, '')
      .subscribe(
        val => {
          if (val['code'] === 200 && val['data'].sessionId != '') {
            this.getInfo()
            let data1 = new FormData()
            let id = localStorage.getItem('id')
            data1.append('accountId', '' + id + '')
            this.NavbarServiceService.getCustomerdata(this.getPermission, data1, -1, 'save', this)
          } else {
            this.errormessage = '登录超时，请登录！'
            this.createMessage('warning')
            localStorage.removeItem('id')
            this.route.navigate(['/login'])
          }
        },
        error => {
          this.errormessage = '登录超时，请登录！'
          this.createMessage('warning')
          localStorage.removeItem('id')
          this.route.navigate(['/login'])
        }
      );

  }

  userIn = {
    "aeskey": "",
    "createTime": "",
    "deviceright": "",
    "email": "",
    "id": 0,
    "nickname": "",
    "parentId": 0,
    "password": "",
    "phone": "",
    "profilePhoto": "",
    "remark": " ",
    "roleId": 5,
    "roleName": " ",
    "status": 1,
    "type": "",
    "username": " ",
    "userright": "",
    "wechat": ""
  }
  NaIs_0 = false
  NaIs_0_0 = false

  NaIs_1 = false
  NaIs_1_0 = false
  NaIs_1_1 = false
  NaIs_1_2 = false

  NaIs_2 = false

  NaIs_3 = false
  NaIs_3_0 = false
  NaIs_3_1 = false
  NaIs_3_2 = false
  NaIs_3_3 = false

  NaIs_4 = false
  NaIs_4_0 = false
  NaIs_4_1 = false
  NaIs_4_2 = false


  NaIs_5 = false
  NaIs_5_0 = false
  NaIs_5_1 = false
  NaIs_5_2 = false
  NaIs_5_3 = false
  NaIs_5_4 = false
  NaIs_5_5 = false

  NaIs_6 = false
  NaIs_6_0 = false
  NaIs_6_1 = false
  NaIs_6_2 = false
  NaIs_6_3 = false

  NaIs_7 = false
  NaIs_7_0 = false
  NaIs_7_1 = false
  NaIs_7_2 = false
  NaIs_7_3 = false
  NaIs_7_4 = false

  NaIs_8 = false
  NaIs_8_0 = false

  NaIs_9 = false

  NaData(e) {
    this.NaIs_0 = e[0].whetherExist
    this.NaIs_0_0 = e[0].whetherExist

    this.NaIs_1 = e[1].whetherExist
    this.NaIs_1_0 = e[1].children[0].whetherExist
    this.NaIs_1_1 = e[1].children[1].whetherExist
    this.NaIs_1_2 = e[1].children[2].whetherExist

    this.NaIs_2 = e[2].whetherExist

    this.NaIs_3 = e[3].whetherExist
    this.NaIs_3_0 = e[3].children[0].whetherExist
    this.NaIs_3_1 = e[3].children[1].whetherExist
    this.NaIs_3_2 = e[3].children[2].whetherExist
    this.NaIs_3_3 = e[3].children[3].whetherExist

    this.NaIs_4 = e[4].whetherExist
    this.NaIs_4_0 = e[4].children[0].whetherExist
    this.NaIs_4_1 = e[4].children[1].whetherExist
    this.NaIs_4_2 = e[4].children[2].whetherExist


    this.NaIs_5 = e[5].whetherExist
    this.NaIs_5_0 = e[5].children[0].whetherExist
    this.NaIs_5_1 = e[5].children[1].whetherExist
    this.NaIs_5_2 = e[5].children[2].whetherExist
    this.NaIs_5_3 = e[5].children[3].whetherExist
    this.NaIs_5_4 = e[5].children[4].whetherExist
    this.NaIs_5_5 = e[5].children[5].whetherExist

    this.NaIs_6 = e[6].whetherExist
    this.NaIs_6_0 = e[6].children[0].whetherExist
    this.NaIs_6_1 = e[6].children[1].whetherExist
    this.NaIs_6_2 = e[6].children[2].whetherExist
    this.NaIs_6_3 = e[6].children[3].whetherExist

    this.NaIs_7 = e[7].whetherExist
    this.NaIs_7_0 = e[7].children[0].whetherExist
    this.NaIs_7_1 = e[7].children[1].whetherExist
    this.NaIs_7_2 = e[7].children[2].whetherExist
    this.NaIs_7_3 = e[7].children[3].whetherExist
    this.NaIs_7_4 = e[7].children[4].whetherExist

    this.NaIs_8 = e[8].whetherExist
    this.NaIs_8_0 = e[8].whetherExist

    this.NaIs_9 = e[9].whetherExist
  }

  postOk(val, flag, distinguish) {
    if (distinguish === 1) {
      this.userIn = val.data
      this.data_name = val.data.username
      this.data_tel = val.data.phone
      this.data_email = val.data.email
      this.data_wx = val.data.wechat
      // this.previewImage1 = 'http://' + window.location.host +val.data.profilePhoto;
      this.previewImage1 = 'http://192.168.1.241:8081/'+val.data.profilePhoto;
      this.fileList_image.push({
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: val.data.profilePhoto,
      })
    } else if (distinguish === 2) {
      this.editdata_hidden = true;
      this.isOperating = true;
      let data1 = new FormData()
      data1.append('id', '28')
      this.NavbarServiceService.getCustomerdata(this.getAllAnnouncemntByStatu, data1, 1, 'save', this)
    } else if (distinguish === 3) {
      if (val.count === 501) {
        this.errormessage = '用户权限不足，密码修改失败'
        this.createMessage('error')
      } else if (val.countt === 201) {
        this.errormessage = '密码修改失败'
        this.createMessage('error')
      }
      else if (val.count === 500) {
        this.errormessage = '原密码错误，密码修改失败'
        this.createMessage('error')
      } else {
        this.errormessage = '密码修改成功'
        this.createMessage('success')
        this.oldpassword = ''
        this.newpassword = ''
        this.editpassword_hidden = true;
        this.isOperating = true;
      }

    } else if (distinguish === 4) {
      if (val.data.sessionId === '') {
        this.errormessage = '登录超时，请重新登录'
        this.createMessage('warning')
        this.route.navigate(['/login'])
        this.oldpassword = ''
        this.newpassword = ''
      } else {
        if (this.newpassword === '' || this.surepassword === '' || this.oldpassword === '') {
          this.errormessage = '三个字段为必填项不能为空'
          this.createMessage('warning')
        } else {
          if (this.newpassword === this.surepassword) {
            let data = new FormData()
            data.append('oldPassword', '' + this.oldpassword + '')
            data.append('newPassword', '' + this.newpassword + '')
            data.append('username', '' + this.data_name + '')
            // this.previewImage1 = val.data.profilePhoto
            this.NavbarServiceService.getCustomerdata(this.modifyPassword, data, 3, 'save', this)
          } else {
            this.errormessage = '新密码与确认密码不符请重新输入'
            this.createMessage('warning')
          }
        }
      }
    } else if (distinguish === 5) {
      localStorage.removeItem('id')
      this.route.navigate(['/login'])
    } else if (distinguish === -1) {
      this.NaData(val.data.authorityList)
    }
  }

  postOther(val, flag, distinguish) {
    if (distinguish === 4) {
      this.editpassword_hidden = true;
      this.isOperating = true;
      this.errormessage = '登录超时，请重新登录'
      this.createMessage('warning')
      this.route.navigate(['/login'])
      this.oldpassword = ''
      this.newpassword = ''
    }
  }

  /*修改密码*/
  editpassword(): void {
    this.editpassword_hidden = false;
    this.isOperating = false;
  }

  /*修改密码关闭*/
  editpasclose(): void {
    this.editpassword_hidden = true;
    this.isOperating = true;
  }

  /*修改密码提交*/
  editpassure(): void {
    // modifyPassword
    this.NavbarServiceService.getCustomerdata(this.isExistSession, '', 4, 'save', this)

  }

  /*修改资料*/
  editdata(): void {
    this.editdata_hidden = false;
    this.isOperating = false;
    let data = new FormData()
    data.append('id', '28')
    this.NavbarServiceService.getCustomerdata(this.getAllAnnouncemntByStatu, data, 1, 'save', this)
  }

  /*修改资料关闭*/
  editdataclose(): void {
    this.editdata_hidden = true;
    this.isOperating = true;
  }

  /*修改资料提交*/
  editdatasure(): void {
    // updateAccountByAccountId
    let data = new FormData()
    console.log(this.fileList_image)
    if (this.fileList_image[0].uid == -1) {
      data.append('profilePhoto', '' + this.previewImage1 + '')
    } else {
      this.fileList_image.forEach((file) => {
        data.append('file', file.originFileObj)
      })
    }
    data.append('accountId', '28')
    data.append('email', '' + this.data_email + '')
    data.append('nickname', '' + this.data_name + '')
    data.append('phone', '' + this.data_tel + '')
    data.append('wechat', '' + this.data_wx + '')
    this.NavbarServiceService.getCustomerdata(this.updateAccountByAccountId, data, 2, 'save', this)


  }

  /*新增图片*/
  beforeUpload_image = (file: UploadFile): boolean => {
    const isxls1 = file.type === "image/jpeg";
    const isxls2 = file.type === "image/png";
    const isxls3 = file.type === "image/jpg";

    if (isxls1 || isxls2 || isxls3) {
      return true

    } else {
      this.errormessage = '图片格式不支持，请上传 jpg，png，jpeg'
      this.createMessage('warning')
      return false
    }
  }
  /*删除单张相片*/
  RemoveUpload_image = (file: UploadFile): boolean => {
    this.fileList_image = [];
    return true
  }
  previewImageList = [];
  fileList_image = []
  handlePreview_image = (file: UploadFile) => {
    this.fileList_image.length = 1
    this.previewImage1 = file.url || file.thumbUrl;
    this.previewVisible = true;
  }
  previewVisible = false;
  previewImage1 = ''

  openMap = {
    sub1: false,
    sub2: false,
    sub3: false,
    sub4: false,
    sub5: false,
    sub6: false,
    sub7: false,
    sub8: false,
    sub9: false,
    sub10: false,
  };

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }

  /*注销服务*/
  Logout() {
    this.NavbarServiceService.getCustomerdata(this.loginout, '', 5, 'save', this)
  }
}
