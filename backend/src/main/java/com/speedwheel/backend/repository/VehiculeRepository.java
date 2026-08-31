package com.speedwheel.backend.repository;

import com.speedwheel.backend.entity.Vehicule;
import com.speedwheel.backend.entity.VehiculeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {
    List<Vehicule> findByMarqueContainingIgnoreCaseOrModeleContainingIgnoreCase(String marque, String modele);
    List<Vehicule> findByStatus(VehiculeStatus status);
    Page<Vehicule> findByStatus(VehiculeStatus status, Pageable pageable);
}