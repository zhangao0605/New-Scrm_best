import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as endOfMonth from 'date-fns/end_of_month';
declare var echarts: any;
declare var $: any;
import * as GlobalUrl from '../globals';
@Component({
  selector: 'app-resoursestatistics',
  templateUrl: './resoursestatistics.component.html',
  styleUrls: ['./resoursestatistics.component.css']
})
export class ResoursestatisticsComponent implements OnInit {
	startdate="";
	enddate="";
  coloritem:number = 0;
  headData:any=[];
  rightData=[];
  echartsData=[];
  a = [];
  b = [];
  c= [];
  title="本周资源是否公有数";
  //资源统计
  getResourseUrl: string = GlobalUrl.prioductUrl+'statresource/getAllResourceMessage';
  constructor(private http: HttpClient) { }

  ngOnInit() {
         let formdata1=new FormData();
         formdata1.append('accountId',localStorage.getItem('id'));
         formdata1.append('startDate',"");
         formdata1.append('endDate',"");
          
        this.http.post(this.getResourseUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      		this.headData=response['data'];
      		this.rightData=response['data'].tagList;
      		this.echartsData=response['data'].statresourceList;  
			    for (var i = 0; i < this.echartsData.length; i++) {
			         this.a.push(this.echartsData[i].theDate)
			         this.b.push(this.echartsData[i].publicResource)
			         this.c.push(this.echartsData[i].privateResource)
			    }
		            console.log(this.a)
		            console.log(this.b)
		            console.log(this.c)
                this.echatstable()
        }},error=>{
       	  console.log('post请求失败', error)
        })
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
	   	     	this.title="今日资源是否公有数";
	   	 	    this.startdate=this.formatDate(oDate);
	   	 	    this.enddate=this.formatDate(oDate);
	  	      console.log("当天开始:"+this.startdate);
	  	      console.log("当天结束:"+this.enddate);
	  	      this.updateechats();
	   	 }else if(this.coloritem==1){
	   	    	this.title="本周资源是否公有数";
	          this.startdate=this.formatDate(oDate);
	   	 	    this.enddate=this.formatDate(oDate);
	  	      console.log("近一周开始:"+this.startdate);
	  	      console.log("近一周结束:"+this.enddate);
	  	       this.updateechats();
	   	 }else{
	   	 	   this.title="本月资源是否公有数";
	   	 	   this.startdate=this.formatDate(monthStartDate);
					 this.enddate=this.formatDate(oDate);
		       console.log("本月开始是:"+this.startdate);//本月开始
		       console.log("本月结束是:"+this.enddate);//本月结束
		        this.updateechats();
	   	 }
   }
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
                    name: '公有资源数',
                    type: 'line',
                    color: ['#007DCE'],
                    data: this.b
                },
                {
                    name: '私有资源数',
                    type: 'line',
                    color: ['#98DB8B'],
                    data: this.c
                }
                
            ]
        };
        myChart.setOption(option);
	   }
	   updateechats(){
	         let formdata1=new FormData();
	         formdata1.append('accountId',localStorage.getItem('id'));
	         formdata1.append('startDate',this.startdate);
	         formdata1.append('endDate',this.enddate);
	  	     this.http.post(this.getResourseUrl,formdata1).subscribe(response=>{
		       if(response['code']==200){
		      		this.echartsData=response['data'].statresourceList; 
		      		this.a = [];
						  this.b = [];
						  this.c= [];
					    for (var i = 0; i < this.echartsData.length; i++) {
					         this.a.push(this.echartsData[i].theDate)
					         this.b.push(this.echartsData[i].publicResource)
					         this.c.push(this.echartsData[i].privateResource)
					    }
		            console.log(this.a)
		            console.log(this.b)
		            console.log(this.c)
		            this.echatstable()
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
				    this.title="指定资源是否公有数";
				    this.updateechats();
  }
  
}
