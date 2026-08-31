import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VehiculeService, Vehicule } from '../../services/vehicule.service';
import { SaleService } from '../../services/sale.service';
import { NotificationService } from '../../services/notification.service';

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
    private saleService: SaleService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.vehiculeService.getByStatusPaginated('A_VENDRE', this.page - 1, this.size).subscribe({
      next: (response) => {
        console.log('Pagination Achat:', response);
        
        if (response && response.content) {
          this.vehicules.set(response.content);
          // CORRECTION : Utiliser response.page.totalPages et response.page.number
          this.totalPages = response.page?.totalPages || 1;
          this.page = (response.page?.number || 0) + 1;
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

  onBuy(vehicule: Vehicule): void {
    this.saleService.createSale(vehicule.id).subscribe({
      next: () => {
        this.notificationService.show(`Véhicule ${vehicule.marque} ${vehicule.modele} acheté !`, 'success');
        this.loadVehicules();
      },
      error: (err) => {
        console.error('Erreur lors de l\'achat :', err);
        this.notificationService.show('Erreur lors de l\'achat', 'error');
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