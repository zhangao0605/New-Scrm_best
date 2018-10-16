import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as GlobalUrl from '../globals'
@Component({
  selector: 'app-devicemanagement',
  templateUrl: './devicemanagement.component.html',
  styleUrls: ['./devicemanagement.component.css']
})
export class DevicemanagementComponent implements OnInit {
   deviceData=[];
   pageIndex = 1;
   pageSize = 10;
   total=1;
   searmodle="";
   page="1";
   gorouplist=[];
   goroupId='';
   deviceUrl:string=GlobalUrl.prioductUrl +'device/getAllDevice';
   searchUrl:string=GlobalUrl.prioductUrl+'device/getAllDeviceByName';
   groupURL:string=GlobalUrl.prioductUrl+'groups/getGroups';
   constructor(private http: HttpClient){ }

  ngOnInit() {
  	     this.list();
  	     let formdata1=new FormData();
         formdata1.append('accountId',localStorage.getItem('id'));
         this.http.post(this.groupURL,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      		 this.gorouplist=response['data'].groupsList;
      		 console.log(this.gorouplist)
        }},error=>{
       	  console.log('post请求失败', error)
        })
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
  list(){
  	     let formdata1=new FormData();
         formdata1.append('accountId',localStorage.getItem('id'));
         formdata1.append('page',this.page);
         this.http.post(this.deviceUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	 	 this.total=response['data'].deviceCount;
      		 this.deviceData=response['data'].deviceList;
      		 console.log(this.deviceData)
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
      	   this.total=response['data'].deviceCount;
      	 	 this.deviceData=response['data'].deviceList;
        }},error=>{
       	  console.log('post请求失败', error)
        })
		}else{
			 this.list();
		}
 }
 search(){
	 	if(this.searmodle==""){
	 		alert("请输入搜索内容")
	 	}else{
	 		   let formdata1=new FormData();
         formdata1.append('accountId',localStorage.getItem('id'));
         formdata1.append('page',"1");
         formdata1.append('message',this.searmodle);
         this.http.post(this.searchUrl,formdata1).subscribe(response=>{
      	 if(response['code']==200){
      	   this.total=response['data'].deviceCount;
      	 	 this.deviceData=response['data'].deviceList;
        }},error=>{
       	  console.log('post请求失败', error)
        })
	 	}    
 }
}
