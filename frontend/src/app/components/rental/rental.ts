import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculeService, Vehicule } from '../../services/vehicule.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rental.html',
  styleUrl: './rental.css'
})
export class Rental {
  vehicules = signal<Vehicule[]>([]);
  page = 1;
  totalPages = 1;
  size = 8;
  
  // Formulaire de location
  vehiculeSelectionne: Vehicule | null = null;
  dateDebut = '';
  dateFin = '';
  lieuRetrait = '';
  lieuDepot = '';
  options = {
    assurance: false,
    gps: false,
    siègeBebe: false
  };

  constructor(
    private vehiculeService: VehiculeService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.vehiculeService.getByStatusPaginated('A_LOUER', this.page - 1, this.size).subscribe({
      next: (response) => {
        console.log('Rental - Pagination:', response);
        if (response && response.content) {
          this.vehicules.set(response.content);
          this.totalPages = response.totalPages || 1;
          this.page = (response.number || 0) + 1;
        }
      },
      error: (err) => {
        console.error('Erreur pagination rental:', err);
        this.notificationService.show('Erreur de chargement', 'error');
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

  ouvrirFormulaireLocation(vehicule: Vehicule): void {
    this.vehiculeSelectionne = vehicule;
    
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    this.dateDebut = today.toISOString().split('T')[0];
    this.dateFin = nextWeek.toISOString().split('T')[0];
    this.lieuRetrait = '';
    this.lieuDepot = '';
    this.options = {
      assurance: false,
      gps: false,
      siègeBebe: false
    };
  }

  confirmerLocation(): void {
    if (!this.vehiculeSelectionne) return;
    
    if (!this.dateDebut || !this.dateFin || !this.lieuRetrait || !this.lieuDepot) {
      this.notificationService.show('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }
    
    if (new Date(this.dateFin) <= new Date(this.dateDebut)) {
      this.notificationService.show('La date de fin doit être après la date de début', 'error');
      return;
    }

    const returnDate = this.dateFin + 'T12:00:00';
    
    this.vehiculeService.rent(this.vehiculeSelectionne.id, returnDate).subscribe({
      next: (response) => {
        console.log('Location réussie:', response);
        this.notificationService.show(`Véhicule ${this.vehiculeSelectionne!.marque} ${this.vehiculeSelectionne!.modele} loué avec succès !`, 'success');
        this.vehiculeSelectionne = null;
        this.loadVehicules();
      },
      error: (err) => {
        console.error('Erreur location:', err);
        this.notificationService.show('Erreur lors de la location', 'error');
      }
    });
  }

  fermerFormulaire(): void {
    this.vehiculeSelectionne = null;
  }
}