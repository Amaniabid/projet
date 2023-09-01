import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from 'src/app/entities/event';



@Injectable({
  providedIn: 'root'
})
export class EventService {
  readonly API_URL = 'http://localhost:8097/events/';
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private getAuthHeaders(): { [header: string]: string } {
    const authToken = this.getToken();
    return { Authorization: `Bearer ${authToken}` };
  }
  constructor(private httpClient: HttpClient) { }

  getEvents(idUser): Observable<Event[]> {  
    return this.httpClient.get<Event[]>(this.API_URL+"retriev/"+idUser, { headers: this.getAuthHeaders() });  
  }

  createEvent(event: Event): Observable<any> {
    return this.httpClient.post(this.API_URL+"addE",event, { headers: this.getAuthHeaders() })
  }

  deleteEvent(id: string): Observable<any> {
    return this.httpClient.delete(this.API_URL+id, { headers: this.getAuthHeaders() })
  }
  updateEvent(id: string,event: Event): Observable<any> {
    return this.httpClient.put(this.API_URL+id,event, { headers: this.getAuthHeaders() })
  }
  }