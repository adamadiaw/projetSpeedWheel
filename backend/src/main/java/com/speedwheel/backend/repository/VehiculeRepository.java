package com.speedwheel.backend.repository;

import com.speedwheel.backend.entity.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {
    // Tu pourras ajouter des méthodes personnalisées ici plus tard (ex: findByMarque)
}