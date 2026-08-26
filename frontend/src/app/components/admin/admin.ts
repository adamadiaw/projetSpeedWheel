import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculeService, Vehicule, VehiculeForm } from '../../services/vehicule.service';

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

  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.vehiculeService.getAllPaginated(this.page - 1, this.size).subscribe({
      next: (response) => {
        this.vehicules.set(response.content);
        this.totalPages = response.totalPages;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des véhicules :', err);
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
      this.vehiculeService.update(this.selectedVehicule()!.id, this.formData).subscribe(() => {
        this.page = 1; // <-- Retour à la page 1
        this.loadVehicules();
        this.closeModal();
      });
    } else {
      this.vehiculeService.create(this.formData).subscribe(() => {
        this.page = 1; // <-- Retour à la page 1
        this.loadVehicules();
        this.closeModal();
      });
    }
  }

  onDelete(id: number): void {
    this.vehiculeService.delete(id).subscribe(() => {
      this.loadVehicules();
    });
  }
}