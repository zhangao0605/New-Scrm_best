import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
declare var echarts: any;

import * as GlobalUrl from '../globals'
@Component({
  selector: 'app-marketstatistics',
  templateUrl: './marketstatistics.component.html',
  styleUrls: ['./marketstatistics.component.css']
})
export class MarketstatisticsComponent implements OnInit {
   
  startdate="";
  enddate="";
  coloritem:number = 0;
  zongadd:number = 0;
  Tuokecount:number=0;
  kehuData=[];
  headData:any=[];
  footData:any=[];
  TuokeData=[];
  groupcount:number = 0;
  a1 = [];
	b1 = [];
	c1= [];
	title1="本周拓客数";
  //获取社交号
  huoquwectaht:string=GlobalUrl.prioductUrl +'socialaccount/getAllWeChat';
  weChatList=[];
  wechatidmodel='';
  wechatid='';
  //获取头部数据
  getHeadUrl: string =GlobalUrl.prioductUrl +'customer/getOperateMessage';
  
  //拓客
  tuokelistUrl:string= GlobalUrl.prioductUrl +'customer/getTaskExtensionTrend';
 
  constructor(private http: HttpClient) { }

  ngOnInit() {
  	      //获取微信号
           let formdata1=new FormData();
           formdata1.append('accountId',localStorage.getItem('id'));
           this.http.post(this.huoquwectaht,formdata1).subscribe(response=>{
          	if(response['code']==200){
          		this.weChatList=response['data'].weChats;
          		console.log(this.weChatList)
           }},error=>{
           	  console.log('post请求失败', error)
           })
          this.headlist();
          this.tuokelist();
  }
  tuokelist(){
  	     //拓客统计
         let formdata6=new FormData();
         formdata6.append('accountId',localStorage.getItem('id'));
         formdata6.append('startDate',"");
         formdata6.append('endDate',"");
         formdata6.append('weChatIds',this.wechatid);
         this.http.post(this.tuokelistUrl,formdata6).subscribe(response=>{
      	 if(response['code']==200){
      	 	  this.Tuokecount=response['data'].statExtensionCount;  
      		  this.TuokeData=response['data'].statExtensionList;
      		  this.a1 = [];
						this.b1 = [];
						this.c1= [];
				    for (var i = 0; i < this.TuokeData.length; i++) {
				         this.a1.push(this.TuokeData[i].theDate)
				         this.b1.push(this.TuokeData[i].successNumber)
				         this.c1.push(this.TuokeData[i].failedNumber)
				    }
            this.echatstable1()
        }},error=>{
       	  console.log('post请求失败', error)
        })
  }
  headlist(){
  	       //头部请求获取数量
           let formdata1=new FormData();
           formdata1.append('accountId',localStorage.getItem('id'));
           formdata1.append('weChatIds',this.wechatid);
           this.http.post(this.getHeadUrl,formdata1).subscribe(response=>{
          	if(response['code']==200){
          		this.headData=response['data'];
          		this.kehuData=response['data'].friendList;
          		console.log(this.headData)
           }},error=>{
           	  console.log('post请求失败', error)
           })
  }
    //通过微信号切换数据    
  byidchangedata(id){
  	  if(id){
  	  	this.wechatid=id;
		    this.headlist();
        this.tuokelist();
  	  }else{
  	  	this.wechatid='';
	  	  this.headlist();
        this.tuokelist();
  	  }
  }
	  
	  formatDate(date) {
			    var myyear = date.getFullYear();
			    var mymonth = date.getMonth() + 1;
			    var myweekday = date.getDate();
			
			    if (mymonth < 10) {
			        mymonth = "0" + mymonth;
			    }
			    if (myweekday < 10) {
			        myweekday = "0" + myweekday;
			    }
			    return (myyear + "-" + mymonth + "-" + myweekday);
	 }
	   echatstable1(){
          var myChart = echarts.init(document.getElementById('one'));
          var option= {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.a1
            },
            yAxis: {
                type: 'value'
            },
            series: [
                 {
                    name: '拓客总数', 
                    type: 'line',
                    color: ['#007DCE'],
                    data: this.b1
                },
                {
                    name: '拓客成功数',
                    type: 'line',
                    color: ['#98DB8B'],
                    data: this.c1
                }
                
            ]
        };
        myChart.setOption(option);
	   }
	   updateechats1(){
	         let formdata1=new FormData();
	         formdata1.append('accountId',localStorage.getItem('id'));
	         formdata1.append('startDate',this.startdate);
	         formdata1.append('endDate',this.enddate);
	         formdata1.append('weChatIds',this.wechatid);
	  	     this.http.post(this.tuokelistUrl,formdata1).subscribe(response=>{
		       if(response['code']==200){
		          this.Tuokecount=response['data'].statExtensionCount;  
	      		  this.TuokeData=response['data'].statExtensionList;
	      		  this.a1 = [];
							this.b1 = [];
							this.c1= [];
				      for(var i = 0; i < this.TuokeData.length; i++) {
				         this.a1.push(this.TuokeData[i].theDate)
				         this.b1.push(this.TuokeData[i].successNumber)
				         this.c1.push(this.TuokeData[i].failedNumber)
				     }
             this.echatstable1();
	        }},error=>{
	       	  console.log('post请求失败', error)
	        })
	   }
 
	  getTimeClick(value){
   	  this.coloritem = value;
   	  var oDate=new Date();
  		var nowYear = oDate.getFullYear();    //当前年
			var nowMonth = oDate.getMonth();      //当前月
			var monthStartDate = new Date(nowYear, nowMonth, 1);
   	 if(this.coloritem==0){
   	 	    this.title1="今日拓客数";
   	 	    this.startdate=this.formatDate(oDate);
   	 	    this.enddate=this.formatDate(oDate);
   	 	    this.updateechats1();
  	      console.log("当天开始:"+this.startdate);
  	      console.log("当天结束:"+this.enddate)
   	 }else if(this.coloritem==1){
   	 	    this.title1="本周拓客数";
          this.startdate=this.formatDate(oDate);
   	 	    this.enddate=this.formatDate(oDate);
   	 	    this.updateechats1();
  	      console.log("近一周开始:"+this.startdate);
  	      console.log("近一周结束:"+this.enddate)
   	 }else{
   	 	   this.title1="本月拓客数";
   	 	   this.startdate=this.formatDate(monthStartDate);
				 this.enddate=this.formatDate(oDate);
				 this.updateechats1();
	       console.log("本月开始是:"+this.startdate);//本月开始
	       console.log("本月结束是:"+this.enddate);//本月结束
   	 }
   }
  getday(result){
            var oDate = new Date(result[0]);
						var Y = oDate.getFullYear() + '-';
						var M = (oDate.getMonth() + 1 < 10 ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1) + '-';
				    var D = oDate.getDate()<10 ? "0" + oDate.getDate()+ ' ':oDate.getDate()+ ' ';
				    this.startdate=Y+M+D;
				    console.log(this.startdate)
				    var oDate1 = new Date(result[1]);
						var Y1 = oDate1.getFullYear() + '-';
						var M1 = (oDate1.getMonth() + 1 < 10 ? '0' + (oDate1.getMonth() + 1) : oDate1.getMonth() + 1) + '-';
				    var D1 = oDate1.getDate()<10 ? "0" + oDate1.getDate()+ ' ':oDate1.getDate()+ ' ';
				    this.enddate=Y1+M1+D1;
				    this.updateechats1();
				    this.title1="指定拓客数";
				    console.log(this.enddate);
  }
}
