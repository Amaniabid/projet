import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../entities/group';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  readonly API_URL = 'http://localhost:8097/groups/';
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private getAuthHeaders(): { [header: string]: string } {
    const authToken = this.getToken();
    return { Authorization: `Bearer ${authToken}` };
  }
  constructor(private httpClient: HttpClient) { }

  getGroupes(idUser): Observable<Group[]> {  
    return this.httpClient.get<Group[]>(this.API_URL+idUser, { headers: this.getAuthHeaders() });  
  }

  createGroupe(groupe: Group): Observable<any> {
    const body= {
      "name": groupe.name,
      "description": groupe.description,
      "user":{
        "id": groupe.user.id,
        "firstname": groupe.user.firstname,
        "lastname": groupe.user.lastname,
        "email": groupe.user.email,
        "role": groupe.user.role
      },
      "members": groupe.members.map(member => ({
        "id": member.id,
        "firstname": member.firstname,
        "lastname": member.lastname,
        "email": member.email,
        "role": member.role
      }))
    };
    console.log(body)
    return this.httpClient.post(this.API_URL+"add",body, { headers: this.getAuthHeaders() })
  }

  deleteGroupe(id: string): Observable<any> {
    return this.httpClient.delete(this.API_URL+id, { headers: this.getAuthHeaders() })
  }
  updateGroupe(id: string,groupe: Group): Observable<any> {
    const body= {
      "name": groupe.name,
      "description": groupe.description,
      "members": groupe.members.map(member => ({
        "id": member.id,
        "firstname": member.firstname,
        "lastname": member.lastname,
        "email": member.email,
        "role": member.role
      }))
    };
    return this.httpClient.put(this.API_URL+id,body, { headers: this.getAuthHeaders() })
  }
  }