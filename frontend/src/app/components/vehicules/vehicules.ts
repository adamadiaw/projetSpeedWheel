import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculeService, Vehicule } from '../../services/vehicule.service';

@Component({
  selector: 'app-vehicules',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicules.html',
  styleUrl: './vehicules.css'
})
export class Vehicules implements OnInit {
  vehicules = signal<Vehicule[]>([]);

  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit(): void {
    this.vehiculeService.getAll().subscribe({
      next: (data) => {
        this.vehicules.set(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des véhicules:', err);
      }
    });
  }
}