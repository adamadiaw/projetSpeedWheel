import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
    private apiUrl = environment.apiUrl.replace('/auth', '') + '/sales';

    constructor(private http: HttpClient) {}

    createSale(vehiculeId: number): Observable<any> {
        return this.http.post(`${this.apiUrl}?vehiculeId=${vehiculeId}`, {});
    }

    getMySales(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
}