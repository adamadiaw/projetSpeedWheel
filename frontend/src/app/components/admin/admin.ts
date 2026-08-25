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
    status: 'DISPONIBLE',
    garantie: 12
  };

  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.vehiculeService.getAll().subscribe((data) => {
      this.vehicules.set(data);
    });
  }

  onSubmit(): void {
    if (this.isEditing() && this.selectedVehicule()) {
      this.vehiculeService.update(this.selectedVehicule()!.id, this.formData).subscribe(() => {
        this.loadVehicules();
        this.resetForm();
      });
    } else {
      this.vehiculeService.create(this.formData).subscribe(() => {
        this.loadVehicules();
        this.resetForm();
      });
    }
  }

    onEdit(vehicule: Vehicule): void {
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
  }

  onDelete(id: number): void {
    this.vehiculeService.delete(id).subscribe(() => {
      this.loadVehicules();
    });
  }

    resetForm(): void {
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
      status: 'DISPONIBLE',
      garantie: 12      
    };
  }
}