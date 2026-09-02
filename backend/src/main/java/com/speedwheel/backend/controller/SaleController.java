package com.speedwheel.backend.controller;

import com.speedwheel.backend.entity.Sale;
import com.speedwheel.backend.entity.User;
import com.speedwheel.backend.entity.Vehicule;
import com.speedwheel.backend.repository.SaleRepository;
import com.speedwheel.backend.repository.UserRepository;
import com.speedwheel.backend.repository.VehiculeRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "http://localhost:4200")
public class SaleController {

    private final SaleRepository saleRepository;

    private final UserRepository userRepository;

    private final VehiculeRepository vehiculeRepository;

    SaleController(SaleRepository saleRepository, UserRepository userRepository, VehiculeRepository vehiculeRepository) {
        this.saleRepository = saleRepository;
        this.userRepository = userRepository;
        this.vehiculeRepository = vehiculeRepository;
    }

    @PostMapping
    public Sale createSale(@RequestParam Long vehiculeId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        Vehicule vehicule = vehiculeRepository.findById(vehiculeId)
                .orElseThrow(() -> new RuntimeException("Véhicule non trouvé"));

        Sale sale = new Sale();
        sale.setUser(user);
        sale.setVehicule(vehicule);
        sale.setPrice(vehicule.getPrix());
        sale.setStatus("PENDING");
        return saleRepository.save(sale);
    }

    @GetMapping
    public List<Sale> getMySales() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return saleRepository.findByUserId(user.getId());
    }
}