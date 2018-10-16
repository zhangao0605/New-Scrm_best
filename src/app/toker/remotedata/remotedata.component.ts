import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
declare var $: any;
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as setHours from 'date-fns/set_hours';
import * as GlobalUrl from '../../globals';             
@Component({
  selector: 'app-remotedata',
  templateUrl: './remotedata.component.html',
  styleUrls: ['./remotedata.component.css']
})
export class RemotedataComponent implements OnInit {
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
		date = null;
		time: Date | null = null;
	  checkeds=false;
	  radioValue='';
	  timeout='';
	  interval1='';
	  interval2='';
		ismask=false;
		huashulabel=false;
	  isremotedata=false;
	  tablenum:number=0;
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
	   clicktag='';
	   //查所有标签
	   allTagUrl:string= GlobalUrl.prioductUrl +'tag/getAllTag';
	  
	   allTagList=[];
	    
	   //话术文件上传
     huashuwenjian:string=GlobalUrl.prioductUrl +'script/uploadScript';
     
     Wordsart='';
     huashuname='';
     taskmodel='';
     huashucontent='';
     huashuids='';
     
     //远程数据加人
     InitializeUrl:string=GlobalUrl.prioductUrl +'remote/getRemoteData';
     
     theremoteUrl:string=GlobalUrl.prioductUrl +'remote/getRemoteTaskByStatus';
     
     theremotedata=[];
	   ngOnInit(){
	   	   let formdata1=new FormData();
         this.http.post(this.InitializeUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
	      	 	let formdata2=new FormData();
	          formdata2.append('status','1');
	          this.http.post(this.theremoteUrl,formdata2).subscribe(response=>{
	      	  if(response['code']==200){
	      	 	  this.theremotedata=response['data'];
	      	 	  console.log(this.theremotedata)
	          }},error=>{
	       	   console.log('post请求失败', error)
	          })
         }},error=>{
       	   console.log('post请求失败', error)
         })
	   }
	  
	 
	  constructor(private http: HttpClient, private msg: NzMessageService) {}
	
	  //开始限制
    disabledDate = (current: Date): boolean => {
     return differenceInCalendarDays(current, this.startdate) <=0;
    };
    //结束限制
     disabledDate1 = (current: Date): boolean => {
     return differenceInCalendarDays(current, this.enddate) <=0;
    };
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
					  //话术判断
					   if(this.huashunum==0){
					   	  if(this.huashucontent==''){
					   	  	 alert("请选择话术标签");
					   	  	 return false;
					   	  }else{
					   	  	 console.log(this.huashuids);
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
				            console.log("我要给后台发--------------------------"+h);
					   }else{
					   	   if(this.Wordsart==''){
					   	    	alert("请选择话术文件");
					   	    	return false;
					   	   }else{
					   	     console.log(this.Wordsart);
					   	   }
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
					  	  this.isremotedata=false;
					  	  this.ismask=false;
					  	  this.rightData=[];
					  	  this.sjinputmodel='';
					  	  for(var i=0;i<this.shejarr.length;i++){
	      	       	this.shejarr[i].checked=false;
	      	      }
	  	}
  }
	
	
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
    //切换远程数据
	   TableClick(value){
	   	  this.tablenum = value;
	   	  if(this.tablenum==0){
	   	  	 let formdata2=new FormData();
	         formdata2.append('status','1');
	         this.http.post(this.theremoteUrl,formdata2).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	  this.theremotedata=response['data'];
	      	 	  console.log(this.theremotedata)
	         }},error=>{
	       	   console.log('post请求失败', error)
	         })
	   	  }else if(this.tablenum==1){
	   	  	  let formdata2=new FormData();
	          formdata2.append('status','0');
	          this.http.post(this.theremoteUrl,formdata2).subscribe(response=>{
	      	  if(response['code']==200){
	      	 	    this.theremotedata=response['data'];
	      	 	    console.log(this.theremotedata)
	          }},error=>{
	       	   console.log('post请求失败', error)
	          })
	   	  }else{
	   	  	 let formdata2=new FormData();
	         formdata2.append('status','10');
	         this.http.post(this.theremoteUrl,formdata2).subscribe(response=>{
	      	 if(response['code']==200){
	      	 	  this.theremotedata=response['data'];
	      	 	  console.log(this.theremotedata)
	         }},error=>{
	       	   console.log('post请求失败', error)
	         })
	   	  }
		    
	   } 
	   HuashuClick(value){
	   	  this.huashunum = value;
		    console.log(this.huashunum);
	   }
//	   关闭社交号
	   closeisremotedata(){
		   	this.rightData=[];
				this.sjinputmodel='';
		    for(var i=0;i<this.shejarr.length;i++){
	   	       this.shejarr[i].checked=false;
	      }
		   	this.isremotedata=false;
		   	this.ismask=false;
	   }
//	   打开社交号
		showisremotedata(){
			this.page='1';
			this.shejiaolist();
			this.isremotedata=true;
			this.ismask=true;
		}
		
		showbiao(){
  	 $("#editor2").emoji({
	        button: "#btn2",
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
	 
	   //所有标签
    taglist(){
    	   let formdata1=new FormData();
    	   formdata1.append('accountId',localStorage.getItem('id'));
    	   formdata1.append('page','1')
           this.http.post(this.allTagUrl,formdata1).subscribe(response=>{
      	   if(response['code']==200){
      	     this.allTagList=response['data'].tagList;
           }},error=>{
       	     console.log('post请求失败', error)
           })
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
