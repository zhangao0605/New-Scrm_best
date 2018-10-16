import { Component, OnInit } from '@angular/core';
declare var $: any;
declare let BMap: any;
import {HttpClient} from "@angular/common/http";
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as setHours from 'date-fns/set_hours';
import * as GlobalUrl from '../../globals';
  
@Component({
  selector: 'app-positioncrossing',
  templateUrl: './positioncrossing.component.html',
  styleUrls: ['./positioncrossing.component.css']
})
export class PositioncrossingComponent implements OnInit {
	  timeout='';
	  interval1='';
	  interval2='';
		date = null;
		time: Date | null = null
		mapLocation="quejia";
		ismask=false;
		ispositioncrossing=false;
		radioValue='';
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
	  taskmodel='';
	  
	  AccurateandUrl:string=GlobalUrl.prioductUrl +'extension/positionThrough';
	 
		constructor(private http: HttpClient) {}
		
		
		 ngOnInit() {
			 	var map = new BMap.Map("page14-map");
				map.centerAndZoom("北京", 12);                   // 初始化地图,设置城市和地图级别。
				map.enableScrollWheelZoom(true); 
				map.addEventListener('click', function (e) {
					$.ajax({
							type: 'GET',
							url: 'http://api.map.baidu.com/geocoder/v2/?ak=HbUVYMUg6PwbOnXkztdgSQlQ&callback=renderReverse&location=' + e.point.lat + ',' + e.point.lng + '&output=json&pois=1',
							dataType: 'JSONP',
							success: function (data1) {    
								console.log(data1)      
										this.mapLocation = data1.result.formatted_address;
							}
					});
				});
				 //建立一个自动完成的对象
				 var ac = new BMap.Autocomplete({
					"input": "suggestId",
					"location": map
	      });
				//鼠标放在下拉列表上的事件
				ac.addEventListener("onhighlight", function (e) {  
						var str = "";
						var _value = e.fromitem.value;
						var value = "";
						if (e.fromitem.index > -1) {
								value = _value.province + _value.city + _value.district + _value.street + _value.business;
						}
						str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
		
						value = "";
						if (e.toitem.index > -1) {
								_value = e.toitem.value;
								value = _value.province + _value.city + _value.district + _value.street + _value.business;
						}
						str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
						G("searchResultPanel").innerHTML = str;
				});

	     //鼠标点击下拉列表后的事件
	      var myValue;
				ac.addEventListener("onconfirm", function (e) {
						var _value = e.item.value;
						myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
						G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " +myValue;
					  setPlace();
				})
			  function setPlace(){
							map.clearOverlays();    //清除地图上所有覆盖物
							function myFun() {
									var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
									map.centerAndZoom(pp, 18);
									map.addOverlay(new BMap.Marker(pp));    //添加标注
									localStorage.setItem('jd',pp.lng);
									localStorage.setItem('wd',pp.lat)
								  
							}
							var local = new BMap.LocalSearch(map, { //智能搜索
									onSearchComplete: myFun
							});
							local.search(myValue);
						
				}
			 function G(id) {
			   return document.getElementById(id);
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
		 
		 maplist(){
	
		 }
    //立即执行
		open(){
	       let formdata1=new FormData();
         formdata1.append('accountId',localStorage.getItem('id'));
			  var jingdu=localStorage.getItem('jd');
			  var weidu=localStorage.getItem('wd');
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
             //经纬度
             if($("#suggestId").val()==''){
             	 alert("请选择地区");
             	 return false;
             }else{
             	  formdata1.append('location',$("#suggestId").val());
             }
             formdata1.append('joinPlan','0');
             this.http.post(this.AccurateandUrl,formdata1).subscribe(response=>{
	      	   if(response['code']==200){
                 //任务名
		      	     this.taskmodel='';
                 //社交号
                 this.wechatid='';
                 this.shejiao='';
                 this.interval1='';
		      	     this.timeout='';
		      	     this.interval2='';
		      	     $("#suggestId").val('');
	         }},error=>{
	       	    console.log('post请求失败', error);
	         })
            
									
		}
		//确认添加
    addtaskplan(){
    		 let formdata1=new FormData();
         formdata1.append('accountId',localStorage.getItem('id'));
			   var jingdu=localStorage.getItem('jd');
			   var weidu=localStorage.getItem('wd');
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
             //经纬度
             if($("#suggestId").val()==''){
             	 alert("请选择地区");
             	 return false;
             }else{
             	   formdata1.append('location',$("#suggestId").val());
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
             this.http.post(this.AccurateandUrl,formdata1).subscribe(response=>{
	      	   if(response['code']==200){
                 //任务名
		      	     this.taskmodel='';
                 //社交号
                 this.wechatid='';
                 this.shejiao='';
                 this.radioValue='';
		      	     this.timeout='';
		      	     this.interval1='';
		      	     this.interval2='';
		      	     $("#suggestId").val('');
		      	     $(".zhushi").html('');
	         }},error=>{
	       	    console.log('post请求失败', error);
	         })
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
					  	  this.ispositioncrossing=false;
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
  //关闭社交号
	 closeisposition(){
	 	  this.rightData=[];
			this.sjinputmodel='';
	  	for(var i=0;i<this.shejarr.length;i++){
   	     this.shejarr[i].checked=false;
      }
		 	this.ispositioncrossing=false;
		 	this.ismask=false;
	 }
  //打开社交号
	 showisposition(){
	  	this.page='1';
	 	  this.shejiaolist();
		 	this.ispositioncrossing=true;
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
  showtask(e){
  	if(e==true){
		    $(".quejia").css("display","block");
		    this.surebtn=false;
  	}else{
  		  $(".quejia").css("display","none");
  		   this.surebtn=true;
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
	 
}
