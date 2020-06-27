import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = environment.apiUrl;
  private loginUrl = environment.loginUrl;
  constructor(private _httpClient: HttpClient) { }

  set userKey(value) {
    localStorage.setItem('userKey', value);
  }

  get userKey(): string {
    return localStorage.getItem('userKey');
  }

  set userName(name) {
    localStorage.setItem('userName', name);
  }

  get userName(): string {
    return localStorage.getItem('userName');
  }

  loginUser(payLoad: { userName: string, password: string }): Observable<any> {
    const userLoginUrl = `${this.loginUrl}/login?username=${payLoad.userName}&credential=${payLoad.password}`;
    return this._httpClient.get(userLoginUrl);
  }

  logOutUser() {
    const logOutUrl = `${this.loginUrl}/logout?key=${this.userKey}`;
    return this._httpClient.get(logOutUrl);
  }

  saveCustomerDetails(payLoad: any): Observable<any> {
    const saveUrl = `${this.apiUrl}/createCustomer?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;
    return this._httpClient.post(saveUrl, payLoad);
  }

  getCustomerOrdersDetails() {
    return this._httpClient.get(`${this.apiUrl}/getAllOrders?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`);
  }

  getTreeJson() {
    return this._httpClient.get(`https://kem.greenkoncepts.com/ems/mvc/node-hierarchy-with-metadata?key=${this.userKey}`);
  }
}
