import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private sAuth: AuthenticationService
  ) {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.sAuth.currentUserValue.access_token
    });
  }

  getNotification(id){
    return this.http.get<any>(`${api.url}/notification/${id}`, { headers: this.headers });
  }

}
