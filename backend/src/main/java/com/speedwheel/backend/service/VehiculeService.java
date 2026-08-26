package com.speedwheel.backend.service;

import com.speedwheel.backend.dto.VehiculeDTO;
import com.speedwheel.backend.entity.Vehicule;
import com.speedwheel.backend.entity.VehiculeStatus;
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
        vehicule.setGarantie(dto.getGarantie());
        vehicule.setStatus(dto.getStatus());
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
        vehicule.setGarantie(dto.getGarantie());
        vehicule.setStatus(dto.getStatus()); 
        return vehiculeRepository.save(vehicule);
    }

    public List<Vehicule> search(String query) {
        return vehiculeRepository.findByMarqueContainingIgnoreCaseOrModeleContainingIgnoreCase(query, query);
    }

    public List<Vehicule> getByStatus(VehiculeStatus status) {
        return vehiculeRepository.findByStatus(status);
    }

    public org.springframework.data.domain.Page<Vehicule> getPaginated(int page, int size) {
        return vehiculeRepository.findAll(
            org.springframework.data.domain.PageRequest.of(page, size)
        );
    }

    public Vehicule sellVehicule(@Valid VehiculeDTO dto) {
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
        vehicule.setGarantie(dto.getGarantie());
        vehicule.setStatus(dto.getStatus());
        return vehiculeRepository.save(vehicule);
    }

    public org.springframework.data.domain.Page<Vehicule> getByStatusPaginated(VehiculeStatus status, int page, int size) {
        return vehiculeRepository.findByStatus(status, org.springframework.data.domain.PageRequest.of(page, size));
    }

    public void delete(Long id) {
        vehiculeRepository.deleteById(id);
    }
}