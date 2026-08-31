import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculeService, VehiculeForm } from '../../services/vehicule.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

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
  isLoggedIn = signal(false);

  constructor(
    private vehiculeService: VehiculeService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn.set(!!this.authService.getToken());
  }

  onSubmit(): void {
    if (!this.isLoggedIn()) {
      this.notificationService.show('Vous devez être connecté pour vendre un véhicule.', 'error');
      this.router.navigate(['/login']);
      return;
    }

    this.vehiculeService.sell(this.formData).subscribe({
      next: (response) => {
        this.notificationService.show('Véhicule mis en vente avec succès !', 'success');
        this.resetForm();
      },
      error: (err) => {
        console.error('Erreur vente:', err);
        this.notificationService.show('Erreur lors de la soumission', 'error');
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