import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Planning } from '../entities/planning';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  readonly API_URL = 'http://localhost:8097/plannings/';
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private getAuthHeaders(): { [header: string]: string } {
    const authToken = this.getToken();
    return { Authorization: `Bearer ${authToken}` };
  }
  constructor(private httpClient: HttpClient) { }

  getPlannings(idUser): Observable<Planning[]> {  
    return this.httpClient.get<Planning[]>(this.API_URL+idUser, { headers: this.getAuthHeaders() });  
  }

  createPlanning(planning: Planning): Observable<any> {
    return this.httpClient.post(this.API_URL+"addP",planning, { headers: this.getAuthHeaders() })
  }

  deletePlanning(id: string): Observable<any> {
    return this.httpClient.delete(this.API_URL+id, { headers: this.getAuthHeaders() })
  }
  updatePlanning(id: string,planning: Planning): Observable<any> {
    return this.httpClient.put(this.API_URL+id,planning, { headers: this.getAuthHeaders() })
  }
  }