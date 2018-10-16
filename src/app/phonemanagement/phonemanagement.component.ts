import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
declare var $: any;
import * as GlobalUrl from '../globals'
@Component({
  selector: 'app-phonemanagement',
  templateUrl: './phonemanagement.component.html',
  styleUrls: ['./phonemanagement.component.css']
})
export class PhonemanagementComponent implements OnInit {
	inputmodel="";
  zhucehist=false;
  addhist=false;
  phonecard=false;
  phoneData=[];
  zhuceData=[];
//添加手机卡
  phone="";
  weitime="";
  yunValue="";
  renpeople="";
  zhengdValue="";
  zhenghao="";
  agotime="";
  nearwei="";
  money="";
//添加历史
  history_pt="";
  history_sjnc="";
  history_sjh="";
  history_bdzt="";
  history_zhzt="";
  history_zcsj=""
  history_fengtime="";
  history_jietime="";
  history_fengresult="";
  history_bd="";
  history_pn1="";
  history_pn2="";
  history_pn3="";
  history_pn4="";
  pageIndex = 1;
  pageSize= 10;
  total=1;
  page="1";
  pageIndex1 = 1;
  pageSize1=6;
  total1=1;
  historyId="";
  histpage="1";
  ismask=false;
//quanxianUrl:string="http://192.168.1.241:8081/scrm/phone/getPhoneByAccountId";
//addPhone:string='http://192.168.1.241:8081/scrm/phone/addPhone';
//addHistory:string="http://192.168.1.241:8081/scrm/phonestatus/addPhonestatus";
//zhuceHistory:string="http://192.168.1.241:8081/scrm/phonestatus/getPhonestatusByPhoneId";
//delectPhone:string="http://192.168.1.241:8081/scrm/phone/deletePhoneById";
//searchUrl:string="http://192.168.1.241:8081/scrm/phone/getPhoneByName";
  
  
  quanxianUrl:string=GlobalUrl.prioductUrl +'phone/getPhoneByAccountId';
  addPhone:string=GlobalUrl.prioductUrl +'phone/addPhone';
  addHistory:string=GlobalUrl.prioductUrl +'phonestatus/addPhonestatus';
  zhuceHistory:string=GlobalUrl.prioductUrl +'phonestatus/getPhonestatusByPhoneId';
  delectPhone:string=GlobalUrl.prioductUrl +'phone/deletePhoneById';
  searchUrl:string=GlobalUrl.prioductUrl +'phone/getPhoneByName';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.list();

  }
//关闭卡片
  colsephonecard(){
  	this.phonecard=false;
  	this.ismask=false;
  }
  showphonecard(){
  	this.ismask=true;
  	this.phonecard=true;
  }
//注册历史
 showzhucehist(id){
 	     this.zhucehist=true;
 	     this.ismask=true;
       this.historyId=id;
       this.histlist();
 }
 closezhucehist(){
 	  this.zhucehist=false;
 	   this.ismask=false;
 	  this.histpage="1";
 }
// 添加历史
 showaddhist(){
 	  this.addhist=true;
 	  this.ismask=true;
 }
  closeaddhist(){
 	  this.addhist=false;
 	   this.ismask=false;
 }
  histlist(){
  	     let formdata1=new FormData();
         formdata1.append('page',this.histpage);
         formdata1.append('phoneId',this.historyId);
         this.http.post(this.zhuceHistory,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	 this.total1=response['data'].phonestatusesCount
      	 	 this.zhuceData=response['data'].phonestatuses;
      		 console.log(this.zhuceData)
        }},error=>{
       	   console.log('post请求失败', error)
        })
  }
  getAgotime(start){
	    	    var oDate = new Date(start);
						var Y = oDate.getFullYear() + '-';
						var M = (oDate.getMonth() + 1 < 10 ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1) + '-';
				    var D = oDate.getDate()<10 ? "0" + oDate.getDate()+ ' ':oDate.getDate()+ ' ';
				    this.agotime=Y+M+D;
				    console.log(this.agotime)
				   
	 }
  getWeitime(start){
	    	    var oDate = new Date(start);
						var Y = oDate.getFullYear() + '-';
						var M = (oDate.getMonth() + 1 < 10 ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1) + '-';
				    var D = oDate.getDate()<10 ? "0" + oDate.getDate()+ ' ':oDate.getDate()+ ' ';
				    this.weitime=Y+M+D;
				    console.log(this.weitime)
				   
	 }
   getZhuce(start){
	    	    var oDate = new Date(start);
						var Y = oDate.getFullYear() + '-';
						var M = (oDate.getMonth() + 1 < 10 ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1) + '-';
				    var D = oDate.getDate()<10 ? "0" + oDate.getDate()+ ' ':oDate.getDate()+ ' ';
				    this.history_zcsj=Y+M+D;
				    console.log(this.history_zcsj)
				   
	 }
    getFenghao(start){
	    	    var oDate = new Date(start);
						var Y = oDate.getFullYear() + '-';
						var M = (oDate.getMonth() + 1 < 10 ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1) + '-';
				    var D = oDate.getDate()<10 ? "0" + oDate.getDate()+ ' ':oDate.getDate()+ ' ';
				    this.history_fengtime=Y+M+D;
				    console.log(this.history_fengtime)
				   
	 }
     getJiefeng(start){
	    	    var oDate = new Date(start);
						var Y = oDate.getFullYear() + '-';
						var M = (oDate.getMonth() + 1 < 10 ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1) + '-';
				    var D = oDate.getDate()<10 ? "0" + oDate.getDate()+ ' ':oDate.getDate()+ ' ';
				    this.history_jietime=Y+M+D;
				    console.log(this.history_jietime)
				   
	 }
   list(){ 
         let formdata1=new FormData();
         formdata1.append('page',this.page);
         formdata1.append('accountId',localStorage.getItem('id'));
         formdata1.append('operator',"1");  
         this.http.post(this.quanxianUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	 this.total=response['data'].phoneCount;
      	 	 this.phoneData=response['data'].phoneList;
        }},error=>{
       	   console.log('post请求失败', error)
        })
  }
  delectphone(id){
	       let formdata1=new FormData();
         formdata1.append('id',id);
         this.http.post(this.delectPhone,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      		 console.log(response);
      		 this.list()
        }},error=>{
       	   console.log('post请求失败', error)
        })
  }
  addphone(){
  	if(!this.phone||!this.weitime||!this.yunValue||!this.renpeople||!this.zhengdValue||!this.zhenghao||!this.agotime||!this.nearwei||!this.money){
  		 alert("请确认信息完成")
  	}else{
  		    let formdata1=new FormData();
          formdata1.append('accountId',localStorage.getItem('id'));
          formdata1.append('certificateType',this.zhengdValue);
          formdata1.append('createTime',this.agotime);
          formdata1.append('lastregisterTime',this.weitime);
          formdata1.append('operator',this.yunValue);
          formdata1.append('payment',this.money)
          formdata1.append('person',this.renpeople);
          formdata1.append('phoneNumber',this.phone);
          formdata1.append('relevanceWechat',this.nearwei);
          formdata1.append('serialNumber',this.zhenghao);
          
          this.http.post(this.addPhone,formdata1).subscribe(response=>{
	      	 if(response['code']==200){
	      	    this.phonecard=false;
	      	    this.zhengdValue='';
	      	    this.agotime='';
	      	    this.weitime='';
	      	    this.yunValue='';
	      	    this.money='';
	      	    this.renpeople='';
	      	    this.phone='';
	      	    this.nearwei='';
	      	    this.zhenghao='';
	      	    this.list();
	        }},error=>{
	       	   console.log('post请求失败', error)
	        })  
  	}
  }
  pinjie(){
  	var a=this.history_pn1;
  	var b=this.history_pn2;
  	var c=this.history_pn3;
  	this.history_pn4=a+","+b+","+c;
  	console.log(this.history_pn4)
  }
  addhistory(){
			if(!this.history_pt||!this.history_sjnc||!this.history_sjh||!this.history_bdzt||!this.history_zhzt||!this.history_zcsj||!this.history_fengtime||!this.history_jietime||!this.history_fengresult||!this.history_bd||!this.history_pn1||!this.history_pn2||!this.history_pn3){
				 alert("天写")
			}else{
				      let formdata1=new FormData();
		          formdata1.append('phoneId',"19");
		          formdata1.append('boundStatus',this.history_bdzt);
		          formdata1.append('wechatStatus',this.history_zhzt);
		          formdata1.append('whetherBindcard',this.history_bd);
		          formdata1.append('unsealTime',this.history_jietime);
		          formdata1.append('socialNumber',this.history_sjh);
		          formdata1.append('socialNickname',this.history_sjnc)
		          formdata1.append('sealCause',this.history_fengresult);
		          formdata1.append('registerTime',this.history_zcsj);
		          formdata1.append('lastsealTime',this.history_fengtime);
		          formdata1.append('emergencyContact',this.history_pn4);
		          formdata1.append('socialPlatform',this.history_pt);
		          this.http.post(this.addHistory,formdata1).subscribe(response=>{
			      	 if(response['code']==200){
			      	 	this.addhist=false;
			        }},error=>{
			       	   console.log('post请求失败', error)
			        })  
			}
  }
  searchData(e){
  	this.page=e;
  	if(this.inputmodel){
  		   let formdata1=new FormData();
         formdata1.append('page',this.page);
         formdata1.append('message',this.inputmodel);
         formdata1.append('accountId',localStorage.getItem('id'));
         formdata1.append('operator','1');
         this.http.post(this.searchUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	   this.total=response['data'].phoneCount;
      	 	 this.phoneData=response['data'].phoneList;
        }},error=>{
       	   console.log('post请求失败', error)
        })
  	}else{
  		this.list();
  	}
  }
  searchData1(e){
     this.histpage=e;
     this.histlist();
  }
  searchlist(){
  	 if(this.inputmodel==""){
  	 	  alert("请输入搜索内容")
  	 }else{
  	 	   let formdata1=new FormData();
         formdata1.append('page','1');
         formdata1.append('message',this.inputmodel);
         formdata1.append('accountId',localStorage.getItem('id'));
         formdata1.append('operator','1');
         this.http.post(this.searchUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	   this.total=response['data'].phoneCount;
      	 	 this.phoneData=response['data'].phoneList;
        }},error=>{
       	   console.log('post请求失败', error)
        })
  	 }
  }
}
