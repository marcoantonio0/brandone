import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private sAuth: AuthenticationService
  ) {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.sAuth.currentUserValue.access_token
    });
  }

  getMenu() {
    return this.http.get(`${api.url}/menu`, { headers: this.headers });
  }

  setUserMenu(id, menuid){
    return this.http.post(`${api.url}/menu/user/${id}`, { menu: menuid }, { headers: this.headers });
  }

  setUserSubMenu(id, menuid){
    return this.http.post(`${api.url}/menu/user/submenu/${id}`, { submenu: menuid },{ headers: this.headers });
  }

}
