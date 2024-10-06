import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from '../core/Interfaces/Material.interface';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = 'https://localhost:7283/api/Material';

  constructor(private http: HttpClient) { }
 
  updateMaterial(materialId: number, material: Material): Observable<any> {
    return this.http.put(`${this.apiUrl}/${materialId}`, material,{
      responseType: 'text' as 'json'
    });
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
