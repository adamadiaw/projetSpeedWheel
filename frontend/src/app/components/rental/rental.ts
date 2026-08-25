import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculeService, Vehicule } from '../../services/vehicule.service';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rental.html',
  styleUrl: './rental.css'
})
export class Rental {
  vehicules = signal<Vehicule[]>([]);

  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.vehiculeService.getByStatus('A_LOUER').subscribe({
      next: (data) => {
        this.vehicules.set(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des véhicules à louer:', err);
      }
    });
  }
}