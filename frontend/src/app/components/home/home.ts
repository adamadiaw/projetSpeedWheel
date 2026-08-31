import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VehiculeService, Vehicule } from '../../services/vehicule.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  query = '';
  vehicules = signal<Vehicule[]>([]);
  page = 1;
  totalPages = 1;
  size = 8;

  constructor(
    private vehiculeService: VehiculeService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.vehiculeService.getAllPaginated(this.page - 1, this.size).subscribe({
      next: (response) => {
        console.log('Home - Réponse pagination:', response);
        
        if (response && response.content) {
          this.vehicules.set(response.content);
          this.totalPages = response.totalPages || 1;
          this.page = (response.number || 0) + 1;
        } else {
          console.error('Structure de réponse inattendue:', response);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des véhicules :', err);
        this.notificationService.show('Erreur de chargement', 'error');
      }
    });
  }

  search(): void {
    this.page = 1;
    this.vehiculeService.search(this.query).subscribe({
      next: (data) => {
        this.vehicules.set(data);
        this.totalPages = 1;
      },
      error: (err) => {
        console.error('Erreur lors de la recherche :', err);
      }
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadVehicules();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadVehicules();
    }
  }
}