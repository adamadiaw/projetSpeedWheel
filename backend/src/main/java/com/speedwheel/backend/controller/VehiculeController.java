package com.speedwheel.backend.controller;

import com.speedwheel.backend.dto.VehiculeDTO;
import com.speedwheel.backend.entity.Vehicule;
import com.speedwheel.backend.entity.VehiculeStatus;
import com.speedwheel.backend.service.VehiculeService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicules")
@CrossOrigin(origins = "http://localhost:4200")
public class VehiculeController {

    private final VehiculeService vehiculeService;

    VehiculeController(VehiculeService vehiculeService) {
        this.vehiculeService = vehiculeService;
    }

    @GetMapping
    public List<Vehicule> getAll() {
        return vehiculeService.getAll();
    }

    @GetMapping("/{id}")
    public Vehicule getById(@PathVariable Long id) {
        return vehiculeService.getById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Vehicule create(@Valid @RequestBody VehiculeDTO dto) {
        return vehiculeService.create(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Vehicule update(@PathVariable Long id, @Valid @RequestBody VehiculeDTO dto) {
        return vehiculeService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        vehiculeService.delete(id);
    }

    @GetMapping("/status/{status}")
    public List<Vehicule> getByStatus(@PathVariable VehiculeStatus status) {
        return vehiculeService.getByStatus(status);
    }

    @GetMapping("/search")
    public List<Vehicule> search(@RequestParam String q) {
        return vehiculeService.search(q);
    }
}