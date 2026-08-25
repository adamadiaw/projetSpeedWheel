import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculeService, VehiculeForm } from '../../services/vehicule.service';

@Component({
  selector: 'app-vente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vente.html',
  styleUrl: './vente.css'
})
export class Vente {
  formData: VehiculeForm = {
    marque: '',
    modele: '',
    annee: 2024,
    couleur: '',
    prix: 0,
    kilometrage: 0,
    carburant: '',
    transmission: '',
    description: '',
    status: 'A_VENDRE',
    garantie: 12
  };

  constructor(private vehiculeService: VehiculeService) {}

  onSubmit(): void {
    this.vehiculeService.create(this.formData).subscribe({
      next: () => {
        alert('Votre véhicule a été soumis à la vente !');
        this.resetForm();
      },
      error: (err) => {
        console.error('Erreur lors de la soumission :', err);
      }
    });
  }

  resetForm(): void {
    this.formData = {
      marque: '',
      modele: '',
      annee: 2024,
      couleur: '',
      prix: 0,
      kilometrage: 0,
      carburant: '',
      transmission: '',
      description: '',
      status: 'A_VENDRE',
      garantie: 12
    };
  }
}