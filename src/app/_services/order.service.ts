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


}
