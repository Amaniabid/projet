import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annonce } from '../entities/annonce';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
    readonly API_URL = 'http://localhost:8097/annonces/';
    private getToken(): string {
      return localStorage.getItem('token') || '';
    }
  
    private getAuthHeaders(): { [header: string]: string } {
      const authToken = this.getToken();
      return { Authorization: `Bearer ${authToken}` };
    }
    constructor(private httpClient: HttpClient) { }
  
    getAnnonces(id: string): Observable<Annonce[]> {  
      return this.httpClient.get<Annonce[]>(this.API_URL+id, { headers: this.getAuthHeaders() });  
    }
  
    createAnnonce(annonce: Annonce): Observable<any> {
      return this.httpClient.post(this.API_URL+"addA",annonce, { headers: this.getAuthHeaders() })
    }
  
    deleteAnnonce(id: string): Observable<any> {
      return this.httpClient.delete(this.API_URL+id, { headers: this.getAuthHeaders() })
    }
    updateAnnonce(id: string,annonce: Annonce): Observable<any> {
      return this.httpClient.put(this.API_URL+id,annonce, { headers: this.getAuthHeaders() })
    }
    }