import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../core/Interfaces/Project.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
 
  private apiUrl = 'https://localhost:7283/api/Project/upload';

  constructor(private http: HttpClient) { }
  createProject(projectDto: Project): Observable<any> {
    return this.http.post<any>(this.apiUrl, projectDto);
  }
}
