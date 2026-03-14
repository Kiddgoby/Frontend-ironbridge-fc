import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Coach } from '../models/coach.model';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/coaches`;

  getCoaches(): Observable<Coach[]> {
    return this.http.get<Coach[]>(this.apiUrl);
  }

  getCoach(id: number): Observable<Coach> {
    return this.http.get<Coach>(`${this.apiUrl}/${id}`);
  }

  createCoach(coach: Partial<Coach>): Observable<Coach> {
    return this.http.post<Coach>(this.apiUrl, coach);
  }

  updateCoach(id: number, coach: Partial<Coach>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, coach);
  }

  deleteCoach(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
