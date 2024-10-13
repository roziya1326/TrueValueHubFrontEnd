import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs';
import { Material } from '../core/Interfaces/Material.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = environment.apiUrl+'/Material';

  constructor(private http: HttpClient) { }
 
  updateMaterial(materialId: number, material: Material): Observable<any> {
    return this.http.put(`${this.apiUrl}/${materialId}`, material,{
      responseType: 'text' as 'json'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error instanceof ErrorEvent
          ? `Client-side error: ${error.error.message}`
          : `Server-side error: ${error.status} - ${error.message}`;
        return throwError(() => new Error('Something went wrong. Please try again later.'));
      })
    );
  }
  addMaterial(partId: number, material: Material): Observable<Material> {
    const url = `${this.apiUrl}/${partId}`;
    return this.http.post<Material>(url, material);
    
  }
  deleteMaterial(materialId: number): Observable<any> {
    const url = `${this.apiUrl}/${materialId}`; 
    return this.http.delete(url,{
      responseType: 'text' as 'json'
    });
  }

}
