import { Component, OnInit } from '@angular/core';
declare var $: any;
import {HttpClient} from "@angular/common/http";
import * as GlobalUrl from '../../globals';
@Component({
  selector: 'app-pullgroup',
  templateUrl: './pullgroup.component.html',
  styleUrls: ['./pullgroup.component.css']
})
export class PullgroupComponent implements OnInit {
	  ismask=false;
    isout=false;
    groupshe=false;
    latuigroup=false;
    item:number = 0;
    radioValue='';
    timeout='';
	  interval1='';
	  interval2='';
		date = null;
		time: Date | null = null;
		checked1=false;
		taskchek=false;
	  startdate="";
	  enddate="";
	  taskselect="";
	  createdper="";
	  surebtn=true;
	  ishowlaqun=false;
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
    //退群
    tuiqunUrl:string=GlobalUrl.prioductUrl +'chatroom/getChatroomBySocialIdList';
    
    tuiqunData=[];
    tuiqunRightData=[];
    pageIndextui = 1;
	  pageSizetui= 4;
	  totaltui=1;
	  displayDatatui=[];
	  indeterminatetui=false;
	  allCheckedtui=false;
	  pagetui='1';
	  tuimodel='';
	  tuimodelUrl:string=GlobalUrl.prioductUrl +'chatroom/getChatroomBySocialIdListLike';
	 
     //展示名字朋友圈
    showwechatname:string=GlobalUrl.prioductUrl +'socialaccount/getSocialaccountByWeChatId';
     
    wechatName:any=[];
     //拉群初始化数据
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
   //拉群模糊查询
    bymodelUrl:string=GlobalUrl.prioductUrl +'friend/getFriendBySocialIdLike';
    
    //分组
    gorouplist=[];
    groupURL:string=GlobalUrl.prioductUrl +'groups/getGroups';
   
   //踢群
    tiqunUrl:string=GlobalUrl.prioductUrl +'chatroom/getAllChatroomBySocialIdList';
     
    chatNameData=[];
    chatgroupname='';
    tiqunlistUrl:string=GlobalUrl.prioductUrl +'chatroom/getChatroomMsg';
     
    totalti=1;
    pageIndexti=1;
    pageSizeti=7;
    tiqunData=[];
    displayDatati=[];
	  indeterminateti=false;
	  allCheckedti=false;
	  chatroomId='';
	  types='0';
	  onechrommlist:any={};
	  device='';
	  qunzutrue:false;
	  changemess:string=GlobalUrl.prioductUrl +'chatroom/getChatRoomMsgById2';
	   
	  taskmodel='';
	  datesmonthyear='';
	  avehicle='';
	  pullgroupids='';
	  lastbigUrl:string=GlobalUrl.prioductUrl +'operate/pullkickChatroom';
	   
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
    isoneChatroom=false;
    isonechat(e){
    	this.isoneChatroom=e;
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
		   tiquncheckdata=[];
		  //踢群全选
		  allgroup(e){
               if(e==true){
		               	 for(var i=0;i<this.tiqunData.length;i++){
		    	 	  	          this.tiqunData[i].checked=true;
		    	 	         }
						      	if(this.tiquncheckdata.length==0){
							    		 	for(var i=0;i<this.tiqunData.length;i++){
							    		 		this.tiquncheckdata.push(this.tiqunData[i])
							    		 	}
						    		 }else{
								   	   for(var i=0;i<this.tiqunData.length;i++){
								    		 	    for(var j=0;j<this.tiquncheckdata.length;j++){
								            	  	 if(this.tiquncheckdata.indexOf(this.tiqunData[i])==-1){
										    				      this.tiquncheckdata.push(this.tiqunData[i])
										    			     }
									           }
						           }
						    		 }
						   }else{
						   	   for(var i=0;i<this.tiqunData.length;i++){
		    	 	  	          this.tiqunData[i].checked=false;
		    	 	       }
						   	   for(var i=0;i<this.tiqunData.length;i++){
							    	  for(var j=0;j<this.tiquncheckdata.length;j++){
							    	  	  if(this.tiqunData[i].id=== this.tiquncheckdata[j].id){
										         this.tiquncheckdata.splice(j,1)
									        }
							    	  }
								   }
						   }
				       console.log(this.tiquncheckdata)
		  }
      //踢群单选
		  shougroup(item,index){
		  	 if(item.checked==true){
				   this.tiquncheckdata.push(item);
			   }else{
					 for(var i=0;i<this.tiquncheckdata.length;i++){
					 	  if(this.tiquncheckdata[i].id==item.id){
					 	  	this.tiquncheckdata.splice(i,1);
					 	  }
					 }
			  }
			   console.log(this.tiquncheckdata);
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
						       // console.log(this.wechatid)
						       this.shejiao=str;
							  	 this.groupshe=false;
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
    //关闭踢群
    closeisout(){
    	this.chatroomId='';
    	this.ismask=false;
    	this.isout=false;
    }
    //显示踢群
     showisout(){
     	 if(this.wechatid==''){
	     	  alert("请选择社交号")
	     }else{
	     	      let formdata1=new FormData();
			        formdata1.append('accountId',localStorage.getItem('id'));
			        formdata1.append('weChatIds',this.wechatid);
		          this.http.post(this.tiqunUrl,formdata1).subscribe(response=>{
		      	  if(response['code']==200){
		      	  	this.chatNameData=response['data'].chatroomList;
		      	    if(this.chatNameData.length>=1){
		      	    	
		      	    	    this.chatroomId=response['data'].chatroomList[0].id;
			      	    	  let formdata1=new FormData();
							        formdata1.append('chatroomId',this.chatroomId);
						          this.http.post(this.tiqunlistUrl,formdata1).subscribe(response=>{
						      	  if(response['code']==200){
						      	 	  this.tiqunData=response['data'].chatroomMembers;
						      	 	  for(var i=0;i<this.tiqunData.length;i++){
						      	 	  	this.tiqunData[i].checked=false;
						      	 	  }
						      	 	  this.onechrommlist=response['data'];
						      	 	  this.device=response['data'].socialaccount.device.deviceNumber;
						         }},error=>{
						       	   console.log('post请求失败', error)
						         })
		      	    }else{
		      	    	this.tiqunData=[];
		      	    	this.onechrommlist={};
		      	    	this.device='';
		      	    }
		         }},error=>{
		       	   console.log('post请求失败', error)
		         })
	     	    this.ismask=true;
    	      this.isout=true;
	     }
     	
    }
    //展示群
     bychatnamechange(e){
     	 if(e){
     	 	      this.chatroomId=e;
     	 	      let formdata1=new FormData();
			        formdata1.append('chatroomId',this.chatroomId);
		          this.http.post(this.tiqunlistUrl,formdata1).subscribe(response=>{
		      	  if(response['code']==200){
		      	 	  this.tiqunData=response['data'].chatroomMembers;
		      	 	  for(var i=0;i<this.tiqunData.length;i++){
		      	 	  	this.tiqunData[i].checked=false;
		      	 	  }
		      	 	  this.onechrommlist=response['data'];
		      	 	  this.device=response['data'].socialaccount.device.deviceNumber;
		         }},error=>{
		       	   console.log('post请求失败', error)
		         })
     	 }
     }
    //改变消息数
     messagelist(){
     	 	      let formdata1=new FormData();
			        formdata1.append('chatroomId',this.chatroomId);
			        formdata1.append('type',this.types);
		          this.http.post(this.changemess,formdata1).subscribe(response=>{
		      	  if(response['code']==200){
		      	 	  this.tiqunData=response['data'].chatroomMembers;
		         }},error=>{
		       	   console.log('post请求失败', error)
		         })
     }
     changemseeage(event){
       this.types=event.target.value;
       this.messagelist();
     	  
			  
     } 
      //踢群变化
	   currentPageDataChangeti($event: Array<{}>): void{
	 	   this.displayDatati = $event;
	 	   this.refreshStatusti();
    }
		 //踢群单选功能
		 refreshStatusti(): void {
		    const allChecked = this.displayDatati.every(value => value.checked === true);
		    const allUnChecked = this.displayDatati.every(value => !value.checked);
		    this.allCheckedti= allChecked;
		    this.indeterminateti= (!allChecked) && (!allUnChecked);
		 }
		  //踢群全选功能
		  checkAllti(value: boolean): void {
		    this.displayDatati.forEach(data => {
		        data.checked = value;
		    });
		    this.refreshStatusti();
		 }
    //打开社交好
     showgroupshe(){
     	  this.page='1';
     	  this.shejiaolist();
     	  this.ismask=true;
     	  this.groupshe=true;
     }
     //关闭社交号
     nogroupshe(){
        this.rightData=[];
			  this.sjinputmodel='';
			  for(var i=0;i<this.shejarr.length;i++){
	      	  this.shejarr[i].checked=false;
	      }
     	  this.ismask=false;
     	  this.groupshe=false;
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
	   //关闭退群
     clselatuigroup(){
     	  this.tuimodel='';
     	  this.ismask=false;
     	  this.latuigroup=false;
     }
     //展示退群
     showlatuigroup(){
     	if(this.wechatid==''){
     		alert("请选择社交号")
     	}else{
     		 this.ismask=true;
     	   this.latuigroup=true;
     	   this.tuiqunlist();
     	}
     	  
     }
   //退群列表
	  tuiqunlist(){
	  	           let formdata1=new FormData();
				         formdata1.append('accountId',localStorage.getItem('id'));
				         formdata1.append('page',this.pagetui);
				         formdata1.append('weChatIds',this.wechatid);
				         this.http.post(this.tuiqunUrl,formdata1).subscribe(response=>{
				      	 if(response['code']==200){
				      	   this.totaltui=response['data'].chatroomCount;
				      	   this.tuiqunData=response['data'].chatroomList;
				        }},error=>{
				       	  console.log('post请求失败', error)
				        })
	  }
	   //退群变化
	   currentPageDataChangetui($event: Array<{}>): void{
	 	   this.displayDatatui = $event;
	 	   this.refreshStatustui();
    }
		 //退群单选功能
		 refreshStatustui(): void {
		    const allChecked = this.displayDatatui.every(value => value.checked === true);
		    const allUnChecked = this.displayDatatui.every(value => !value.checked);
		    this.allCheckedtui= allChecked;
		    this.indeterminatetui= (!allChecked) && (!allUnChecked);
		 }
		  //退群全选功能
		  checkAlltui(value: boolean): void {
		    this.displayDatatui.forEach(data => {
		        data.checked = value;
		    });
		    this.refreshStatustui();
		 }
		//单选添加退群
   oneaddtui(item,e){
      	 if(e==true){
				   this.tuiqunRightData.push(item);
			   }else{
					 for(var i=0;i<this.tuiqunRightData.length;i++){
					 	  if(this.tuiqunRightData[i].id==item.id){
					 	  	this.tuiqunRightData.splice(i,1);
					 	  }
					 }
			  }
	       console.log(this.tuiqunRightData)
   }
  //全选添加退群
	alladdtui(e){
			if(e==true){
			      	if(this.tuiqunRightData.length==0){
				    		 	for(var i=0;i<this.tuiqunData.length;i++){
				    		 		this.tuiqunRightData.push(this.tuiqunData[i])
				    		 	}
			    		 }else{
					   	   for(var i=0;i<this.tuiqunData.length;i++){
					    		 	    for(var j=0;j<this.tuiqunRightData.length;j++){
					            	  	 if(this.tuiqunRightData.indexOf(this.tuiqunData[i])==-1){
							    				      this.tuiqunRightData.push(this.tuiqunData[i])
							    			     }
						           }
			           }
			    		 }
			   }else{
			   	   for(var i=0;i<this.tuiqunData.length;i++){
				    	  for(var j=0;j<this.tuiqunRightData.length;j++){
				    	  	  if(this.tuiqunData[i].id=== this.tuiqunRightData[j].id){
							         this.tuiqunRightData.splice(j,1)
						        }
				    	  }
					   }
			   }
				   console.log(this.tuiqunRightData)
	}
  //删除退群
   deletcttui(item,index){
   	 this.tuiqunRightData.splice(index,1);
   	 item.checked=false;
   	 this.refreshStatustui();
   }
   //退群分页
   searchDatatui(e){
	   	this.pagetui=e;
	   	if(this.tuimodel){
	   		         let formdata1=new FormData();
				         formdata1.append('accountId',localStorage.getItem('id'));
				         formdata1.append('page',this.pagetui);
				         formdata1.append('weChatIds',this.wechatid);
				         formdata1.append('message',this.tuimodel);
				         this.http.post(this.tuimodelUrl,formdata1).subscribe(response=>{
				      	 if(response['code']==200){
				      	   this.totaltui=response['data'].chatroomCount;
				      	   this.tuiqunData=response['data'].chatroomList;
				        }},error=>{
				       	  console.log('post请求失败', error)
				        })
	   	}else{
	   		this.tuiqunlist();
	   	}
   }
   
   //搜索改变退群
   bymodelchangetui(){
   	   this.pagetui='1';
		   if(this.tuimodel==''){
		   	 alert("请输入搜索内容")
		   }else{
		             let formdata1=new FormData();
				         formdata1.append('accountId',localStorage.getItem('id'));
				         formdata1.append('page',this.pagetui);
				         formdata1.append('weChatIds',this.wechatid);
				         formdata1.append('message',this.tuimodel);
				         this.http.post(this.tuimodelUrl,formdata1).subscribe(response=>{
				      	 if(response['code']==200){
				      	   this.totaltui=response['data'].chatroomCount;
				      	   this.tuiqunData=response['data'].chatroomList;
				        }},error=>{
				       	  console.log('post请求失败', error)
				        })
		   }
   } 
   //展示拉群
   showlaqun(){
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
	     	   this.ishowlaqun=true;
    	     this.ismask=true;
	     }
   }
   //关闭拉群
   closelaqun(){
   	   this.wchatnameid='';
    	 this.forwardmodel='';
       this.ishowlaqun=false;
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
		//拉群确定按钮
		pullgroup(){
			if(this.sendcirRightData.length==0){
				alert("请选择拉群");
				return false;
			}else{
				var str='';
				var strid='';
				for(var i=0;i<this.sendcirRightData.length;i++){
					str+=this.sendcirRightData[i].nickName+',';
					strid+=this.sendcirRightData[i].id+',';
				}
				strid=strid.substring(0,strid.length-1);
				str=str.substring(0,str.length-1);
				$(".laqun").html(str);
				this.pullgroupids=strid;
				console.log(this.pullgroupids);
				this.ishowlaqun=false;
				this.ismask=false;
				this.sendcirRightData=[];
			}
		}
		tuiqunids='';
		//退群确定按钮
		tuisure(){
			if(this.tuiqunRightData.length==0){
				alert("请选择退群");
				return false;
			}else{
				var str='';
				var strid='';
				for(var i=0;i<this.tuiqunRightData.length;i++){
					str+=this.tuiqunRightData[i].chatroomName+',';
					strid+=this.tuiqunRightData[i].id+',';
				}
				strid=strid.substring(0,strid.length-1);
				str=str.substring(0,str.length-1);
				this.tuiqunids=strid;
				this.latuigroup=false;
				this.ismask=false;
				this.tuiqunRightData=[];
				$(".tuiqun").html(str);
			}
		}
		tiqunids='';
		//踢群确定按钮
		tiqunsure(){
		   if(this.tiquncheckdata.length==0){
		   	 alert("请选择踢群");
		   	 return false;
		   }else{
			   	 var str='';
					 var strid='';
					for(var i=0;i<this.tiquncheckdata.length;i++){
						str+=this.tiquncheckdata[i].memberName+',';
						strid+=this.tiquncheckdata[i].id+',';
					}
					strid=strid.substring(0,strid.length-1);
					str=str.substring(0,str.length-1);
					this.tiqunids=strid;
					$(".tiqun").html(str);
					this.isout=false;
					this.ismask=false;
					console.log(this.tiqunids);
		   }
		}
		//立即执行
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
            //拉群
            if(this.item==0){
            	formdata1.append('type','0');
            	if(this.pullgroupids==''){
            		alert("请选择拉群人");
            		return false;
            	}else{
            		formdata1.append('wechat',this.pullgroupids);
            	}
            	if(this.isoneChatroom==true){
            		alert('1')
            		formdata1.append('oneChatroom','1');
            	}else{
            		formdata1.append('oneChatroom','0');
            	}
            }else if(this.item==1){
            	formdata1.append('type','1');
            	formdata1.append('chatroomIds',this.chatroomId);
            	if(this.tiqunids==''){
            		alert("请选择踢群人");
            		return false;
            	}else{
            		formdata1.append('wechat',this.tiqunids);
            	}
            }else{
            	formdata1.append('type','2');
            	if(this.tuiqunids==''){
            		alert("请选择退群人");
            		return false;
            	}else{
            		formdata1.append('wechat',this.tuiqunids);
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
					   this.http.post(this.lastbigUrl,formdata1).subscribe(response=>{
				     if(response['code']==200){
			      	  	this.taskmodel='';
			      	  	this.wechatid='';
			      	  	this.shejiao='';
			      	  	this.radioValue='';
			      	  	this.date='';
			      	  	$(".laqun").html("");
			      	  	this.pullgroupids='';
			      	  	$(".tiqun").html("");
			      	  	this.tiqunids='';  
			      	  	this.chatroomId='';
			      	  	$(".tuiqun").html("");
			      	  	this.tuiqunids='';
			      	  	this.timeout='';
			      	  	this.interval1='';
			      	  	this.interval2='';
				     }},error=>{
				       	  console.log('post请求失败', error)
				     })
		}
}
