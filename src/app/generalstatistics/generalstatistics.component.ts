import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as GlobalUrl from '../globals'
declare var echarts: any;
@Component({
  selector: 'app-generalstatistics',
  templateUrl: './generalstatistics.component.html',
  styleUrls: ['./generalstatistics.component.css']
})
export class GeneralstatisticsComponent implements OnInit {
    startdate="";
		enddate="";
		startdate1="";
		enddate1="";
	  coloritem:number = 0;
    coloritem1:number = 0;
    item1:number = 0;
    Tuokecount:number = 0;
    progress=30;
    headData:any=[];
    todayChatData=[];
    activeChatData=[];
    echartsData=[];
    TuokeData=[];
    a = [];
		b = [];
	  c= [];
     taskcount:number = 0;
     Activecount:number = 0; 
     Todaycount:number = 0;
     title="本周任务数";
     a1 = [];
		 b1 = [];
	   c1= [];
	   title1="本周拓客数";
    
    weChatList=[];
    wechatidmodel='';
    wechatid='';
//  //获取社交号
//  huoquwectaht:string='http://192.168.1.241:8081/scrm/socialaccount/getAllWeChat';
//  headDataUrl:string='http://192.168.1.241:8081/scrm/overall/getAllOverallMessage';
//  //获取拓客
//  tuokeUrl:string='http://192.168.1.241:8081/scrm/customer/getTaskExtensionTrend';
//  //获取echarts
//  echartsUrl:string="http://192.168.1.241:8081/scrm/overall/getTaskResultTrend";
    
    //获取社交号
    huoquwectaht:string=GlobalUrl.prioductUrl +'socialaccount/getAllWeChat';
    headDataUrl:string=GlobalUrl.prioductUrl +'overall/getAllOverallMessage';
    //获取拓客
    tuokeUrl:string=GlobalUrl.prioductUrl +'customer/getTaskExtensionTrend';
    //获取echarts
    echartsUrl:string=GlobalUrl.prioductUrl +'overall/getTaskResultTrend';
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
           this.tasklist();
           this.tuokelist();
  }
  
      //获取头部底部
      headlist(){
            let formdata3=new FormData();
            formdata3.append('accountId',localStorage.getItem('id'));
            formdata3.append('weChatIds',this.wechatid);
            this.http.post(this.headDataUrl,formdata3).subscribe(response=>{
          	if(response['code']==200){
          		 this.activeChatData=response['data'].weekStatchatList;
          		 this.todayChatData=response['data'].todayStatchatList;
          		 this.headData=response['data'];
           }},error=>{
           	console.log('post请求失败', error)
           })
      }
      //任务统计
     tasklist(){
         let formdata5=new FormData();
         formdata5.append('accountId',localStorage.getItem('id'));
         formdata5.append('startDate',"");
         formdata5.append('endDate',"");
         formdata5.append('weChatIds',this.wechatid);
         this.http.post(this.echartsUrl,formdata5).subscribe(response=>{
      	 if(response['code']==200){
      	 	  this.taskcount=response['data'].taskCount;  
      		  this.echartsData=response['data'].statTaskResultList;  
      		  this.a = [];
						this.b = [];
						this.c= [];
				    for (var i = 0; i < this.echartsData.length; i++) {
				         this.a.push(this.echartsData[i].theDate)
				         this.b.push(this.echartsData[i].successNumber)
				         this.c.push(this.echartsData[i].failedNumber)
				    }
            this.echatstable()
        }},error=>{
       	  console.log('post请求失败', error)
        })
  } 
  //拓客统计
  tuokelist(){
         let formdata6=new FormData();
         formdata6.append('accountId',localStorage.getItem('id'));
         formdata6.append('startDate',"");
         formdata6.append('endDate',"");
         formdata6.append('weChatIds',this.wechatid);
         this.http.post(this.tuokeUrl,formdata6).subscribe(response=>{
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
  //通过微信号切换数据    
  byidchangedata(id){
  	  if(id){
  	  	this.wechatid=id;
		    this.headlist();
        this.tasklist();
        this.tuokelist();
  	  }else{
  	  	this.wechatid='';
	  	  this.headlist();
        this.tasklist();
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
	  echatstable(){
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
                data: this.a
            },
            yAxis: {
                type: 'value'
            },
            series: [
                 {
                    name: '成功数',
                    type: 'line',
                    color: ['#007DCE'],
                    data: this.b
                },
                {
                    name: '失败数',
                    type: 'line',
                    color: ['#98DB8B'],
                    data: this.c
                }
                
            ]
        };
        myChart.setOption(option);
	   }
	   echatstable1(){
          var myChart = echarts.init(document.getElementById('two'));
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
                    name: '拓客成功数', 
                    type: 'line',
                    color: ['#007DCE'],
                    data: this.b1
                },
                {
                    name: '拓客失败数',
                    type: 'line',
                    color: ['#98DB8B'],
                    data: this.c1
                }
                
            ]
        };
        myChart.setOption(option);
	   }
   getTimeClick(value){
   	  this.coloritem = value;
   	  var oDate=new Date();
  		var nowYear = oDate.getFullYear();    //当前年
			var nowMonth = oDate.getMonth();      //当前月
			var monthStartDate = new Date(nowYear, nowMonth, 1);
   	 if(this.coloritem==0){
   	    	this.title="今日任务数"
   	 	    this.startdate=this.formatDate(oDate);
   	 	    this.enddate=this.formatDate(oDate);
  	      console.log("当天开始:"+this.startdate);
  	      console.log("当天结束:"+this.enddate);
  	       this.updateechats();
   	 }else if(this.coloritem==1){
   	 	    this.title="本周任务数"
          this.startdate=this.formatDate(oDate);
   	 	    this.enddate=this.formatDate(oDate);
  	      console.log("近一周开始:"+this.startdate);
  	      console.log("近一周结束:"+this.enddate);
  	       this.updateechats();
   	 }else{
   	 	  this.title="本月任务数"
   	 	   this.startdate=this.formatDate(monthStartDate);
				 this.enddate=this.formatDate(oDate);
	       console.log("本月开始是:"+this.startdate);//本月开始
	       console.log("本月结束是:"+this.enddate);//本月结束
	       this.updateechats();
   	 }
   }
   getTimeClick1(value){
   	  this.coloritem1 = value;
   	  var oDate=new Date();
  		var nowYear = oDate.getFullYear();    //当前年
			var nowMonth = oDate.getMonth();      //当前月
			var monthStartDate = new Date(nowYear, nowMonth, 1);
   	 if(this.coloritem1==0){
   	 	    this.title1="今日拓客数";
  	      this.startdate1=this.formatDate(oDate);
   	 	    this.enddate1=this.formatDate(oDate);
   	 	    this.updateechats1();
  	      console.log("当天开始1:"+this.startdate1);
  	      console.log("当天结束1:"+this.enddate1)
   	 }else if(this.coloritem1==1){
   	 	     this.title1="本周拓客数";
				   this.startdate1=this.formatDate(oDate);
   	 	     this.enddate1=this.formatDate(oDate);
   	 	     this.updateechats1();
  	      console.log("近一周开始1:"+this.startdate1);
  	      console.log("近一周结束1:"+this.enddate1)
   	 }else{
   	 	    this.title1="本月拓客数";
				  this.startdate1=this.formatDate(monthStartDate);
				  this.enddate1=this.formatDate(oDate);
				  this.updateechats1();
	        console.log("本月开始是1:"+this.startdate1);//本月开始
	        console.log("本月结束是1:"+this.enddate1);//本月结束
   	 }
   }
   updateechats(){
	         let formdata1=new FormData();
	         formdata1.append('accountId',localStorage.getItem('id'));
	         formdata1.append('startDate',this.startdate);
	         formdata1.append('endDate',this.enddate);
	         formdata1.append('weChatIds',this.wechatid);
	  	     this.http.post(this.echartsUrl,formdata1).subscribe(response=>{
		       if(response['code']==200){
		         	  this.taskcount=response['data'].taskCount;  
		      		  this.echartsData=response['data'].statTaskResultList; 
		      		  this.a = [];
						    this.b = [];
						    this.c= [];
					      for(var i = 0; i < this.echartsData.length; i++) {
						         this.a.push(this.echartsData[i].theDate)
						         this.b.push(this.echartsData[i].successNumber)
						         this.c.push(this.echartsData[i].failedNumber)
						    }
             this.echatstable()
	        }},error=>{
	       	  console.log('post请求失败', error)
	        })	   
	   }
     updateechats1(){
	  	     let formdata6=new FormData();
	         formdata6.append('accountId',localStorage.getItem('id'));
	         formdata6.append('startDate',this.startdate1);
	         formdata6.append('endDate',this.enddate1);
	         formdata6.append('weChatIds',this.wechatid);
           this.http.post(this.tuokeUrl,formdata6).subscribe(response=>{
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
				    console.log(this.enddate);
				    this.title="指定任务数"
				    this.updateechats();
  }
   getday1(result){
            var oDate = new Date(result[0]);
						var Y = oDate.getFullYear() + '-';
						var M = (oDate.getMonth() + 1 < 10 ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1) + '-';
				    var D = oDate.getDate()<10 ? "0" + oDate.getDate()+ ' ':oDate.getDate()+ ' ';
				    this.startdate1=Y+M+D;
				    console.log(this.startdate1)
				    var oDate1 = new Date(result[1]);
						var Y1 = oDate1.getFullYear() + '-';
						var M1 = (oDate1.getMonth() + 1 < 10 ? '0' + (oDate1.getMonth() + 1) : oDate1.getMonth() + 1) + '-';
				    var D1 = oDate1.getDate()<10 ? "0" + oDate1.getDate()+ ' ':oDate1.getDate()+ ' ';
				    this.enddate1=Y1+M1+D1;
				    this.updateechats1();
				    console.log(this.enddate1);
				     this.title1="指定拓客数"
				    
  }
   

}
