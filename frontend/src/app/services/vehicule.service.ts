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

// Type pour le formulaire (sans id ni dateAjout)
export interface VehiculeForm {
  marque: string;
  modele: string;
  annee: number;
  couleur: string;
  prix: number;
  kilometrage: number;
  carburant: string;
  transmission: string;
  description: string;
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

  create(vehicule: VehiculeForm): Observable<Vehicule> {
    return this.http.post<Vehicule>(this.apiUrl, vehicule);
  }

  update(id: number, vehicule: VehiculeForm): Observable<Vehicule> {
    return this.http.put<Vehicule>(`${this.apiUrl}/${id}`, vehicule);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}