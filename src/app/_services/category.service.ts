import { api } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
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
    return this.http.get(`${api.url}/category`, { headers : this.headers});
  }

}
