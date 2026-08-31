import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculeService, Vehicule, VehiculeForm } from '../../services/vehicule.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
  vehicules = signal<Vehicule[]>([]);
  page = 1;
  size = 5;
  totalPages = 1;
  isModalOpen = signal(false);
  isEditing = signal(false);
  selectedVehicule = signal<Vehicule | null>(null);

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

  constructor(
    private vehiculeService: VehiculeService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.vehiculeService.getAllPaginated(this.page - 1, this.size).subscribe({
      next: (response) => {
        console.log('Admin - Réponse pagination:', response);
        
        if (response && response.content) {
          this.vehicules.set(response.content);
          this.totalPages = response.totalPages || 1;
          this.page = (response.number || 0) + 1;
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

  openModal(vehicule?: Vehicule): void {
    if (vehicule) {
      this.isEditing.set(true);
      this.selectedVehicule.set(vehicule);
      this.formData = {
        marque: vehicule.marque,
        modele: vehicule.modele,
        annee: vehicule.annee,
        couleur: vehicule.couleur,
        prix: vehicule.prix,
        kilometrage: vehicule.kilometrage,
        carburant: vehicule.carburant,
        transmission: vehicule.transmission,
        description: vehicule.description,
        status: vehicule.status,
        garantie: vehicule.garantie
      };
    } else {
      this.isEditing.set(false);
      this.selectedVehicule.set(null);
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
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  onSubmit(): void {
    if (this.isEditing() && this.selectedVehicule()) {
      this.vehiculeService.update(this.selectedVehicule()!.id, this.formData).subscribe({
        next: () => {
          this.notificationService.show('Véhicule modifié avec succès !', 'success');
          this.page = 1;
          this.loadVehicules();
          this.closeModal();
        },
        error: (err) => {
          console.error('Erreur modification:', err);
          this.notificationService.show('Erreur lors de la modification', 'error');
        }
      });
    } else {
      this.vehiculeService.create(this.formData).subscribe({
        next: () => {
          this.notificationService.show('Véhicule ajouté avec succès !', 'success');
          this.page = 1;
          this.loadVehicules();
          this.closeModal();
        },
        error: (err) => {
          console.error('Erreur création:', err);
          this.notificationService.show('Erreur lors de la création', 'error');
        }
      });
    }
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      this.vehiculeService.delete(id).subscribe({
        next: () => {
          this.notificationService.show('Véhicule supprimé !', 'success');
          this.loadVehicules();
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
          this.notificationService.show('Erreur lors de la suppression', 'error');
        }
      });
    }
  }
}