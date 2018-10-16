import {Component, OnInit} from '@angular/core';
import {LoginServiceService} from "./login-service.service";
import {Router} from "@angular/router";
import * as GlobalUrl from "../globals";
import {NzMessageService} from 'ng-zorro-antd'
import {NavbarComponent} from "../navbar/navbar.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private getLoginInfo: LoginServiceService, private route: Router, private message: NzMessageService, private nav: NavbarComponent) {
  }

  /*提示消息*/

  createMessages = ''

  createMessage(type: string): void {
    this.message.create(type, `` + this.createMessages + ``);
  }

  /*登录验证*/
  loginUrl = GlobalUrl.prioductUrl + 'account/login'
  /*人员权限验证*/
  getPermission = GlobalUrl.prioductUrl + 'account/getPermission'
  username = ''
  password = ''
  isremember = true
  data_1;

  ngOnInit() {
    if (localStorage.getItem('remember') === null || localStorage.getItem('remember') === undefined || localStorage.getItem('remember') === 'false' || localStorage.getItem('remember') === '') {
      this.username = ''
      this.password = ''
    } else {
      this.username = localStorage.getItem('name')
      this.password = localStorage.getItem('pas')
      if (this.username === '' || this.username === undefined || this.password === '' || this.password === undefined) {
        this.username = ''
        this.password = ''
      }
    }
  }

  login() {

    if (this.username === '' || this.password === '') {
      this.createMessages = '用户名与密码为必填项，请输入完整！'
      this.createMessage('error')
    } else {
      let data = new FormData()
      data.append('username', '' + this.username + '')
      data.append('password', '' + this.password + '')

      this.getLoginInfo.getLoginInfo(this.loginUrl, data, 1, 'save', this)

    }
  }

  postOk(val, flag, distinguish) {
    if (distinguish === 1) {
      if (val.count === 200) {
        let data1 = new FormData()
        data1.append('accountId', ''+val.data.userId+'')
        this.data_1 = val.data
        localStorage.setItem("id", '' + val.data.userId + '');
        if (this.isremember === true) {
          localStorage.removeItem('name');
          localStorage.removeItem('pas');
          localStorage.removeItem('remember');
          localStorage.setItem("name", '' + this.username + '');
          localStorage.setItem("pas", '' + this.password + '');
          localStorage.setItem("remember", 'true');
          this.getLoginInfo.getLoginInfo(this.getPermission, data1, 2, 'save', this)
        } else {
          localStorage.removeItem('name');
          localStorage.removeItem('pas');
          localStorage.removeItem('remember');
          this.getLoginInfo.getLoginInfo(this.getPermission, data1, 2, 'save', this)
        }
      } else {
        this.createMessages = val.msg
        this.createMessage('error')
      }

    } else if (distinguish === 2) {
      this.nav.NaData(val.data.authorityList)
      this.nav.getInfo()
      this.route.navigate(['/home'])
    }
  }

  postOk_other(val, flag, distinguish) {
    if (distinguish === 1) {
      this.createMessages = val.msg
      this.createMessage('error')
    }
  }
}
