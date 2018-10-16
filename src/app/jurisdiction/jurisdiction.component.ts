import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as GlobalUrl from '../globals'
@Component({
  selector: 'app-jurisdiction',
  templateUrl: './jurisdiction.component.html',
  styleUrls: ['./jurisdiction.component.css']
})
export class JurisdictionComponent implements OnInit {
	 ismask=false;
	 newuser='';
	 leixing='';
	 beizhu='';
	 update_us='';
	 update_lx='';
	 update_bz='';
	 update_zt="";
	 isadduser=false;
	 updateuser=false;
	 pageIndex = 1;
   pageSize= 10;
   total=1;
   quanxianData=[];
   leixingData=[];
   updateid="";
   status:any=0;
   search="";
   page:any=1;
   quanxianUrl:string=GlobalUrl.prioductUrl+'account/getAllAccount';
   delectUrl:string=GlobalUrl.prioductUrl+'account/deleteAccountById';
   leixingUrl:string=GlobalUrl.prioductUrl+'role/getAllRole';
   adduserUrl:string=GlobalUrl.prioductUrl+'account/addAccount';
   userDetail:string=GlobalUrl.prioductUrl+'account/getAccountById';
   updatepersonUrl:string=GlobalUrl.prioductUrl+'account/updateAccountById';
   searchURL:string=GlobalUrl.prioductUrl+'account/getAllAccountByName';
   //重置密码
   resetpasswordUrl:string=GlobalUrl.prioductUrl+'account/updatePasswordById';
  constructor(private http: HttpClient) { }

  ngOnInit() {
	       this.list();
	       let formdata1=new FormData();
         this.http.post(this.leixingUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	    this.leixingData=response['data'].roleList;
      	    console.log(this.leixingData)
         }},error=>{
       	   console.log('post请求失败', error)
         })
  }
  //重置密码
  resetpass(id){
      if(window.confirm('重置密码后为用户名的后6位')){
         let formdata1=new FormData();
         formdata1.append('id',id)
         this.http.post(this.resetpasswordUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	    console.log(response)
         }},error=>{
       	   console.log('post请求失败', error)
         })
         return true;
      }else{
         return false;
     }
  }
  //展示信息
  showupdateuser(id){
  	     this.updateid=id;
  	     let formdata1=new FormData();
         formdata1.append('id',id);
         this.http.post(this.userDetail,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	console.log(response['data'])
      	   	this.update_us=response['data'].username;
      	   	this.update_lx=response['data'].roleId;
      	   	this.update_bz=response['data'].remark;
      	   	if(response['data'].status==0){
      	   		this.update_zt='账户到期';
      	   	}else{
      	   		this.update_zt='正常';
      	   	}
        }},error=>{
       	   console.log('post请求失败', error)
        })
  	      this.updateuser=true;
  	     	this.ismask=true;
  }
 
  closeupdateuser(){
  	this.updateuser=false;
  	this.ismask=false;
  }
  //展示新增用户框
  showadduser(){
  	this.isadduser=true;
  	this.ismask=true;
  }
  closeadduser(){
  	this.isadduser=false;
  	this.ismask=false;
  }
  delect(id){
	      let formdata1=new FormData();
        formdata1.append('id',id);
        this.http.post(this.delectUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	  alert("删除成功");
      	  this.list()
        }},error=>{
       	   console.log('post请求失败', error)
        })
  }
  list(){ 
         let formdata1=new FormData();
         formdata1.append('page',this.page);
         this.http.post(this.quanxianUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	 this.total=response['data'].accountCount;
      		 this.quanxianData=response['data'].accountList;
      		 console.log(this.quanxianData)
        }},error=>{
       	   console.log('post请求失败', error)
        })
  }
  searchData(e){
      this.page=e;
  	  if(this.search){
  	  	 let formdata1=new FormData();
         formdata1.append('page',this.page);
         formdata1.append('message',this.search);
         this.http.post(this.searchURL,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	 this.total=response['data'].accountCount;
           this.quanxianData=response['data'].accountList;
        }},error=>{
       	   console.log('post请求失败', error)
        })
  	  }else{
  	  	this.list();
  	  }
  }
  ying(e){
  	this.leixing=e;
  }
  updateying(e){
  	this.update_lx=e;
  }
//新建用户
  createduser(){
  	 var reg=/^[\u4e00-\u9fa50-9A-Za-z]{8,32}$/;
	    if(!this.newuser||!this.leixing||!this.beizhu){
			 alert("请确认信息完成")
		 }else if(!reg.test(this.newuser)){
		 	 alert("密码格式不对")
		 }else{
		 	   let formdata1=new FormData();
         formdata1.append('accountId',localStorage.getItem('id'));
         formdata1.append('username',this.newuser);
         formdata1.append('roleId',this.leixing);
         formdata1.append('remark',this.beizhu);
         this.http.post(this.adduserUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	  this.list();
      	 	  this.isadduser=false;
      	 	  this.newuser='';
						this.leixing='';
						this.beizhu='';
					  this.ismask=false;
        }},error=>{
       	   console.log('post请求失败', error)
        })
		 }
  	
		 
  }
  updateperson(){
					if(this.update_zt=="账户到期"){
						this.status=0
					}else{
						this.status=1
					}
	       let formdata1=new FormData();
	       formdata1.append('accountId',localStorage.getItem('id'));
         formdata1.append('id',this.updateid); 
         formdata1.append('remark',this.update_bz);
         formdata1.append('roleId',this.update_lx);
         formdata1.append('status',this.status);
         formdata1.append('username',this.update_us);    

         this.http.post(this.updatepersonUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	this.updateuser=false;
      	  this.list();
        }},error=>{
       	   console.log('post请求失败', error)
        })
  }
  searchclick(){
  		if(this.search==""){
	   		alert("请输入搜索内容")
	   }else{
	   		 let formdata1=new FormData();
         formdata1.append('page','1');
         formdata1.append('message',this.search);
         this.http.post(this.searchURL,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	 this.total=response['data'].accountCount;
           this.quanxianData=response['data'].accountList;
        }},error=>{
       	   console.log('post请求失败', error)
        })
	   	}
  }
 
}
