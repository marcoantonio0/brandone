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
  razao_social: string;
  birthday: Date;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({ providedIn: 'root' })
export class UserService {
    private headers: HttpHeaders;
    constructor(
      private http: HttpClient,
      private sAuth: AuthenticationService
      ) {
        this.headers = new HttpHeaders({
          Authorization: 'Bearer ' + this.sAuth.currentUserValue?.access_token
        });
      }

    getAll(search?: string, roles?: string, offset?: string) {
      let url = '';
      const uOffset = `${offset ? 'offset=' + offset : ''}${ search ? '&' : '' }`;
      const uSearch = `${search ? 'search=' + search : ''}${ roles ? '&' : '' }`;
      const uRoles  = `${roles ? 'roles=' + roles : ''}`;
      url = '?' + uOffset + uSearch + uRoles;
      return this.http.get<any>(`${api.url}/user${url}`, { headers: this.headers });
    }

    getById(id) {
      return this.http.get<UserModel>(`${api.url}/user/id/${id}`, { headers: this.headers  });
    }

    register(data){
      return this.http.post(`${api.url}/user`, data);
    }

    getMenu(id){
      return this.http.get(`${api.url}/user/menu/${id}`, { headers: this.headers });
    }

    updateById(id, data){
      return this.http.put(`${api.url}/user/${id}`, data, { headers: this.headers });
    }

    getAllUsers(){
      return this.http.get(`${api.url}/user/freelancer`, { headers: this.headers });
    }

}
