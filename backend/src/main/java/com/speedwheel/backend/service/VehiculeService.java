package com.speedwheel.backend.service;

import com.speedwheel.backend.dto.VehiculeDTO;
import com.speedwheel.backend.entity.Vehicule;
import com.speedwheel.backend.entity.VehiculeStatus;
import com.speedwheel.backend.repository.VehiculeRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageImpl;

import java.util.List;

@Service
@Validated
public class VehiculeService {

    private final VehiculeRepository vehiculeRepository;
    private final NotificationService notificationService;
    private final VehiculeCacheService cacheService;

    VehiculeService(VehiculeRepository vehiculeRepository, VehiculeCacheService cacheService, NotificationService notificationService) {
        this.vehiculeRepository = vehiculeRepository;
        this.notificationService = notificationService;
        this.cacheService = cacheService;
    }

    public List<Vehicule> getAll() {
        String cacheKey = "vehicules:all";
        
        // Vérifier si les données sont en cache
        List<Vehicule> cachedVehicules = cacheService.getCachedList(cacheKey, Vehicule.class);
        if (cachedVehicules != null) {
            return cachedVehicules;
        }

        // Pas en cache, on va chercher en base
        List<Vehicule> vehicules = vehiculeRepository.findAll();
        
        // On met en cache le résultat
        cacheService.cacheVehiculeData(cacheKey, vehicules);
        
        return vehicules;
    }

    public Page<Vehicule> getByStatusPaginated(VehiculeStatus status, Pageable pageable) {
        String cacheKey = "vehicules:status:" + status + ":page:" + pageable.getPageNumber() + ":size:" + pageable.getPageSize();
        
        // Vérifier si les données sont en cache
        List<Vehicule> cachedVehicules = cacheService.getCachedList(cacheKey, Vehicule.class);
        if (cachedVehicules != null) {
            return new PageImpl<>(cachedVehicules, pageable, cachedVehicules.size());
        }

        // Pas en cache, on va chercher en base
        Page<Vehicule> vehicules = vehiculeRepository.findByStatus(status, pageable);
        
        // On met en cache le résultat
        cacheService.cacheVehiculeData(cacheKey, vehicules.getContent());
        
        return vehicules;
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

    public Page<Vehicule> getPaginated(Pageable pageable) {
        return vehiculeRepository.findAll(pageable);
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
        
        notificationService.sendNotification("Un véhicule a été mis en vente : " + dto.getMarque() + " " + dto.getModele());
        
        return vehiculeRepository.save(vehicule);
    }

    public Vehicule rentVehicule(Long id) {
        Vehicule vehicule = getById(id);
        vehicule.setStatus(VehiculeStatus.LOUER);
        Vehicule savedVehicule = vehiculeRepository.save(vehicule);
        
        notificationService.sendNotification("Un véhicule a été loué !");
        
        return savedVehicule;
    }

    public void delete(Long id) {
        vehiculeRepository.deleteById(id);
    }
}