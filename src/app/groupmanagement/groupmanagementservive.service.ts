import {  Component, Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class GroupmanagementserviveService {
  /*获取所有用户*/
  getCustomerdata(reqUrl: string, reqBody,distinguish, flag, comp) {
    this.httpClient.post(reqUrl, reqBody)
      .subscribe(
        val => {
          if (val['code'] === 200) {
            comp.postOk(val, flag,distinguish);
          } else {
          }
        },
        error => {
          console.log('post请求失败', error);
          comp.postErr(error, flag,distinguish);
        }
      );
  }
  constructor(private httpClient: HttpClient) {
  }
}
