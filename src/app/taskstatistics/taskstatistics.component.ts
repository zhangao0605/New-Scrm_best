import { Component, OnInit } from '@angular/core';
declare var echarts: any;
import {HttpClient} from "@angular/common/http";
import * as GlobalUrl from '../globals'
@Component({
  selector: 'app-taskstatistics',
  templateUrl: './taskstatistics.component.html',
  styleUrls: ['./taskstatistics.component.css']
})
export class TaskstatisticsComponent implements OnInit {
		 startdate="";
		 enddate="";
		 startdate1="";
		 enddate1="";
	   coloritem:number = 0;
     coloritem1:number = 0;
     item1:number = 0;
     taskData=[];
     succlv="";
      a = [];
			b = [];
		  c= [];
		  a1 = [];
			b1 = [];
		  c1= [];
		  d1=[];
		  echartsData=[];
		  echartsData1=[];
		  title="本周任务数";
		  title1="本周任务监测";
		  taskcount:number = 0;
      //获取任务echarts
      echartsUrl:string=GlobalUrl.prioductUrl +'overall/getTaskResultTrend';
      
      //获取社交号
	    huoquwectaht:string=GlobalUrl.prioductUrl +'socialaccount/getAllWeChat';
	    
	    weChatList=[];
      wechatidmodel='';
      wechatid='';
      //获取头部数据
	    headUrl:string=GlobalUrl.prioductUrl +'statresource/getTaskMessage';
	    
	    headData:any=[];
     //获取任务检测
	    taskstatistical:string=GlobalUrl.prioductUrl +'statresource/getIsExecuteMessage';
	    
	    taskstatisticalCount:number = 0;
	    
     constructor(private http: HttpClient) { }

  ngOnInit() {
	         //获取微信号
           let formdata2=new FormData();
           formdata2.append('accountId',localStorage.getItem('id'));
           this.http.post(this.huoquwectaht,formdata2).subscribe(response=>{
          	if(response['code']==200){
          		this.weChatList=response['data'].weChats;
          		console.log(this.weChatList)
           }},error=>{
           	  console.log('post请求失败', error)
           })
          this.headlist();
          this.alltasklist();
          this.jiancelist();  
  }
  jiancelist(){
  	       //任务检测
           let formdata6=new FormData();
	         formdata6.append('accountId',localStorage.getItem('id'));
	         formdata6.append('startDate',"");
	         formdata6.append('endDate',"");
	         formdata6.append('weChatIds',this.wechatid);
           this.http.post(this.taskstatistical,formdata6).subscribe(response=>{
	      	 if(response['code']==200){ 
	      	  	this.taskstatisticalCount=response['data'].taskPalnCount;
	      		  this.echartsData1=response['data'].statTaskPlanList;  
	      		  this.a1 = [];
						  this.b1= [];
						  this.c1= [];
						  this.d1=[];
					    for (var i = 0; i < this.echartsData1.length; i++) {
					         this.a1.push(this.echartsData1[i].theDate);
					         this.b1.push(this.echartsData1[i].total);
					         this.c1.push(this.echartsData1[i].enabledNumber);
					         this.d1.push(this.echartsData1[i].unenabledNumber);
					    }
	            this.echatstable1()
	        }},error=>{
	       	  console.log('post请求失败', error)
	        })
  }
  headlist(){
  	       //获取头部数据
           let formdata1=new FormData();
           formdata1.append('accountId',localStorage.getItem('id'));
           formdata1.append('weChatIds',this.wechatid);
           this.http.post(this.headUrl,formdata1).subscribe(response=>{
          	if(response['code']==200){
          		this.headData=response['data'];
          		this.taskData=response['data'].statTaskAllList;
          		console.log(this.headData)
           }},error=>{
           	  console.log('post请求失败', error)
           })
  }
  alltasklist(){
  	       //任务总数
           let formdata5=new FormData();
	         formdata5.append('accountId',localStorage.getItem('id'));
	         formdata5.append('startDate',"");
	         formdata5.append('endDate',"");
	         formdata5.append('weChatIds',this.wechatid);
           this.http.post(this.echartsUrl,formdata5).subscribe(response=>{
      	   if(response['code']==200){
      	 	  this.taskcount=response['data'].taskCount;  
      		  this.echartsData=response['data'].statTaskResultList;
      		  this.a= [];
						this.b= [];
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
   //通过微信号切换数据    
  byidchangedata(id){
  	  if(id){
  	  	this.wechatid=id;
		    this.headlist();
        this.alltasklist();
        this.jiancelist();
  	  }else{
  	  	this.wechatid='';
	  	  this.headlist();
        this.alltasklist();
        this.jiancelist();
  	  }
  }
  //本周任务
	 echatstable(){
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
	 //本周检测
	 echatstable1(){
     var myChart = echarts.init(document.getElementById('one'));
     var option = {
       tooltip: {
                trigger: 'axis'
       },
      xAxis : {
          data : this.a1
      },
      yAxis : {
          type : 'value'
      },
      series : [
          {
              name:'总任务数',
              type:'bar',
              data:this.b1,
              color: ['#2BA9EB']
          },
          {
              name:'任务成功数',
              type:'bar',
              data:this.c1,
              color: ['#90D883']
          },
          {
              name:'任务失败数',
              type:'bar',
              data:this.d1,
              color: ['#FFD878']
          }
         
      ]
   };
     myChart.setOption(option);
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
				    console.log(this.enddate)
				     this.title="指定任务数";
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
				    this.title1="指定任务监测";
				    console.log(this.enddate1);
				    
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
   getTimeClick(value){
   	  this.coloritem = value;
   	  var oDate=new Date();
  		var nowYear = oDate.getFullYear();    //当前年
			var nowMonth = oDate.getMonth();      //当前月
			var monthStartDate = new Date(nowYear, nowMonth, 1);
   	 if(this.coloritem==0){
   	 	    console.log("当天开始:"+this.startdate);
  	      console.log("当天结束:"+this.enddate);
  	      this.title="今日任务数";
   	 	    this.startdate=this.formatDate(oDate);
   	 	    this.enddate=this.formatDate(oDate);
  	      this.updateechats();
   	 }else if(this.coloritem==1){
   	 	    console.log("近一周开始:"+this.startdate);
  	      console.log("近一周结束:"+this.enddate);
  	      this.title="本周任务数";
          this.startdate=this.formatDate(oDate);
   	 	    this.enddate=this.formatDate(oDate);
  	      this.updateechats();
   	 }else{
   	 	   console.log("本月开始是:"+this.startdate);//本月开始
	       console.log("本月结束是:"+this.enddate);//本月结束
	        this.title="本月任务数";
   	 	   this.startdate=this.formatDate(monthStartDate);
				 this.enddate=this.formatDate(oDate);
	       this.updateechats();
   	 }
   }
    updateechats(){
	  	     let formdata5=new FormData();
	         formdata5.append('accountId',localStorage.getItem('id'));
	         formdata5.append('startDate',this.startdate);
	         formdata5.append('endDate',this.enddate);
	         formdata5.append('weChatIds',this.wechatid);
           this.http.post(this.echartsUrl,formdata5).subscribe(response=>{
      	   if(response['code']==200){
      	 	  this.taskcount=response['data'].taskCount;  
      		  this.echartsData=response['data'].statTaskResultList; 
      		  this.a=[];
      		  this.b=[];
      		  this.c=[];
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
           this.http.post(this.taskstatistical,formdata6).subscribe(response=>{
	      	 if(response['code']==200){ 
	      	 	  this.taskstatisticalCount=response['data'].taskPalnCount;
	      		  this.echartsData1=response['data'].statTaskPlanList;
	      		  this.a1 = [];
						  this.b1= [];
						  this.c1= [];
						  this.d1=[];
					    for (var i = 0; i < this.echartsData1.length; i++) {
					         this.a1.push(this.echartsData1[i].theDate);
					         this.b1.push(this.echartsData1[i].total);
					         this.c1.push(this.echartsData1[i].enabledNumber);
					         this.d1.push(this.echartsData1[i].unenabledNumber);
					    }
	            this.echatstable1()
	        }},error=>{
	       	  console.log('post请求失败', error)
	        })
	   }
   getTimeClick1(value){
   	   this.coloritem1 = value;
   	  var oDate=new Date();
  		var nowYear = oDate.getFullYear();    //当前年
			var nowMonth = oDate.getMonth();      //当前月
			var monthStartDate = new Date(nowYear, nowMonth, 1);
   	 if(this.coloritem1==0){
  	      this.startdate1=this.formatDate(oDate);
   	 	    this.enddate1=this.formatDate(oDate);
   	 	    this.updateechats1();
   	 	    this.title1="今日任务监测";
  	      console.log("当天开始1:"+this.startdate1);
  	      console.log("当天结束1:"+this.enddate1)
   	 }else if(this.coloritem1==1){
				   this.startdate1=this.formatDate(oDate);
   	 	     this.enddate1=this.formatDate(oDate);
   	 	      this.updateechats1();
   	 	       this.title1="本周任务监测";
  	      console.log("近一周开始1:"+this.startdate1);
  	      console.log("近一周结束1:"+this.enddate1)
   	 }else{
				  this.startdate1=this.formatDate(monthStartDate);
				  this.enddate1=this.formatDate(oDate);
				   this.updateechats1();
				    this.title1="本月任务监测";
	        console.log("本月开始是1:"+this.startdate1);//本月开始
	        console.log("本月结束是1:"+this.enddate1);//本月结束
   	 }
   }
}
