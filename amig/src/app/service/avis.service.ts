import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from '../entities/publication';
import { Commentaires } from '../entities/comment';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  readonly API_URL = 'http://localhost:8097/publications/';
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private getAuthHeaders(): { [header: string]: string } {
    const authToken = this.getToken();
    return { Authorization: `Bearer ${authToken}` };
  }
  constructor(private httpClient: HttpClient) { }
  public censorText(text: string): string {
    // Replace "bad" with "***" as an example
    return text.replace(/bad/gi, '***');
  }
  getAvis(): Observable<Publication[]> {  
    return this.httpClient.get<Publication[]>(this.API_URL+"publications", { headers: this.getAuthHeaders() });  
  }
  getAvisByUser(id: string): Observable<Publication[]> {  
    return this.httpClient.get<Publication[]>(this.API_URL+"publications/user/"+id, { headers: this.getAuthHeaders() });  
  }

  createAvis(Avis: Publication): Observable<any> {
    return this.httpClient.post(this.API_URL+"publications",Avis, { headers: this.getAuthHeaders() })
  }

  deleteAvis(id: string): Observable<any> {
    return this.httpClient.delete(this.API_URL+"publications/"+id, { headers: this.getAuthHeaders() })
  }
  updateAvis(id: string,Avis: Publication): Observable<any> {
    return this.httpClient.put(this.API_URL+"publications/"+id,Avis, { headers: this.getAuthHeaders() })
  }
  
  updateAvisLike(id: string,Avis: Publication): Observable<any> {
    return this.httpClient.put(this.API_URL+"publications/like/"+id,Avis, { headers: this.getAuthHeaders() })
  }
  addCommentToPublication(publicationId: string, comment: Commentaires): Observable<Comment> {
    const url = `${this.API_URL}${publicationId}/comments`;
    const censoredComment = { ...comment };
    censoredComment.content = this.censorText(comment.content);
    return this.httpClient.post<Comment>(url, censoredComment, { headers: this.getAuthHeaders() });
  }
  updateComment(commentId: string, comment: Commentaires): Observable<Commentaires> {
    const url = `${this.API_URL}comments/${commentId}`;
    const censoredComment: Commentaires = { ...comment };
    censoredComment.content = this.censorText(comment.content);
    return this.httpClient.put<Commentaires>(url, censoredComment, { headers: this.getAuthHeaders() });
  }
  }