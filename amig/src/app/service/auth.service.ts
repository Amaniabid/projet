import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly API_URL = 'http://localhost:8097/api/v1/auth';

  constructor(private httpClient: HttpClient) { }

  login(payload): Observable<any> {  
    return this.httpClient.post(this.API_URL+"/authenticate",payload);  
  }

  register(user: User): Observable<any> {
    user.role="USER";
    user.roles=[];
    user.roles.push("USER");
    return this.httpClient.post(this.API_URL+"/register",user)
  }
  }