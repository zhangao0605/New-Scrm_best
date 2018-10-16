import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import * as GlobalUrl from '../../globals';
declare var $: any;
import {HttpClient} from "@angular/common/http";
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as setHours from 'date-fns/set_hours';
@Component({
  selector: 'app-sendcircle',
  templateUrl: './sendcircle.component.html',
  styleUrls: ['./sendcircle.component.css']
})
export class SendcircleComponent implements OnInit {
	 public  emjoyAllGet = [
        '[微笑]', '[撇嘴]', '[色]', '[发呆]', '[得意]', '[流泪]', '[害羞]', '[闭嘴]', '[睡]', '[大哭]',
        '[尴尬]', '[发怒]', '[调皮]', '[呲牙]', '[惊讶]', '[难过]', '[酷]', '[冷汗]', '[抓狂]', '[吐]',
        '[偷笑]', '[愉快]', '[白眼]', '[傲慢]', '[饥饿]', '[困]', '[惊恐]', '[流汗]', '[憨笑]', '[悠闲]',
        '[奋斗]', '[咒骂]', '[疑问]', '[嘘]', '[晕]', '[疯了]', '[衰]', '[骷髅]', '[敲打]', '[再见]', '[]',
        '[抠鼻]', '[鼓掌]', '[糗大了]', '[]', '[左哼哼]', '[右哼哼]', '[哈欠]', '[鄙视]', '[委屈]', '[快哭了]', '[阴险]',
        '[亲亲]', '[]', '[可怜]', '[菜刀]', '[啤酒]', '[咖啡]', '[饭]', '[猪头]', '[玫瑰]', '[凋谢]', '[嘴唇]',
        '[爱心]', '[心碎]', '[蛋糕]', '[闪电]', '[炸弹]', '[刀]', '[足球]', '[瓢虫]', '[便便]', '[拥抱]',
        '[强]', '[弱]', '[握手]', '[胜利]', '[抱拳]', '[勾引]', '[拳头]', '[差劲]', '[爱你]', '[NO]',
        '[OK]', '[跳跳]', '[发抖]', '[怄火]', '[磕头]', '[回头]','[激动]', '[献吻]'
    ]
	 radioValue="";
	 timeout='';
	 interval1='';
	 interval2='';
	 date = null;
	 time: Date | null = null;
   celuob=false;
   choscircle=false;
	 ismask=false;
	 issendcircle=false;
	 item:number = 0;
	 selectedValue="防封号策略A";
	 taskchek=false;
   startdate=new Date();
	 enddate=new Date(new Date().setDate(new Date().getDate()+1));
   start='';
   end='';
   taskselect="";
   createdper="";
   surebtn=true;
	 fileList = [
//		    {
//		      uid: -1,
//		      name: 'xxx.png',
//		      status: 'done',
//		      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
//		    }
     ];
     fileList1 = [
		    {
		      uid: -1,
		      name: 'xxx.png',
		      status: 'done',
		      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
		    }
     ];
		  previewImage = '';
		  previewVisible = false;
		  previewImage1 = '';
		  previewVisible1 = false;
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
     //朋友圈初始化数据
     cicrleUrl:string=GlobalUrl.prioductUrl +'moment/getAllMomentByPage';
     
		 //朋友圈根据标签查
     bytagcicrle:string=GlobalUrl.prioductUrl +'moment/getMomentByTagName';
     
	   //朋友圈查询
     bycicrleModel:string=GlobalUrl.prioductUrl +'moment/getAllMomentByContent';
     
     cicrleData=[];
     cicrleRightData=[];
     cicrlepage='1';
     pageIndexcircle = 1;
		 pageSizecircle= 4;
		 totalcircle=1;
		 displayDatacicrle=[];
	   indeterminatecicrle=false;
	   allCheckedcicrle=false;
	   src='http://192.168.1.241:8081/';
	   //获取所有标签
     allTagUrl:string=GlobalUrl.prioductUrl +'tag/getAllTag';
    
     allTagList=[];
     cicrletag='';
     clicktagcicrle='';
     cicrlemodel='';
     taskmodel='';
     circleids='';
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
    //朋友圈变化
	   currentPageDataChangecicrle($event: Array<{}>): void{
	 	   this.displayDatacicrle = $event;
	 	   this.refreshStatuscicrle();
    }
		 //朋友圈单选功能
		 refreshStatuscicrle(): void {
		    const allChecked = this.displayDatacicrle.every(value => value.checked === true);
		    const allUnChecked = this.displayDatacicrle.every(value => !value.checked);
		    this.allCheckedcicrle = allChecked;
		    this.indeterminatecicrle = (!allChecked) && (!allUnChecked);
		 }
		  //朋友圈全选功能
		  checkAllcicrle(value: boolean): void {
		    this.displayDatacicrle.forEach(data => {
		        data.checked = value;
		    });
		    this.refreshStatuscicrle();
		 }
      //朋友圈初始化数据
      cicrleList(){
      	   let formdata1=new FormData();
		       formdata1.append('page',this.cicrlepage);
		       formdata1.append('accountId',localStorage.getItem('id'))
	         this.http.post(this.cicrleUrl,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	 this.totalcircle=response['data'].MomentCount;
	      	   this.cicrleData=response['data'].MomentList;
	      	   for(var i=0;i<this.cicrleData.length;i++){
	      	     	this.cicrleData[i].checked=false;
	      	   }
	      	   console.log(this.cicrleData)
	         }},error=>{
	       	   console.log('post请求失败', error)
	         })
      }
      //通过标签搜索
      butagchangecircle(e){
      	   this.cicrlemodel='';
      	   this.cicrlepage='1';
           this.clicktagcicrle=e;
      	   if(this.clicktagcicrle){
      	   	 this.tagcicrlelist();
      	   }else{
      	   	 this.cicrleList();
      	   }
      }
    //标签搜索的list
      tagcicrlelist(){
      	   let formdata1=new FormData();
		       formdata1.append('page',this.cicrlepage);
		       formdata1.append('accountId',localStorage.getItem('id'));
		       formdata1.append('tagNames',this.clicktagcicrle);
	         this.http.post(this.bytagcicrle,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	 this.totalcircle=response['data'].MomentCount;
	      	   this.cicrleData=response['data'].MomentList;
	      	   for(var i=0;i<this.cicrleData.length;i++){
	      	     	this.cicrleData[i].checked=false;
	      	   }
	      	   console.log(this.cicrleData)
	         }},error=>{
	       	   console.log('post请求失败', error)
	         })
          	console.log(this.clicktagcicrle)
      }
      //按输入内容搜索
      modellist(){
           let formdata1=new FormData();
		       formdata1.append('page',this.cicrlepage);
		       formdata1.append('accountId',localStorage.getItem('id'));
		       formdata1.append('tagNames',this.clicktagcicrle);
		       formdata1.append('message',this.cicrlemodel);
	         this.http.post(this.bycicrleModel,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	 this.totalcircle=response['data'].MomentCount;
	      	   this.cicrleData=response['data'].MomentList;
	      	   for(var i=0;i<this.cicrleData.length;i++){
	      	     	this.cicrleData[i].checked=false;
	      	   }
	      	   console.log(this.cicrleData)
	         }},error=>{
	       	   console.log('post请求失败', error)
	         })
          	console.log(this.clicktagcicrle)
      }
      bymodelchangecicrle(){
      	  this.cicrlepage='1';
	      	if(this.cicrlemodel==''){
	      		alert("请输入搜索内容")
	      	}else{
	      		this.modellist();
	      	}
      }
   //朋友圈分页
	 searchDatacircle(e){
	 	 this.cicrlepage=e;
	 	 if(this.cicrlemodel){
	 	 	 this.modellist();
	 	 }else if(this.clicktagcicrle){
	 	 	 this.tagcicrlelist();
	 	 }else{
	 	 	 this.cicrleList();
	 	 }
	 }
	 //单选添加朋友圈
	 oneaddcicrle(item,e){
	 	 if(e==true){
				   this.cicrleRightData.push(item)
			   }else{
					 for(var i=0;i<this.cicrleRightData.length;i++){
					 	  if(this.cicrleRightData[i].id==item.id){
					 	  	this.cicrleRightData.splice(i,1)
					 	  }
					 }
			  }
	       console.log(this.cicrleRightData)
	 }
  //全选添加朋友圈
	 alladdcicrle(e){
	    	if(e==true){
			      	if(this.cicrleRightData.length==0){
				    		 	for(var i=0;i<this.cicrleData.length;i++){
				    		 		this.cicrleRightData.push(this.cicrleData[i])
				    		 	}
			    		 }else{
					   	   for(var i=0;i<this.cicrleData.length;i++){
					    		 	    for(var j=0;j<this.cicrleRightData.length;j++){
					            	  	 if(this.cicrleRightData.indexOf(this.cicrleData[i])==-1){
							    				      this.cicrleRightData.push(this.cicrleData[i])
							    			     }
						           }
			           }
			    		 }
			   }else{
			   	   for(var i=0;i<this.cicrleData.length;i++){
				    	  for(var j=0;j<this.cicrleRightData.length;j++){
				    	  	  if(this.cicrleData[i].id=== this.cicrleRightData[j].id){
							         this.cicrleRightData.splice(j,1)
						        }
				    	  }
					   }
			   }
			   
				   console.log(this.cicrleRightData)
	 }
    //删除朋友圈
    deletctcicrle(item,index){
    	this.cicrleRightData.splice(index,1);
    	item.checked=false;
    	this.refreshStatuscicrle();
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
						  	  this.issendcircle=false;
						  	  this.ismask=false;
						  	  this.rightData=[];
						  	   this.sjinputmodel='';
						  	  for(var i=0;i<this.shejarr.length;i++){
		      	       	this.shejarr[i].checked=false;
		      	      }
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
	    OnItemClick(value){
	      this.item = value;
	      console.log(this.item);
	    }
	    //关闭社交号
	    closeissendcircle(){
		    	this.rightData=[];
				  this.sjinputmodel='';
				  for(var i=0;i<this.shejarr.length;i++){
		      	  this.shejarr[i].checked=false;
		      }
		    	this.ismask=false;
		    	this.issendcircle=false;
	    }
	     
      //打开社交好
	    showissendcircle(){
	    	this.page='1';
	    	this.shejiaolist();
	    	this.ismask=true;
	    	this.issendcircle=true;
	    }
	     //打开朋友圈
	     showchoscircle(){
	       	this.cicrlepage='1';
	     	  this.cicrleList();
	     	  this.taglist();
        	this.ismask=true;
       	  this.choscircle=true;
       }
	    //关闭朋友圈
       closechoscircle(){
	       	this.cicrletag='';
		    	this.cicrlemodel='';
		      this.cicrleRightData=[];
	       	this.ismask=false;
	       	this.choscircle=false;
      }
      
       chooseemija(){
			    $("#editora").emoji({
			        button: "#btna",
			        showTab: false,
			        animation: 'none',
			        icons: [{
			            name: "QQ表情",
			            path: "./assets/images/qq/",
			            maxNum: 91,
			            excludeNums: [41, 45, 54],
			            file: ".gif",
			        }]
			    });
      }
      chooseemijb(){
			    $("#editorb").emoji({
			        button: "#btnb",
			        showTab: false,
			        animation: 'none',
			        icons: [{
			            name: "QQ表情",
			            path: "./assets/images/qq/",
			            maxNum: 91,
			            excludeNums: [41, 45, 54],
			            file: ".gif",
			        }]
			    });
      }
      changea(e){
 	       console.log(e)
      }
      changeb(e){
 	       console.log(e)
      }
      ying(e){
      	if(e=="防封号策略B"){
      		 this.celuob=true;
      	}else if(e=="防封号策略A"){
      	   this.celuob=false;
      	}
      	 
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
  surecirlcecon(){
  	if(this.cicrleRightData.length==0){
  		alert("请选择朋友圈内容")
  	}else{
  		var str='';
  		var strid='';
  		for(var i=0;i<this.cicrleRightData.length;i++){
  			str+=this.cicrleRightData[i].contentOfMoment+',';
  			strid+=this.cicrleRightData[i].id+',';
  		}
  		str=str.substring(0,str.length-1);
  		strid=strid.substring(0,strid.length-1);
  		this.cicrleRightData=[];
  		this.choscircle=false;
  		this.ismask=false;
  		$(".goucircle").html(str)
  		this.circleids=strid;
  	}
  }
  //立即执行
  open(){
  	        //判断任务
					   if(this.taskmodel==""){
					   	  alert("请填写任务名称");
					   	   return false;
					   }else{
					   	  console.log(this.taskmodel);
					   }
             //判断社交号
					  if(this.wechatid==''){
					  	 alert("请选择社交号");
					  	  return false;
					  }else{
					  	  console.log(this.wechatid);
					  }
					  //朋友圈内容
					  if(this.item==0){
					  	if(this.circleids==''){
					  		alert("请勾选朋友圈");
					  		 return false;
					  	}else{
					  		console.log(this.circleids)
					  	}
					  }
					   //超时时间
					   if(this.timeout==''){
					   	  alert("请选择超时时间");
					   	  return false;
					   }else{
					     	console.log(this.timeout)
					   }
					    //开始间隔
					   if(this.interval1==''){
					   	  alert("请选择开始间隔");
					   	  return false;
					   }else{
					   	  console.log(this.interval1)
					   }
					    //结束间隔
					   if(this.interval2==''){
					   	  alert("请选择结束间隔");
					   	  return false;
					   }else{
					   	  console.log(this.interval2)
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
							  console.log(str)
							  console.log("type:"+0)
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
							 console.log(str)
							 console.log("type:"+1)
					   }else{
					    	console.log("空")
							  console.log("type:"+2)
					   }  
  }
  //确认添加
  addtaskplan(){
  	    var date = new Date(this.startdate);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		    var D = date.getDate()<10 ? "0" + date.getDate()+ ' ':date.getDate()+ ' ';
		    var H=date.getHours()+':';
		    var F=date.getMinutes()<10 ? "0"+date.getMinutes()+':00':date.getMinutes()+':00';
		    this.start=Y+M+D+H+F;
				console.log("开始时间是:"+this.start)
	         
	      var date = new Date(this.enddate);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		    var D = date.getDate()<10 ? "0" + date.getDate()+ ' ':date.getDate()+ ' ';
		    var H=date.getHours()+':';
		    var F=date.getMinutes()<10 ? "0"+date.getMinutes()+':00':date.getMinutes()+':00';
		    this.end=Y+M+D+H+F;
				console.log("结束时间是:"+this.end)
	            if(this.radioValue==''){
	            	 alert("请选择优先级");
	            	 return false;
	            }else if(this.radioValue=='A'){
	            	console.log("发0");
	            }else{
	            	console.log("发1");
	            }
	            var zhushi=$(".zhushi").html();
	            if(zhushi==''){
	            	alert("请填写");
	            }else{
	            	 console.log(zhushi);
	            }
  }
}
