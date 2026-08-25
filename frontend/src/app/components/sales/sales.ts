import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculeService, Vehicule } from '../../services/vehicule.service';
import { SaleService } from '../../services/sale.service';


@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales.html',
  styleUrl: './sales.css'
})
export class Sales {
  vehicules = signal<Vehicule[]>([]);

  constructor(
    private vehiculeService: VehiculeService,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.vehiculeService.getAll().subscribe((data) => {
      this.vehicules.set(data);
    });
  }

  buy(vehiculeId: number): void {
    this.saleService.createSale(vehiculeId).subscribe({
      next: () => alert('Achat réussi !'),
      error: () => alert('Erreur lors de l\'achat')
    });
  }
}