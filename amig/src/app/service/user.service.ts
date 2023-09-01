import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly API_URL = 'http://localhost:8097/users/';
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private getAuthHeaders(): { [header: string]: string } {
    const authToken = this.getToken();
    return { Authorization: `Bearer ${authToken}` };
  }
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {  
    return this.httpClient.get<User[]>(this.API_URL, { headers: this.getAuthHeaders() });  
  }
  getUsersRoleUser(): Observable<User[]> {  
    return this.httpClient.get<User[]>(this.API_URL+"role", { headers: this.getAuthHeaders() });  
  }

  createUser(user: User): Observable<any> {
    return this.httpClient.post(this.API_URL,user, { headers: this.getAuthHeaders() })
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete(this.API_URL+id, { headers: this.getAuthHeaders() })
  }
  updateUser(id: string,user: User): Observable<any> {
    return this.httpClient.put(this.API_URL+id,user, { headers: this.getAuthHeaders() })
  }
  }