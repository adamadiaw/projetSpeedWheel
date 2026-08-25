import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculeService, Vehicule } from '../../services/vehicule.service';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-achat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achat.html',
  styleUrl: './achat.css'
})
export class Achat {
  vehicules = signal<Vehicule[]>([]);

  constructor(
    private vehiculeService: VehiculeService,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.vehiculeService.getByStatus('A_VENDRE').subscribe({
      next: (data) => {
        this.vehicules.set(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des véhicules à vendre:', err);
      }
    });
  }

  onBuy(vehicule: Vehicule): void {
    // Appeler le service de vente pour acheter ce véhicule
    this.saleService.createSale(vehicule.id).subscribe({
      next: () => {
        alert(`Le véhicule ${vehicule.marque} ${vehicule.modele} a été acheté !`);
      },
      error: (err) => {
        console.error('Erreur lors de l\'achat :', err);
      }
    });
  }
}