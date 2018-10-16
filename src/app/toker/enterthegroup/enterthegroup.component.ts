import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
declare var $: any;
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as setHours from 'date-fns/set_hours';
import * as GlobalUrl from '../../globals';
@Component({
  selector: 'app-enterthegroup',
  templateUrl: './enterthegroup.component.html',
  styleUrls: ['./enterthegroup.component.css']
})
export class EnterthegroupComponent implements OnInit {
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
	timeout='';
	interval1='';
	interval2='';
	searval='';
	date = null;
	time: Date | null = null;
	radioValue='';
	checkeds=false;
	ismask=false;
	huashulabel=false;
	entershe=false;
  qunzuishow=false;
  weiqpnum:number = 0;
  huashunum:number=0;
  uploading = false;
  fileList: UploadFile[] = [];
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
  sjmoedle='';
  wechatid='';
  //选择群组
  grouplistUrl:string=GlobalUrl.prioductUrl +'chatroom/getChatroomByIdList';
  
  pageone='1';
  pageIndexone = 1;
  pageSizeone= 7;
  totalone=1;
  qunzuData=[];
  //获取所有标签
  allTagUrl:string=GlobalUrl.prioductUrl +'tag/getAllTag';
  
  allTagList=[];
  wechattag='';
  clicktag='';
  //根据标签查询群组
  bytagchangequnURL:string=GlobalUrl.prioductUrl +'chatroom/getChatroomByTagName';
 
  //根据名称询群组
  bytitlechangeUrl:string=GlobalUrl.prioductUrl +'chatroom/getAllChatroomByTitleName';
  
  titlemodel='';
  checkedqunData=[];
  checkdshejiao=[];
  //周期
  dingshiarr=[{time1:new Date(0, 0, 0, 0, 0, 0),time2:new Date(0, 0, 0, 0, 0, 0)}];
  zhouqiarr=[{zhouqiweek:"",time3:new Date(0, 0, 0, 0, 0, 0),time4:new Date(0, 0, 0, 0, 0, 0)}];
  cycle='A1';
  //话术
   showHuaShu:string=GlobalUrl.prioductUrl +'script/getAllScriptByPage';
   
   byhsmodelUrl:string=GlobalUrl.prioductUrl +'script/getAllScriptByTitleName';
  
   bytagchsUrl:string=GlobalUrl.prioductUrl +'script/getScriptByTagName';
   
   huaShuList=[];
   pageIndexhs=1;
   pageSizehs=4;
   totalhs=1;
   allChecked = false;
   indeterminate = false;
   displayData = [];
   huashurightData=[];
   huashumodel='';
   huashutags='';
   pagehs='1';
   allChecked1 = false;
	 indeterminate1 = false;
	 displayData1 = [];
	 
   //置顶群
   zhidingUrl:string=GlobalUrl.prioductUrl +'chatroom/getchatroomTopOrNotTop';
   
   isTop='';
   zhidingList=[];
   divconent='';
   huashuname='';
   
    //话术文件上传
    huashuwenjian:string=GlobalUrl.prioductUrl +'script/uploadScript';
    
    Wordsart='';
    qunzuname='';
    mubiaoids='';
    huashuids='';
    huashucontent='';
    taskmodel='';
    
    AccurateandUrl:string=GlobalUrl.prioductUrl +'extension/chatroomAddition';
    
    addnumber='';
  ngOnInit() {}
  
  constructor(private http: HttpClient, private msg: NzMessageService) {}
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
  // 目标群组数据变化时
 currentPageDataChange1($event: Array<{}>): void{
 	   this.displayData1 = $event;
 	   this.refreshStatus1();
 }

  //群组单选功能
  refreshStatus1(): void {
    const allChecked = this.displayData1.every(value => value.checked === true);
    const allUnChecked = this.displayData1.every(value => !value.checked);
    this.allChecked1 = allChecked;
    this.indeterminate1 = (!allChecked) && (!allUnChecked);
  }

  //群组全选功能
  checkAll1(value: boolean): void {
    this.displayData1.forEach(data => {
        data.checked = value;
    });
    this.refreshStatus1();
  }
   //开始限制
    disabledDate = (current: Date): boolean => {
     return differenceInCalendarDays(current, this.startdate) <=0;
    };
    //结束限制
     disabledDate1 = (current: Date): boolean => {
     return differenceInCalendarDays(current, this.enddate) <=0;
    };
  //群组全选添加
  alladdqunzu(e){
  	 if(e==true){
	      	if(this.checkedqunData.length==0){
		    		 	for(var i=0;i<this.qunzuData.length;i++){
		    		 		this.checkedqunData.push(this.qunzuData[i])
		    		 	}
	    		 }else{
			   	   for(var i=0;i<this.qunzuData.length;i++){
			    		 	    for(var j=0;j<this.checkedqunData.length;j++){
			            	  	 if(this.checkedqunData.indexOf(this.qunzuData[i])==-1){
					    				      this.checkedqunData.push(this.qunzuData[i])
					    			     }
				           }
	           }
	    		 }
	   }else{
	   	   for(var i=0;i<this.qunzuData.length;i++){
		    	  for(var j=0;j<this.checkedqunData.length;j++){
		    	  	  if(this.qunzuData[i].id=== this.checkedqunData[j].id){
					         this.checkedqunData.splice(j,1)
				        }
		    	  }
			   }
	   }
		console.log(this.checkedqunData)
  }
//群组单选添加
  oneaddqunzu(item,e){
  	 if(e==true){
			this.checkedqunData.push(item)
		 }else{
			 for(var i=0;i<this.checkedqunData.length;i++){
			 	  if(this.checkedqunData[i].id==item.id){
			 	  	this.checkedqunData.splice(i,1)
			 	  }
			 }
		 }
	  console.log(this.checkedqunData)
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
//  通过标签 改变群组
    bytagchangewechat(e){
    	  this.pageone='1';
    	  this.titlemodel='';
    	  this.clicktag=e;
    	  if(this.clicktag){
    	  	 let formdata1=new FormData();
	    	   formdata1.append('tagNames',this.clicktag);
		       formdata1.append('page',this.pageone);
		       formdata1.append('accountId','1');
		       formdata1.append('weChatIds',this.wechatid);
	         this.http.post(this.bytagchangequnURL,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	 this.totalone=response['data'].chatroomCount;
	      	   this.qunzuData=response['data'].chatroomList;
	      	   for(var i=0;i<this.qunzuData.length;i++){
	      	     	this.qunzuData[i].checked=false;
	      	   }
	      	   console.log(this.qunzuData);
	         }},error=>{
	       	   console.log('post请求失败', error)
	         })
    	  }else{
    	  	this.qunzulist();
    	  }
    }
    //  通过名称 改变群组
    bytitlechange(){
    	this.pageone='1';
    	if(this.titlemodel==''){
    		 alert("请输入搜索内容")
    	}else{
    		   let formdata1=new FormData();
	    	   formdata1.append('tagNames',this.clicktag);
		       formdata1.append('page',this.pageone);
		       formdata1.append('accountId',localStorage.getItem('id'));
		       formdata1.append('weChatIds',this.wechatid);
		       formdata1.append('message',this.titlemodel);
	         this.http.post(this.bytitlechangeUrl,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	 this.totalone=response['data'].chatroomCount;
	      	   this.qunzuData=response['data'].chatroomList;
	      	   for(var i=0;i<this.qunzuData.length;i++){
	      	     	this.qunzuData[i].checked=false;
	      	   }
	      	   console.log(this.qunzuData);
	         }},error=>{
	       	   console.log('post请求失败', error)
	         })
    	}
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
            // 目标微信/qq/手机号/判断
					   if(this.weiqpnum==0){
					   	  if(this.qunzuname==''){
					   	  	 alert("请选择目标群组");
					   	  	 return false;
					   	  }else{
					   	  	 formdata1.append('wechat',this.mubiaoids);
					   	  }
					   }else if(this.weiqpnum==2){
						    formdata1.append('wechat',this.mubiaoids);
					   }else if(this.weiqpnum==3){
						   	formdata1.append('wechat',this.mubiaoids);
					   }else{
               	formdata1.append('wechat',this.mubiaoids);
            }
				
				    //话术判断
					   if(this.huashunum==0){
					   	  if(this.huashucontent==''){
					   	  	 alert("请选择话术标签");
					   	  	 return false;
					   	  }else{
					   	  	formdata1.append('script',this.huashucontent)
					   	  }
					   }else if(this.huashunum==1){
					   	      var pagetablesaying = $(".compilation").html();
				            var reger = /<img.*?(?:>|\/>)/g;
				            var srcReg = /\/([^\/]*?\.gif)/i;
				            var imglist = pagetablesaying.match(reger);
				            if (!pagetablesaying) {
				                alert("请选择表情");
				                return false
				            }  else {
				                var tt = []
				                for (var i = 0; i < imglist.length; i++) {
				                    var src = imglist[i].match(srcReg);
				                    if (src[1]) {
				                        tt.push(src[1].substring(0, src[1].indexOf('.')))
				                    }
				                    for (var tt1 = [], i1 = 0; i1 < tt.length; i1++) {
				                        for (var i2 = 0; i2 < this.emjoyAllGet.length; i2++) {
				                            if (tt[i1] == i2) {
				                                tt1.push(this.emjoyAllGet[i2 - 1])
				                            }
				                        }
				                    }
				                }
				                var result = pagetablesaying.match(/<img.*?(?:>|\/>)/g);
				                for (var i = 0; i < result.length; i++) {
				                    pagetablesaying = pagetablesaying.replace(result[i], tt1[i])
				                }
				            }
				            var a = pagetablesaying.replace(/<\/div>/g, "");
				            var b = a.replace(/<br>/g, "");
				            var c = b.replace(/<div>/g, "<br>");
				            var d = c.replace(/<br>/g, "");
				            var e= d.replace(/&nbsp;/g, "");
				            var f= d.replace(/&lt;/g,"<");
				            var g= f.replace(/&gt;/g,">");
				            var h= g.replace(/&nbsp;/g,"");
				            formdata1.append('script',h)
					   }else{
					   	   if(this.Wordsart==''){
					   	    	alert("请选择话术文件");
					   	    	return false;
					   	   }else{
					   	      formdata1.append('script',this.Wordsart)
					   	   }
					   }
					   
					   //加人数量
					   if(this.addnumber==''){
					    	alert("请选择加人数量");
					    	return false;
					   }else{
					   	 formdata1.append('joinNumber',this.addnumber)
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
					   formdata1.append('joinPlan','0');
					   this.http.post(this.AccurateandUrl,formdata1).subscribe(response=>{
	      	   if(response['code']==200){
                 //任务名
		      	     this.taskmodel='';
                 //社交号
                 this.wechatid='';
                 this.sjmoedle='';
                 //微信
                 this.qunzuname='';
                 this.mubiaoids='';
                 this.addnumber='';
                 //话术
                 if(this.huashunum==0){
                 	 this.huashucontent='';
                 }else if(this.huashunum==1){
                 	
                 }else{
                 	   this.Wordsart='';
                 }
		      	     this.timeout='';
		      	     this.interval1='';
		      	     this.interval2='';
	         }},error=>{
	       	    console.log('post请求失败', error);
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
  	 	      var checkdshejiao=[]
  	 	      var str='';
  	 	      var shejiaoids='';
  	 	       for(var i=0;i<this.rightData.length;i++){
				     	  str+=this.rightData[i].socialNumber+','
				     	  shejiaoids+=this.rightData[i].id+','
				     	  checkdshejiao.push(this.rightData[i].socialNumber)
				     }  
				     this.checkdshejiao=checkdshejiao;
			       str=str.substring(0,str.length-1);
			       shejiaoids=shejiaoids.substring(0,shejiaoids.length-1);
			        this.wechatid=shejiaoids;
			        console.log(this.wechatid)
			        this.sjmoedle=str;
				  	  this.entershe=false;
				  	  this.ismask=false;
				  	  this.rightData=[];
				  	  this.sjinputmodel='';
				  	  for(var i=0;i<this.shejarr.length;i++){
      	       	this.shejarr[i].checked=false;
      	      }
  	 }
  }
//关闭社交号弹框
  closeentershe(){
	  	 this.rightData=[];
			 this.sjinputmodel='';
				for(var i=0;i<this.shejarr.length;i++){
      	   this.shejarr[i].checked=false;
      	}
	  	this.entershe=false;
	  	this.ismask=false;
  }
//打开社交号弹框
  showentershe(){
	  	this.page='1';
	  	this.shejiaolist();
	  	this.entershe=true;
	  	this.ismask=true;
  }
//话术导入
  beforeUpload = (file: any): boolean => {
	  	   this.huashuname=file.name;
  	     let formdata1=new FormData();
	       formdata1.append('file',file);
         this.http.post(this.huashuwenjian,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	  var str='';
      	 	  for(var i=0;i<response['data'].length;i++){
      	 	  	str+=response['data'][i]+',';
      	 	  }
      	 	  str=str.substring(0,str.length-1);
      	 	  this.Wordsart=str;
      	 	  console.log(this.Wordsart)
         }else if(response['code']==500){
           $(".namewenjian").text("无文件");
           $(".wenjiansize").text("0kb");
         	 alert(response['data']);
         }},error=>{
       	    console.log('post请求失败', error)
         })
	  	$(".namewenjian").text(file.name);
	    $(".wenjiansize").text((file.size/1024).toFixed(2)+'kb');
	    if(this.fileList.length<1){
	    	 this.fileList.push(file);
	    }
	    return false;
  }
  closewen(){
	  	$(".namewenjian").text("无文件");
	    $(".wenjiansize").text("0kb");
	  	this.huashuname='无文件';
  }
  
  zhidinglist(){
  	           this.mubiaoids='';
  	           let formdata1=new FormData();
			         formdata1.append('weChatIds',this.wechatid);
			         formdata1.append('accountId',localStorage.getItem('id'));
			         formdata1.append('isTop',this.isTop);
			         this.http.post(this.zhidingUrl,formdata1).subscribe(response=>{
			      	 if(response['code']==200){
			      	   	 this.zhidingList=response['data'].chatroomList;
			      	     var str='';
			      	     var strid='';
							  	 for(var i=0;i<this.zhidingList.length;i++){
							  		 str+=this.zhidingList[i].chatroomName+',';
							  		 strid+=this.zhidingList[i].id+',';
							  	 }
							     str=str.substring(0,str.length-1);
							     strid=strid.substring(0,strid.length-1);
							     this.divconent=str;
							     this.mubiaoids=strid;
							     console.log(this.mubiaoids)
							     this.qunzuname=this.divconent
							     
			        }},error=>{
			       	  console.log('post请求失败', error)
			        })
  }
  //显示置顶
   WeiqpNumClick(value){
	      this.weiqpnum = value;
	     if(this.wechatid==''){
	     	  alert("请选择社交号")
	     }else{
	     	   if(this.weiqpnum==2){
		     	   	this.isTop='1';
		     	   	this.zhidinglist();
		     	   	
	         }else if(this.weiqpnum==3){
	         	  this.isTop='0';
	         	  this.zhidinglist();
	         	  	
	         }else if(this.weiqpnum==4){
	         	  this.isTop='';
	         	  this.zhidinglist();
	         	  	
	         }else{
	         	this.qunzuname='';
	         }
	     }
   }
   HuashuClick(value){
   	  this.huashunum = value;
	    console.log(this.huashunum);
   }
   // 关闭群组
  closequnzu(){
  	this.pageone='1';
    this.titlemodel='';
    this.wechattag='';
  	this.qunzuishow=false;
  	this.ismask=false;
  }
  //群组列表
  qunzulist(){
  	     let formdata1=new FormData();
	       formdata1.append('page',this.pageone);
	       formdata1.append('accountId',localStorage.getItem('id'));
	       formdata1.append('weChatIds',this.wechatid);
         this.http.post(this.grouplistUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	 this.totalone=response['data'].chatroomCount;
      	   this.qunzuData=response['data'].chatroomList;
      	   for(var i=0;i<this.qunzuData.length;i++){
      	     	this.qunzuData[i].checked=false;
      	   }
      	   console.log(this.qunzuData);
         }},error=>{
       	   console.log('post请求失败', error)
         })
  }
  //展示群组
  showqunzu(){
	  	if(this.wechatid==''){
	  		alert("请选择社交号")
	  	}else{
	  	  	this.qunzuishow=true;
	  	    this.ismask=true;
	  		  this.pageone='1';
	  	    this.qunzulist();
	  	    this.taglist();
	  	}
  }
//确认群组
  surequnzu(){
	  if(this.checkedqunData.length==0){
	  	alert("请选择")
	  }else{
	  	 var qunzustr='';
	  	 var qunzustrid='';
	  	 for(var i=0;i<this.checkedqunData.length;i++){
	  		 qunzustr+=this.checkedqunData[i].chatroomName+',';
	  		 qunzustrid+=this.checkedqunData[i].id+',';
	  	 }
	     qunzustr=qunzustr.substring(0,qunzustr.length-1);
	     qunzustrid=qunzustrid.substring(0,qunzustrid.length-1);
	      this.titlemodel='';
        this.wechattag='';
        this.mubiaoids='';
  	    this.qunzuishow=false;
  	    this.ismask=false;
  	    this.checkedqunData=[];
  	    this.mubiaoids=qunzustrid;
  	    for(var i=0;i<this.qunzuData.length;i++){
      	     	this.qunzuData[i].checked=false;
      	}
  	    console.log(this.mubiaoids)
  	   this.qunzuname=qunzustr
	     
	  }
  }
//群组分页
  searchDataone(e){
  	this.pageone=e;
  	if(this.clicktag){
  		    let formdata1=new FormData();
	    	   formdata1.append('tagNames',this.clicktag);
		       formdata1.append('page',this.pageone);
		       formdata1.append('accountId',localStorage.getItem('id'));
		       formdata1.append('weChatIds',this.wechatid);
	         this.http.post(this.bytagchangequnURL,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	 this.totalone=response['data'].chatroomCount;
	      	   this.qunzuData=response['data'].chatroomList;
	      	   for(var i=0;i<this.qunzuData.length;i++){
	      	     	this.qunzuData[i].checked=false;
	      	   }
	      	   console.log(this.qunzuData);
	         }},error=>{
	       	   console.log('post请求失败', error)
	         })
  	}else{
  		this.qunzulist()
  	}
  	
  	
  }
 addtaskplan(){
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
            // 目标微信/qq/手机号/判断
					   if(this.weiqpnum==0){
					   	  if(this.qunzuname==''){
					   	  	 alert("请选择目标群组");
					   	  	 return false;
					   	  }else{
					   	  	 formdata1.append('wechat',this.mubiaoids);
					   	  }
					   }else if(this.weiqpnum==2){
						    formdata1.append('wechat',this.mubiaoids);
					   }else if(this.weiqpnum==3){
						   	formdata1.append('wechat',this.mubiaoids);
					   }else{
               	formdata1.append('wechat',this.mubiaoids);
            }
				
				    //话术判断
					   if(this.huashunum==0){
					   	  if(this.huashucontent==''){
					   	  	 alert("请选择话术标签");
					   	  	 return false;
					   	  }else{
					   	  	formdata1.append('script',this.huashucontent)
					   	  }
					   }else if(this.huashunum==1){
					   	      var pagetablesaying = $(".compilation").html();
				            var reger = /<img.*?(?:>|\/>)/g;
				            var srcReg = /\/([^\/]*?\.gif)/i;
				            var imglist = pagetablesaying.match(reger);
				            if (!pagetablesaying) {
				                alert("请选择表情");
				                return false
				            }  else {
				                var tt = []
				                for (var i = 0; i < imglist.length; i++) {
				                    var src = imglist[i].match(srcReg);
				                    if (src[1]) {
				                        tt.push(src[1].substring(0, src[1].indexOf('.')))
				                    }
				                    for (var tt1 = [], i1 = 0; i1 < tt.length; i1++) {
				                        for (var i2 = 0; i2 < this.emjoyAllGet.length; i2++) {
				                            if (tt[i1] == i2) {
				                                tt1.push(this.emjoyAllGet[i2 - 1])
				                            }
				                        }
				                    }
				                }
				                var result = pagetablesaying.match(/<img.*?(?:>|\/>)/g);
				                for (var i = 0; i < result.length; i++) {
				                    pagetablesaying = pagetablesaying.replace(result[i], tt1[i])
				                }
				            }
				            var a = pagetablesaying.replace(/<\/div>/g, "");
				            var b = a.replace(/<br>/g, "");
				            var c = b.replace(/<div>/g, "<br>");
				            var d = c.replace(/<br>/g, "");
				            var e= d.replace(/&nbsp;/g, "");
				            var f= d.replace(/&lt;/g,"<");
				            var g= f.replace(/&gt;/g,">");
				            var h= g.replace(/&nbsp;/g,"");
				            formdata1.append('script',h)
					   }else{
					   	   if(this.Wordsart==''){
					   	    	alert("请选择话术文件");
					   	    	return false;
					   	   }else{
					   	      formdata1.append('script',this.Wordsart)
					   	   }
					   }
					   
					    //加人数量
					   if(this.addnumber==''){
					    	alert("请选择加人数量");
					    	return false;
					   }else{
					   	 formdata1.append('joinNumber',this.addnumber)
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
		    formdata1.append('joinPlan','0');
		   this.http.post(this.AccurateandUrl,formdata1).subscribe(response=>{
		   if(response['code']==200){
		     //任务名
		  	 this.taskmodel='';
		     //社交号
		     this.wechatid='';
		     this.sjmoedle='';
		     //微信
		     this.qunzuname='';
		     this.mubiaoids='';
		     //话术
		     if(this.huashunum==0){
		     	 this.huashucontent='';
		     }else if(this.huashunum==1){
		     	
		     }else{
		     	   this.Wordsart='';
		     }
		         this.addnumber='';
		  	     this.timeout='';
		  	     this.interval1='';
		  	     this.interval2='';
		  	     this.radioValue='';
		  	     $(".zhushi").html('');
		 }},error=>{
		    console.log('post请求失败', error);
		 })
 }
  showbiao(){
  	 $("#editor1").emoji({
	        button: "#btn1",
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
     //展示话术弹框
   showhuashulabel(){
   	 this.huashulabel=true;
   	 this.taglist();
   	 this.pagehs='1';
   	 this.showhuashu();
   	 this.ismask=true;
   }
   // 关闭话术
    closehuashulabel(){
    	this.huashutags='';
    	this.pagehs='1';
    	this.huashumodel='';
    	this.huashurightData=[];
   	    this.huashulabel=false;
   	    this.ismask=false;
   }
   //话术列表
    showhuashu(){
    	      let formdata1=new FormData();
    	      formdata1.append('accountId',localStorage.getItem('id'))
    	      formdata1.append('page',this.pagehs)
	         this.http.post(this.showHuaShu,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	  this.totalhs=response['data'].scriptCount;
	      	    this.huaShuList=response['data'].scriptList;
	      	    for(var i=0;i<this.huaShuList.length;i++){
	      	    	this.huaShuList[i].checked=false;
	      	    }
	         }},error=>{
	       	   console.log('post请求失败', error)
	         })
    }
   
   // 通过模糊查询改变话术列表
   bymodelchangehs(){
     	this.pagehs='1';
   	  if(this.huashumodel==''){
   	  	 alert("请输入搜索内容")
   	  }else{
   	  	 let formdata1=new FormData();
    	   formdata1.append('accountId',localStorage.getItem('id'))
    	   formdata1.append('page',this.pagehs)
    	   formdata1.append('tagNames',this.clicktag)
    	   formdata1.append('message',this.huashumodel)
         this.http.post(this.byhsmodelUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	  this.totalhs=response['data'].scriptCount;
      	    this.huaShuList=response['data'].scriptList;
      	    for(var i=0;i<this.huaShuList.length;i++){
      	    	this.huaShuList[i].checked=false;
      	    }
         }},error=>{
       	   console.log('post请求失败', error)
         })
   	  }
   }
   //通过标签查询改变话术
   bytagchangehs(e){
     	this.huashumodel='';
   	  this.pagehs='1';
	   	this.clicktag=e;
	   	if(this.clicktag||this.huashumodel){
	   		   let formdata1=new FormData();
	    	   formdata1.append('accountId',localStorage.getItem('id'))
	    	   formdata1.append('page',this.pagehs)
	    	   formdata1.append('tagNames',this.clicktag)
	         this.http.post(this.bytagchsUrl,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	  this.totalhs=response['data'].scriptCount;
	      	    this.huaShuList=response['data'].scriptList;
	      	    for(var i=0;i<this.huaShuList.length;i++){
	      	    	this.huaShuList[i].checked=false;
	      	    }
	         }},error=>{
	       	   console.log('post请求失败', error)
	         })
	   	}else{
	   		this.showhuashu();
	   	} 
   }
   //话术分页
  searchDatahs(e){
  	      this.pagehs=e;
  	     if(this.huashumodel){
	  	     	 let formdata1=new FormData();
		    	   formdata1.append('accountId',localStorage.getItem('id'))
		    	   formdata1.append('page',this.pagehs)
		    	   formdata1.append('tagNames',this.clicktag)
		    	   formdata1.append('message',this.huashumodel)
		         this.http.post(this.byhsmodelUrl,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	 	  this.totalhs=response['data'].scriptCount;
		      	    this.huaShuList=response['data'].scriptList;
		      	    for(var i=0;i<this.huaShuList.length;i++){
		      	    	this.huaShuList[i].checked=false;
		      	    }
		         }},error=>{
		       	   console.log('post请求失败', error)
		         })
  	     }else if(this.clicktag){
             let formdata1=new FormData();
		    	   formdata1.append('accountId',localStorage.getItem('id'))
		    	   formdata1.append('page',this.pagehs)
		    	   formdata1.append('tagNames',this.clicktag)
		         this.http.post(this.bytagchsUrl,formdata1).subscribe(response=>{
		      	 if(response['code']==200){
		      	 	  this.totalhs=response['data'].scriptCount;
		      	    this.huaShuList=response['data'].scriptList;
		      	    for(var i=0;i<this.huaShuList.length;i++){
		      	    	this.huaShuList[i].checked=false;
		      	    }
		         }},error=>{
		       	   console.log('post请求失败', error)
		         })
  	     }else{
  	     	  this.showhuashu();
  	     }
  }
   //话术的确定按钮
   surehuashu(){
    	 if(this.huashurightData.length==0){
    	 	  alert("请选择")
    	 }else{
    	 	  var hsstr='';
    	 	  var hsstrid='';
    	 	  for(var i=0;i<this.huashurightData.length;i++){
    	 	  	 hsstr+=this.huashurightData[i].content+',';
    	 	  	 hsstrid+=this.huashurightData[i].id+',';
    	 	  }
    	 	  hsstr=hsstr.substring(0,hsstr.length-1);
    	 	  hsstrid=hsstrid.substring(0,hsstrid.length-1);
    	 	  this.huashuids=hsstrid;
    	 	  this.huashucontent=hsstr;
    	 	  this.huashutags='';
		      this.huashumodel='';
		      this.huashurightData=[];
		   	  this.huashulabel=false;
		   	  this.ismask=false;
		   	  for(var i=0;i<this.huaShuList.length;i++){
      	    	this.huaShuList[i].checked=false;
      	  }
		   	  console.log(this.huashuids)
    	 }
   }
    //话术数据变化时
    currentPageDataChange($event: Array<{}>): void {
	    this.displayData = $event;
	    this.refreshStatus();
   }
    //话术单选功能
  refreshStatus(): void {
    const allChecked = this.displayData.every(value => value.checked === true);
    const allUnChecked = this.displayData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }
  //话术全选功能
  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
        data.checked = value;
    });
    this.refreshStatus();
  }
  //话术单选添加
  oncheckadd(item,e){
	   if(e==true){
			this.huashurightData.push(item)
		 }else{
			 for(var i=0;i<this.huashurightData.length;i++){
			 	  if(this.huashurightData[i].id==item.id){
			 	  	this.huashurightData.splice(i,1)
			 	  }
			 }
		 }
	  console.log(this.huashurightData)
  }
  //话术全选添加
  allcheckadd(e){
	    if(e==true){
	      	if(this.huashurightData.length==0){
		    		 	for(var i=0;i<this.huaShuList.length;i++){
		    		 		this.huashurightData.push(this.huaShuList[i])
		    		 	}
	    		 }else{
			   	   for(var i=0;i<this.huaShuList.length;i++){
			    		 	    for(var j=0;j<this.huashurightData.length;j++){
			            	  	 if(this.huashurightData.indexOf(this.huaShuList[i])==-1){
					    				      this.huashurightData.push(this.huaShuList[i])
					    			     }
				           }
	           }
	    		 }
	   }else{
	   	   for(var i=0;i<this.huaShuList.length;i++){
		    	  for(var j=0;j<this.huashurightData.length;j++){
		    	  	  if(this.huaShuList[i].id=== this.huashurightData[j].id){
					         this.huashurightData.splice(j,1)
				        }
		    	  }
			   }
	   }
		console.log(this.huashurightData)
  }
    
}
