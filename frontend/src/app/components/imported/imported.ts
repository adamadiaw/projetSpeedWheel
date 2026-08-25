import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculeService, Vehicule } from '../../services/vehicule.service';

@Component({
  selector: 'app-imported',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imported.html',
  styleUrl: './imported.css'
})
export class Imported {
  vehicules = signal<Vehicule[]>([]);

  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.vehiculeService.getByStatus('IMPORTE').subscribe({
      next: (data) => {
        this.vehicules.set(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des véhicules importés:', err);
      }
    });
  }
}