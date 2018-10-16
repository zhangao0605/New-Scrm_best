import { Component, OnInit } from '@angular/core';
declare var $: any;
import {HttpClient} from "@angular/common/http";
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as setHours from 'date-fns/set_hours';
import * as GlobalUrl from '../../globals';
@Component({
  selector: 'app-circlegive',
  templateUrl: './circlegive.component.html',
  styleUrls: ['./circlegive.component.css']
})
export class CirclegiveComponent implements OnInit {
		radioValue='';
	  seenumber='';
    timeout='';
	  interval1='';
	  interval2='';
		ismask=false;
	  circelshe=false;
	  item:number = 0;
	  chosekehu=false;
	  date = null;
	  taskchek=false;
	  startdate=new Date();
	  enddate=new Date(new Date().setDate(new Date().getDate()+1));
    start='';
    end='';
	  taskselect="";
	  createdper="";
	  surebtn=true;
		time: Date | null = null;
	  //周期
		dingshiarr=[{time1:new Date(0, 0, 0, 0, 0, 0),time2:new Date(0, 0, 0, 0, 0, 0)}];
	  zhouqiarr=[{zhouqiweek:"",time3:new Date(0, 0, 0, 0, 0, 0),time4:new Date(0, 0, 0, 0, 0, 0)}];
	  cycle='A1';
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
    //展示名字朋友圈
    showwechatname:string=GlobalUrl.prioductUrl +'socialaccount/getSocialaccountByWeChatId';
     
    wechatName:any=[];
    //转发朋友圈初始化数据
    sendcirUrl:string=GlobalUrl.prioductUrl +'friend/getFriendBySocialId';
     
    sendcirData=[];
    sendcirRightData=[];
    totalforward=1;
    forwardpage='1';
    pageIndexforward=1;
    pageSizeforward=4;
    displayDataforward=[];
	  indeterminateforward=false;
	  allCheckedforward=false;
	  forwardmodel='';
	  wchatnameid='';
	  nowechatid='';
    //转发朋友圈模糊查询
    bymodelUrl:string=GlobalUrl.prioductUrl +'friend/getFriendBySocialIdLike';
     
    //分组
     gorouplist=[];
     groupURL:string=GlobalUrl.prioductUrl +'groups/getGroups';
      
     taskmodel='';
     thecustomerids='';
     lastbigUrl:string=GlobalUrl.prioductUrl +'operate/friendsLikes';
      
     constructor(private http: HttpClient) { }

  ngOnInit() {
  	       let formdata2=new FormData();
	         formdata2.append('accountId',localStorage.getItem('id'));
	         this.http.post(this.groupURL,formdata2).subscribe(response=>{
	      	 if(response['code']==200){
	      		 this.gorouplist=response['data'].groupsList;
	        }},error=>{
	       	  console.log('post请求失败', error)
	        })
  }
    //开始限制
    disabledDate = (current: Date): boolean => {
     return differenceInCalendarDays(current, this.startdate) <=0;
    };
    //结束限制
     disabledDate1 = (current: Date): boolean => {
     return differenceInCalendarDays(current, this.enddate) <=0;
    };
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
				        this.nowechatid=shejiaoids;
				        console.log(this.wechatid)
				        this.shejiao=str;
					  	  this.circelshe=false;
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
    //关闭指定客户
    nocircelshe(){
    	 this.rightData=[];
			 this.sjinputmodel='';
			 for(var i=0;i<this.shejarr.length;i++){
	      	  this.shejarr[i].checked=false;
	     }
    	this.ismask=false;
    	this.circelshe=false;
    }
  
   //打开社交好
    showcircelshe(){
    	this.page='1';
    	this.shejiaolist();
    	this.circelshe=true;
    	this.ismask=true;
    }
  
    
     getWeek(result: Date): void {
				var date = new Date(result);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		    var D = date.getDate()<10 ? "0" + date.getDate()+ ' ':date.getDate()+ ' ';
				console.log(Y+M+D)
	 }
  
  log(time: Date): void {
  	if(time){
  		console.log(time.toTimeString().substr(0,8));
  	}
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
		 
		//打开指定客户
    showchosekehu(){
    	 if(this.wechatid==''){
	     	  alert("请选择社交号")
	     }else{
	     	   this.wechatid=this.nowechatid;
	         let formdata1=new FormData();
	         formdata1.append('weChatIds',this.wechatid);
	         this.http.post(this.showwechatname,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	   this.wechatName=response['data'].socialaccountList;
	      	   console.log(this.wechatName)
	        }},error=>{
	       	  console.log('post请求失败', error)
	        })
	          this.sendCirlist();
	     	  	this.chosekehu=true;
    	      this.ismask=true;
	     }
    }
    //关闭指定客户
    closechosekehu(){
    	 this.wchatnameid='';
    	  this.forwardmodel='';
    	 this.chosekehu=false;
    	 this.ismask=false;
    }
		  
   
  //朋友圈社交号列表
  sendCirlist(){
           let formdata1=new FormData();
		       formdata1.append('weChatIds',this.wechatid);
		       formdata1.append('accountId',localStorage.getItem('id'));
		       formdata1.append('page',this.forwardpage);
	         this.http.post(this.sendcirUrl,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	    	this.totalforward=response['data'].friendCount; 
	      	 	    this.sendcirData=response['data'].friendList; 
	      	 	   console.log(this.sendcirData)
	         }},error=>{
	       	   console.log('post请求失败', error)
	         })
  }
  //朋友圈社交号分页
  searchDataforward(e){
	  	this.forwardpage=e;
	  	if(this.wechatid){
	  		this.modellist();
	  	}else{
	  		this.sendCirlist();
	  	}
  }
     //朋友圈社交号变化
	   currentPageDataChangeforward($event: Array<{}>): void{
	 	   this.displayDataforward = $event;
	 	   this.refreshStatusforward();
    }
		 //朋友圈社交号单选功能
		 refreshStatusforward(): void {
		    const allChecked = this.displayDataforward.every(value => value.checked === true);
		    const allUnChecked = this.displayDataforward.every(value => !value.checked);
		    this.allCheckedforward = allChecked;
		    this.indeterminateforward = (!allChecked) && (!allUnChecked);
		 }
		  //朋友圈社交号全选功能
		  checkAllforward(value: boolean): void {
		    this.displayDataforward.forEach(data => {
		        data.checked = value;
		    });
		    this.refreshStatusforward();
		 }
      //转发朋友圈单选添加
		  oneaddforward(item,e){
		  		if(e==true){
				    this.sendcirRightData.push(item)
			    }else{
						 for(var i=0;i<this.sendcirRightData.length;i++){
						 	  if(this.sendcirRightData[i].id==item.id){
						 	  	this.sendcirRightData.splice(i,1)
						 	  }
						 }
			   }
	       console.log(this.sendcirRightData)
		  }
		   //转发朋友圈全选添加
		alladdforward(e){
						if(e==true){
						      	if(this.sendcirRightData.length==0){
							    		 	for(var i=0;i<this.sendcirData.length;i++){
							    		 		this.sendcirRightData.push(this.sendcirData[i])
							    		 	}
						    		 }else{
								   	   for(var i=0;i<this.sendcirData.length;i++){
								    		 	    for(var j=0;j<this.sendcirRightData.length;j++){
								            	  	 if(this.sendcirRightData.indexOf(this.sendcirData[i])==-1){
										    				      this.sendcirRightData.push(this.sendcirData[i])
										    			     }
									           }
						           }
						    		 }
						   }else{
						   	   for(var i=0;i<this.sendcirData.length;i++){
							    	  for(var j=0;j<this.sendcirRightData.length;j++){
							    	  	  if(this.sendcirData[i].id=== this.sendcirRightData[j].id){
										         this.sendcirRightData.splice(j,1)
									        }
							    	  }
								   }
						   }
				   console.log(this.sendcirRightData)
	}
   //删除
		deletctforward(item,index){
			this.sendcirRightData.splice(index,1);
			item.checked=false;
			this.refreshStatusforward();
		}
    //搜索列表
      modellist(){
      	         let formdata1=new FormData();
      	         formdata1.append('weChatIds',this.wechatid);
				         formdata1.append('accountId',localStorage.getItem('id'));
				         formdata1.append('page',this.forwardpage);
				         formdata1.append('message',this.forwardmodel);
				         this.http.post(this.bymodelUrl,formdata1).subscribe(response=>{
				      	 if(response['code']==200){
				      	  	this.totalforward=response['data'].friendCount; 
	      	 	        this.sendcirData=response['data'].friendList; 
				        }},error=>{
				       	  console.log('post请求失败', error)
				        })
      }
     
    //通过搜索内容改变
		bymodelchange(){
			this.forwardpage='1';
			if(this.forwardmodel==''){
				alert("请输入搜索内容")
			}else{
				this.modellist();
			}
		}
    //通过id修改
		bywchatnameidchange(e){
			 this.forwardpage='1';
			if(e){
			   this.wechatid=e;
			   this.sendCirlist();
			}else{
				 this.wechatid=this.nowechatid;
				 this.sendCirlist();
			}
			   
		}
		thecustomer(){
			if(this.sendcirRightData.length==0){
				alert("请勾选客户")
			}else{
				var str='';
				var strid='';
				for(var i=0;i<this.sendcirRightData.length;i++){
					str+=this.sendcirRightData[i].nickName+',';
					strid+=this.sendcirRightData[i].id+',';
				}
				str=str.substring(0,str.length-1);
				strid=strid.substring(0,strid.length-1);
				console.log(str);
				console.log(strid);
				$(".zhiding").html(str);
				this.chosekehu=false;
				this.thecustomerids=strid;
				this.ismask=false;
				this.sendcirRightData=[];
			}
		}
		
		//立即执行
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
        // 指定
        if(this.item==0){
        	 formdata1.append('isAll','0');
        }else{
        	 formdata1.append('isAll','1');
        	if(this.thecustomerids==''){
        		alert("请勾选指定客户");
        		return false;
        	}else{
        		formdata1.append('wechat',this.thecustomerids);
        	}
        }
        //点赞数量
        if(this.seenumber==''){
        	alert("请选择查看数量");
        	return false;
        }else{
        	formdata1.append('number',this.seenumber);
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
					   formdata1.append('joinPlan','1');
					   this.http.post(this.lastbigUrl,formdata1).subscribe(response=>{
				     if(response['code']==200){
				     	  this.taskmodel='';
				     	  this.shejiao='';
				     	  this.wechatid='';
				     	  $(".zhiding").html('');
				     	  this.thecustomerids='';
				     	  this.seenumber='';
				     	  this.timeout='';
				     	  this.interval1='';
				     	  this.interval2='';
				     	  console.log(response)
				     }},error=>{
				       	   console.log('post请求失败', error);
				     })
		}
    //确认添加
    addtaskplan(){
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
	        // 指定
	        if(this.item==0){
	        	 formdata1.append('isAll','0');
	        }else{
	        	 formdata1.append('isAll','1');
	        	if(this.thecustomerids==''){
	        		alert("请勾选指定客户");
	        		return false;
	        	}else{
	        		formdata1.append('wechat',this.thecustomerids);
	        	}
	        }
	        //点赞数量
	        if(this.seenumber==''){
	        	alert("请选择查看数量");
	        	return false;
	        }else{
	        	formdata1.append('number',this.seenumber);
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
							formdata1.append('startTime', this.start);
				         
				      var date = new Date(this.enddate);
							var Y = date.getFullYear() + '-';
							var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
					    var D = date.getDate()<10 ? "0" + date.getDate()+ ' ':date.getDate()+ ' ';
					    var H=date.getHours()+':';
					    var F=date.getMinutes()<10 ? "0"+date.getMinutes()+':00':date.getMinutes()+':00';
					    this.end=Y+M+D+H+F;
							formdata1.append('endTime', this.end);
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
					   this.http.post(this.lastbigUrl,formdata1).subscribe(response=>{
				     if(response['code']==200){
				     	  this.taskmodel='';
				     	  this.shejiao='';
				     	  this.wechatid='';
				     	  $(".zhiding").html('');
				     	  this.thecustomerids='';
				     	  this.seenumber='';
				     	  this.timeout='';
				     	  this.interval1='';
				     	  this.interval2='';
				     	  this.radioValue='';
		      	    $(".zhushi").html('');
				     }},error=>{
				       	   console.log('post请求失败', error);
				     })
    }
}
