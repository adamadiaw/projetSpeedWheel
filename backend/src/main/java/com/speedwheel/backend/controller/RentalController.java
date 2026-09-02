package com.speedwheel.backend.controller;

import com.speedwheel.backend.entity.Rental;
import com.speedwheel.backend.entity.User;
import com.speedwheel.backend.service.RentalService;
import com.speedwheel.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/rentals")
@CrossOrigin(origins = "http://localhost:4200")
public class RentalController {

    private final RentalService rentalService;
    private final UserRepository userRepository;

    public RentalController(RentalService rentalService, UserRepository userRepository) {
        this.rentalService = rentalService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public Rental rentVehicle(@RequestParam Long vehiculeId, @RequestParam String returnDate) {
        LocalDateTime returnDateTime = LocalDateTime.parse(returnDate);
        return rentalService.rentVehicle(vehiculeId, returnDateTime);
    }

    @GetMapping
    public List<Rental> getMyRentals() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return rentalService.getRentalsByUserId(user.getId());
    }
}