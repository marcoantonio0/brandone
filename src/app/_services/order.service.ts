import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private sAuth: AuthenticationService
  ) {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.sAuth.currentUserValue.access_token
    });
  }

  create(data) {
    return this.http.post<any>(`${api.url}/order`, data, { headers: this.headers });
  }

  getOrderUser(id, offset?: any, search?: string){
    const Offset = `${offset ? 'offset=' + offset : ''}${ search ? '&' : ''}`;
    const Search = `${search ? 'search=' + search : ''}`;
    const url = '?' + Offset + Search;
    return this.http.get<any>(`${api.url}/order/user/${id}${url.length > 1 ? url : ''}`, { headers: this.headers });
  }

  getOrderById(id){
    return this.http.get<any>(`${api.url}/order/${id}`, { headers: this.headers });
  }


}
