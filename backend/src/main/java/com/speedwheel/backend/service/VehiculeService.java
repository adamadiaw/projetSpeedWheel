package com.speedwheel.backend.service;

import com.speedwheel.backend.dto.VehiculeDTO;
import com.speedwheel.backend.entity.Vehicule;
import com.speedwheel.backend.repository.VehiculeRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;
import java.util.List;

@Service
@Validated
public class VehiculeService {

    private final VehiculeRepository vehiculeRepository;

    VehiculeService(VehiculeRepository vehiculeRepository) {
        this.vehiculeRepository = vehiculeRepository;
    }

    public List<Vehicule> getAll() {
        return vehiculeRepository.findAll();
    }

    public Vehicule getById(Long id) {
        return vehiculeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Véhicule non trouvé"));
    }

    public Vehicule create(@Valid VehiculeDTO dto) {
        Vehicule vehicule = new Vehicule();
        vehicule.setMarque(dto.getMarque());
        vehicule.setModele(dto.getModele());
        vehicule.setAnnee(dto.getAnnee());
        vehicule.setCouleur(dto.getCouleur());
        vehicule.setPrix(dto.getPrix());
        vehicule.setKilometrage(dto.getKilometrage());
        vehicule.setCarburant(dto.getCarburant());
        vehicule.setTransmission(dto.getTransmission());
        vehicule.setDescription(dto.getDescription());
        return vehiculeRepository.save(vehicule);
    }

    public Vehicule update(Long id, @Valid VehiculeDTO dto) {
        Vehicule vehicule = getById(id);
        vehicule.setMarque(dto.getMarque());
        vehicule.setModele(dto.getModele());
        vehicule.setAnnee(dto.getAnnee());
        vehicule.setCouleur(dto.getCouleur());
        vehicule.setPrix(dto.getPrix());
        vehicule.setKilometrage(dto.getKilometrage());
        vehicule.setCarburant(dto.getCarburant());
        vehicule.setTransmission(dto.getTransmission());
        vehicule.setDescription(dto.getDescription());
        return vehiculeRepository.save(vehicule);
    }

    public void delete(Long id) {
        vehiculeRepository.deleteById(id);
    }
}