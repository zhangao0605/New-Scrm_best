import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as setHours from 'date-fns/set_hours';
import * as GlobalUrl from '../../globals';
    
declare var $: any;
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-grouppictures',
  templateUrl: './grouppictures.component.html',
  styleUrls: ['./grouppictures.component.css']
})
export class GrouppicturesComponent implements OnInit {
	 taskmodel='';
	 timeout='';
	 interval1='';
	 interval2='';
	 radioValue='';
	checkeds=false;
	istuwen=false;
	ismask=false;
	isgroup=false;
	item:number = 0;
	date = null;
	time: Date | null = null;
	 fileList = [
	   
    ];
	  previewImage = '';
	  previewVisible = false;
	  taskchek=false;
	  startdate=new Date();
	  enddate=new Date(new Date().setDate(new Date().getDate()+1));
	  start='';
	  end='';
	  taskselect="";
	  createdper="";
	  surebtn=true;
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
	  //勾选图文
	  ispict=true;
	  istext=false;
	  picttext="图片";
	  tuwenUrl:string=GlobalUrl.prioductUrl +'picture/getAllTwoByPage';
	  
		//文字
		totaltext=1;
		pageIndextext=1;
		pageSizetext=4;
		pagetext='1';
		displayDatatext=[];
		indeterminatetext=false;
		allCheckedtext=false;
		textRightData=[];
		textData=[];
	  //图片
		totalpict=1;
		pageIndexpict=1;
		pageSizepict=4;
		pagepict='1';
		src='http://192.168.1.241:8081/';
		displayDatapict=[];
		indeterminatepict=false;
		allCheckedpict=false;
		pictRightData=[];
		pictData=[];
		//获取所有标签
	  allTagUrl:string=GlobalUrl.prioductUrl +'tag/getAllTag';
	 
	  allTagList=[];
	  indexclicktag='';
	  //根据标签改变图文
	  bytagchangeUrl:string=GlobalUrl.prioductUrl +'picture/getTwoByTagName';
	  
	  //根据输入框内容改变图文
	  bymodelchangeUrl:string=GlobalUrl.prioductUrl +'picture/getAllTwoByTitleName';
	  
	  tuwenmodel='';
	  picttag='';
	  //客户或群
	  perorgroup='';
	  isperbutton=false;
	  ispergroup=false;
	  personorgroup='客户';
	  personGroup:string=GlobalUrl.prioductUrl +'chatroom/getTwoByIdList';
	  
	  personData=[];
	  totalperson=1;
		pageIndexperson=1;
		pageSizeperson=4;
		personpage='1';
		displayDataperson=[];
		indeterminateperson=false;
		allCheckedperson=false;
		personRightData=[];
		showwechatname:string=GlobalUrl.prioductUrl +'socialaccount/getSocialaccountByWeChatId';
		
		wechatName=[];
		nowechatid='';
		isperson=false;
		isgroups=false;
		groupsData=[];
		totalgroups='1';
		pageIndexgroups=1;
		pageSizegroups=4;
		displayDatagroups=[];
		indeterminategroups=false;
		allCheckedgroups=false;
		groupsRightData=[];
		quejiazhenduo='客户';
		persontags='';
		personmodel='';
		clicktagper='';
		bytagchangperson:string=GlobalUrl.prioductUrl +'chatroom/getTwoByTagName';
		
		bymodelchangeperson:string=GlobalUrl.prioductUrl +'chatroom/getAllTwoByTitleName';
		
		kehudivmodel='';
		allpersonsDatas=[];
		allGroupsDatas=[];
		twosDatas=[];
		allpersonsids='';
		allGroupsids='';
		twosDatasids='';
		allpersonorgrop:string=GlobalUrl.prioductUrl +'chatroom/getContactAndChatroom';
		
		thespecifiedids='';
		pictids='';
		textids='';
		inputdivmodel='';
		filesimg:any={};
		joinchecked=false;
		alloperate:string=GlobalUrl.prioductUrl +'operate/groupTextPictures';
		
		
  constructor(private http: HttpClient) { }

   ngOnInit() {}
   
   //通过值展示选择按钮
    changeperorgroup(e){
    	  	if(this.wechatid==''){
    		alert("请选择社交号");
    		return false;
    	}else{
    		 this.perorgroup=e;
    		 if(this.perorgroup=='所有客户'){
    		     this.isperbutton=false;
    		     this.kehudivmodel='';
    		     let formdata1=new FormData();
		    	   formdata1.append('accountId',localStorage.getItem('id'));
		    	   formdata1.append('type','0');
		    	   formdata1.append('weChatIds',this.wechatid);
		         this.http.post(this.allpersonorgrop,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	    this.allpersonsDatas=response['data'].contactList;
		      	    var str='';
		      	    var strid='';
		      	    for(var i=0;i<this.allpersonsDatas.length;i++){
		      	    	 str+=this.allpersonsDatas[i].nickName+',';
		      	    	 strid+=this.allpersonsDatas[i].id+','+'0'+',';
		      	    }
		      	    str=str.substring(0,str.length-1);
		      	    strid=strid.substring(0,strid.length-1);
		      	   this.allpersonsids=strid;
		      	   console.log("所有客户:"+this.allpersonsids)
		      	   this.kehudivmodel=str;
		         }},error=>{
		       	   console.log('post请求失败', error)
		         })
    		 }else if(this.perorgroup=='所有群'){
    		 	   this.isperbutton=false;
    		 	   this.kehudivmodel='';
    		 	   let formdata1=new FormData();
		    	   formdata1.append('accountId',localStorage.getItem('id'));
		    	   formdata1.append('type','1');
		    	   formdata1.append('weChatIds',this.wechatid);
		         this.http.post(this.allpersonorgrop,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	    this.allGroupsDatas=response['data'].chatroomList;
		      	    var str='';
		      	    var strid='';
		      	    for(var i=0;i<this.allGroupsDatas.length;i++){
		      	    	 str+=this.allGroupsDatas[i].chatroomName+',';
		      	    	 strid+=this.allGroupsDatas[i].id+','+'1'+',';
		      	    }
		      	    str=str.substring(0,str.length-1);
		      	    strid=strid.substring(0,strid.length-1);
		      	    this.allGroupsids=strid;
		      	    console.log("所有群:"+this.allGroupsids)
		      	    this.kehudivmodel=str;
		         }},error=>{
		       	   console.log('post请求失败', error)
		         })
    		 }else if(this.perorgroup=='所有客户和群'){
    		 	   this.isperbutton=false;
    		 	   this.kehudivmodel='';
    		  	 let formdata1=new FormData();
		    	   formdata1.append('accountId',localStorage.getItem('id'));
		    	   formdata1.append('type','2');
		    	   formdata1.append('weChatIds',this.wechatid);
		         this.http.post(this.allpersonorgrop,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	    this.twosDatas=response['data'].contactlist;
		      	    var str='';
		      	    var strid='';
		      	    for(var i=0;i<this.twosDatas.length;i++){
		      	    	str+=this.twosDatas[i].nickName+',';
		      	    	strid+=this.twosDatas[i].id+','+this.twosDatas[i].type+',';
		      	    }
		      	     str=str.substring(0,str.length-1);
		      	     strid=strid.substring(0,strid.length-1);
		      	     this.twosDatasids=strid;
		      	      console.log("所有客户和群:"+this.twosDatasids)
		      	     this.kehudivmodel=str;
		         }},error=>{
		       	   console.log('post请求失败', error)
		         })
    		 }else{
    		 	  this.isperbutton=true;
                  this.kehudivmodel='';
    		 }
    		
    	}
    }
     beforeUpload = (file: UploadFile): boolean => {
     	this.filesimg=file;
        return true
     }
    //勾选客户列表
    personlist(){
    	   let formdata1=new FormData();
    	   formdata1.append('accountId',localStorage.getItem('id'));
    	   formdata1.append('page',this.personpage);
    	   formdata1.append('type','0');
    	   formdata1.append('weChatIds',this.wechatid);
         this.http.post(this.personGroup,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	    this.personData=response['data'].contactList;
      	    this.totalperson=response['data'].contactCount;
      	    console.log(this.personData)
         }},error=>{
       	   console.log('post请求失败', error)
         })
    }
    //勾选群列表
    groupslist(){
    	   let formdata1=new FormData();
    	   formdata1.append('accountId',localStorage.getItem('id'));
    	   formdata1.append('page',this.personpage);
    	   formdata1.append('type','1');
    	   formdata1.append('weChatIds',this.wechatid);
         this.http.post(this.personGroup,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	    this.groupsData=response['data'].chatroomList;
      	    this.totalgroups=response['data'].chatroomCount;
      	    console.log(this.groupsData)
         }},error=>{
       	   console.log('post请求失败', error)
         })
    }
    bypersonmodelchange(){
    	if(this.personmodel==''){
    		alert("请输入搜索内容")
    	}else{
    		  if(this.quejiazhenduo=="客户"){
    		  	 let formdata1=new FormData();
		    	   formdata1.append('accountId',localStorage.getItem('id'));
		    	   formdata1.append('page',this.personpage);
		    	   formdata1.append('type','0');
		    	   formdata1.append('weChatIds',this.wechatid);
		    	   formdata1.append('message',this.personmodel);
		    	   formdata1.append('tagNames',this.clicktagper);
		         this.http.post(this.bymodelchangeperson,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	    this.personData=response['data'].contactList;
		      	    this.totalperson=response['data'].contactCount;
		      	    console.log(this.personData)
		         }},error=>{
		       	   console.log('post请求失败', error)
		         })
    		  }else if(this.quejiazhenduo=="群"){
    		  	 let formdata1=new FormData();
		    	   formdata1.append('accountId',localStorage.getItem('id'));
		    	   formdata1.append('page',this.personpage);
		    	   formdata1.append('type','1');
		    	   formdata1.append('weChatIds',this.wechatid);
		    	   formdata1.append('message',this.personmodel);
		    	   formdata1.append('tagNames',this.clicktagper);
		         this.http.post(this.bymodelchangeperson,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	      this.groupsData=response['data'].chatroomList;
      	          this.totalgroups=response['data'].chatroomCount
		      	    console.log(this.personData)
		         }},error=>{
		       	   console.log('post请求失败', error)
		         })
    		  }
    		console.log(this.personmodel)
    	}
    }
    //展示弹框或者客户和群
    showpergro(){
    	if(this.wechatid==''){
    		alert("请选择社交号")
    	}else{
	         let formdata1=new FormData();
	         formdata1.append('weChatIds',this.wechatid);
	         this.http.post(this.showwechatname,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	   this.wechatName=response['data'].socialaccountList;
	      	   console.log(this.wechatName)
	        }},error=>{
	       	  console.log('post请求失败', error)
	        })
	        this.personpage='1';
    		this.ispergroup=true;
    		this.isperson=true;
	        this.isgroups=false;
	        this.ismask=true;
    		this.personlist();
    		this.taglist();
    	}
    }
    //通过社交号改变客户数据
    bywechatchangeperson(e){
    	this.personpage='1';
    	if(this.quejiazhenduo=="客户"){
      		  	if(e){
				    	this.wechatid=e;
				    	this.personlist();
				 }else{
				    	this.wechatid=this.nowechatid;
				        this.personlist();
				 }
    	}else if(this.quejiazhenduo=="群"){
    		      if(e){
				    		this.wechatid=e;
				    		this.groupslist();
				  }else{
				    	  this.wechatid=this.nowechatid;
				    	  this.groupslist();
				}
    	}

    }
    //切换客户或者群
    changepersonorgroup(e){
    	this.quejiazhenduo=e;
    	if(e){
    		 if(e=="客户"){
    		 	  this.personmodel='';
	    	  	  this.isperson=true;
		          this.isgroups=false;
		          this.persontags='';
	    	 	  this.personlist();
    	  }else{
	    	     this.isperson=false;
	    	 	 this.isgroups=true;
	    	 	 this.groupslist();
	    	 	 this.persontags='';
	    	 	 this.personmodel='';
    	  }
    	}else{
    		  this.personmodel='';
    		  this.persontags='';
    		  this.isperson=true;
	          this.isgroups=false;
    	 	  this.personlist();
    	}
    	
    	 
    }
   //客户或群的分页
    searchDataperson(e){
    	this.personpage=e;
    	if(this.personmodel){
    		     let formdata1=new FormData();
		    	   formdata1.append('accountId',localStorage.getItem('id'));
		    	   formdata1.append('page',this.personpage);
		    	   formdata1.append('type','0');
		    	   formdata1.append('weChatIds',this.wechatid);
		    	   formdata1.append('message',this.personmodel);
		    	   formdata1.append('tagNames',this.clicktagper);
		         this.http.post(this.bymodelchangeperson,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	    this.personData=response['data'].contactList;
		      	    this.totalperson=response['data'].contactCount;
		      	    console.log(this.personData)
		         }},error=>{
		       	   console.log('post请求失败', error)
		         })
    	}else if(this.clicktagper){
    		     let formdata1=new FormData();
		    	   formdata1.append('accountId',localStorage.getItem('id'));
		    	   formdata1.append('page',this.personpage);
		    	   formdata1.append('type','0');
		    	   formdata1.append('weChatIds',this.wechatid);
		    	   formdata1.append('tagNames',this.clicktagper);
		         this.http.post(this.bytagchangperson,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	    this.personData=response['data'].contactList;
		      	    this.totalperson=response['data'].contactCount;
		      	    console.log(this.personData)
		         }},error=>{
		       	   console.log('post请求失败', error)
		         })
    	}else{
    			this.personlist();
    	}
    
    }
    //通过标签变化
		bypersontagsdata(e){
			this.clicktagper=e;
			this.personpage='1';
			this.personmodel='';
			if(this.quejiazhenduo=="客户"){
				  if(this.clicktagper){
					  let formdata1=new FormData();
			    	   formdata1.append('accountId',localStorage.getItem('id'));
			    	   formdata1.append('page',this.personpage);
			    	   formdata1.append('type','0');
			    	   formdata1.append('weChatIds',this.wechatid);
			    	   formdata1.append('tagNames',this.clicktagper);
			         this.http.post(this.bytagchangperson,formdata1).subscribe(response=>{
			      	 if(response['code']==200){
			      	    this.personData=response['data'].contactList;
			      	    this.totalperson=response['data'].contactCount;
			      	    console.log(this.personData)
			         }},error=>{
			       	   console.log('post请求失败', error)
			         })
				  }else{
				  	this.personlist();
				  }
			}else if(this.quejiazhenduo=="群"){
				 if(this.clicktagper){
					 	 let formdata1=new FormData();
		    	   formdata1.append('accountId',localStorage.getItem('id'));
		    	   formdata1.append('page',this.personpage);
		    	   formdata1.append('type','1');
		    	   formdata1.append('weChatIds',this.wechatid);
		    	   formdata1.append('tagNames',this.clicktagper);
		         this.http.post(this.bytagchangperson,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	    this.groupsData=response['data'].chatroomList;
		      	    this.totalgroups=response['data'].chatroomCount;
		      	    console.log(this.groupsData)
		         }},error=>{
		       	   console.log('post请求失败', error)
		         })
				 }else{
				 	  this.groupslist();
				 }
			}
		}
    //客户变化
	   currentPageDataChangeperson($event: Array<{}>): void{
	 	   this.displayDataperson = $event;
	 	   this.refreshStatusperson();
    }
		  //客户单选功能
		 refreshStatusperson(): void {
		    const allChecked = this.displayDataperson.every(value => value.checked === true);
		    const allUnChecked = this.displayDataperson.every(value => !value.checked);
		    this.allCheckedperson = allChecked;
		    this.indeterminateperson = (!allChecked) && (!allUnChecked);
		 }
		  //客户全选功能
		  checkAllperson(value: boolean): void {
		    this.displayDataperson.forEach(data => {
		        data.checked = value;
		    });
		    this.refreshStatusperson();
		  }
    //客户添加右边
		  oneaddperson(item,e){
		  	 if(e==true){
				   this.personRightData.push(item)
			   }else{
					 for(var i=0;i<this.personRightData.length;i++){
					 	  if(this.personRightData[i].id==item.id){
					 	  	this.personRightData.splice(i,1)
					 	  }
					 }
			  }
	       console.log(this.personRightData)
		  }
		  //客户全选添加右边
		  alladdperson(e){
			  	if(e==true){
		      	if(this.personRightData.length==0){
			    		 	for(var i=0;i<this.personData.length;i++){
			    		 		this.personRightData.push(this.personData[i])
			    		 	}
		    		 }else{
				   	   for(var i=0;i<this.personData.length;i++){
				    		 	    for(var j=0;j<this.personRightData.length;j++){
				            	  	 if(this.personRightData.indexOf(this.personData[i])==-1){
						    				      this.personRightData.push(this.personData[i])
						    			     }
					           }
		           }
		    		 }
		   }else{
		   	   for(var i=0;i<this.personData.length;i++){
			    	  for(var j=0;j<this.personRightData.length;j++){
			    	  	  if(this.personData[i].id=== this.personRightData[j].id){
						         this.personRightData.splice(j,1)
					        }
			    	  }
				   }
		   }
			   console.log(this.personRightData)
		  }
     //客户点击删除
		  deletctperson(item,index){
		  	this.personRightData.splice(index,1);
		  	item.checked=false;
		  	this.refreshStatusperson();
		  }
		  //群变化
	   currentPageDataChangegroups($event: Array<{}>): void{
	 	   this.displayDatagroups = $event;
	 	   this.refreshStatusgroups();
    }
		  //群单选功能
		 refreshStatusgroups(): void {
		    const allChecked = this.displayDatagroups.every(value => value.checked === true);
		    const allUnChecked = this.displayDatagroups.every(value => !value.checked);
		    this.allCheckedgroups = allChecked;
		    this.indeterminategroups = (!allChecked) && (!allUnChecked);
		 }
		  //群全选功能
		  checkAllgroups(value: boolean): void {
		    this.displayDatagroups.forEach(data => {
		        data.checked = value;
		    });
		    this.refreshStatusgroups();
		  }
    //群添加右边
		  oneaddgroups(item,e){
		  	 if(e==true){
				   this.groupsRightData.push(item)
			   }else{
					 for(var i=0;i<this.groupsRightData.length;i++){
					 	  if(this.groupsRightData[i].id==item.id){
					 	  	this.groupsRightData.splice(i,1)
					 	  }
					 }
			  }
	       console.log(this.groupsRightData)
		  }
		  //群全选添加右边
		  alladdgroups(e){
			  	if(e==true){
		      	if(this.groupsRightData.length==0){
			    		 	for(var i=0;i<this.groupsData.length;i++){
			    		 		this.groupsRightData.push(this.groupsData[i])
			    		 	}
		    		 }else{
				   	   for(var i=0;i<this.groupsData.length;i++){
				    		 	    for(var j=0;j<this.groupsRightData.length;j++){
				            	  	 if(this.groupsRightData.indexOf(this.groupsData[i])==-1){
						    				      this.groupsRightData.push(this.groupsData[i])
						    			     }
					           }
		           }
		    		 }
		   }else{
		   	   for(var i=0;i<this.groupsData.length;i++){
			    	  for(var j=0;j<this.groupsRightData.length;j++){
			    	  	  if(this.groupsData[i].id=== this.groupsRightData[j].id){
						         this.groupsRightData.splice(j,1)
					        }
			    	  }
				   }
		   }
			   console.log(this.groupsRightData)
		  }
      //群删除
		  deletctgroups(item,index){
		  	this.groupsRightData.splice(index,1);
		  	item.checked=false;
		  	this.refreshStatusgroups();
		  }
//		  群分页
		  searchDatagroups(e){
		  	this.personpage=e;
		  	
		  	if(this.personmodel){
		  		  let formdata1=new FormData();
		    	   formdata1.append('accountId',localStorage.getItem('id'));
		    	   formdata1.append('page',this.personpage);
		    	   formdata1.append('type','1');
		    	   formdata1.append('weChatIds',this.wechatid);
		    	   formdata1.append('message',this.personmodel);
		    	   formdata1.append('tagNames',this.clicktagper);
		         this.http.post(this.bymodelchangeperson,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	      this.groupsData=response['data'].chatroomList;
      	          this.totalgroups=response['data'].chatroomCount
		      	    console.log(this.personData)
		         }},error=>{
		       	   console.log('post请求失败', error)
		         })
		  	}else if(this.clicktagper){
		  		   let formdata1=new FormData();
		    	   formdata1.append('accountId',localStorage.getItem('id'));
		    	   formdata1.append('page',this.personpage);
		    	   formdata1.append('type','1');
		    	   formdata1.append('weChatIds',this.wechatid);
		    	   formdata1.append('tagNames',this.clicktagper);
		         this.http.post(this.bytagchangperson,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	    this.groupsData=response['data'].chatroomList;
		      	    this.totalgroups=response['data'].chatroomCount;
		      	    console.log(this.groupsData)
		         }},error=>{
		       	   console.log('post请求失败', error)
		         })
		  	}else{
		  		  this.groupslist();
		  	}
		  }
    //关闭客户和群
    closepergroup(){
    	this.ispergroup=false;
    	this.ismask=false;
    	this.personmodel='';
    	this.persontags='';
    	this.clicktagper='';
    	this.personRightData=[];
    	this.groupsRightData=[];
    }
    
     //标签获取
    taglist(){
    	   let formdata1=new FormData();
    	   formdata1.append('accountId',localStorage.getItem('id'))
    	   formdata1.append('page','1')
         this.http.post(this.allTagUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	    this.allTagList=response['data'].tagList;
         }},error=>{
       	   console.log('post请求失败', error)
         })
    }
     //客户和群确定按钮
    showchoseporg(){
    	if(this.quejiazhenduo=='客户'){
    		 if(this.personRightData.length==0){
    		 	  alert("请选择客户")
    		 }else{
    		 	  var str='';
    		 	  var strid='';
    		 	  for(var i=0;i<this.personRightData.length;i++){
    		 	  	str+=this.personRightData[i].nickName+',';
    		 	  	strid+=this.personRightData[i].id+','+'0'+',';
    		 	  }
    		 	  str=str.substring(0,str.length-1);
		      	strid=strid.substring(0,strid.length-1);
		      	this.thespecifiedids=strid;
		      	this.kehudivmodel=str;
		      	this.ismask=false;
		      	this.ispergroup=false;
		      	this.personRightData=[];
    		 	  console.log("选择的客户"+this.thespecifiedids)
    		 }
    	}else{
    		 if(this.groupsRightData.length==0){
    		  	alert("请选择群")
    		 }else{
    		      var str='';
    		 	  var strid='';
    		 	  for(var i=0;i<this.groupsRightData.length;i++){
    		 	  	str+=this.groupsRightData[i].chatroomName+',';
    		 	  	strid+=this.groupsRightData[i].id+','+'1'+',';
    		 	  }
    		 	  str=str.substring(0,str.length-1);
		      	strid=strid.substring(0,strid.length-1);
		      	this.thespecifiedids=strid;
		      	this.kehudivmodel=str;
		      	this.ismask=false;
		      	this.ispergroup=false;
		      	this.groupsRightData=[];
    		 	  console.log("选择的群"+this.thespecifiedids)
    		 }
    	}
    	
    }
	//选择社交号初始化数据
	  shejiaolist(){
	  	     let formdata1=new FormData();
		       formdata1.append('page',this.page);
		       formdata1.append('accountId',localStorage.getItem('id'));
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
						  	  this.isgroup=false;
						  	  this.ismask=false;
						  	  this.rightData=[];
						  	  this.sjinputmodel='';
						  	  for(var i=0;i<this.shejarr.length;i++){
		      	       	this.shejarr[i].checked=false;
		      	      }
		  	}
	  }
	   //开始限制
    disabledDate = (current: Date): boolean => {
     return differenceInCalendarDays(current, this.startdate) <=0;
    };
    //结束限制
     disabledDate1 = (current: Date): boolean => {
     return differenceInCalendarDays(current, this.enddate) <=0;
    };
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
   handlePreview = (file: UploadFile) => {
	    this.previewImage = file.url || file.thumbUrl;
	    this.previewVisible = true;
   }
    OnItemClick(value){
      this.item = value;
      console.log(this.item);
    }
//  关闭社交号
    nogroup(){
    	 this.rightData=[];
			 this.sjinputmodel='';
			 for(var i=0;i<this.shejarr.length;i++){
	      	  this.shejarr[i].checked=false;
	     }
    	this.ismask=false;
    	this.isgroup=false;
    }
        //打开社交好
		showgroup(){
			   this.page='1';
			   this.shejiaolist();
			   this.ismask=true;
			   this.isgroup=true;
		}
	   getWeek(result: Date): void {
			var date = new Date(result);
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	        var D = date.getDate()<10 ? "0" + date.getDate()+ ' ':date.getDate()+ ' ';
			console.log(Y+M+D)
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
	  log(time: Date): void {
	  	if(time){
	  		console.log(time.toTimeString().substr(0,8));
	  	}
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
    //关闭图文
	  closeistuwen(){
	  	this.textRightData=[];
	  	this.pictRightData=[];
	  	this.ismask=false;
	  	this.istuwen=false;
	  }
   //打开图文
	  showistuwen(){
	  	this.tuwenlist();
	  	this.taglist();
	  	this.ismask=true;
	  	this.istuwen=true;
	  }
	  //图片列表
	  tuwenlist(){
	  	       let formdata1=new FormData();
		         formdata1.append('accountId',localStorage.getItem('id'));
		         formdata1.append('page',this.pagepict);
		         formdata1.append('type','0');
		         this.http.post(this.tuwenUrl,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	 	 this.totalpict=response['data'].pictureCount;
		      	   this.pictData=response['data'].pictureList;
		      	   for(var i=0;i<this.pictData.length;i++){
		      	   	  this.pictData[i].checked=false;
		      	   }
		      	   console.log(this.pictData)
		        }},error=>{
		       	  console.log('post请求失败', error)
		        })
	  }

   //图片分页
	  searchDatapict(e){
	  	this.pagepict=e;
	  	if(this.tuwenmodel){
	  		         let formdata1=new FormData();
				         formdata1.append('accountId',localStorage.getItem('id'));
				         formdata1.append('page',this.pagepict);
				         formdata1.append('type','0');
				         formdata1.append('tagNames',this.indexclicktag);
				         formdata1.append('message',this.tuwenmodel);
				         this.http.post(this.bymodelchangeUrl,formdata1).subscribe(response=>{
				      	 if(response['code']==200){
				      	 	 this.totalpict=response['data'].pictureCount;
				      	   this.pictData=response['data'].pictureList;
				      	   for(var i=0;i<this.pictData.length;i++){
				      	   	  this.pictData[i].checked=false;
				      	   }
				      	   console.log(this.totalpict)
				        }},error=>{
				       	  console.log('post请求失败', error)
				        })
	  	}else if(this.indexclicktag){
	  		       let formdata1=new FormData();
			         formdata1.append('accountId',localStorage.getItem('id'));
			         formdata1.append('page',this.pagepict);
			         formdata1.append('type','0');
			         formdata1.append('tagNames',this.indexclicktag);
			         this.http.post(this.bytagchangeUrl,formdata1).subscribe(response=>{
			      	 if(response['code']==200){
			      	 	 this.totalpict=response['data'].pictureCount;
			      	   this.pictData=response['data'].pictureList;
			      	   for(var i=0;i<this.pictData.length;i++){
			      	   	  this.pictData[i].checked=false;
			      	   }
			      	   console.log(this.totalpict)
			        }},error=>{
			       	  console.log('post请求失败', error)
			        })
	  	}else{
	  		this.tuwenlist();
	  	}
	  	
	  }
     //图片或文字确定按钮
	  picttextsure(){
	  	if(this.picttext=='图片'){
	  		if(this.pictRightData.length==0){
	  			alert("请选择图片")
	  		}else{
	  			var str='';
	  			var strid='';
	  			for(var i=0;i<this.pictRightData.length;i++){
	  				str+=this.pictRightData[i].title+',';
	  				strid+=this.pictRightData[i].id+','+'1'+',';
	  			}
	  			str=str.substring(0,str.length-1);
	  			strid=strid.substring(0,strid.length-1);
	  			this.istuwen=false;
	  			this.ismask=false;
	  			this.pictRightData=[];
	  			this.pictids=strid;
	  			$(".gouxuanpict").html(str);
	  			console.log(this.pictids)

	  		}
	  	}else{
	  		if(this.textRightData.length==0){
	  			alert("请选择文字")
	  		}else{
	  			var str='';
	  			var strid='';
	  			for(var i=0;i<this.textRightData.length;i++){
	  				str+=this.textRightData[i].content+',';
	  				strid+=this.textRightData[i].id+','+'0'+',';
	  			}
	  			str=str.substring(0,str.length-1);
	  			strid=strid.substring(0,strid.length-1);
	  			this.istuwen=false;
	  			this.ismask=false;
	  			this.textRightData=[];
	  			this.textids=strid;
	  			$(".gouxuanpict").html(str);
	  			console.log(this.textids)
	  		}
	  	}
	  }
    //图文变化
	   currentPageDataChangepict($event: Array<{}>): void{
	 	   this.displayDatapict = $event;
	 	   this.refreshStatuspict();
    }
		  //图文单选功能
		 refreshStatuspict(): void {
		    const allChecked = this.displayDatapict.every(value => value.checked === true);
		    const allUnChecked = this.displayDatapict.every(value => !value.checked);
		    this.allCheckedpict = allChecked;
		    this.indeterminatepict = (!allChecked) && (!allUnChecked);
		 }
		  //图文全选功能
		  checkAllpict(value: boolean): void {
		    this.displayDatapict.forEach(data => {
		        data.checked = value;
		    });
		    this.refreshStatuspict();
		  }
    //图文单选添加右边
		  oneaddpict(item,e){
		  	 if(e==true){
				   this.pictRightData.push(item)
			   }else{
					 for(var i=0;i<this.pictRightData.length;i++){
					 	  if(this.pictRightData[i].id==item.id){
					 	  	this.pictRightData.splice(i,1)
					 	  }
					 }
			  }
	       console.log(this.pictRightData)
		  }
		  //图文全选添加右边
		  alladdpict(e){
			  	if(e==true){
		      	if(this.pictRightData.length==0){
			    		 	for(var i=0;i<this.pictData.length;i++){
			    		 		this.pictRightData.push(this.pictData[i])
			    		 	}
		    		 }else{
				   	   for(var i=0;i<this.pictData.length;i++){
				    		 	    for(var j=0;j<this.pictRightData.length;j++){
				            	  	 if(this.pictRightData.indexOf(this.pictData[i])==-1){
						    				      this.pictRightData.push(this.pictData[i])
						    			     }
					           }
		           }
		    		 }
		   }else{
		   	   for(var i=0;i<this.pictData.length;i++){
			    	  for(var j=0;j<this.pictRightData.length;j++){
			    	  	  if(this.pictData[i].id=== this.pictRightData[j].id){
						         this.pictRightData.splice(j,1)
					        }
			    	  }
				   }
		   }
			   console.log(this.pictRightData)
		  }
//		  图文点击删除
		  deletctpict(item,index){
		  	this.pictRightData.splice(index,1);
		  	item.checked=false;
		  	this.refreshStatuspict();
		  }
	  //文字列表
	  textlist(){
	  	       let formdata1=new FormData();
		         formdata1.append('accountId',localStorage.getItem('id'));
		         formdata1.append('page',this.pagetext);
		         formdata1.append('type','1');
		         this.http.post(this.tuwenUrl,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	 	 this.totaltext=response['data'].scriptCount;
		      	   this.textData=response['data'].scriptList;
		      	   for(var i=0;i<this.textData.length;i++){
		      	   	  this.textData[i].checked=false;
		      	   }
		      	   console.log(this.textData)
		        }},error=>{
		       	  console.log('post请求失败', error)
		        })
	  }
	  //文字分页
	  searchDatatexts(e){
	  	this.pagetext=e;
	  	if(this.tuwenmodel){
  		         let formdata1=new FormData();
			         formdata1.append('accountId',localStorage.getItem('id'));
			         formdata1.append('page',this.pagetext);
			         formdata1.append('type','1');
			         formdata1.append('tagNames',this.indexclicktag);
			         formdata1.append('message',this.tuwenmodel);
			         this.http.post(this.bymodelchangeUrl,formdata1).subscribe(response=>{
			      	 if(response['code']==200){
			      	 	 this.totaltext=response['data'].scriptCount;
			      	   this.textData=response['data'].scriptList;
			      	   for(var i=0;i<this.textData.length;i++){
			      	   	  this.textData[i].checked=false;
			      	   }
			      	   console.log(this.totaltext)
			        }},error=>{
			       	  console.log('post请求失败', error)
			        })
	  	}else if(this.indexclicktag){
	  		     let formdata1=new FormData();
		         formdata1.append('accountId',localStorage.getItem('id'));
		         formdata1.append('page',this.pagetext);
		         formdata1.append('type','1');
		         formdata1.append('tagNames',this.indexclicktag);
		         this.http.post(this.bytagchangeUrl,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	 	 this.totaltext=response['data'].scriptCount;
		      	   this.textData=response['data'].scriptList;
		      	   for(var i=0;i<this.textData.length;i++){
		      	   	  this.textData[i].checked=false;
		      	   }
		      	   console.log(this.totaltext)
		        }},error=>{
		       	  console.log('post请求失败', error)
		        })
	  	}else{
	  		this.textlist();
	  	}
	  	
	  }
	  //文字变化
	   currentPageDataChangetext($event: Array<{}>): void{
	 	   this.displayDatatext = $event;
	 	   this.refreshStatustext();
    }
		 //文字单选功能
		 refreshStatustext(): void {
		    const allChecked = this.displayDatatext.every(value => value.checked === true);
		    const allUnChecked = this.displayDatatext.every(value => !value.checked);
		    this.allCheckedtext = allChecked;
		    this.indeterminatetext = (!allChecked) && (!allUnChecked);
		}
		//文字全选功能
	  checkAlltext(value: boolean): void {
		    this.displayDatatext.forEach(data => {
		        data.checked = value;
		    });
		    this.refreshStatustext();
		}
	  //文字单选添加右边
	  oneaddtext(item,e){
		  	if(e==true){
				   this.textRightData.push(item)
			  }else{
				 for(var i=0;i<this.textRightData.length;i++){
				 	  if(this.textRightData[i].id==item.id){
				 	  	this.textRightData.splice(i,1)
				 	  }
				 }
			 }
	       console.log(this.textRightData)
	  }
	  //文字全选添加右边
	  alladdtext(e){
	  	if(e==true){
	      	if(this.textRightData.length==0){
		    		 	for(var i=0;i<this.textData.length;i++){
		    		 		this.textRightData.push(this.textData[i])
		    		 	}
	    		 }else{
			   	   for(var i=0;i<this.textData.length;i++){
			    		 	    for(var j=0;j<this.textRightData.length;j++){
			            	  	 if(this.textRightData.indexOf(this.textData[i])==-1){
					    				      this.textRightData.push(this.textData[i])
					    			     }
				           }
	           }
	    		 }
	   }else{
	   	   for(var i=0;i<this.textData.length;i++){
		    	  for(var j=0;j<this.textRightData.length;j++){
		    	  	  if(this.textData[i].id=== this.textRightData[j].id){
					         this.textRightData.splice(j,1)
				        }
		    	  }
			   }
	   }
		   console.log(this.textRightData)
	  }
	  delectpict(item,index){
	  	  this.textRightData.splice(index,1);
  	    item.checked=false;
  	    this.refreshStatustext();
		    console.log(this.textRightData)
	  }
  changepicttext(e){
  	if(e=='图片'){
  		  this.tuwenlist();
  		  this.picttag='';
  		  this.tuwenmodel='';
  		  this.ispict=true;
        this.istext=false;
  	}else if(e=='文字'){
  		  this.textlist();
  		  this.picttag='';
  		  this.tuwenmodel='';
  		  this.ispict=false;
        this.istext=true;
  	}
  }
  addjoin(e){
  	this.joinchecked=e;
  }
  // 根据标签改变图文
  bytagchangedata(e){
  	this.tuwenmodel='';
  	this.indexclicktag=e;
		if(this.picttext=='图片'){
		        if(this.indexclicktag){
		        	 let formdata1=new FormData();
			         formdata1.append('accountId',localStorage.getItem('id'));
			         formdata1.append('page','1');
			         formdata1.append('type','0');
			         formdata1.append('tagNames',this.indexclicktag);
			         this.http.post(this.bytagchangeUrl,formdata1).subscribe(response=>{
			      	 if(response['code']==200){
			      	 	 this.totalpict=response['data'].pictureCount;
			      	   this.pictData=response['data'].pictureList;
			      	   for(var i=0;i<this.pictData.length;i++){
			      	   	  this.pictData[i].checked=false;
			      	   }
			      	   console.log(this.totalpict)
			        }},error=>{
			       	  console.log('post请求失败', error)
			        })
		        }else{
		        	 this.tuwenlist();
		        }
		}else{
			   if(this.indexclicktag){
				   	 let formdata1=new FormData();
			         formdata1.append('accountId',localStorage.getItem('id'));
			         formdata1.append('page','1');
			         formdata1.append('type','1');
			         formdata1.append('tagNames',this.indexclicktag);
			         this.http.post(this.bytagchangeUrl,formdata1).subscribe(response=>{
			      	 if(response['code']==200){
			      	 	 this.totaltext=response['data'].scriptCount;
			      	   this.textData=response['data'].scriptList;
			      	   for(var i=0;i<this.textData.length;i++){
			      	   	  this.textData[i].checked=false;
			      	   }
			      	   console.log(this.totaltext)
			        }},error=>{
			       	  console.log('post请求失败', error)
			        })
			   }else{
			   	  this.textlist();
			   }
		          
	  }
  
  }
	  //根据输入框内容改变图文 
	 bymodelchange(){
	 	 if(this.tuwenmodel==''){
	 	 	 alert("请输入搜索内容")
	 	 }else{
		 	 	 	if(this.picttext=='图片'){
				         let formdata1=new FormData();
				         formdata1.append('accountId',localStorage.getItem('id'));
				         formdata1.append('page','1');
				         formdata1.append('type','0');
				         formdata1.append('tagNames',this.indexclicktag);
				         formdata1.append('message',this.tuwenmodel);
				         this.http.post(this.bymodelchangeUrl,formdata1).subscribe(response=>{
				      	 if(response['code']==200){
				      	 	 this.totalpict=response['data'].pictureCount;
				      	   this.pictData=response['data'].pictureList;
				      	   for(var i=0;i<this.pictData.length;i++){
				      	   	  this.pictData[i].checked=false;
				      	   }
				      	   console.log(this.totalpict)
				        }},error=>{
				       	  console.log('post请求失败', error)
				        })
				  }else{
					     let formdata1=new FormData();
				         formdata1.append('accountId',localStorage.getItem('id'));
				         formdata1.append('page','1');
				         formdata1.append('type','1');
				         formdata1.append('tagNames',this.indexclicktag);
				         formdata1.append('message',this.tuwenmodel);
				         this.http.post(this.bymodelchangeUrl,formdata1).subscribe(response=>{
				      	 if(response['code']==200){
				      	 	 this.totaltext=response['data'].scriptCount;
				      	   this.textData=response['data'].scriptList;
				      	   for(var i=0;i<this.textData.length;i++){
				      	   	  this.textData[i].checked=false;
				      	   }
				      	   console.log(this.totaltext)
				        }},error=>{
				       	  console.log('post请求失败', error)
				        })
				          
			  }
		 }
	 }
	 //立即执行
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
	      //判断社交号
		  if(this.wechatid==''){
		  	 alert("请选择社交号");
		  	  return false;
		  }else{
		  	 formdata1.append('socialaccountIds',this.wechatid);
		  }
	     //目标客户和群
    	 if(this.perorgroup=='所有客户'){
    		 formdata1.append('wechat',this.allpersonsids);
    	 }else if(this.perorgroup=='所有群'){
    		 formdata1.append('wechat',this.allGroupsids);
    	 }else if(this.perorgroup=='所有客户和群'){
    		 formdata1.append('wechat',this.twosDatasids);
    	 }else{
    		 formdata1.append('wechat',this.thespecifiedids);
    	 }
	    	//勾选图文
	    	if(this.item==0){
	    		formdata1.append('choosePicture','1');
	    		if(this.picttext=="图片"){
	    			if(this.pictids==''){
	    				alert("请选择图片");
	    				return false;
	    			}else{
	    				 formdata1.append('textPicture',this.pictids);
	    			}
	    		}else{
	    			if(this.textids==''){
	    				alert("请选择文字");
	    				return false;
	    			}else{
	    				
	    				 formdata1.append('textPicture',this.textids);
	    			}
	    		}
	    	}else{
	    		formdata1.append('choosePicture','0');
	    		if(this.inputdivmodel==''){
	    			alert("请输入");
	    			return false;
	    		}else{
	    			formdata1.append('content',this.inputdivmodel);
	    		}
	    		
	    		if(this.filesimg){
	    			formdata1.append('file',this.filesimg);
	    		}else{
	    			formdata1.append('file','');
	    		}
	    		
	    		if(this.joinchecked==true){
	    			formdata1.append('joinResource','1');
	    		}else{
	    			formdata1.append('joinResource','0');
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
			   this.http.post(this.alloperate,formdata1).subscribe(response=>{
			    if(response['code']==200){
		           this.taskmodel='';
		           this.wechatid='';
		           this.shejiao='';
		           this.kehudivmodel='';
		           this.allpersonsids='';
		           this.allGroupsids='';
		           this.twosDatasids='';
		           this.thespecifiedids='';
		           $(".gouxuanpict").html('');
		           this.pictids='';
	    		   this.textids='';
	    		   this.inputdivmodel='';
	    		   this.filesimg='';
	    		   this.timeout='';
	    		   this.interval1='';
	    		   this.interval2='';
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
		 	 	 alert("请输入任务名称");
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
		     //目标客户和群
	    	 if(this.perorgroup=='所有客户'){
	    		 formdata1.append('wechat',this.allpersonsids);
	    	 }else if(this.perorgroup=='所有群'){
	    		 formdata1.append('wechat',this.allGroupsids);
	    	 }else if(this.perorgroup=='所有客户和群'){
	    		 formdata1.append('wechat',this.twosDatasids);
	    	 }else{
	    		 formdata1.append('wechat',this.thespecifiedids);
	    	 }
		    	//勾选图文
		    	if(this.item==0){
		    		formdata1.append('choosePicture','1');
		    		if(this.picttext=="图片"){
		    			if(this.pictids==''){
		    				alert("请选择图片");
		    				return false;
		    			}else{
		    				 formdata1.append('textPicture',this.pictids);
		    			}
		    		}else{
		    			if(this.textids==''){
		    				alert("请选择文字");
		    				return false;
		    			}else{
		    				
		    				 formdata1.append('textPicture',this.textids);
		    			}
		    		}
		    	}else{
		    		formdata1.append('choosePicture','0');
		    		if(this.inputdivmodel==''){
		    			alert("请输入");
		    			return false;
		    		}else{
		    			formdata1.append('content',this.inputdivmodel);
		    		}
		    		
		    		if(this.filesimg){
		    			formdata1.append('file',this.filesimg);
		    		}else{
		    			formdata1.append('file','');
		    		}
		    		
		    		if(this.joinchecked==true){
		    			formdata1.append('joinResource','1');
		    		}else{
		    			formdata1.append('joinResource','0');
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
				   this.http.post(this.alloperate,formdata1).subscribe(response=>{
				    if(response['code']==200){
			           this.taskmodel='';
			           this.wechatid='';
			           this.shejiao='';
			           this.kehudivmodel='';
			           this.allpersonsids='';
			           this.allGroupsids='';
			           this.twosDatasids='';
			           this.thespecifiedids='';
			           $(".gouxuanpict").html('');
			           this.pictids='';
		    		   this.textids='';
		    		   this.inputdivmodel='';
		    		   this.filesimg='';
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
