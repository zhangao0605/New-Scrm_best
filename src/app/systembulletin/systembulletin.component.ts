import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as GlobalUrl from '../globals'
@Component({
  selector: 'app-systembulletin',
  templateUrl: './systembulletin.component.html',
  styleUrls: ['./systembulletin.component.css']
})
export class SystembulletinComponent implements OnInit {

  //初始化
  allagumentUrl:string=GlobalUrl.prioductUrl +'affiche/getAllAffiche';
  //模糊查询
  searchUrl:string=GlobalUrl.prioductUrl +'affiche/getAllAfficheByName';
  //删除
  delectUrl:string=GlobalUrl.prioductUrl +'affiche/deleteAfficheById';
  //添加
  addagumentUrl:string=GlobalUrl.prioductUrl +'affiche/addAffiche';
  //发布
  fabuUrl:string=GlobalUrl.prioductUrl +'affiche/updateAfficheByStatus';
  //详情
  detailUrl:string=GlobalUrl.prioductUrl +'affiche/getAfficheById';
  //修改
  updateUrl:string=GlobalUrl.prioductUrl +'affiche/updateAfficheById';
  
   allagumentData=[];
   pageIndex = 1;
   pageSize= 10;
   total=1;
   page='1';
   searmodle='';
   agumenttitle='';
   agumentauthor='';
   isaddagument=false;
   agumenttext='';
   agumentzhaiyao='';
   isdetail=false;
   detailData:any=[];
   isupdateagument=false;
   
   update_title='';
   update_author='';
   update_text='';
   update_zhaiyao='';
   updateid='';
   
   
   ismask=false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
     this.allagumentlist();   	
  }
  closeupdateagument(){
  	this.ismask=false;
  	this.isupdateagument=false;
  }
  closeisdetail(){
  	this.ismask=false;
  	this.isdetail=false;
  }
  //添加公告
  showaddagument(){
  	this.ismask=true;
  	this.isaddagument=true;
  }
  closeagument(){
  		this.isaddagument=false;
  		this.ismask=false;
  }
//列表
  allagumentlist(){
  	      let formdata1=new FormData();
          formdata1.append('accountId',localStorage.getItem('id'));
          formdata1.append('page',this.page);
          this.http.post(this.allagumentUrl,formdata1).subscribe(response=>{
      	  if(response['code']==200){
      	  	this.allagumentData=response['data'].afficheList;
      	  	this.total=response['data'].afficheCount;
      	  	console.log(this.allagumentData)
         }},error=>{
       	   console.log('post请求失败', error)
         })
  }
  searchData(e){
  	this.page=e;
  	  if(this.searmodle){
  	  	 let formdata1=new FormData();
  	  	 formdata1.append('accountId',localStorage.getItem('id'));
         formdata1.append('page',this.page);
         formdata1.append('message',this.searmodle);
         this.http.post(this.searchUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 			this.allagumentData=response['data'].afficheList;
      	     	this.total=response['data'].afficheCount;
        }},error=>{
       	   console.log('post请求失败', error)
        })
  	  }else{
  	  	  this.allagumentlist();
  	  }
  }
//查询公告
  changeagument(){
  	if(this.searmodle==''){
  		alert("请输入搜索内容")
  	}else{
  	      let formdata1=new FormData();
          formdata1.append('accountId',localStorage.getItem('id'));
          formdata1.append('page','1');
          formdata1.append('message',this.searmodle);
          this.http.post(this.searchUrl,formdata1).subscribe(response=>{
      	  if(response['code']==200){
      	  	  this.allagumentData=response['data'].afficheList;
      	     	this.total=response['data'].afficheCount;
      	  	console.log(this.allagumentData)
         }},error=>{
       	   console.log('post请求失败', error)
         })
  	}
  }
//删除公告
  delectagument(id){
			  	let arr=[]
			    arr.push(id);
          let formdata1=new FormData();
          formdata1.append('ids',JSON.stringify(arr));
          this.http.post(this.delectUrl,formdata1).subscribe(response=>{
      	  if(response['code']==200){
      	  	 this.allagumentlist();
         }},error=>{
       	   console.log('post请求失败', error)
         })
  }
//添加公告
  addagument(){
  	if(!this.agumenttitle||!this.agumentauthor||!this.agumenttext||!this.agumentzhaiyao){
  		alert("请确认信息完成")
  	}else{
	  	    let formdata1=new FormData();
          formdata1.append('accountId',localStorage.getItem('id'));
          formdata1.append('title',this.agumenttitle);
          formdata1.append('abstracts',this.agumentzhaiyao);
          formdata1.append('content',this.agumenttext);
          formdata1.append('author',this.agumentauthor);
          this.http.post(this.addagumentUrl,formdata1).subscribe(response=>{
      	  if(response['code']==200){
      	  	 this.isaddagument=false;
      	  	 this.agumenttitle='';
      	  	 this.agumentauthor='';
      	  	 this.agumenttext='';
      	  	 this.agumentzhaiyao='';
      	     this.allagumentlist();
         }},error=>{
       	   console.log('post请求失败', error)
         })
  	}
  	
  }
//发布公告
  fabuagument(id){
  	      let formdata1=new FormData();
          formdata1.append('id',id);
          this.http.post(this.fabuUrl,formdata1).subscribe(response=>{
      	  if(response['code']==200){
      	  	 this.allagumentlist();
         }},error=>{
       	   console.log('post请求失败', error)
         })
  }
//查看公告
  seeagument(id){
  	      this.isdetail=true;
  	      this.ismask=true;
  	     let formdata1=new FormData();
          formdata1.append('id',id);
          this.http.post(this.detailUrl,formdata1).subscribe(response=>{
      	  if(response['code']==200){
      	  	this.detailData=response['data'];
      	  	console.log(this.detailData)
         }},error=>{
       	   console.log('post请求失败', error)
         })
  }
//展示
	updateagument(id){
		  this.updateid=id;
	    this.isupdateagument=true;
	    this.ismask=true;
	    let formdata1=new FormData();
      formdata1.append('id',id);
      this.http.post(this.detailUrl,formdata1).subscribe(response=>{
  	  if(response['code']==200){
  	  	  this.update_title=response['data'].title;
			    this.update_author=response['data'].author;
			    this.update_text=response['data'].content;
			    this.update_zhaiyao=response['data'].abstracts;
  	  	  
     }},error=>{
   	   console.log('post请求失败', error)
     })
	}
	//修改
	sureupdate(){
		 if(!this.update_title||!this.update_author||!this.update_text||!this. update_zhaiyao){
		 	  alert("请确认信息完成")
		 }else{
				  let formdata1=new FormData();
          formdata1.append('id',this.updateid);
          formdata1.append('title',this.update_title);
          formdata1.append('abstracts',this. update_zhaiyao);
          formdata1.append('content',this.update_text);
          formdata1.append('type','0');
          formdata1.append('author',this.update_author);
          this.http.post(this.updateUrl,formdata1).subscribe(response=>{
      	  if(response['code']==200){
      	  	 this.isupdateagument=false;
      	  	 this.update_title='';
      	  	 this.update_author='';
      	  	 this.update_text='';
      	  	 this.update_zhaiyao='';
      	     this.allagumentlist();
         }},error=>{
       	   console.log('post请求失败', error)
         })
		 }
		  
	}
}
