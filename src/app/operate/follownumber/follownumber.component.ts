import { Component, OnInit } from '@angular/core';
declare var $: any;
import {HttpClient} from "@angular/common/http";
import * as GlobalUrl from '../../globals';
@Component({
  selector: 'app-follownumber',
  templateUrl: './follownumber.component.html',
  styleUrls: ['./follownumber.component.css']
})
export class FollownumberComponent implements OnInit {
	 ismask=false;
	 radioValue='';
   isnumbershow=false;
   floowshe=false;
   timeout='';
	 interval1='';
	 interval2='';
   item:number = 0;
   date = null;
	 time: Date | null = null;
	 taskchek=false;
   startdate="";
   enddate="";
   taskselect="";
   createdper="";
   surebtn=true;
   //选择社交号
	 shejiaoUrl:string=GlobalUrl.prioductUrl +'socialaccount/getAllSocialaccountTo';
	 searchURL:string=GlobalUrl.prioductUrl +'socialaccount/getAllSocialaccountByNameTo';
	  shejarr=[];
	  pageIndex = 1;
	  pageSize= 4;
	  total=1;
	  page="1";
	  sjinputmodel='';
	  rightData=[];
	  wechatid='';
	  shejiao='';
   //公众号初始化数据
   followDataUrl:string=GlobalUrl.prioductUrl +'officialaccount/getAllOfficialAccountChoose';
  
   followpage='1';
   pageIndexfollow = 1;
	 pageSizefollow= 4;
	 totalfollow=1;
   followData=[];
   followRightData=[];
   displayDatafollow=[];
	 indeterminatefollow=false;
	 allCheckedfollow=false;
	 bymodelchangeUrl:string=GlobalUrl.prioductUrl +'officialaccount/getAllOfficialAccountByLikeChoose';
	 
	 followmodel='';
	 taskmodel='';
	 datesmonthyear='';
	 avehicle='';
	 followids='';
	 according='';
	 followUrl:string=GlobalUrl.prioductUrl +'operate/attentionAccount';
	 
	 
    constructor(private http: HttpClient) { }
     
    ngOnInit() {}
    
     
	//选择社交号初始化数据
	  shejiaolist(){
	  	     let formdata1=new FormData();
		       formdata1.append('page',this.page);
		       formdata1.append('accountId',localStorage.getItem('id'))
	         this.http.post(this.shejiaoUrl,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	 this.total=response['data'].socialaccountCount;
	      	   this.shejarr=response['data'].socialaccountList;
	      	   for(var i=0;i<this.shejarr.length;i++){
	      	     	this.shejarr[i].checked=false;
	      	   }
	         }},error=>{
	       	   console.log('post请求失败', error)
	         })
	  }
	//选择社交号分页
	   searchData(e){
		  	this.page=e;
		  	if(this.sjinputmodel){
					   let formdata1=new FormData();
		         formdata1.append('accountId',localStorage.getItem('id'));
		         formdata1.append('page',this.page);
		         formdata1.append('message',this.sjinputmodel);
		         this.http.post(this.searchURL,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	   this.total=response['data'].socialaccountCount;
		      	   this.shejarr=response['data'].socialaccountList;
		        }},error=>{
		       	  console.log('post请求失败', error)
		        })
				}else{
					 this.shejiaolist();
				}
				console.log(this.rightData)
	  }
	// 社交号的模糊查询
	  changesj(){
		  	if(this.sjinputmodel==''){
		  		alert("请输入搜索内容")
		  	}else{
		  		   let formdata1=new FormData();
		         formdata1.append('accountId',localStorage.getItem('id'));
		         formdata1.append('page',"1");
		         formdata1.append('message',this.sjinputmodel);
		         this.http.post(this.searchURL,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	   this.total=response['data'].socialaccountCount;
		      	   this.shejarr=response['data'].socialaccountList;
		        }},error=>{
		       	  console.log('post请求失败', error)
		        })
		  	}
	  }
	//选中添加右边显示
	  addright(item,e){
				if(e==true){
					if(this.rightData.indexOf(item)!=-1){
			  		alert("已经添加过了");
			  		return false;
			  	}
			  	this.rightData.push(item)
				}else{
					for(var i=0;i<this.rightData.length;i++){
						  if(this.rightData[i].id===item.id){
						  	this.rightData.splice(i,1)
						  }
					}
				}
	  	 console.log(this.rightData)
	 }
	//右边删除
	  delectwechta(item,index){
	  	  this.rightData.splice(index,1);
	  	  item.checked=false;
			  console.log(this.rightData)
	  }
	//确认按钮显示再页面上
	  surewechat(){
		  	 if(this.rightData.length==0){
		  	 	 alert("请选择")
		  	 }else{
		  	 	      var str='';
		  	 	      var shejiaoids='';
		  	 	       for(var i=0;i<this.rightData.length;i++){
						     	  str+=this.rightData[i].socialNumber+','
						     	  shejiaoids+=this.rightData[i].id+','
						     }  
					       str=str.substring(0,str.length-1);
					       shejiaoids=shejiaoids.substring(0,shejiaoids.length-1);
					        this.wechatid=shejiaoids;
					        console.log(this.wechatid)
					        this.shejiao=str;
						  	  this.floowshe=false;
						  	  this.ismask=false;
						  	  this.rightData=[];
						  	  this.sjinputmodel='';
						  	  for(var i=0;i<this.shejarr.length;i++){
		      	       	this.shejarr[i].checked=false;
		      	      }
		  	}
	  }
    
    OnItemClick(value){
      this.item = value;
      console.log(this.item);
   }
   //打开公众号
   choosegong(){
   	   this.followpage='1';
     	 this.followlist();
       this.ismask=true;
    	 this.isnumbershow=true;
   }
   //关闭公众号
   descisnumber(){
    	this.followmodel='';
   	  this.ismask=false;
   	  this.isnumbershow=false;
   }
// 打开社交号
   showfloowshe(){
   	  this.page='1';
   	  this.shejiaolist();
    	this.ismask=true;
   	  this.floowshe=true;
   }
// 关闭社交好
   closefloowshe(){
       this.rightData=[];
			 this.sjinputmodel='';
			 for(var i=0;i<this.shejarr.length;i++){
	      	  this.shejarr[i].checked=false;
	     }
	   	 this.ismask=false;
	   	 this.floowshe=false;
   }
    getWeek(result: Date): void {
				var date = new Date(result);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		    var D = date.getDate()<10 ? "0" + date.getDate()+ ' ':date.getDate()+ ' ';
				this.datesmonthyear=Y+M+D;
	 }
   getStart(startdate){
  		 var date = new Date(startdate);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		    var D = date.getDate()<10 ? "0" + date.getDate()+ ' ':date.getDate()+ ' ';
				console.log(Y+M+D)
  }
  getEnd(enddate){
  		 var date = new Date(enddate);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		    var D = date.getDate()<10 ? "0" + date.getDate()+ ' ':date.getDate()+ ' ';
				console.log(Y+M+D)
  }
  
  log(time: Date): void {
  	if(time){
  		 this.avehicle=time.toTimeString().substr(0,8);
  	}
  }
  followlist(){
  	       let formdata1=new FormData();
		       formdata1.append('page',this.followpage);
		       formdata1.append('accountId',localStorage.getItem('id'))
	         this.http.post(this.followDataUrl,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	 this.totalfollow=response['data'].officialAccountCount;
	      	   this.followData=response['data'].officialAccountList;
	      	   for(var i=0;i<this.followData.length;i++){
	      	     	this.followData[i].checked=false;
	      	   }
	      	   console.log(this.followData)
	         }},error=>{
	       	   console.log('post请求失败', error)
	         })
  }
  //公众号分页
  searchDatafollow(e){
	  	this.followpage=e;
	  	if(this.followmodel){
	  		   let formdata1=new FormData();
		       formdata1.append('page',this.followpage);
		       formdata1.append('accountId',localStorage.getItem('id'));
		       formdata1.append('message',this.followmodel);
	         this.http.post(this.bymodelchangeUrl,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	 this.totalfollow=response['data'].officialAccountCount;
	      	   this.followData=response['data'].officialAccountList;
	      	   for(var i=0;i<this.followData.length;i++){
	      	     	this.followData[i].checked=false;
	      	   }
	      	   console.log(this.followData)
	         }},error=>{
	       	   console.log('post请求失败', error)
	         })
	  	}else{
	  		this.followlist();
	  	}
	  	
  }
  
    //链接变化
	   currentPageDataChangefollow($event: Array<{}>): void{
	 	   this.displayDatafollow = $event;
	 	   this.refreshStatusfollow();
    }
    //链接单选功能
		 refreshStatusfollow(): void {
		    const allChecked = this.displayDatafollow.every(value => value.checked === true);
		    const allUnChecked = this.displayDatafollow.every(value => !value.checked);
		    this.allCheckedfollow = allChecked;
		    this.indeterminatefollow = (!allChecked) && (!allUnChecked);
		 }
      //链接全选功能
		  checkAllfollow(value: boolean): void {
		    this.displayDatafollow.forEach(data => {
		        data.checked = value;
		    });
		    this.refreshStatusfollow();
		 }
      //全选添加
		  alladdfollow(e){
		  	if(e==true){
			      	if(this.followRightData.length==0){
				    		 	for(var i=0;i<this.followData.length;i++){
				    		 		this.followRightData.push(this.followData[i])
				    		 	}
			    		 }else{
					   	   for(var i=0;i<this.followData.length;i++){
					    		 	    for(var j=0;j<this.followRightData.length;j++){
					            	  	 if(this.followRightData.indexOf(this.followData[i])==-1){
							    				      this.followRightData.push(this.followData[i])
							    			     }
						           }
			           }
			    		 }
			   }else{
			   	   for(var i=0;i<this.followData.length;i++){
				    	  for(var j=0;j<this.followRightData.length;j++){
				    	  	  if(this.followData[i].id=== this.followRightData[j].id){
							         this.followRightData.splice(j,1)
						        }
				    	  }
					   }
			   }
				   console.log(this.followRightData)
		  }
    //单选添加
		  oneaddfollow(item,e){
		  	 if(e==true){
				   this.followRightData.push(item)
			   }else{
					 for(var i=0;i<this.followRightData.length;i++){
					 	  if(this.followRightData[i].id==item.id){
					 	  	this.followRightData.splice(i,1)
					 	  }
					 }
			  }
	       console.log(this.followRightData)
		  } 
     //删除右边的
		  deletctfollow(item,index){
		  	this.followRightData.splice(index,1);
		  	item.checked=false;
		  	this.refreshStatusfollow();
		  }
		  publicdata='';
      //公众号确认按钮
		  surefollow(){
		  	if(this.followRightData.length==0){
		  		 alert("请选择公众号");
		  		 return false;
		  	}else{
		  		var str='';
		  		var strid='';
		  		for(var i=0;i<this.followRightData.length;i++){
		  			str+=this.followRightData[i].officialAccountName+',';
		  			strid+=this.followRightData[i].id+',';
		  		}
		  		str=str.substring(0,str.length-1);
		  		strid=strid.substring(0,strid.length-1);
		  		$(".presschoose").html(str);
		  		this.publicdata=str;
		  		this.followids=strid;
		  		this.isnumbershow=false;
		  		this.ismask=false;
		  		this.followRightData=[];
		  		
		  	}
		  }
     //搜索改变
		  bymodelchange(){
		  	this.followpage='1';
		  	if(this.followmodel==''){
		  		alert("请输入搜索内容")
		  	}else{
		  		 let formdata1=new FormData();
		       formdata1.append('page',this.followpage);
		       formdata1.append('accountId',localStorage.getItem('id'));
		       formdata1.append('message',this.followmodel);
	         this.http.post(this.bymodelchangeUrl,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	 this.totalfollow=response['data'].officialAccountCount;
	      	   this.followData=response['data'].officialAccountList;
	      	   for(var i=0;i<this.followData.length;i++){
	      	     	this.followData[i].checked=false;
	      	   }
	      	   console.log(this.followData)
	         }},error=>{
	       	   console.log('post请求失败', error)
	         })
		  	}
		  }
		  open(){
		  	   let formdata1=new FormData();
		       formdata1.append('accountId',localStorage.getItem('id'));
		  	
			  	 //任务名称
					if(this.taskmodel==''){
						alert("请填写任务计划");
						 return false;
					}else{
						 formdata1.append('taskName',this.taskmodel);
					}
		      //判断社交号
				  if(this.wechatid==''){
				  	 alert("请选择社交号");
				  	  return false;
				  }else{
				  	  formdata1.append('socialaccountIds',this.wechatid);
				  }
				  //优先级
					  if(this.radioValue==''){
					  	alert("请选择优先级");
					  	return false;
					  }else if(this.radioValue=='A'){
					  	formdata1.append('taskRank','0');
					  }else{
					  	formdata1.append('taskRank','1');
					  }
            //执行时间
            if(this.datesmonthyear==''){
            	 alert("请选择年月日");
            	 return false;
            }else{
            	console.log(this.datesmonthyear);
            }
             //时分秒
            if(this.avehicle==''){
            	 alert("请选择时分秒");
            	 return false;
            }else{
            	formdata1.append('startTime',this.datesmonthyear+this.avehicle);
            }
           //选择
           if(this.item==0){
           	 formdata1.append('joinResource','0');
           	 if(this.followids==''){
           	 	 alert("请选择公众号");
           	 	 return false;
           	 }else{
           	 	 formdata1.append('publicNumber',this.publicdata);
           	 }
           }else{
           	 formdata1.append('joinResource','1');
           	 if(this.according==''){
           	 	 alert("请输入");
           	 	  return false;
           	 }else{
           	 	 formdata1.append('publicNumber',this.according);
           	 }
           }
              //超时时间
					   if(this.timeout==''){
					   	  alert("请选择超时时间");
					   	  return false;
					   }else{
					   		formdata1.append('timeOut',this.timeout);
					     	
					   }
					    //开始间隔
					   if(this.interval1==''){
					   	  alert("请选择开始间隔");
					   	  return false;
					   }else{
					   		formdata1.append('startInterval',this.interval1);
					   }
					    //结束间隔
					   if(this.interval2==''){
					   	  alert("请选择结束间隔");
					   	  return false;
					   }else{
					   	 formdata1.append('endInterval',this.interval2);
					   }
					 this.http.post(this.followUrl,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	 this.taskmodel='';
	      	 	 this.wechatid='';
	      	 	 this.shejiao='';
	      	 	 this.radioValue='';
  	 	       $(".presschoose").html('');
  	 	   	   this.followids='';
       	 	   this.publicdata='';
  	 	   	   this.according='';
	      	 	 this.date='';
	      	 	 this.timeout='';
	      	 	 this.interval1='';
	      	 	 this.interval2='';
	         }},error=>{
	       	   console.log('post请求失败', error)
	         })
           
           
		  }
}
