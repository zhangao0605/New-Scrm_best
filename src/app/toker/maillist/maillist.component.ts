import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import * as GlobalUrl from '../../globals';
declare var $: any;
@Component({
  selector: 'app-maillist',
  templateUrl: './maillist.component.html',
  styleUrls: ['./maillist.component.css']
})
export class MaillistComponent implements OnInit {
	ismask=false;
  ismaillist=false;
  radioValue='';
  date = null;
	time: Date | null = null;
	checked1=false;
	checked2=false;
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
  //上传通讯录
  fileList1: UploadFile[] = [];
  tongxunUrl:string=GlobalUrl.prioductUrl +'contact/uploadComm';
  
   files='';
   phonelist=[];
   
   taskmodel='';
   theaverage='';
   timedate='';
   timedates='';
   isphonenumber=false;
   backup=false;
   timeout='';
   interval1='';
   interval2='';
   checkedphone=false;
   checkedlist=[];
   //精准加人大接扣
   AccurateandUrl:string=GlobalUrl.prioductUrl +'extension/importAddressBook';
   
  constructor(private http: HttpClient) { }

  ngOnInit() {}
  
  
   beforeUpload1= (file: any) =>{
         this.files=file;
  	     let formdata1=new FormData();
	       formdata1.append('file',this.files);
         this.http.post(this.tongxunUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	this.phonelist=response['data']
      	 	  console.log(this.phonelist)
         }},error=>{
       	   console.log('post请求失败', error)
         })
	      return false;
  }
   
  handleChange(info: any): void {
  	console.log(info)
  }
  //单选添加
  addphone(item,i){
	  	if(item.checked==true){
	  		this.checkedlist.push(item)
	  	}else{
	  		this.checkedlist.splice(i,1)
	  	}
	  	
	   //console.log(this.checkedlist)
  }
  //全选添加
  allchecked(e){
	  	if(e==true){
	  		 for(var i=0;i<this.phonelist.length;i++){
	  		 	 this.phonelist[i].checked=true;
	  		 }
	  		 this.checkedlist=this.phonelist;
	  	}else{
	  		 for(var i=0;i<this.phonelist.length;i++){
	  		 	 this.phonelist[i].checked=false;
	  		 }
	  		 this.checkedlist=[];
	  	}
	    //console.log(this.checkedlist)
  }
  open(){
	     let formdata1=new FormData();
	     formdata1.append('accountId',localStorage.getItem('id'));
	  	 //任务名称
	    	if(this.taskmodel==''){
	    		alert("请输入任务名称");
	    		return false;
	    	}else{
	    		formdata1.append('taskName',this.taskmodel);
	    	}
	    	//社交号
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
	      
	     //判断年月日
	      if(this.timedate==''){
	      	alert("请选择年月日");
	      	return false;
	      }else{
	      	console.log(this.timedate)
	      }
	      //判断时分秒
	       if(this.timedates==''){
	      	alert("请选择时分秒");
	      	return false;
	      }else{
	      	formdata1.append('startTime',this.timedate+this.timedates);
	      }
	      //判断
	      if(this.theaverage==''){
	      	alert("请选择通讯录分配方式");
	      	return false;
	      }else if(this.theaverage=='C'){
	      	formdata1.append('importAll','0');
	      }else{
	      	formdata1.append('importAll','1');
	      }
          //是否清空
          if(this.isphonenumber==true){
          	formdata1.append('clear','1');
          }else{
          		formdata1.append('clear','0');
          }
          //是否加入资源
	        if(this.backup==true){
          	formdata1.append('joinResource','1');
          }else{
          		formdata1.append('joinResource','0');
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
			   
			   if(this.phonelist.length==0){
				   	  alert("请上传通讯录");
				   	  return false;
			   }else if(this.checkedlist.length==0){
				   	 alert("请选择");
				   	 return false;
			   }else{
				   	 var str='';
				   	 for(var i=0;i<this.checkedlist.length;i++){
				   		 str+=this.checkedlist[i].username+','+this.checkedlist[i].phone+','
				   	 }
				   	 str=str.substring(0,str.length-1)
				   	  
				   	 formdata1.append('wechat',str);
			   }
			   
			   this.http.post(this.AccurateandUrl,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	 	   this.taskmodel='';
		      	 	   this.shejiao='';
		      	 	   this.wechatid='';
		      	 	   this.radioValue='';
		      	 	   this.date='';
                 $(".ant-time-picker-input").val('');
                 this.theaverage='';
                 this.checked1=false;
                 this.checked2=false;
                 this.timeout='';
                 this.interval1='';
                 this.interval2='';
                 for(var i=0;i<this.phonelist.length;i++){
	  		 	        this.phonelist[i].checked=false;
	  		         }
                 this.phonelist=[];
                 this.checkedlist=[];
		         }},error=>{
		       	   console.log('post请求失败', error)
		         })
  }
	clearphonenumber(e){
		this.isphonenumber=e;
  
	}
	isbackup(e){
		 this.backup=e;
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
					  	  this.ismaillist=false;
					  	  this.ismask=false;
					  	  this.rightData=[];
					  	  this.sjinputmodel='';
					  	  for(var i=0;i<this.shejarr.length;i++){
	      	       	this.shejarr[i].checked=false;
	      	      }
	  	}
  }
// 打开社交号
  showmaillist(){
  	this.page='1';
  	this.shejiaolist();
  	this.ismaillist=true;
  	this.ismask=true;
  }
//关闭社交号
  closemaillist(){
  	this.rightData=[];
		this.sjinputmodel='';
		for(var i=0;i<this.shejarr.length;i++){
	     	this.shejarr[i].checked=false;
	  }
  	this.ismaillist=false;
  	this.ismask=false;
  }
  getWeek(result: Date): void {
				var date = new Date(result);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		    var D = date.getDate()<10 ? "0" + date.getDate()+ ' ':date.getDate()+ ' ';
				this.timedate=Y+M+D;
				
	 }
  
  log(time: Date): void {
  	if(time){
  		this.timedates=time.toTimeString().substr(0,8)
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
  
}
