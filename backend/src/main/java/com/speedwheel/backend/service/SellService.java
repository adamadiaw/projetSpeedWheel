package com.speedwheel.backend.service;

import com.speedwheel.backend.dto.VehiculeDTO;
import com.speedwheel.backend.entity.User;
import com.speedwheel.backend.entity.Vehicule;
import com.speedwheel.backend.repository.UserRepository;
import com.speedwheel.backend.repository.VehiculeRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;

@Service
@Validated
public class SellService {

    private final VehiculeRepository vehiculeRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    SellService(VehiculeRepository vehiculeRepository, UserRepository userRepository, NotificationService notificationService) {
        this.vehiculeRepository = vehiculeRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    public Vehicule sellVehicule(@Valid VehiculeDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

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
        vehicule.setUser(user);
        Vehicule savedVehicule = vehiculeRepository.save(vehicule);

        // Envoyer une notification WebSocket
        notificationService.sendNotification("Un véhicule a été vendu par " + user.getFullName() + " !");

        return savedVehicule;
    }
}