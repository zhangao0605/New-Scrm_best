import {Component, Injectable, OnInit} from '@angular/core';
import {HomeserviveService} from "./homeservive.service";
import {HttpClient} from "@angular/common/http";
import * as GlobalUrl from "../globals";
import {NzMessageService} from 'ng-zorro-antd'
import {NavbarComponent} from "../navbar/navbar.component"
import {Router} from "@angular/router";
import * as $ from "jquery"
declare var echarts: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedValue = 'lucy';
  isShow: boolean = false
  reqsuccess: boolean;
  reqsuccessMsg: string;
  /*头部四个*/
  titleData = {
    "activeCount": 0,
    "onlineCount": 0,
    "offlineCount": 0,
    "friendCount": 0,
    "chatroomCount": 0,
    "newChatroomCount": 0,
    "taskTodayCount": 0,
    "failedTaskCount": 0,
    "todayMessageCount": 0,
    "chatCount": 0,
    "unReadMessageCount": 0,
    "statRegionalList": [],
    "affichelist": [],
    "newFriendCount": 0
  }
  announcement = []

  constructor(private homeService: HomeserviveService, private http: HttpClient, private message: NzMessageService, private router: Router, private nav: NavbarComponent) {
  }

  errormessage;

  /*全局提示*/
  createMessage(type: string): void {
    this.message.create(type, `` + this.errormessage + ``);
  }
  /*文章章节记录*/
  chapter: number = 1
  /*文章篇数*/
  Total_number: number = 1

  showdetails(e, q) {
    this.chapter = q
    const data = new FormData()
    data.append('id', '' + e + '')
    this.homeService.httpGetTitleData(this.getAfficheById, data, 5, 'save', this)
  }
  showdetails_false() {
    this.isShow = false
  }

  getMapUrl: string = GlobalUrl.prioductUrl + 'stat/contactInChinaDetails'
  // titleUrl = GlobalUrl.prioductUrl + 'stat/getStatByAccountId'
  // statistics_rightUrl = GlobalUrl.prioductUrl + 'stat/getContactActiveByAccountId'
  // statistics_leftUrl = GlobalUrl.prioductUrl + 'stat/getStatTaskAndDevice'
  /*根据accountId查询已发布的新闻*/
  getAllAnnouncemntByStatu = GlobalUrl.prioductUrl + 'affiche/getAllAfficheByStatus'
  /*根据Id查询新闻详细*/
  getAfficheById = GlobalUrl.prioductUrl + 'affiche/getAfficheById'
  /*新闻上一篇下一篇*/
  getAfficheByIndex = GlobalUrl.prioductUrl + 'affiche/getAfficheByIndex'
  /*获取当前登录用户的所有微信号*/
  getAllWeChat = GlobalUrl.prioductUrl + 'socialaccount/getAllWeChat'
  /*根据微信切换数据*/
  getHomePageMessage = GlobalUrl.prioductUrl + 'overall/getHomePageMessage'

  getTitleInfo = new FormData()
  accountId;

  ngOnInit() {
    this.accountId = localStorage.getItem('id')
    this.getTitleInfo.append('accountId', '' + this.accountId + '')
    let data = new FormData()
    data.append('weChatIds', '')
    data.append('accountId', '' + this.accountId + '')
    this.homeService.httpGetTitleData(this.getHomePageMessage, data, 1, 'save', this)
    this.homeService.httpGetTitleData(this.getAllAnnouncemntByStatu, this.getTitleInfo, 4, 'save', this)
    this.homeService.httpGetTitleData(this.getAllWeChat, this.getTitleInfo, 7, 'save', this)
    this.homeService.httpGetTitleData(this.getMapUrl, this.getTitleInfo, 11, 'save', this)

  }

  Announcement_details = {
    "abstracts": " ",
    "accountId": 1,
    "addTime": " ",
    "addTimeString": " ",
    "author": " ",
    "content": " ",
    "id": 0,
    "releaseTime": " ",
    "releaseTimeString": " ",
    "status": 1,
    "title": " "
  }

  postOk(val, flag, distinguish) {
    if (distinguish === 1) {
      this.titleData = val.data
      let myEchat = echarts.init(document.getElementById('home_body_map_all_one'))
      let chartOption = {
        x: 'top',
        y: 'top',
        tooltip: {
          trigger: 'item',
          axisPointer: {
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        geo: {
          map: 'china',
          roam: false,
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: 'red'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        dataRange: {
          orient: 'vertical',
          min: 0,
          max: val['data'].statRegionalMax,
          // text:['高','低'],           // 文本，默认为数值文本
          splitNumber: 0,
          color: ['red', '#ffffff']
        },
        series: [
          {
            name: '全国客户分布',
            type: 'map',
            mapType: 'china',
            mapLocation: {
              x: 'left'
            },
            selectedMode: 'multiple',
            itemStyle: {
              normal: {
                label: {show: true},
                borderWidth: 1,//省份的边框宽度
                borderColor: '#00000000',//省份的边框颜色
                color: 'red',//地图背景颜色
                areaStyle: {color: 'red'}//设置地图颜色
              },
              emphasis: {areaColor: '#FF8282'}
            },
            data: val['data'].statRegionalList
          }
        ],
        animation: false
      }
      myEchat.setOption(chartOption)
    } else if (distinguish === 4) {
      this.announcement = val.data.afficheList
      this.Total_number = val.data.afficheCount
    } else if (distinguish === 5) {
      this.Announcement_details = val.data
      this.isShow = true
    } else if (distinguish === 6) {
      this.Announcement_details = val.data.afficheList[0]
    } else if (distinguish === 7) {
      this.gcchat = val.data.weChats
      for (let a of this.gcchat) {
        a.ischeckd = true
      }
      console.log(this.gcchat)
    } else if (distinguish === 8) {

    } else if (distinguish === 9) {
      console.log(val.data)
    }
  }

  postErr(val, flag, distinguish) {
    this.reqsuccess = false;
    this.reqsuccessMsg = val['msg'];
  }

  InterceptionTime(e) {
    let a = ''
    a = e.slice(0, 10)
    return a
  }

  select_chatIs = 0;
  isOperating: boolean = true;
  gcchat;
  select_chat: boolean = true;
  select_chatId_Change;

  select_chat_show(): void {
    this.isOperating = false
    this.select_chat = false
    this.select_chatIs = 1
  }

  /*选择相关微信号*/
  MultiSelectWeChat(value: Number[]): void {
    this.select_chatId_Change = value;
  }

  /*确认选择微信号*/
  select_chat_sure(): void {
    if (this.select_chatId_Change <= 0) {
      this.errormessage = '请选择相关微信号'
      this.createMessage('warning')
    } else {
      this.isOperating = true
      this.select_chat = true
      this.select_chatIs = 0
      // getHomePageMessage
      let data = new FormData()
      data.append('accountId', '' + this.accountId + '')
      data.append('weChatIds', '' + this.select_chatId_Change + '')
      this.homeService.httpGetTitleData(this.getHomePageMessage, data, 1, 'save', this)
    }

  }

  /*上一篇*/
  Previous() {
    // getAfficheByIndex
    if (this.chapter <= 1) {
      this.errormessage = '当前公告已是第一条'
      this.createMessage('warning')
    } else {
      this.chapter--
      if (this.chapter < 1) {
        this.errormessage = '当前公告已是第一条'
        this.createMessage('warning')
        this.chapter = 1
      } else {
        let data = new FormData()
        data.append('accountId', '' + this.accountId + '')
        data.append('index', '' + this.chapter + '')
        this.homeService.httpGetTitleData(this.getAfficheByIndex, data, 6, 'save', this)
      }
    }
  }

  /*下一篇*/
  Next() {
    if (this.chapter >= this.Total_number) {
      this.errormessage = '当前公告已是最后一条'
      this.createMessage('warning')
    } else {
      this.chapter++
      if (this.chapter > this.Total_number) {
        this.errormessage = '当前公告已是最后一条'
        this.createMessage('warning')
        this.chapter = this.Total_number
      } else {
        let data = new FormData()
        data.append('accountId', '' + this.accountId + '')
        data.append('index', '' + this.chapter + '')
        this.homeService.httpGetTitleData(this.getAfficheByIndex, data, 6, 'save', this)
      }
    }

  }
}
