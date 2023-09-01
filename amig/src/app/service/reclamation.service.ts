import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from '../entities/reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  readonly API_URL = 'http://localhost:8097/reclamations/';
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private getAuthHeaders(): { [header: string]: string } {
    const authToken = this.getToken();
    return { Authorization: `Bearer ${authToken}` };
  }
  constructor(private httpClient: HttpClient) { }
  getReclamationAll(): Observable<Reclamation[]> {  
    return this.httpClient.get<Reclamation[]>(this.API_URL, { headers: this.getAuthHeaders() });  
  }
  getReclamation(idUser): Observable<Reclamation[]> {  
    return this.httpClient.get<Reclamation[]>(this.API_URL+idUser, { headers: this.getAuthHeaders() });  
  }

  createReclamation(Reclamation: Reclamation): Observable<any> {
    return this.httpClient.post(this.API_URL+"addP",Reclamation, { headers: this.getAuthHeaders() })
  }

  deleteReclamation(id: string): Observable<any> {
    return this.httpClient.delete(this.API_URL+id, { headers: this.getAuthHeaders() })
  }
  updateReclamation(id: string,Reclamation: Reclamation): Observable<any> {
    return this.httpClient.put(this.API_URL+id,Reclamation, { headers: this.getAuthHeaders() })
  }
  updateAcceptReclamation(id: string): Observable<any> {
    return this.httpClient.put(this.API_URL+"accept/"+id, { headers: this.getAuthHeaders() })
  }
  }
