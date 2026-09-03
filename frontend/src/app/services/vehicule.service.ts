import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  status: VehiculeStatus;
  garantie: number;
}

export type VehiculeStatus =
  | 'A_LOUER'
  | 'A_VENDRE'
  | 'LOUER'
  | 'VENDU'
  | 'IMPORTE'
  | 'EXPORTE'
  | 'EN_MAINTENANCE'
  | 'DISPONIBLE';

export const VEHICULE_STATUS_LABELS: Record<VehiculeStatus, string> = {
  A_LOUER: 'À louer',
  A_VENDRE: 'À vendre',
  LOUER: 'Loué',
  VENDU: 'Vendu',
  IMPORTE: 'Importé',
  EXPORTE: 'Exporter',
  EN_MAINTENANCE: 'En maintenance',
  DISPONIBLE: 'Disponible'
};

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
  status: VehiculeStatus;
  garantie: number;
}

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  private apiUrl = environment.vehiculesUrl; 
  private rentalUrl = environment.rentalsUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  getAll(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.apiUrl);
  }

  getById(id: number): Observable<Vehicule> {
    return this.http.get<Vehicule>(`${this.apiUrl}/${id}`);
  }

  create(vehicule: VehiculeForm): Observable<Vehicule> {
    return this.http.post<Vehicule>(this.apiUrl, vehicule, { headers: this.getAuthHeaders() });
  }

  update(id: number, vehicule: VehiculeForm): Observable<Vehicule> {
    return this.http.put<Vehicule>(`${this.apiUrl}/${id}`, vehicule, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  search(query: string): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(`${this.apiUrl}/search?q=${query}`);
  }

  getByStatus(status: string): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(`${this.apiUrl}/status/${status}`);
  }

  getAllPaginated(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paginated?page=${page}&size=${size}`);
  }

  importRequest(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/import-request`, data, { headers: this.getAuthHeaders() });
  }

  exportRequest(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/export-request`, data, { headers: this.getAuthHeaders() });
  }

  sell(data: VehiculeForm): Observable<Vehicule> {
    return this.http.post<Vehicule>(`${this.apiUrl}/sell`, data, { headers: this.getAuthHeaders() });
  }

  createRental(vehiculeId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rent/${vehiculeId}`, {}, { headers: this.getAuthHeaders() });
  }

  rent(vehiculeId: number, returnDate: string): Observable<any> {
    return this.http.post<any>(
      `${this.rentalUrl}?vehiculeId=${vehiculeId}&returnDate=${returnDate}`, 
      {}, 
      { headers: this.getAuthHeaders() }
    );
  }

  getByStatusPaginated(status: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/status/${status}/paginated?page=${page}&size=${size}`);
  }
}