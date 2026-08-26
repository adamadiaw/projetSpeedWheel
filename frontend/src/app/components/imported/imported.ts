import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculeService, Vehicule } from '../../services/vehicule.service';

@Component({
  selector: 'app-imported',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './imported.html',
  styleUrl: './imported.css'
})
export class Imported {
  vehicules = signal<Vehicule[]>([]);
  isModalOpen = signal(false);
  requestData = {
    marque: '',
    modele: '',
    annee: null,
    budget: null
  };

  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  page = 1;
  totalPages = 1;
  size = 8;

  loadVehicules(): void {
    this.vehiculeService.getByStatusPaginated('IMPORTE', this.page - 1, this.size).subscribe({
      next: (response) => {
        this.vehicules.set(response.content);
        this.totalPages = response.totalPages;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération :', err);
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

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  onRequest(): void {
    this.vehiculeService.importRequest(this.requestData).subscribe({
      next: () => {
        alert('Requête envoyée aux importateurs !');
        this.closeModal();
        this.resetRequest();
      },
      error: (err) => {
        console.error('Erreur lors de la requête :', err);
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
}