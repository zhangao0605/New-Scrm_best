import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';
import * as GlobalUrl from '../../globals'
@Component({
  selector: 'app-rolemanagement',
  templateUrl: './rolemanagement.component.html',
  styleUrls: ['./rolemanagement.component.css']
})
export class RolemanagementComponent implements OnInit {
	updateid="";
	tree=[];
	detailtree=[];
  nodes = [];
  detailnodes=[];
  roleinput='';
  idlist='';
  detailidlist='';
	role_user='';
	role_beiz='';
	page="1";
	allpersonData=[];
  isrole=false;
  detailper=false;
  role_detailuser="";
  role_detailbeiz="";
  updatelist=[];
   pageIndex = 1;
   pageSize= 10;
   total=1;
   ismask=false
  
  
  allpersonUrl:string=GlobalUrl.prioductUrl+'role/getAllRoleByPage';
  addpersonUrl:string=GlobalUrl.prioductUrl+'scrm/role/addRole';
  treeUrl:string=GlobalUrl.prioductUrl+'permission/getAllPermissionByTree';
  delectUrl:string=GlobalUrl.prioductUrl+'role/deleteRoleById';
  searchUrl:string=GlobalUrl.prioductUrl+'role/getAllRoleByLike';
  personDatail:string=GlobalUrl.prioductUrl+'role/getRoleById';
  updatePerson:string=GlobalUrl.prioductUrl+'role/updateRoleById';
  constructor(private http: HttpClient) { }
  
  ngOnInit() {
  	     this.allpersonlist();
  	     let formdata1=new FormData();
         this.http.post(this.treeUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	      this.tree=response['data'].permissionList.slice(0,9);
			       for(var i=0;i<this.tree.length;i++){
				         this.nodes.push(new NzTreeNode({
				            	  title:this.tree[i].permissionName,
			                  key:this.tree[i].id,
			                  children:[]
				         }))
      	     	   for(var j=0;j<this.tree[i].children.length;j++){
                   this.nodes[i].children.push(new NzTreeNode({
                   	  title:this.tree[i].children[j].permissionName,
						          key:this.tree[i].children[j].id
                   }))
      	        }
      	    }
        }},error=>{
       	   console.log('post请求失败', error)
        })
  }
  
  allpersonlist(){
  	     let formdata1=new FormData();
         formdata1.append('page',this.page);
         this.http.post(this.allpersonUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	 this.total=response['data'].roleCount;
      		 this.allpersonData=response['data'].roleList;
        }},error=>{
       	   console.log('post请求失败', error)
        })
  }
  searchData(e){
  	this.page=e;
  	if(this.roleinput){
  		 let formdata1=new FormData();
         formdata1.append('page',this.page);
         formdata1.append('message',this.roleinput);
         this.http.post(this.searchUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	  this.allpersonData=response['data'].roleList;
        }},error=>{
       	   console.log('post请求失败', error)
        })
  	}else{
  	 	this.allpersonlist();
  	}
  }
   //添加角色
   showrole(){
   	 this.isrole=true;
   	 this.ismask=true;
   }
   //关闭角色
   closerole(){
   	 this.isrole=false;
   	 this.ismask=false;
   }
   closedetailper(){
   	 this.detailper=false;
   	 this.ismask=false;
   }
// 新增角色
   addrole(){
     	if(!this.role_user||!this.role_beiz||!this.idlist){
     		alert("请确认信息完成")
     	}else{
     		 let formdata1=new FormData();
         formdata1.append('roleName',this.role_user);
         formdata1.append('remark',this.role_beiz);
         formdata1.append('rolePermission',this.idlist);
         this.http.post(this.addpersonUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	  this.allpersonlist();
      	 	  this.isrole=false;
      	 	  this.role_user='';
      	 	  this.role_beiz='';
      	 	  this.idlist='';
      	 	  
        }},error=>{
       	   console.log('post请求失败', error)
        })
     	}
   }
// 删除角色
   deleperson(e){
   	     let formdata1=new FormData();
         formdata1.append('id',e);
         this.http.post(this.delectUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	  this.allpersonlist();
        }},error=>{
       	   console.log('post请求失败', error)
        })
   }
// 模糊查询
   searchdata(){
	   	if(this.roleinput==""){
	   		alert("请输入搜索内容")
	   	}else{
	   		 let formdata1=new FormData();
         formdata1.append('page','1');
         formdata1.append('message',this.roleinput);
         this.http.post(this.searchUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	  this.allpersonData=response['data'].roleList;
        }},error=>{
       	   console.log('post请求失败', error)
        })
	   	}
   	   
   }
// 查看角色信息
   seedetail(id){
   	     this.updateid=id;
   	     this.detailper=true;
   	     this.ismask=true;
    	   let formdata1=new FormData();
         formdata1.append('roleId',id);
         this.http.post(this.personDatail,formdata1).subscribe(response=>{
      	 if(response['code']==200){
	      	 	this.role_detailuser=response['data'][0].roleName;
	      	 	this.role_detailbeiz=response['data'][0].remark;
	      	 	this.detailtree=response['data'][0].permissionList;
	      	 	this.detailnodes=[];
			       for(var i=0;i<this.detailtree.length;i++){
				         this.detailnodes.push(new NzTreeNode({
				            	  title:this.detailtree[i].permissionName,
			                  key:this.detailtree[i].id,
			                  children:[]
				         }))
      	     	   for(var j=0;j<this.detailtree[i].children.length;j++){
                   this.detailnodes[i].children.push(new NzTreeNode({
                   	  title:this.detailtree[i].children[j].permissionName,
						          key:this.detailtree[i].children[j].id
                   }))
      	        }
      	    }
        }},error=>{
       	   console.log('post请求失败', error)
        })
   }
// 新增id
    out(e){
    	  var str="";
	      for(var i=0;i<e.checkedKeys.length;i++){
	      	    str+=e.checkedKeys[i].key+',';
	      	 for(var j=0;j<e.checkedKeys[i].children.length;j++){
	      	 	  str+=e.checkedKeys[i].children[j].key+',';
	      	 }
	      }
	      this.idlist=str.substring(0,str.length-1);  
    }
//  修改的id
    update(e){
    	  this.updatelist=e.checkedKeys;
    	  var str="";
	      for(var i=0;i<this.updatelist.length;i++){
	      	    str+=this.updatelist[i].key+',';
	      	 for(var j=0;j<this.updatelist[i].children.length;j++){
	      	 	  str+=this.updatelist[i].children[j].key+',';
	      	 }
	      }
	     this.detailidlist=str.substring(0,str.length-1);
	     console.log(this.detailidlist)
    }
   //确认修改角色
    updatesure(){
//  	 for(var i=0;i<this.updatelist.length;i++){
//	      	    this.updatelist[i].isChecked=false;
//	      	 for(var j=0;j<this.updatelist[i].children.length;j++){
//	      	 	  this.updatelist[i].children[j].isChecked=false;
//	      	 }
//	     }
      console.log(this.detailidlist)
       if(!this.role_detailuser||!this.role_detailbeiz||!this.detailidlist||!this.updateid){
    		  alert("请确认信息完整")
    	}else{
	    	 let formdata1=new FormData();
         formdata1.append('id',this.updateid);
         formdata1.append('roleName',this.role_detailuser);
         formdata1.append('remark',this.role_detailbeiz);
         formdata1.append('rolePermission',this.detailidlist);
         this.http.post(this.updatePerson,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	   this.detailper=false;
      	 	   this.ismask=false;
      	 	   this.allpersonlist();
      	 	   this.role_detailuser="";
      	 	   this.detailidlist="";
      	 	   this.role_detailbeiz="";
         }},error=>{
       	   console.log('post请求失败', error)
         })
    	}
    	
    }
   
}
