import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VehiculeService, Vehicule } from '../../services/vehicule.service';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-achat',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './achat.html',
  styleUrl: './achat.css'
})
export class Achat {
  vehicules = signal<Vehicule[]>([]);
  page = 1;
  totalPages = 1;
  size = 8;

  constructor(
    private vehiculeService: VehiculeService,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.vehiculeService.getByStatusPaginated('A_VENDRE', this.page - 1, this.size).subscribe({
      next: (response) => {
        this.vehicules.set(response.content);
        this.totalPages = response.totalPages;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des véhicules :', err);
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