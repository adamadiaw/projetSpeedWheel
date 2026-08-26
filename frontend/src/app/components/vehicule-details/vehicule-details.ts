import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VehiculeService, Vehicule } from '../../services/vehicule.service';
import { SaleService } from '../../services/sale.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-vehicule-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicule-details.html',
  styleUrl: './vehicule-details.css'
})
export class VehiculeDetails {
  vehicule = signal<Vehicule | null>(null);
  id = 0;

  constructor(
    private route: ActivatedRoute,
    private vehiculeService: VehiculeService,
    private saleService: SaleService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.vehiculeService.getById(this.id).subscribe({
      next: (data) => {
        this.vehicule.set(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du véhicule :', err);
      }
    });
  }

  onBuy(): void {
    if (!this.vehicule()) return;
    this.saleService.createSale(this.vehicule()!.id).subscribe({
      next: () => {
        this.notificationService.show(`Le véhicule ${this.vehicule()!.marque} ${this.vehicule()!.modele} a été acheté !`, 'success');
      },
      error: (err) => {
        this.notificationService.show('Erreur lors de l\'achat', 'error');
      }
    });
  }
}