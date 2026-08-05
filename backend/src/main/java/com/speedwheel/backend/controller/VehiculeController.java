package com.speedwheel.backend.controller;

import com.speedwheel.backend.entity.Vehicule;
import com.speedwheel.backend.repository.VehiculeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicules")
@CrossOrigin(origins = "*") // Permet à Angular de se connecter plus tard
public class VehiculeController {

    private final VehiculeRepository vehiculeRepository;

    VehiculeController(VehiculeRepository vehiculeRepository) {
        this.vehiculeRepository = vehiculeRepository;
    }

    // GET : Récupérer tous les véhicules
    @GetMapping
    public List<Vehicule> getAllVehicules() {
        return vehiculeRepository.findAll();
    }

    // POST : Ajouter un véhicule
    @PostMapping
    public Vehicule createVehicule(@RequestBody Vehicule vehicule) {
        return vehiculeRepository.save(vehicule);
    }
}