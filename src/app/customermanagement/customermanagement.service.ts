import {  Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import {HttpParams,HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomermanagementService {
  /*获取所有用户*/
  getCustomerdata(reqUrl: string, reqBody,distinguish, flag, comp) {
    this.httpClient.post(reqUrl, reqBody)
      .subscribe(
        val => {
          if (val['code'] === 200) {
            comp.postOk(val, flag,distinguish);
          } else {


            comp.postOk_other(val, flag,distinguish);
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
