package com.speedwheel.backend.service;

import com.speedwheel.backend.entity.Rental;
import com.speedwheel.backend.entity.User;
import com.speedwheel.backend.entity.Vehicule;
import com.speedwheel.backend.entity.VehiculeStatus;
import com.speedwheel.backend.repository.RentalRepository;
import com.speedwheel.backend.repository.UserRepository;
import com.speedwheel.backend.repository.VehiculeRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RentalService {

    private final RentalRepository rentalRepository;
    private final UserRepository userRepository;
    private final VehiculeRepository vehiculeRepository;
    private final NotificationService notificationService;

    public RentalService(RentalRepository rentalRepository, UserRepository userRepository, VehiculeRepository vehiculeRepository, NotificationService notificationService) {
        this.rentalRepository = rentalRepository;
        this.userRepository = userRepository;
        this.vehiculeRepository = vehiculeRepository;
        this.notificationService = notificationService;
    }

    public Rental rentVehicle(Long vehiculeId, LocalDateTime returnDate) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        Vehicule vehicule = vehiculeRepository.findById(vehiculeId)
                .orElseThrow(() -> new RuntimeException("Véhicule non trouvé"));

        // Vérifier que le véhicule est disponible à la location
        if (vehicule.getStatus() != VehiculeStatus.A_LOUER) {
            throw new RuntimeException("Ce véhicule n'est pas disponible à la location");
        }

        vehicule.setStatus(VehiculeStatus.LOUER);
        vehiculeRepository.save(vehicule);

        Rental rental = new Rental();
        rental.setUser(user);
        rental.setVehicule(vehicule);
        rental.setRentalDate(LocalDateTime.now());
        rental.setReturnDate(returnDate);
        rental.setStatus("ACTIVE");
        Rental savedRental = rentalRepository.save(rental);

        notificationService.sendNotification("Un véhicule a été loué par " + user.getFullName() + " !");

        return savedRental;
    }

    public List<Rental> getRentalsByUserId(Long userId) {
        return rentalRepository.findByUserId(userId);
    }
}