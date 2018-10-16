import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
declare var echarts: any;
import * as GlobalUrl from '../globals';
@Component({
  selector: 'app-customerstatistics',
  templateUrl: './customerstatistics.component.html',
  styleUrls: ['./customerstatistics.component.css']
})
export class CustomerstatisticsComponent implements OnInit {
     startdate="";
		 enddate="";
	   coloritem:number = 0;
     item1:number = 0;
     headData:any=[];
     todayChatData=[];
     activeChatData=[];
     GroupData=[];
     Activecount:number = 0;
     Toadycount:number = 0;
     Groupcount:number = 0;
     a = [];
		 b = [];
	   c= [];
	   deviceCount:number = 0;
	   a1 = [];
	   title="本周分组数";
     //获取头部数据
     getHeadUrl:string =GlobalUrl.prioductUrl +'customer/getCustomerMessage';
     wechatidmodel='';
     wechatid='';
     //分组统计
     groupList:string=GlobalUrl.prioductUrl +'customer/getGroupsTrend';
     //获取社交号
     huoquwectaht:string=GlobalUrl.prioductUrl +'socialaccount/getAllWeChat';
     weChatList=[];
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
            this.grouplist();
  }
  headlist(){
  	       //头部数据
  	       let formdata1=new FormData();
           formdata1.append('accountId',localStorage.getItem('id'));
           formdata1.append('weChatIds',this.wechatid);
           this.http.post(this.getHeadUrl,formdata1).subscribe(response=>{
          	if(response['code']==200){
          		 this.activeChatData=response['data'].weekStatchatList;
          		 this.todayChatData=response['data'].todayStatchatList;
          		 this.headData=response['data'];
          		 this.deviceCount=response['data'].deviceCount;
          		 this.a1=[];
          		 this.a1.push(response['data'].deviceCount);
          		 this.a1.push(response['data'].offlineCount);
          		 this.a1.push(response['data'].onlineCount);
          		 this.echatstable1()
           }},error=>{
           	  console.log('post请求失败', error)
           })
  }
  grouplist(){
  	       //分组统计
           let formdata5=new FormData();
	         formdata5.append('accountId',localStorage.getItem('id'));
	         formdata5.append('startDate',"");
	         formdata5.append('endDate',"");
	         formdata5.append('weChatIds',this.wechatid);
           this.http.post(this.groupList,formdata5).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	  this.Groupcount=response['data'].groupCount;  
	      		  this.GroupData=response['data'].statGroupsList; 
	      		  this.a = [];
						  this.b = [];
						  this.c= [];
					    for (var i = 0; i < this.GroupData.length; i++) {
					         this.a.push(this.GroupData[i].theDate)
					         this.b.push(this.GroupData[i].groupTotal)
					         this.c.push(this.GroupData[i].unGroupTotal)
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
        this.grouplist();
  	  }else{
  	  	this.wechatid='';
	  	  this.headlist();
        this.grouplist();
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
                    name: '已分组数',
                    type: 'line',
                    color: ['#007DCE'],
                    data: this.b
                },
                {
                    name: '未分组数',
                    type: 'line',
                    color: ['#98DB8B'],
                    data: this.c
                }
                
            ]
        };
        myChart.setOption(option);
	   }
    echatstable1(){
    	  var myChart1 = echarts.init(document.getElementById('two'));
    	  var option1 = {
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'shadow'
				        }
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'value',
				        boundaryGap: [0, 0.5]
				    },
				    yAxis: {
				        type: 'category',
				        data: ['在线','空闲','总']
				    },
				    series: [
				        {
				            type: 'bar',
				            itemStyle: {
	                    normal: {
	                        color: function (params) {
	                            var colorList = ['#90D883', '#FFD878', '#2BA9EB'];
	                            return colorList[params.dataIndex]
	                        }
	                    }
                     },
				             data:this.a1
				        }
				    ]
        }
    	  myChart1.setOption(option1);
    }
    updateechats(){
	         let formdata1=new FormData();
	         formdata1.append('accountId',localStorage.getItem('id'));
	         formdata1.append('startDate',this.startdate);
	         formdata1.append('endDate',this.enddate);
	         formdata1.append('weChatIds',this.wechatid);
	  	     this.http.post(this.groupList,formdata1).subscribe(response=>{
		       if(response['code']==200){
		          this.Groupcount=response['data'].groupCount;  
	      		  this.GroupData=response['data'].statGroupsList;
		      		this.a = [];
						  this.b = [];
						  this.c= [];
					    for (var i = 0; i < this.GroupData.length; i++) {
					         this.a.push(this.GroupData[i].theDate)
					         this.b.push(this.GroupData[i].groupTotal)
					         this.c.push(this.GroupData[i].unGroupTotal)
					    }
             this.echatstable()
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
   	 	    this.title="今日分组数";
   	 	    this.startdate=this.formatDate(oDate);
   	 	    this.enddate=this.formatDate(oDate);
   	 	    this.updateechats();
  	      console.log("当天开始:"+this.startdate);
  	      console.log("当天结束:"+this.enddate);
   	 }else if(this.coloritem==1){
   	 	    this.title="本周分组数";
          this.startdate=this.formatDate(oDate);
   	 	    this.enddate=this.formatDate(oDate);
   	 	    this.updateechats();
  	      console.log("近一周开始:"+this.startdate);
  	      console.log("近一周结束:"+this.enddate);
   	 }else{
   	     	this.title="本月分组数";
   	 	   this.startdate=this.formatDate(monthStartDate);
				 this.enddate=this.formatDate(oDate);
				 this.updateechats();
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
				    var oDate1 = new Date(result[1]);
						var Y1 = oDate1.getFullYear() + '-';
						var M1 = (oDate1.getMonth() + 1 < 10 ? '0' + (oDate1.getMonth() + 1) : oDate1.getMonth() + 1) + '-';
				    var D1 = oDate1.getDate()<10 ? "0" + oDate1.getDate()+ ' ':oDate1.getDate()+ ' ';
				    this.enddate=Y1+M1+D1;
				    this.title="指定分组数";
				    this.updateechats();    
  }

}
