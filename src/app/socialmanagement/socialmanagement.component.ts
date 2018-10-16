import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as GlobalUrl from '../globals'
declare var echarts: any;
declare var $: any;
@Component({
  selector: 'app-socialmanagement',
  templateUrl: './socialmanagement.component.html',
  styleUrls: ['./socialmanagement.component.css']
})
export class SocialmanagementComponent implements OnInit {
	tagsearchData=[];
	tagmodel='';
	searchmodel="";
	istag=false;
	person_nc='';
	person_city='';
	person_sex='';
	person_qm='';
	startdate="";
	enddate="";
	startdate1="";
	enddate1="";
	coloritem:number = 0;
	coloritem1:number = 0;
	isdetail=false;
	istongji=false;
	isziliao=false;
	loading=false;
  detailnum=0;
  statnum=0;
  shejiaoData=[];
  a = [];
	b = [];
	c= [];
	a2 = [];
	b2 = [];
	c2= [];
	a1=[];
	echartsData=[];
	echartsData1=[];
	echartsData2=[];
	haoyouData=[];
	qunzuData=[];
	pageIndex=1;
  pageSize=10;
  total=1;
	pageIndex1=1;
  pageSize1=3;
  total1=1;
  pageIndex2=1;
  pageSize2=3;
  total2=1;
  title="本周好友和群走势";
  title1="本周群成员男女比列统计";
  imgurl='';
  detailid:any="";
  tongjiid:any="";
  useTag=[];
  newsTag=[];
  gorouplist=[];
  
  
//shejiaoUrl: string = 'http://192.168.1.241:8081/scrm/socialaccount/getAllSocialaccount';
//echatsUrlone:string='http://192.168.1.241:8081/scrm/socialaccount/getTrendMsg';
//echatsUrltwo:string='http://192.168.1.241:8081/scrm/socialaccount/getChatroommsg';
//echatsUrlthree:string='http://192.168.1.241:8081/scrm/socialaccount/getTaskMsg';
//haoyouUrl:string='http://192.168.1.241:8081/scrm/socialaccount/getContactBySocialaccountId';
//qunzuUrl:string='http://192.168.1.241:8081/scrm/socialaccount/getChatroomBySocialaccountId';
//ziliaoDetail:string='http://192.168.1.241:8081/scrm/socialaccount/getSocialaccountdetail';
//searchUrl:string='http://192.168.1.241:8081/scrm/socialaccount/getSocialaccountByName';
//huoqutagUrl:string='http://192.168.1.241:8081/scrm/tag/getUpdateTag';
//tagSrarchUrl:string='http://192.168.1.241:8081/scrm/tag/getTagByName';
//groupURL:string="http://192.168.1.241:8081/scrm/groups/getGroups";
//sheijiaoTagUrl:string="http://192.168.1.241:8081/scrm/socialaccount/addSocialaccountTag";
  
  
  
  shejiaoUrl: string =GlobalUrl.prioductUrl +'socialaccount/getAllSocialaccount';
  echatsUrlone:string=GlobalUrl.prioductUrl +'socialaccount/getTrendMsg';
  echatsUrltwo:string=GlobalUrl.prioductUrl +'socialaccount/getChatroommsg';
  echatsUrlthree:string=GlobalUrl.prioductUrl +'socialaccount/getTaskMsg';
  haoyouUrl:string=GlobalUrl.prioductUrl +'socialaccount/getContactBySocialaccountId';
  qunzuUrl:string=GlobalUrl.prioductUrl +'socialaccount/getChatroomBySocialaccountId';
  ziliaoDetail:string=GlobalUrl.prioductUrl +'socialaccount/getSocialaccountdetail';
  searchUrl:string=GlobalUrl.prioductUrl +'socialaccount/getSocialaccountByName';
  huoqutagUrl:string=GlobalUrl.prioductUrl +'tag/getUpdateTag';
  tagSrarchUrl:string=GlobalUrl.prioductUrl +'tag/getTagByName';
  groupURL:string=GlobalUrl.prioductUrl +'groups/getGroups';
  sheijiaoTagUrl:string=GlobalUrl.prioductUrl +'socialaccount/addSocialaccountTag';
  
  
  
  
  
  
  
  nitam=false;
  checkedtaglist=[];
  addtaglist:any={};
  dabiaoid:number=0;
  ismask=false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
         
	  	    this.shejiaolist();
	  	     let formdata2=new FormData();
	         formdata2.append('accountId',localStorage.getItem('id'));
	         this.http.post(this.groupURL,formdata2).subscribe(response=>{
	      	 if(response['code']==200){
	      		 this.gorouplist=response['data'].groupsList;
	        }},error=>{
	       	  console.log('post请求失败', error)
	        })
           
  }
  shejiaolist(){
  	      //大表格
  	       let formdata1=new FormData();
	         formdata1.append('accountId',localStorage.getItem('id'));
	         formdata1.append('page','1');
	  	     this.http.post(this.shejiaoUrl,formdata1).subscribe(response=>{
		       if(response['code']==200){
		       	  this.total=response['data'].socialaccountCount;
		      		this.shejiaoData=response['data'].socialaccountList;
		      		console.log(this.shejiaoData)
	        }},error=>{
	       	  console.log('post请求失败', error)
	        })
  }
//选中添加不选中删除
  getindextag(item,e){
    if(e==true){
		  this.checkedtaglist.push(item);
		}else{
			for(var i=0;i<this.checkedtaglist.length;i++){
				 if(this.checkedtaglist[i].id===item.id){
				 	 this.checkedtaglist.splice(i,1)
				 }
			}
		}
		console.log(this.checkedtaglist)
  }
//删除框里标签
  delectindextag(item,index){
     this.checkedtaglist.splice(index,1)
  	 item.checked=false;
		 console.log(this.checkedtaglist)
  }
//搜索框里标签得点击事件
  searchtag(item){
  	this.addtaglist=item;
  	this.tagmodel=item.tagName;
  	$(".accurateadd_search").css("display","none");
  	console.log(item)
  }
//添加标签到下边div
  addtagstodiv(){
  	if(this.checkedtaglist.indexOf(this.addtaglist)!=-1){
  		alert("已经添加此标签");
  		return false;
  	}
  	this.checkedtaglist.push(this.addtaglist);
  	 console.log(this.checkedtaglist)
  }
   //获取分组名
		getGroupName(e) {
		  let a = ''
		  for (let i of  this.gorouplist) {
		    if (e == i.id) {
		      a = i.name
		      break;
		    } else {
		      a = '未分组'
		    }
		  }
		  return a
		}
//		打标签
  showistag(id){
  	       this.dabiaoid=id;
  	       this.istag=true;
  	       this.ismask=true;
  	       let formdata1=new FormData();
	         formdata1.append('accountId',localStorage.getItem('id'));
	  	     this.http.post(this.huoqutagUrl,formdata1).subscribe(response=>{
		       if(response['code']==200){
		       	this.newsTag=response['data'].newList;
		       	this.useTag=response['data'].useList;
		       	for(var i=0;i<this.newsTag.length;i++){
		       		this.newsTag[i].checked=false;
		       	}
		        for(var i=0;i<this.useTag.length;i++){
		       		this.useTag[i].checked=false;
		       	}
	        }},error=>{
	       	  console.log('post请求失败', error)
	        })
  }
  
  suretag(){
  	if(this.checkedtaglist.length==0){
  		 alert("请选择标签")
  	}else{
  		       let arr=[];
             var  str='';
				     for(var i=0;i<this.checkedtaglist.length;i++){
				     	  str+=this.checkedtaglist[i].tagName+','
				     }  
			       str=str.substring(0,str.length-1);
			       arr.push(this.dabiaoid)
			       console.log(JSON.stringify(arr));
			       console.log(str)
		       let formdata2=new FormData();
	         formdata2.append('whetherPublic',"0");
	         formdata2.append('accountId',localStorage.getItem('id'));
	         formdata2.append('tagNames',str);
	         formdata2.append('socialaccountids',JSON.stringify(arr));
	         this.http.post(this.sheijiaoTagUrl,formdata2).subscribe(response=>{
	      	 if(response['code']==200){
	      		   this.istag=false;
	      		   this.ismask=false;
	      		   this.shejiaolist();
	      		   this.checkedtaglist=[];
	        }},error=>{
	       	  console.log('post请求失败', error)
	        })
		      
  	}
  }
  closeistag(){
  	this.istag=false;
  	this.ismask=false;
  }
  ying(e){
  	console.log(e)
  }
   DetailClick(value){
	    this.detailnum = value;
	    if(this.detailnum==0){
	    	 this.haoyoulist();
	    }else if(this.detailnum==1){
	    	 this.qunzulist();
	    }
   }
   StatClick(value){
   	  this.statnum = value;
   	   if(this.statnum ==0){
   	  	 // 统计一
           let formdata2=new FormData();
	         formdata2.append('socialaccountId',this.tongjiid);
	         formdata2.append('startDate',"");
	         formdata2.append('endDate',"");
           this.http.post(this.echatsUrlone,formdata2).subscribe(response=>{
	      	 if(response['code']==200){
	      	   	this.a = [];
						  this.b = [];
						  this.c= [];
	      		  this.echartsData=response['data'].socialaccountstatList;  
					    for (var i = 0; i < this.echartsData.length; i++) {
					         this.a.push(this.echartsData[i].theDate)
					         this.b.push(this.echartsData[i].addChatroom)
					         this.c.push(this.echartsData[i].addContact)
					    }
	            this.echatstable()
	        }},error=>{
	       	  console.log('post请求失败', error)
	        }) 
   	  }else if(this.statnum ==1){
   	  	   let formdata2=new FormData();
	         formdata2.append('socialaccountId',this.tongjiid);
	         formdata2.append('startDate',"");
	         formdata2.append('endDate',"");
           this.http.post(this.echatsUrltwo,formdata2).subscribe(response=>{
	      	 if(response['code']==200){
	      		  this.echartsData1=response['data'];
	      		  this.a1=[];
					    for (var i = 0; i < this.echartsData1.length; i++) {
					    	   this.a1.push(this.echartsData1[i].malePercentage);
					         this.a1.push(this.echartsData1[i].femalePercentage);
					         this.a1.push(this.echartsData1[i].unkonwnPercentage)
					    }
					    this.echatstable1();
	        }},error=>{
	       	  console.log('post请求失败', error)
	        }) 
   	  }else if(this.statnum ==2){
   	  	   let formdata3=new FormData();
	         formdata3.append('socialaccountId',this.tongjiid);
           this.http.post(this.echatsUrlthree,formdata3).subscribe(response=>{
	      	 if(response['code']==200){
	      		  this.echartsData2=response['data'].stattaskList;  
	      		  this.a2 = [];
	            this.b2 = [];
	            this.c2 = [];
					    for (var i = 0; i < this.echartsData2.length; i++) {
					         this.a2.push(this.echartsData2[i].weekDay)
					         this.b2.push(this.echartsData2[i].taskCount)
					         this.c2.push(this.echartsData2[i].theDate)
					    }
					   this.echatstable2();
	        }},error=>{
	       	  console.log('post请求失败', error)
	        }) 
   	 }
   }
   //展示详情
   showisdetail(id){
     	this.detailid=id;
   	  this.isdetail=true;
   	  this.ismask=true;
   	  this.haoyoulist();
   }
   closeisdetail(){
   	  this.isdetail=false;
   	  this.ismask=false;
   }
   // 展示统计
   showistongji(id){
   	      this.tongjiid=id;
   	      this.istongji=true;
   	      this.ismask=true;
   	       // 统计一
           let formdata2=new FormData();
	         formdata2.append('socialaccountId',this.tongjiid);
	         formdata2.append('startDate',"");
	         formdata2.append('endDate',"");
           this.http.post(this.echatsUrlone,formdata2).subscribe(response=>{
	      	 if(response['code']==200){
	      		  this.echartsData=response['data'].socialaccountstatList;  
					    for (var i = 0; i < this.echartsData.length; i++) {
					         this.a.push(this.echartsData[i].theDate)
					         this.b.push(this.echartsData[i].addChatroom)
					         this.c.push(this.echartsData[i].addContact)
					    }
	            this.echatstable()
	        }},error=>{
	       	  console.log('post请求失败', error)
	        }) 
   }
   colseistongji(){
   	 this.istongji=false;
   	 this.ismask=false;
   }
   // 展示资料
   showisziliao(id){
   	       this.isziliao=true;
   	       this.ismask=true;
  	       let formdata1=new FormData();
	         formdata1.append('id',id);
	  	     this.http.post(this.ziliaoDetail,formdata1).subscribe(response=>{
		       if(response['code']==200){
		       	this.imgurl=response['data'].profilePhoto;
		       	this.person_nc=response['data'].nickName;
		       	this.person_city=response['data'].province+response['data'].city;
		      	if(response['data'].sex==0){
		      		this.person_sex='未知';
		      	}else if(response['data'].sex==1){
		      		this.person_sex='男';
		      	}else if(response['data'].sex==2){
		      		this.person_sex='女';
		      	}
		      	this.person_qm=response['data'].whatUp;
	        }},error=>{
	       	  console.log('post请求失败', error)
	        })
   }
   colseisziliao(){
   	   this.isziliao=false;
   	   this.ismask=false;
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
                    name: '群',
                    type: 'line',
                    color: ['#007DCE'],
                    data: this.b
                },
                {
                    name: '好友',
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
				        data: ['男','女','未知']
				    },
				    series: [
				        {
				            type: 'bar',
				            itemStyle: {
	                    normal: {
	                        color: function (params) {
	                            var colorList = ['#b44038', '#334552', '#6e9fa7'];
	                            return colorList[params.dataIndex]
	                        }
	                    }
                     },
				             data: this.a1
				        }
				    ]
        }
    	  myChart1.setOption(option1);
    }
    echatstable2(){
    	  var myChart2 = echarts.init(document.getElementById('three'));
        var option2 = {
            tooltip: {
                trigger: 'item'
            },
            xAxis: {
                data:this.a2
            },
            yAxis: {},
            series: [{
                name: '任务统计',
                type: 'bar',
                barWidth: 40,
                data:this.b2
            }]
        };
        myChart2.setOption(option2);
    }
     updateechats(){
	         let formdata1=new FormData();
	         formdata1.append('socialaccountId',this.tongjiid);
	         formdata1.append('startDate',this.startdate);
	         formdata1.append('endDate',this.enddate);
	  	     this.http.post(this.echatsUrlone,formdata1).subscribe(response=>{
		       if(response['code']==200){ 
		      	  this.echartsData=response['data'].socialaccountstatList;  
		      		this.a = [];
						  this.b = [];
						  this.c= [];
					    for (var i = 0; i < this.echartsData.length; i++) {
					         this.a.push(this.echartsData[i].theDate)
					         this.b.push(this.echartsData[i].addChatroom)
					         this.c.push(this.echartsData[i].addContact)
					    }
             this.echatstable()
	        }},error=>{
	       	  console.log('post请求失败', error)
	        })
	  }
    updateechats1(){
     	     let formdata2=new FormData();
	         formdata2.append('socialaccountId',this.tongjiid);
	         formdata2.append('startDate',this.startdate1);
	         formdata2.append('endDate',this.enddate1);
           this.http.post(this.echatsUrltwo,formdata2).subscribe(response=>{
	      	 if(response['code']==200){
	      		  this.echartsData1=response['data'];
	      		  this.a1=[];
					    for (var i = 0; i < this.echartsData1.length; i++) {
					    	   this.a1.push(this.echartsData1[i].malePercentage);
					         this.a1.push(this.echartsData1[i].femalePercentage);
					         this.a1.push(this.echartsData1[i].unkonwnPercentage)
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
   	 	    this.title="今日好友和群走势";
   	 	    this.startdate=this.formatDate(oDate);
   	 	    this.enddate=this.formatDate(oDate);
   	 	    this.updateechats();
  	      console.log("当天开始:"+this.startdate);
  	      console.log("当天结束:"+this.enddate);
   	 }else if(this.coloritem==1){
   	 	    this.title="本周好友和群走势";
          this.startdate=this.formatDate(oDate);
   	 	    this.enddate=this.formatDate(oDate);
   	 	     this.updateechats();
  	      console.log("近一周开始:"+this.startdate);
  	      console.log("近一周结束:"+this.enddate);
   	 }else{
   	     this.title="本月好友和群走势";
   	 	   this.startdate=this.formatDate(monthStartDate);
				 this.enddate=this.formatDate(oDate);
				  this.updateechats();
	       console.log("本月开始是:"+this.startdate);//本月开始
	       console.log("本月结束是:"+this.enddate);//本月结束
   	 }
   }
    getTimeClick1(value){
   	  this.coloritem1 = value;
   	  var oDate=new Date();
  		var nowYear = oDate.getFullYear();    //当前年
			var nowMonth = oDate.getMonth();      //当前月
			var monthStartDate = new Date(nowYear, nowMonth, 1);
   	 if(this.coloritem1==0){
   	 	    this.title1="今日群成员男女比列统计";
  	      this.startdate1=this.formatDate(oDate);
   	 	    this.enddate1=this.formatDate(oDate);
   	 	    this.updateechats1();
  	      console.log("当天开始1:"+this.startdate1);
  	      console.log("当天结束1:"+this.enddate1)
   	 }else if(this.coloritem1==1){
   	 	     this.title1="本周群成员男女比列统计";
				   this.startdate1=this.formatDate(oDate);
   	 	     this.enddate1=this.formatDate(oDate);
   	 	     this.updateechats1();
  	      console.log("近一周开始1:"+this.startdate1);
  	      console.log("近一周结束1:"+this.enddate1)
   	 }else{
   	 	     this.title1="本月群成员男女比列统计";
				  this.startdate1=this.formatDate(monthStartDate);
				  this.enddate1=this.formatDate(oDate);
				  this.updateechats1();
	        console.log("本月开始是1:"+this.startdate1);//本月开始
	        console.log("本月结束是1:"+this.enddate1);//本月结束
   	 }
   }
    getday(result){
    	      this.title="指定好友和群走势";
            var oDate = new Date(result[0]);
						var Y = oDate.getFullYear() + '-';
						var M = (oDate.getMonth() + 1 < 10 ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1) + '-';
				    var D = oDate.getDate()<10 ? "0" + oDate.getDate()+ ' ':oDate.getDate()+ ' ';
				    this.startdate=Y+M+D;
				    console.log(this.startdate);
				    var oDate1 = new Date(result[1]);
						var Y1 = oDate1.getFullYear() + '-';
						var M1 = (oDate1.getMonth() + 1 < 10 ? '0' + (oDate1.getMonth() + 1) : oDate1.getMonth() + 1) + '-';
				    var D1 = oDate1.getDate()<10 ? "0" + oDate1.getDate()+ ' ':oDate1.getDate()+ ' ';
				    this.enddate=Y1+M1+D1;
				    console.log(this.enddate);
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
				    this.title1="指定群成员男女比列统计"
				    
  }
  haoyoulist(){
  	       let formdata1=new FormData();
	         formdata1.append('id',this.detailid);
	         formdata1.append('page','1');
	  	     this.http.post(this.haoyouUrl,formdata1).subscribe(response=>{
		       if(response['code']==200){
		       	  this.total1=response['data'].contactCount;
		      		this.haoyouData=response['data'].contactList;
		      		console.log(this.haoyouData);
	        }},error=>{
	       	  console.log('post请求失败', error)
	        })
  }
  
   searchData(e){
           let formdata1=new FormData();
	         formdata1.append('accountId',localStorage.getItem('id'));
	         formdata1.append('page',e);
	  	     this.http.post(this.shejiaoUrl,formdata1).subscribe(response=>{
		       if(response['code']==200){
		       	  this.total=response['data'].socialaccountCount;
		      		this.shejiaoData=response['data'].socialaccountList;
	        }},error=>{
	       	  console.log('post请求失败', error)
	        })
  }
  searchData1(e){
  	  	 let formdata1=new FormData();
         formdata1.append('page',e);
         formdata1.append('id',this.detailid);
         this.http.post(this.haoyouUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	 this.total1=response['data'].contactCount;
		       this.haoyouData=response['data'].contactList;
		       console.log(this.haoyouData);
        }},error=>{
       	   console.log('post请求失败', error)
        })
  }
  qunzulist(){
  	       let formdata1=new FormData();
	         formdata1.append('id',this.detailid);
	         formdata1.append('page','1');
	  	     this.http.post(this.qunzuUrl,formdata1).subscribe(response=>{
		       if(response['code']==200){
		       	  this.total2=response['data'].chatroomCount;
		      		this.qunzuData=response['data'].chatroomList;
		      		console.log(this.haoyouData);
	        }},error=>{
	       	  console.log('post请求失败', error)
	        })
  }
  
   searchData2(e){
  	  	 let formdata1=new FormData();
         formdata1.append('page',e);
         formdata1.append('id',this.detailid);
         this.http.post(this.qunzuUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	  this.total2=response['data'].chatroomCount;
		      	this.qunzuData=response['data'].chatroomList;
		       console.log(this.haoyouData);
        }},error=>{
       	   console.log('post请求失败', error)
        })
  }
   searchlist(){
   	    if(this.searchmodel==""){
   	    	alert("请输入搜索内容")
   	    }else{
   	    	 let formdata1=new FormData();
	         formdata1.append('page',"1");
	         formdata1.append('accountId',localStorage.getItem('id'));
	         formdata1.append('message',this.searchmodel);
	         this.http.post(this.searchUrl,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	  this.total=response['data'].socialaccountCount;
	      	 	 	this.shejiaoData=response['data'].socialaccountList;
	        }},error=>{
	       	   console.log('post请求失败', error)
	        })
   	    }
   }
   tagsearch(){
   	 if(this.tagmodel==""){
   	 		$(".accurateadd_search").css("display","none");
   	 }else{
   	 	  $(".accurateadd_search").css("display","block");
   	 	     let formdata1=new FormData();
	         formdata1.append('accountId',localStorage.getItem('id'));
	         formdata1.append('tagName',this.tagmodel);
	         this.http.post(this.tagSrarchUrl,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	  this.tagsearchData=response['data'].likeList;
	      	 	  console.log(this.tagsearchData)
	        }},error=>{
	       	   console.log('post请求失败', error)
	        })
   	 }
   }
}




