import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculeService, Vehicule } from '../../services/vehicule.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-imported',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './imported.html',
  styleUrl: './imported.css'
})
export class Imported {
  vehicules = signal<Vehicule[]>([]);
  page = 1;
  totalPages = 1;
  size = 8;
  isModalOpen = signal(false);
  requestData = {
    marque: '',
    modele: '',
    annee: null,
    budget: null
  };

  constructor(
    private vehiculeService: VehiculeService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.vehiculeService.getByStatusPaginated('IMPORTE', this.page - 1, this.size).subscribe({
      next: (response) => {
        console.log('Pagination Import:', response);
        
        if (response && response.content) {
          this.vehicules.set(response.content);
          this.totalPages = response.totalPages || 1;
          this.page = (response.number || 0) + 1;
        } else {
          console.error('Structure de réponse inattendue:', response);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération :', err);
        this.notificationService.show('Erreur de chargement', 'error');
      }
    });
  }

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  onRequest(): void {
    this.vehiculeService.importRequest(this.requestData).subscribe({
      next: () => {
        this.notificationService.show('Requête envoyée aux importateurs !', 'success');
        this.closeModal();
        this.resetRequest();
      },
      error: (err) => {
        this.notificationService.show('Erreur lors de la requête', 'error');
      }
    });
  }

  resetRequest(): void {
    this.requestData = {
      marque: '',
      modele: '',
      annee: null,
      budget: null
    };
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