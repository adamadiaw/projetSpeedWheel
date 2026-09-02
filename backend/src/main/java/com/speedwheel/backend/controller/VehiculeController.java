package com.speedwheel.backend.controller;

import com.speedwheel.backend.dto.VehiculeDTO;
import com.speedwheel.backend.entity.Vehicule;
import com.speedwheel.backend.entity.VehiculeStatus;
import com.speedwheel.backend.service.SellService;
import com.speedwheel.backend.service.VehiculeService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

@RestController
@RequestMapping("/api/vehicules")
@CrossOrigin(origins = "http://localhost:4201")
public class VehiculeController {

    private final VehiculeService vehiculeService;
    private final SellService sellService;

    VehiculeController(VehiculeService vehiculeService, SellService sellService) {
        this.vehiculeService = vehiculeService;
        this.sellService = sellService;
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

    @PostMapping("/sell")
    public Vehicule sellVehicule(@Valid @RequestBody VehiculeDTO dto) {
        return sellService.sellVehicule(dto);
    }

    @GetMapping("/paginated")
    public Page<Vehicule> getPaginated(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "8") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "asc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return vehiculeService.getPaginated(pageable);
    }

    @GetMapping("/status/{status}/paginated")
    public Page<Vehicule> getByStatusPaginated(
            @PathVariable VehiculeStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return vehiculeService.getByStatusPaginated(status, pageable);
    }

    @PostMapping("/rent/{id}")
    public Vehicule rentVehicule(@PathVariable Long id) {
        return vehiculeService.rentVehicule(id);
    }
}