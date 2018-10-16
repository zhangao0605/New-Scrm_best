import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as GlobalUrl from '../../globals';
@Component({
  selector: 'app-upgradeplug',
  templateUrl: './upgradeplug.component.html',
  styleUrls: ['./upgradeplug.component.css']
})
export class UpgradeplugComponent implements OnInit {
	 ismask=false;
	 upgradtext="";
	 upgradshejiao="";
	 radioValue="";
	 dates="";
	 time: Date | null = null;
	 timedate='';
   upgradshe=false;
   timeout='';
	 interval1='';
	 interval2='';
	 //选择社交号
   shejiaoUrl:string=GlobalUrl.prioductUrl+'socialaccount/getAllSocialaccountTo';
   searchURL:string=GlobalUrl.prioductUrl+'socialaccount/getAllSocialaccountByNameTo';
   shejarr=[];
   pageIndex = 1;
   pageSize= 4;
   total=1;
   page="1";
   sjinputmodel='';
   rightData=[];
   wechatid='';
   immediately:string=GlobalUrl.prioductUrl+'maintain/upgradePlugin';
  
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
				        this.upgradshejiao=str;
					  	  this.upgradshe=false;
					  	  this.ismask=false;
					  	  this.rightData=[];
					  	  this.sjinputmodel='';
					  	  for(var i=0;i<this.shejarr.length;i++){
	      	       	this.shejarr[i].checked=false;
	      	      }
	  	}
  }
  //关闭社交号
  closeupgradshe(){
	    this.rightData=[];
			this.sjinputmodel='';
			for(var i=0;i<this.shejarr.length;i++){
		      	this.shejarr[i].checked=false;
		  }
	  	this.ismask=false;
	  	this.upgradshe=false;
  }
  //打开社交号
  showupgradshe(){
  	 this.page='1';
  	 this.shejiaolist();
  	 this.ismask=true;
  	 this.upgradshe=true;
  }
   getWeek(weekdata){
    	    var oDate = new Date(weekdata);
					var Y = oDate.getFullYear() + '-';
					var M = (oDate.getMonth() + 1 < 10 ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1) + '-';
			    var D = oDate.getDate()<10 ? "0" + oDate.getDate()+ ' ':oDate.getDate()+ ' ';
			    this.dates=Y+M+D;
			    
  }
   getTime(time){
    	if(time){
    		this.timedate=time.toTimeString().substr(0,8);
    	
    	}
   }
   upgradsure(){
	            let formdata1=new FormData();
              formdata1.append('accountId',localStorage.getItem('id'));
   	        //任务名称
    	      if(this.upgradtext==''){
    	      	 alert("请填写任务名称");
    	      	 return false;
    	      }else{
    	        formdata1.append('taskName',this.upgradtext);
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
           }else if(this.radioValue=="普通"){
           	  formdata1.append('taskRank','0');
           }else{
           	  formdata1.append('taskRank','1');
           }
            //年月日
           if(this.dates==''){
            	alert("请选择年月日");
            	 return false;
           }else{
           	  console.log(this.dates)
           }
           //时分秒
            if(this.timedate==''){
            	 alert("请选择时分秒");
            	 return false;
           }else{
            	formdata1.append('startTime',this.dates+this.timedate);
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
					   this.http.post(this.immediately,formdata1).subscribe(response=>{
	      	   if(response['code']==200){
		      	        //任务计划
			      	      this.upgradtext='';
										//社交号
										this.wechatid='';
										this.upgradshejiao='';
		                // 超时时间
		                this.timeout='';
		                //开始间隔
		                this.interval1='';
		               //结束间隔
			      	     this.interval2='';
			      	     //优先级
			      	     this.radioValue='';
			      	     //执行时间
			      	     this.timedate='';
			      	     this.dates='';
	         }},error=>{
	       	    console.log('post请求失败', error)
	         })
           
   }
}
