import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NavbarServiceService {
  getCustomerdata(reqUrl: string, reqBody, distinguish, flag, comp) {
    this.httpClient.post(reqUrl, reqBody)
      .subscribe(
        val => {
          if (val['code'] === 200) {
            comp.postOk(val, flag, distinguish);
          } else {
            comp.postOther(val, flag, distinguish);
          }
        },
        error => {
          console.log('post请求失败', error);
          comp.postErr(error, flag, distinguish);
        }
      );
  }
  constructor(private httpClient: HttpClient) {
  }
}
