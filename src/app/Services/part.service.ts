import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Part } from '../core/Interfaces/Part.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private apiUrl = 'https://localhost:7283/api/Part';

  constructor(private http: HttpClient) { }
  getPartById(partId: string): Observable<Part[]> {
    return this.http.get<{ $values: Part[] }>(`${this.apiUrl}/${partId}`).pipe(
      map((response) => response.$values || []) 
    );
  }
  updatePart(internalPartNumber: string, part: Part): Observable<any> {
    return this.http.put(`${this.apiUrl}/${internalPartNumber}`, part,{
      responseType: 'text' as 'json'
    });
  }
}
