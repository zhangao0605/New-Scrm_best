import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
declare var $: any;
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as setHours from 'date-fns/set_hours';
import * as GlobalUrl from '../../globals';
@Component({
  selector: 'app-clearpowder',
  templateUrl: './clearpowder.component.html',
  styleUrls: ['./clearpowder.component.css']
})
export class ClearpowderComponent implements OnInit {
	 ismask=false;
	 date="";
	 time: Date | null = null;
	 radioValue="";
	 cleartext="";
	 clearshejiao="";
	 timeout='';
	 interval1='';
	 interval2='';
     clearshe=false;
     item:number = 0;
     taskchek=false;
     startdate=new Date();
	 enddate=new Date(new Date().setDate(new Date().getDate()+1));
     start='';
	 end='';
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
	   //周期
	   dingshiarr=[{time1:new Date(0, 0, 0, 0, 0, 0),time2:new Date(0, 0, 0, 0, 0, 0)}];
	   zhouqiarr=[{zhouqiweek:"",time3:new Date(0, 0, 0, 0, 0, 0),time4:new Date(0, 0, 0, 0, 0, 0)}];
	   cycle='A1';
	   messagemodel='';
	   immediately:string=GlobalUrl.prioductUrl +'maintain/zombieCleaning';
	   
	   constructor(private http: HttpClient) { }

     ngOnInit() {}
  
    //开始限制
    disabledDate = (current: Date): boolean => {
     return differenceInCalendarDays(current, this.startdate) <=0;
    };
    //结束限制
     disabledDate1 = (current: Date): boolean => {
     return differenceInCalendarDays(current, this.enddate) <=0;
    };
  
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
  //社交号的模糊查询
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
		        this.clearshejiao=str;
			  	this.clearshe=false;
			  	this.ismask=false;
			  	this.rightData=[];
			  	this.sjinputmodel='';
			  	for(var i=0;i<this.shejarr.length;i++){
  	       	          this.shejarr[i].checked=false;
  	            }
	  	}
  }
  //打开社交好弹框
  showclearshe(){
  	     this.page='1';
	  	 this.shejiaolist();
    	 this.clearshe=true;
    	 this.ismask=true;
    }
   //关闭社交号弹框
    closeclearshe(){
          this.rightData=[];
		  this.sjinputmodel='';
		  for(var i=0;i<this.shejarr.length;i++){
	      	   this.shejarr[i].checked=false;
	      }
    	  this.clearshe=false;
    	  this.ismask=false;
   }
    OnItemClick(value){
      this.item = value;
   }
    
    getWeek(weekdata){
	        var oDate = new Date(weekdata);
			var Y = oDate.getFullYear() + '-';
			var M = (oDate.getMonth() + 1 < 10 ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1) + '-';
		    var D = oDate.getDate()<10 ? "0" + oDate.getDate()+ ' ':oDate.getDate()+ ' ';
		    this.date=Y+M+D;
    }
    getTime(time){
    	if(time){
    		console.log(time.toTimeString().substr(0,8));
    	}
    }
    //立即执行
    clearsure(){
              let formdata1=new FormData();
              formdata1.append('accountId',localStorage.getItem('id'));
    	      //任务名称
    	      if(this.cleartext==''){
    	      	 alert("请填写任务名称");
    	      	 return false;
    	      }else{
    	         formdata1.append('taskName',this.cleartext);
    	      }
    	      
              if(this.wechatid==''){
			  	  alert("请选择社交号");
			  	  return false;
			  }else{
			  	  formdata1.append('socialaccountIds',this.wechatid);
			  }
			  if(this.item==0){
			  	 formdata1.append('way','0');
			  	 formdata1.append('message','');
			  }else{
			  	formdata1.append('way','1');
			  	if(this.messagemodel==''){
			  		alert("请输入消息");
			  		return false;
			  	}else{
			  	    formdata1.append('message',this.messagemodel);
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
			    //周期任务判断
			   if(this.cycle=='A1'){
				        let timearr=[];
					 	for(var i=0;i<this.dingshiarr.length;i++){
					 		timearr.push(this.dingshiarr[i].time1.toTimeString().substr(0,8))
					 		timearr.push(this.dingshiarr[i].time2.toTimeString().substr(0,8))
					 	}
					 	var str=''
					 	for(var j=0;j<timearr.length;j++){
					 		str+=timearr[j]+','
					 	}
					 	str=str.substring(0,str.length-1);
					    formdata1.append('startDate',str);
						formdata1.append('timeType','0');
			   }else if(this.cycle=='B1'){
			   	        let timearrs=[];
					 	for(var i=0;i<this.zhouqiarr.length;i++){
					 		timearrs.push(this.zhouqiarr[i].zhouqiweek)
					 		timearrs.push(this.zhouqiarr[i].time3.toTimeString().substr(0,8))
					 		timearrs.push(this.zhouqiarr[i].time4.toTimeString().substr(0,8))
					 	}
					 	var str=''
					 	for(var j=0;j<timearrs.length;j++){
					 		str+=timearrs[j]+','
					 	}
					 	str=str.substring(0,str.length-1);
					    formdata1.append('startDate',str);
						formdata1.append('timeType','1');
			   }else{
			    	    formdata1.append('startDate','');
						formdata1.append('timeType','2');
			   }
			   formdata1.append('joinPlan','0');
               this.http.post(this.immediately,formdata1).subscribe(response=>{
	      	   if(response['code']==200){
		      	        //任务计划
			      	    this.cleartext='';
						//社交号
						this.wechatid='';
						this.clearshejiao='';
		                // 超时时间
		                this.timeout='';
		                 //开始间隔
		                this.interval1='';
		                 //结束间隔
			      	    this.interval2='';
	         }},error=>{
	       	    console.log('post请求失败', error)
	         })
           
    }
    //确认添加
    addtaskplan(){
    	      let formdata1=new FormData();
              formdata1.append('accountId',localStorage.getItem('id'));
    	      //任务名称
    	      if(this.cleartext==''){
    	      	 alert("请填写任务名称");
    	      	 return false;
    	      }else{
    	         formdata1.append('taskName',this.cleartext);
    	      }
    	      
              if(this.wechatid==''){
			  	  alert("请选择社交号");
			  	  return false;
			  }else{
			  	  formdata1.append('socialaccountIds',this.wechatid);
			  }
			  if(this.item==0){
			  	 formdata1.append('way','0');
			  	 formdata1.append('message','');
			  }else{
			  	formdata1.append('way','1');
			  	if(this.messagemodel==''){
			  		alert("请输入消息");
			  		return false;
			  	}else{
			  	    formdata1.append('message',this.messagemodel);
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
			    //周期任务判断
			   if(this.cycle=='A1'){
				        let timearr=[];
					 	for(var i=0;i<this.dingshiarr.length;i++){
					 		timearr.push(this.dingshiarr[i].time1.toTimeString().substr(0,8))
					 		timearr.push(this.dingshiarr[i].time2.toTimeString().substr(0,8))
					 	}
					 	var str=''
					 	for(var j=0;j<timearr.length;j++){
					 		str+=timearr[j]+','
					 	}
					 	str=str.substring(0,str.length-1);
					    formdata1.append('startDate',str);
						formdata1.append('timeType','0');
			   }else if(this.cycle=='B1'){
			   	        let timearrs=[];
					 	for(var i=0;i<this.zhouqiarr.length;i++){
					 		timearrs.push(this.zhouqiarr[i].zhouqiweek)
					 		timearrs.push(this.zhouqiarr[i].time3.toTimeString().substr(0,8))
					 		timearrs.push(this.zhouqiarr[i].time4.toTimeString().substr(0,8))
					 	}
					 	var str=''
					 	for(var j=0;j<timearrs.length;j++){
					 		str+=timearrs[j]+','
					 	}
					 	str=str.substring(0,str.length-1);
					    formdata1.append('startDate',str);
						formdata1.append('timeType','1');
			   }else{
			    	    formdata1.append('startDate','');
						formdata1.append('timeType','2');
			   }
			   
	    	    var date = new Date(this.startdate);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			    var D = date.getDate()<10 ? "0" + date.getDate()+ ' ':date.getDate()+ ' ';
			    var H=date.getHours()+':';
			    var F=date.getMinutes()<10 ? "0"+date.getMinutes()+':00':date.getMinutes()+':00';
			    this.start=Y+M+D+H+F;
				formdata1.append('startTime',this.start);
		         
		        var date = new Date(this.enddate);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			    var D = date.getDate()<10 ? "0" + date.getDate()+ ' ':date.getDate()+ ' ';
			    var H=date.getHours()+':';
			    var F=date.getMinutes()<10 ? "0"+date.getMinutes()+':00':date.getMinutes()+':00';
			    this.end=Y+M+D+H+F;
			    formdata1.append('endTime',this.end);
	            if(this.radioValue==''){
	            	 alert("请选择优先级");
	            	 return false;
	            }else if(this.radioValue=='A'){
	            	formdata1.append('taskRank','0');
	            }else{
	            	formdata1.append('taskRank','1');
	            }
	            var zhushi=$(".zhushi").html();
	            if(zhushi==''){
	            	alert("请填写");
	            	return false;
	            }else{
	            	 formdata1.append('remark',zhushi);
	            }
	            formdata1.append('joinPlan','1');
               this.http.post(this.immediately,formdata1).subscribe(response=>{
	      	   if(response['code']==200){
		      	        //任务计划
			      	    this.cleartext='';
						//社交号
						this.wechatid='';
						this.clearshejiao='';
		                // 超时时间
		                this.timeout='';
		                 //开始间隔
		                this.interval1='';
		                 //结束间隔
			      	    this.interval2='';
			      	     //优先级
		      	         this.radioValue='';
                        //备注
		      	        $(".zhushi").html('');
	         }},error=>{
	       	    console.log('post请求失败', error)
	         })
    }
    
    getStart(startdate){
        var date = new Date(startdate);
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	    var D = date.getDate()<10 ? "0" + date.getDate()+ ' ':date.getDate()+ ' ';
	    var H=date.getHours()+':';
	    var F=date.getMinutes()<10 ? "0"+date.getMinutes()+':00':date.getMinutes()+':00';
		this.start=Y+M+D+H+F;
        console.log(this.start)
  }
  getEnd(enddate){
	    var date = new Date(enddate);
	    var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	    var D = date.getDate()<10 ? "0" + date.getDate()+ ' ':date.getDate()+ ' ';
	    var H=date.getHours()+':';
	    var F=date.getMinutes()<10 ? "0"+date.getMinutes()+':00':date.getMinutes()+':00';
        this.end=Y+M+D+H+F;
        console.log(this.end)
  }
  showtask(e){
  	if(e==true){
		    $(".quejia").css("display","block");
		    this.surebtn=false;
  	}else{
  		  $(".quejia").css("display","none");
  		   this.surebtn=true;
  	}
  }
  //周期
		changezq(e){
			  	if(e=='A1'){
			  		$(".dingshi").css('display',"block");
			  		$(".zhouqi").css('display',"none");
			  		$(".success").css('display',"block");
			  	}else if(e=='B1'){
			  		$(".dingshi").css('display',"none");
			  		$(".zhouqi").css('display',"block");
			  		$(".success").css('display',"block");
			  	}else if(e=='C1'){
			  		$(".dingshi").css('display',"none");
			  		$(".zhouqi").css('display',"none");
			  		$(".success").css('display',"none");
			  	}
		  }
		  log1(time: Date): void {
					if(time){
						 console.log(time.toTimeString().substr(0,8)); 
					}
			}
		  log2(time: Date): void {
					if(time){
						console.log(time.toTimeString().substr(0,8));
					}
			}
		  log3(time: Date): void {
					if(time){
						 console.log(time.toTimeString().substr(0,8)); 
					}
			}
		  log4(time: Date): void {
					if(time){
						console.log(time.toTimeString().substr(0,8));
					}
			}
		
		//添加定时
		 adddingshi(){
		 	 if(this.dingshiarr.length>4){
		 	 	 alert("不能添加了");
		 	 	 return false;
		 	 }
		 	  this.dingshiarr.push({time1:new Date(0, 0, 0, 0, 0, 0),time2:new Date(0, 0, 0, 0, 0, 0)})
		 	   console.log(this.dingshiarr)
		 }
		// 删除定时
		 delectdingshi(index){
		   	this.dingshiarr.splice(index,1)
		   	console.log(this.dingshiarr)
		 }
		 //添加周期
		 addzhouqi(){
			 	if(this.zhouqiarr.length>4){
			 		 alert("不能添加了");
		 	 	    return false;
			 	}
			 	 this.zhouqiarr.push({zhouqiweek:"",time3:new Date(0, 0, 0, 0, 0, 0),time4:new Date(0, 0, 0, 0, 0, 0)})
		 	   console.log(this.zhouqiarr)
		 }
		 //删除周期
		 delectzhouqi(index){
		   	this.zhouqiarr.splice(index,1)
		   	 console.log(this.zhouqiarr)
		 }
      
         
}
    
