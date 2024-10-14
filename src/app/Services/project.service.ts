import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../core/Interfaces/Project.interface';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
 
  private apiUrl = environment.apiUrl+'/Project/upload';
  private getUrl = environment.apiUrl+'/Project';

  constructor(private http: HttpClient) { }
  createProject(projectDto: Project): Observable<any> {
    return this.http.post<any>(this.apiUrl, projectDto);
  }
  getDraftProjects():Observable<any>{
    return this.http.get<any>(this.getUrl);
  }
  getProjectById(projectId: number): Observable<any>{
    return this.http.get<any>(`${this.getUrl}/${projectId}`)
  }

  private projectData: any = null;
  setProjectData(project: any) {
    this.projectData = project;
  }
  getProjectData() {
    return this.projectData;
  }
}
