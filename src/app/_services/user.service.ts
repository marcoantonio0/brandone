import { api } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`${api.url}/users`);
    }

    register(data){
      return this.http.post(`${api.url}/user`, data);
    }

    getMenu(id){
      return this.http.get(`${api.url}/user/menu/${id}`);
    }
}
