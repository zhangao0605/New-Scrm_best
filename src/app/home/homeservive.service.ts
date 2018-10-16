import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeserviveService {
  constructor(private httpClient: HttpClient) {
  }
  httpGetTitleData(reqUrl: string, reqBody, distinguish, flag, comp) {
    //后台接收数据 需要 @RequestBody 标签
    this.httpClient.post(reqUrl, reqBody)
      .subscribe(
        val => {
          if (val['code'] === 200) {
            comp.postOk(val, flag, distinguish);
          } else {


            comp.postOk_other(val, flag, distinguish);
          }
        },
        error => {
          console.log('post请求失败', error);
          comp.postErr(error, flag, distinguish);
        }
      );

  }
}
