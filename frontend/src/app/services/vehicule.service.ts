import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Vehicule {
  id: number;
  marque: string;
  modele: string;
  annee: number;
  couleur: string;
  prix: number;
  kilometrage: number;
  carburant: string;
  transmission: string;
  description: string;
  dateAjout: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
    
    private apiUrl = environment.apiUrl.replace('/auth', '') + '/vehicules';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Vehicule[]> {
        return this.http.get<Vehicule[]>(this.apiUrl);
    }

    getById(id: number): Observable<Vehicule> {
        return this.http.get<Vehicule>(`${this.apiUrl}/${id}`);
    }

    create(vehicule: Vehicule): Observable<Vehicule> {
        return this.http.post<Vehicule>(this.apiUrl, vehicule);
    }
}