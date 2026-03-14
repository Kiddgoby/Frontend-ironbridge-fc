import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Milestone } from '../models/milestone.model';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/milestones`;

  getMilestones(): Observable<Milestone[]> {
    return this.http.get<Milestone[]>(this.apiUrl);
  }

  getMilestone(id: number): Observable<Milestone> {
    return this.http.get<Milestone>(`${this.apiUrl}/${id}`);
  }

  createMilestone(milestone: Partial<Milestone>): Observable<Milestone> {
    return this.http.post<Milestone>(this.apiUrl, milestone);
  }

  updateMilestone(id: number, milestone: Partial<Milestone>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, milestone);
  }

  deleteMilestone(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
