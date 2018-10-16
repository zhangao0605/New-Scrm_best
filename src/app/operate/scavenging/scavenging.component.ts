import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import {HttpClient} from "@angular/common/http";
import * as GlobalUrl from '../../globals';
declare var $: any;
@Component({
  selector: 'app-scavenging',
  templateUrl: './scavenging.component.html',
  styleUrls: ['./scavenging.component.css']
})
export class ScavengingComponent implements OnInit {
	radioValue="";
	ismask=false;
	isscaven=false;
   timeout='';
	 interval1='';
	 interval2='';	
	 date = null;
	time: Date | null = null;
  fileList = [
    
  ];
  previewImage = '';
  previewVisible = false;
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
  taskmodel='';
	datesmonthyear='';
	avehicle='';
	filesimg:any={};
	lastbigUrl:string=GlobalUrl.prioductUrl +'operate/sweepIntoChatroom';
	
  constructor(private msg: NzMessageService,private http: HttpClient) {}

 

  ngOnInit() {}
  
    beforeUpload = (file: UploadFile): boolean => {
     	this.filesimg=file;
     	console.log(this.filesimg)
      return true
   }

		
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
							  	  this.isscaven=false;
							  	  this.ismask=false;
							  	  this.rightData=[];
							  	   this.sjinputmodel='';
							  	  for(var i=0;i<this.shejarr.length;i++){
			      	       	this.shejarr[i].checked=false;
			      	      }
			  	}
		  }
	 handlePreview = (file: UploadFile) => {
	 	   console.log(file)
	     this.previewImage = file.url || file.thumbUrl;
	     this.previewVisible = true;
	  }
	 //	关闭社交号
	 closeisscaven(){
	 	   this.rightData=[];
			 this.sjinputmodel='';
			 for(var i=0;i<this.shejarr.length;i++){
	      	  this.shejarr[i].checked=false;
	     }
		 	this.ismask=false;
		 	this.isscaven=false;
	 }
//	 打开社交号
	 showisscaven(){
	 	 	this.page='1';
	 	 	this.shejiaolist();
		 	this.ismask=true;
		 	this.isscaven=true;
	 }
	 quejia(e){
	 	console.log(e)
	 }
	 getWeek(result: Date): void {
					var date = new Date(result);
					var Y = date.getFullYear() + '-';
					var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			    var D = date.getDate()<10 ? "0" + date.getDate()+ ' ':date.getDate()+ ' ';
					this.datesmonthyear=Y+M+D;
		 }
	  
	  log(time: Date): void {
	  	if(time){
	  	   this.avehicle=time.toTimeString().substr(0,8);
	  	}
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
    open(){
    	       let formdata1=new FormData();
			       formdata1.append('accountId',localStorage.getItem('id'));
    	       //判断任务
					   if(this.taskmodel==""){
					   	  alert("请填写任务名称");
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
            //上传图片
            if(JSON.stringify(this.filesimg) == "{}"){
               alert("请选择二维码");
               return false;
            }else{
					   	  formdata1.append('file',this.filesimg);
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
					    this.http.post(this.lastbigUrl,formdata1).subscribe(response=>{
			        if(response['code']==200){
			      	   this.taskmodel='';
			      	   this.wechatid='';
			      	   this.shejiao='';
			      	   this.radioValue='';
			      	   this.date='';
			      	   this.filesimg={};
			      	   this.timeout='';
			      	   this.interval1='';
			      	   this.interval2='';
			        }},error=>{
			       	  console.log('post请求失败', error)
			        })
    }
}
