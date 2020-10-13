import { Observable } from 'rxjs';
import { api } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

export interface UserModel {
  name: string;
  roles: string[];
  submenu: string[];
  menu: [{
    description: string;
    icon: string;
    link: string;
  }];
  _id: string;
  cpfcnpj: number;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
    private headers: HttpHeaders;
    constructor(
      private http: HttpClient,
      private sAuth: AuthenticationService
      ) {
        this.headers = new HttpHeaders({
          Authorization: 'Bearer ' + this.sAuth.currentUserValue.access_token
        });
      }

    getAll() {
        return this.http.get<UserModel[]>(`${api.url}/user`, { headers: this.headers });
    }

    getById(id) {
      return this.http.get<UserModel>(`${api.url}/user/${id}`, { headers: this.headers  });
    }

    register(data){
      return this.http.post(`${api.url}/user`, data);
    }

    getMenu(id){
      return this.http.get(`${api.url}/user/menu/${id}`, { headers: this.headers });
    }
}
